#!/usr/bin/env node
/* v8 ignore start */
import { HttpLoadTestCommand } from "./cli/commands/HttpLoadTestCommand.js";
import { LoadBalancerCommand } from "./cli/commands/LoadBalancerCommand.js";
import { WebServerCommand } from "./cli/commands/WebServerCommand.js";
import { Cli } from "./core/Cli.js";

const cli = new Cli();
cli.addCommand(HttpLoadTestCommand);
cli.addCommand(LoadBalancerCommand);
cli.addCommand(WebServerCommand);
cli.register();
cli.parse();
/* v8 ignore stop */
