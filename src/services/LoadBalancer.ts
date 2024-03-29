
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
        server.listen(this.port);
    }

    private createServer(): Server {
        return http.createServer((req, res) => {
            const serverAddress = this.selectServer();
            const reqIP = req.socket.remoteAddress ?? 'CLIENT DISCONNECTED';
            print(`Request from: ${reqIP} redirected to ${serverAddress}`, 3);
            res.writeHead(200);
            res.end();
            return;
        });
    }

    private selectServer(): URL {
        const randIndex = Math.floor(Math.random() * this.serverAddresses.length);
        return this.serverAddresses[randIndex]!;
    }
}