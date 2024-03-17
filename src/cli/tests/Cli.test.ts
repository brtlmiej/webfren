import { test } from 'vitest';
import { Cli, CliError } from '../Cli.js'
import { Command } from '../Command.js';
import { program } from 'commander';

const commandMock: Command = {
    name: 'mock-command',
    description: 'Command mock',
    arguments: [],
    action: () => {}
}

const commandMockTwo: Command = {
    name: 'mock-command-two',
    description: 'Command mock two',
    arguments: [],
    action: () => {}
}

test('CliError constructor handles error message for string value', ({ expect }) => {
    const error = new CliError('some error');

    expect(error.message).equal('some error');
});

test('CliError constructor handles error message for \'Error\' value', ({ expect }) => {
    const error = new CliError(new Error('some Error error'));

    expect(error.message).equal('some Error error');
});

test('CliError constructor handles error message for object value value', ({ expect }) => {
    const error = new CliError({ a: 4 });

    expect(error.message).equal('Thrown error: {"a":4}');
});

test('CliError constructor handles error message for any other value', ({ expect }) => {
    const num: number = 567;
    const error = new CliError(num);

    expect(error.message).equal('Unknown error has been thrown: 567');
});

test('Cli#addCommand() adds given command to commands set', ({ expect }) => {
    const cli = new Cli();
    cli.addCommand(commandMock);

    expect(cli.commands).deep.equal(new Set([ commandMock ]));
});

test('Cli#addCommand() throws exception when command with the same name already exists', ({ expect }) => {
    const cli = new Cli();
    cli.addCommand(commandMock);

    expect(() => cli.addCommand(commandMock)).toThrow('Command with this name already exists');
});

test('Cli#parse() parses all added commands', ({ expect }) => {
    const cli = new Cli();
    cli.addCommand(commandMock);
    cli.addCommand(commandMockTwo);
    cli.parse();

    expect(program.commands.length).equal(2);
});