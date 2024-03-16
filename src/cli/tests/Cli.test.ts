import { test } from 'vitest';
import { Cli } from '../Cli.js'
import { Command } from '../Command.js';

const commandMock: Command = {
    name: 'mock-command',
    description: 'Command mock',
    arguments: [],
    action: () => {}
}

test('#addCommand() adds given command to commands set', ({ expect }) => {
    const cli = new Cli();
    cli.addCommand(commandMock);

    expect(cli.commands).deep.equal(new Set([ commandMock ]));
});

test('#addCommand() throws exception when command with the same name already exists', ({ expect }) => {
    const cli = new Cli();
    cli.addCommand(commandMock);

    expect(() => cli.addCommand(commandMock)).toThrow('Command with this name already exists');
});