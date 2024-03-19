#!/usr/bin/env node
/* v8 ignore start */
import { HttpLoadTestCommand } from "./cli/commands/HttpLoadTestCommand.js";
import { Cli } from "./core/Cli.js";

const cli = new Cli();
cli.addCommand(HttpLoadTestCommand);
cli.register();
cli.parse();
/* v8 ignore stop */
