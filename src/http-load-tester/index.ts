import axios, { AxiosResponse } from 'axios'

export type Stats = {
    failedRequests: number;
    successRequests: number;
    avgResponseTimeInMs: number;
}

/**
 * Execute HTTP load test.
 * 
 * @param url Url to test
 * @param n Number of request that will be sent. Min: 1, Max: 100000
 */
export async function executeHttpLoadTest(url: string, n: number): Promise<Stats> {
    validateUrl(url);
    validateNumberOfRequests(n);
    const requests: Array<Promise<AxiosResponse>> = [];

    for (let i = 0; i <= n; i++) {
        requests.push(axios.get(url));
    }
    
    return getRequestsStats(requests);
}

function validateUrl(url: string): void {
    try {
        new URL(url);
    } catch {
        throw new Error('Incorrect url address');
    }
}

function validateNumberOfRequests(n: number): void {
    if (n < 1 || n > 100000) {
        throw new Error('Incorrect number of requests');
    }
}

function getRequestsStats(requests: Array<Promise<AxiosResponse>>): Stats {
    const stats: Stats = {
        failedRequests: 0,
        successRequests: 0,
        avgResponseTimeInMs: 0
    }

    Promise.all(requests).then(
        responses => responses.forEach(res => {
            if (res.status >= 400 && res.status <= 599 ) {
                stats.failedRequests++;
            } else {
                stats.successRequests++;
            }
        })
    );

    return stats;
}