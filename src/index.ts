#!/usr/bin/env node
/* v8 ignore start */
import { Cli } from "./cli/Cli.js";
import { Command } from "./cli/Command.js";
import { HttpLoadTester } from "./tools/http-load-tester/HttpLoadTester.js";
import axios from 'axios';

const httpLoadTesterCmd: Command = {
    name: 'http-load-test',
    description: 'executes HTTP load test',
    arguments: [
        { name: 'url', description: 'url to test' , required: true },
        { name: 'n', description: 'number of requests to send' , required: true },
    ],
    action: async (url: string, n: number) => {
        const tester = new HttpLoadTester(axios);
        const stats = await tester.execute(url, n);
        console.log('Test stats:')
        console.log('  - Num. of success requests: ' + stats.successRequests);
        console.log('  - Num. of failed requests: ' + stats.failedRequests);
        console.log('  - Avg. response time: ' + stats.avgResponseTimeInMs + " ms");
    }
}

const cli = new Cli();
cli.addCommand(httpLoadTesterCmd);
cli.register();
cli.parse();
/* v8 ignore stop */
