import http, {Server} from 'http'

export class WebServer {
    readonly server: Server;

    constructor(){
        this.server =  http.createServer((req, res) => {
            console.log(`   Path: ${req.url ?? '/'}`);
            res.writeHead(200);
            res.end("My first server!");
        });
    }

    run(port: number): void {
        this.server.listen(port, () => {
            console.log('Web Server is running:');
            console.log(`   - Port: ${port}`);
            console.log();
            console.log('Server requests:');
        });
    }
}