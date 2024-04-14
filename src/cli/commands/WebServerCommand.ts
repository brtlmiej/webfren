import { Command } from "../Command.js";
import { WebServer } from "../services/WebServer.js";

export const WebServerCommand: Command = {
    name: 'web-server',
    description: 'runs web server and hosts provided html content',
    arguments: [
        { name: 'port', description: 'port on which server will listen', required: true },
        { name: 'route', description: 'route on which server will host provided content', required: true },
        { name: 'contentFilePath', description: 'path to file containing content to host', required: true },
    ],
    action: (port: number, route: string, contentFilePath: string ) => {
        const server = new WebServer(port, [{ route, contentFilePath }]);
        server.listen();
    }
}