#!/usr/bin/env node
/* v8 ignore start */
import packageConfig from '../package.json' with { type: "json" };
import { HttpLoadTestCommand } from "./cli/commands/HttpLoadTestCommand.js";
import { LoadBalancerCommand } from "./cli/commands/LoadBalancerCommand.js";
import { WebServerCommand } from "./cli/commands/WebServerCommand.js";
import { Cli } from "./cli/Cli.js";

const cli = new Cli('webfren', packageConfig.version);

cli.addCommand(HttpLoadTestCommand);
cli.addCommand(LoadBalancerCommand);
cli.addCommand(WebServerCommand);

cli.register();
cli.parse();
/* v8 ignore stop */
