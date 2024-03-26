import http, { Server } from 'http';
import { readFileSync } from 'fs';
import { print } from './tools/print.js';
import path from 'path';

export type EndpointConfig = {
    route: string;
    contentFilePath: string;
}

export type Endpoint = {
    route: string;
    content: string;
    fileName: string;
}

export class WebServer {
    readonly port: number;
    readonly endpoints: Array<Endpoint> = [];
    readonly server: Server; 

    constructor(port: number, endpointsConfig: Array<EndpointConfig>) {
        this.port = this.parsePort(port);
        this.registerEndpoints(endpointsConfig);
        this.server = this.createServer();
    }

    /**
     * Start a server listening for connections.
     */
    listen(): void {
        this.server.listen(this.port, () => {
            print('Web Server is running:');
            print(`- Port: ${this.port}`, 3);
            print();
            print('Server requests:');
        });
    }

    private parsePort(port: number): number {
        // Port numbers can run from 0 to 65353. Port numbers from 0 to 1023 are reserved
        // for common TCP/IP applications and are called well-known ports.
        const min = 1024, max = 65353;
        if (port < min || port > max) {
            throw new Error(`Incorrect port number. Port number must be >= ${min} and <= ${max}`);
        }

        return port;
    }

    private registerEndpoints(endpointsConfig: Array<EndpointConfig>): void {
        endpointsConfig.forEach(config => {
            const route = new URL(config.route, 'http://localhost');
            const contentFilePath = config.contentFilePath.startsWith('/') 
                ? config.contentFilePath
                : path.join(process.cwd(), config.contentFilePath);
            const content = readFileSync(contentFilePath).toString();
            const fileName = contentFilePath.split('/').at(-1)!
            this.endpoints.push({
                route: route.pathname,
                content,
                fileName
            });
        });
    }

    private createServer(): Server {
        return http.createServer((req, res) => {
            const url = req.url ?? '/';
            const endpoint = this.endpoints.find(e => e.route === url );

            if (endpoint === undefined) {
                print(`Path: ${url.padEnd(15, ' ')} Response: 404`, 3);
                res.writeHead(404);
                res.end("Not found");
                return;
            }

            print(`Path: ${url.padEnd(15, ' ')} Response: 200 -> ${endpoint.fileName}`, 3);
            res.writeHead(200);
            res.end(endpoint.content);
            return;
        });
    }
}