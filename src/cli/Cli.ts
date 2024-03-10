import { program } from 'commander';
import { Command } from './Command.js';

/**
 * Represents Cli app.
 */
export class Cli {
    private _commands: Array<Command> = [];

    get commands(): ReadonlyArray<Command> {
        return this._commands;
    }

    /**
     * Add new command to Cli.
     * 
     * @param command Command
     */
    addCommand(command: Command): void {
        this._commands.push(command);

        const cmd = program.command(command.name)
            .description(command.description)
            .action(command.action);
        
        command.arguments.forEach(arg => {
            const flag = arg.required ? `<${arg.name}>` : `[${arg.name}]`;
            cmd.argument(flag, arg.description);
        })
    }

    /**
     * Register Cli and its commands.
     */
    register(): void {
        program.parse();
    }
}