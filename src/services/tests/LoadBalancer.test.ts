import { test } from 'vitest';
import { LoadBalancer } from '../LoadBalancer';
import { HttpClient, HttpResponse } from '../tools/HttpClient';

const client: HttpClient = {
    get: async (url: string): Promise<HttpResponse> => {
        return { status: 200, content: url };
    }
}

test('registers provided server addresses', ({ expect }) => {
    const addresses = ['http://127.0.0.1:8000', 'http://127.0.0.1:8001'] ;
    const lb = new LoadBalancer(9000, addresses, client);

    expect(lb.serverAddresses).deep.equal(addresses.map(a => new URL(a)));
})