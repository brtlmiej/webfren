import axios from "axios";
import { Command } from "../../core/Command.js";
import { HttpLoadTester } from "../../services/HttpLoadTester.js";
import { print } from "../../services/tools/print.js";

export const HttpLoadTestCommand: Command = {
    name: 'http-load-test',
    description: 'executes HTTP load test',
    arguments: [
        { name: 'url', description: 'url to test' , required: true },
        { name: 'n', description: 'number of requests to send' , required: true },
    ],
    action: async (url: string, n: number) => {
        const tester = new HttpLoadTester(axios);
        const stats = await tester.execute(url, n);
        print('Test stats:')
        print('- Num. of success requests: ' + stats.successRequests, 3);
        print('  - Num. of failed requests: ' + stats.failedRequests, 3);
        print('  - Avg. response time: ' + stats.avgResponseTimeInMs + " ms", 3);
    }
}