import { program } from 'commander';
import { Command } from './Command.js';

export class CliError extends Error {
    constructor(error: string);
    constructor(error: Error);
    constructor(error: object);
    constructor(error: unknown);
    constructor(error: unknown) {
        let message: string;

        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object') {
            message = "Thrown error: " + JSON.stringify(error);
        } else {
            message = "Unknown error has been thrown: " + JSON.stringify(error);
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
     * Register all added commands, this makes them available for end user.
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
            });
        } catch(e) {
            throw new CliError(e);
        }
    }

    /* v8 ignore start */
    /**
     * Parses all registered commands.
     */
    parse(): void {
        try {
            program.parse();
        } catch (e) {
            throw new CliError(e);
        }
    }
    /* v8 ignore stop */
}