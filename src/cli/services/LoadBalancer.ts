
import http, { Server } from 'http';
import { parseServerPort } from "./parsers/port.js";
import { HttpClient } from './tools/HttpClient.js';
import { print } from './tools/print.js';

export class LoadBalancer {
    readonly port: number;
    readonly serverAddresses: Array<URL>;
    readonly client: HttpClient;

    constructor(port: number, serverAddresses: Array<string>, client: HttpClient) {
        this.port = parseServerPort(port);
        this.client = client;
        this.serverAddresses = [];

        for (const address of serverAddresses) {
            this.serverAddresses.push(new URL(address));
        }
    }

    run(): void {
        const server = this.createServer();
        server.listen(this.port, () => {
            print('Load Balancer is running:');
            print(`Port: ${this.port}`, 3);
            print();
            print('Requests:');
        });
    }

    private createServer(): Server {
        return http.createServer(async (lbReq, lbRes) => {
            const serverAddress = this.selectServer();
            const url = lbReq.url ?? '/';

            const clientResponse = await this.client.get(serverAddress.toString());
            print(`Path: ${url.padEnd(15, ' ')} Redirected to: ${serverAddress} Response: ${clientResponse.status}`, 3);

            lbRes.writeHead(clientResponse.status);
            lbRes.end(clientResponse.data);

            return;
        });
    }

    private selectServer(): URL {
        const randIndex = Math.floor(Math.random() * this.serverAddresses.length);
        return this.serverAddresses[randIndex]!;
    }
}