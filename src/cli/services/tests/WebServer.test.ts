import { test, vi } from 'vitest';
import { WebServer, Endpoint } from '../WebServer';
import { getAssetPath } from './__utils';

test('throws error if port number is less then 1024', ({ expect }) => {
    expect(() => new WebServer(1023, []))
        .toThrowError('Incorrect port number. Port number must be >= 1024 and <= 65353');
});

test('throws error if port number is greater then 65353', ({ expect }) => {
    expect(() => new WebServer(65354, []))
        .toThrowError('Incorrect port number. Port number must be >= 1024 and <= 65353');
});

test('registers endpoints based on provided config', ({ expect }) => {
    const server = new WebServer(1024, [
      { route: '/test', contentFilePath: getAssetPath('test.html') }  
    ]);

    expect(server.endpoints).deep.equal(
        [
            { route: '/test', content: '<h1>Hello</h1>', fileName: 'test.html' }
        ] satisfies Array<Endpoint>
    );
});

test('creates http server', ({ expect }) => {
    vi.mock('http', () => ({
        default: { createServer: () => ({ wasMocked: true }) }
    }));

    const server = new WebServer(1024, [
      { route: '/test', contentFilePath: getAssetPath('test.html') }  
    ]);

    expect(server.server).deep.eq({ wasMocked: true });
    vi.clearAllMocks();
});