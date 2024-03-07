import { test as test, vi } from 'vitest'
import { HttpClient, HttpLoadTester, HttpResponse } from '../HttpLoadTester';

const successReqMock = vi.fn();
const failedReqMock = vi.fn()
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

    expect(result.failedRequests + result.successRequests).equal(100)
})