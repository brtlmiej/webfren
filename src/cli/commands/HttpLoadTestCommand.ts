
import { AxiosHttpClient } from "./dependencies/AxiosHttpClient.js";
import { Command } from "../Command.js";
import { HttpLoadTester } from "../services/HttpLoadTester.js";
import { print } from "../services/tools/print.js";

export const HttpLoadTestCommand: Command = {
    name: 'http-load-test',
    description: 'executes HTTP load test',
    arguments: [
        { name: 'url', description: 'url to test' , required: true },
        { name: 'n', description: 'number of requests to send' , required: true },
    ],
    action: async (url: string, n: number) => {
        print('Http Load Test is running...');

        const client = new AxiosHttpClient();
        const tester = new HttpLoadTester(client);
        const stats = await tester.execute(url, n);

        print();
        print('Done!');
        print();
        print('Test stats:')
        print('Num. of success requests: ' + stats.successRequests, 3);
        print('Num. of failed requests: ' + stats.failedRequests, 3);
        print('Avg. response time: ' + stats.avgResponseTimeInMs + " ms", 3);
    }
}