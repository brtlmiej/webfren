import { Cli } from "./cli/Cli";
import { Command } from "./cli/Command";
import { HttpLoadTester } from "./tools/http-load-tester/HttpLoadTester";
import axios from 'axios';

const httpLoadTesterCmd: Command = {
    name: 'http-load-test',
    description: 'Execute HTTP load test.',
    arguments: [
        { name: 'url', description: 'Url to test' , required: true },
        { name: 'n', description: 'Number of requests to send' , required: true },
    ],
    action: (url: string, n: number) => {
        const tester = new HttpLoadTester(axios);
        tester.execute(url, n);
    }
}

const cli = new Cli();
cli.addCommand(httpLoadTesterCmd);
cli.register();
