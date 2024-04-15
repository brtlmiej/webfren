import { test } from 'vitest';
import { AxiosHttpClient } from '../AxiosHttpClient.js'

test('configures internal axios client', ({ expect }) => {
    const client = new AxiosHttpClient();

    expect(client.client).not.undefined;
})