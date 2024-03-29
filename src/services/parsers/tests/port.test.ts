import { test } from "vitest";
import { parseServerPort } from '../port'

test('parseServerPort() throws error if port number is less then 1024', ({ expect }) => {
    expect(() => parseServerPort(1023))
        .toThrowError('Incorrect port number. Port number must be >= 1024 and <= 65353');
});

test('parseServerPort() throws error if port number is greater then 65353', ({ expect }) => {
    expect(() => parseServerPort(65354))
        .toThrowError('Incorrect port number. Port number must be >= 1024 and <= 65353');
});