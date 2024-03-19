import { test, vi } from 'vitest'
import { HttpLoadTester } from '../HttpLoadTester';
import { HttpClient, HttpResponse } from '../tools/HttpClient.mts';

const successReqMock = vi.fn();
const failedReqMock = vi.fn();
const client: HttpClient = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: async (url: string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200 };
        } else {
            failedReqMock();
            return { status: 500 };
        }

    }
}

test('#execute() runs \'n\' number of request', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    const result = await loadTester.execute("https://example.com", 100);

    expect(result.failedRequests + result.successRequests).equal(100);
})

test('#execute() throws an error when url is incorrect', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("incorrect url", 5))
        .rejects.toThrowError('Incorrect url address');
})

test('#execute() throws an error when \'n\' is less then min value', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("https://example.com", 0))
        .rejects.toThrowError('Incorrect number of requests');
})

test('#execute() throws an error when \'n\' is greater then max value', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("https://example.com", 99999999))
        .rejects.toThrowError('Incorrect number of requests');
})