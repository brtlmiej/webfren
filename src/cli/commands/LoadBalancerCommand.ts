import axios from "axios";
import { Command } from "../../core/Command.js";
import { LoadBalancer } from "../../services/LoadBalancer.js";

export const LoadBalancerCommand: Command = {
    name: 'load-balancer',
    description: 'runs load balancer and handles requests to multiple servers',
    arguments: [
        { name: 'port', description: 'port on which load balancer will be run', required: true },
        {
            name: 'servers',
            description: 'addresses of servers to which traffic will be redirected.' 
                + ' If you want to pass multiple server addresses split them with \'|\' e.g.' 
                + ' \'https://example.com|https://localhost.com\'',
            required: true
        },
    ],
    action: (port: number, servers: string ) => {
        const serverAddresses = servers.split('|');
        const server = new LoadBalancer(port, serverAddresses, axios);
        server.run();
    }
}