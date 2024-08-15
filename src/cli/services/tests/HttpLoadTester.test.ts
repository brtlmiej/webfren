import { test, vi } from 'vitest'
import { HttpLoadTester } from '../HttpLoadTester';
import { HttpClient, HttpResponse } from '../tools/HttpClient';

const successReqMock = vi.fn();
const failedReqMock = vi.fn();
const client: HttpClient = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: async (url: string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200, data: "", responseTimeInMs: 10 };
        } else {
            failedReqMock();
            return { status: 500, data: "", responseTimeInMs: 10 };
        }

    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    post: async (url: string, data: Record<string, unknown> | string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200, data: "", responseTimeInMs: 10 };
        } else {
            failedReqMock();
            return { status: 500, data: "", responseTimeInMs: 10 };
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    put: async (url: string, data: Record<string, unknown> | string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200, data: "", responseTimeInMs: 10 };
        } else {
            failedReqMock();
            return { status: 500, data: "", responseTimeInMs: 10 };
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: async (url: string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200, data: "", responseTimeInMs: 10 };
        } else {
            failedReqMock();
            return { status: 500, data: "", responseTimeInMs: 10 };
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: async (url: string, method: string, data?: Record<string, unknown> | string): Promise<HttpResponse> => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand === 2) {
            successReqMock();
            return { status: 200, data: "", responseTimeInMs: 10 };
        } else {
            failedReqMock();
            return { status: 500, data: "", responseTimeInMs: 10 };
        }
    }
}

test('#execute() runs \'n\' number of GET request', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    const result = await loadTester.execute("https://example.com", 100, 'GET');

    expect(result.failedRequests + result.successRequests).equal(100);
})

test('#execute() runs \'n\' number of POST request', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    const result = await loadTester.execute("https://example.com", 100, 'POST');

    expect(result.failedRequests + result.successRequests).equal(100);
})

test('#execute() runs \'n\' number of PUT request', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    const result = await loadTester.execute("https://example.com", 100, 'PUT');

    expect(result.failedRequests + result.successRequests).equal(100);
})

test('#execute() runs \'n\' number of DELETE request', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    const result = await loadTester.execute("https://example.com", 100, 'DELETE');

    expect(result.failedRequests + result.successRequests).equal(100);
})

test('#execute() throws an error when url is incorrect', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("incorrect url", 5, 'GET'))
        .rejects.toThrowError('Incorrect url address');
})

test('#execute() throws an error when \'n\' is less then min value', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("https://example.com", 0, 'GET'))
        .rejects.toThrowError('Incorrect number of requests');
})

test('#execute() throws an error when \'n\' is greater then max value', async ({ expect }) => {
    const loadTester = new HttpLoadTester(client);

    expect(loadTester.execute("https://example.com", 99999999, 'GET'))
        .rejects.toThrowError('Incorrect number of requests');
})