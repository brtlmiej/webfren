import { test } from 'vitest';
import { AxiosHttpClient } from '../AxiosHttpClient.js'

test('configures internal axios client', ({ expect }) => {
    const client = new AxiosHttpClient();

    expect(client.client).not.undefined;
});

test('#get() sends GET request', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(res.status).toBe(200);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBeGreaterThan(0);
});

test('#post() sends POST request', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
    });

    expect(res.status).toBe(201);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBeGreaterThan(0);
});

test('#put() sends PUT request', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.put('https://jsonplaceholder.typicode.com/posts/1', {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
    });

    expect(res.status).toBe(200);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBeGreaterThan(0);
});

test('#delete() sends DELETE request', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(res.status).toBe(200);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBeGreaterThan(0);
});

test ('#request() sends request with specified method', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.request('https://jsonplaceholder.typicode.com/posts/1', 'GET');

    expect(res.status).toBe(200);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBeGreaterThan(0);
});

test('#get() returns error response when request fails', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.get('https://jsonplaceholder.typicode.com/posts/100000');

    expect(res.status).toBe(500);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBe(0);
});

test('#post() returns error response when request fails', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.post('https://jsonplaceholder.typicode.com/posts/1', {
        title: 'foo',
        body: 'bar',
        userId: 100000
    });

    expect(res.status).toBe(500);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBe(0);
});

test('#put() returns error response when request fails', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.put('https://jsonplaceholder.typicode.com/posts/100000', {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
    });

    expect(res.status).toBe(500);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBe(0);
});

test ('#request() returns error response when request fails', async ({ expect }) => {
    const client = new AxiosHttpClient();
    const res = await client.request('https://jsonplaceholder.typicode.com/posts/100000', 'GET');

    expect(res.status).toBe(500);
    expect(res.data).not.undefined;
    expect(res.responseTimeInMs).toBe(0);
});