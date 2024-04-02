import { HttpClient, HttpResponse } from "./tools/HttpClient.js";

export type Stats = {
    failedRequests: number;
    successRequests: number;
    avgResponseTimeInMs: number;
}

export class HttpLoadTester {
    private readonly client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Execute HTTP load test.
     * 
     * @param url Url to test
     * @param n Number of request that will be sent. Min: 1, Max: 100000
     */
    async execute(url: string, n: number): Promise<Stats> {
        this.validateUrl(url);
        this.validateNumberOfRequests(n);
        const requests: Array<Promise<HttpResponse>> = [];
    
        for (let i = 0; i < n; i++) {
            requests.push(this.client.get(url));
        }
        
        return this.getRequestsStats(requests);
    }

    private validateUrl(url: string): void {
        try {
            new URL(url);
        } catch {
            throw new Error('Incorrect url address');
        }
    }
    
    private validateNumberOfRequests(n: number): void {
        if (n < 1 || n > 100000) {
            throw new Error('Incorrect number of requests');
        }
    }
    
    private async getRequestsStats(requests: Array<Promise<HttpResponse>>): Promise<Stats> {
        const stats: Stats = {
            failedRequests: 0,
            successRequests: 0,
            avgResponseTimeInMs: 0
        }
    
        const responses = await Promise.all(requests);
        responses.forEach(res => {
            if (res.status >= 400 && res.status <= 599 ) {
                stats.failedRequests++;
            } else {
                stats.successRequests++;
            }
        });
    
        return stats;
    }
}

