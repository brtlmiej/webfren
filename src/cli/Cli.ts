import { program } from 'commander';
import { Command } from './Command.js';

export class CliError extends Error {
    constructor(error: string | unknown) {
        let message: string;

        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        } else {
            message = "Unknown error has been thrown: " + error?.toString() ?? JSON.stringify(error);
        }

        super(message);
    }
}

/**
 * Represents Cli app.
 */
export class Cli {
    private _commands: Set<Command> = new Set();

    get commands(): ReadonlySet<Command> {
        return this._commands;
    }

    /**
     * Add new command to Cli.
     * 
     * @param command Command
     */
    addCommand(command: Command): void {
        this._commands.forEach(addedCommand => {
            if (addedCommand.name === command.name) {
                throw new CliError('Command with this name already exists.');
            }
        })
        this._commands.add(command);
    }

    /**
     * Registers Cli and all added commands, this makes them available for end user.
     */
    register(): void {
        try {
            this._commands.forEach(command => {
                const commandHandler = program.command(command.name)
                .description(command.description)
                .action(command.action);
        
                command.arguments.forEach(arg => {
                    const flag = arg.required ? `<${arg.name}>` : `[${arg.name}]`;
                    commandHandler.argument(flag, arg.description);
                })
        
                commandHandler.parse();
            });
        } catch(e) {
            throw new CliError(e);
        }
    }
}