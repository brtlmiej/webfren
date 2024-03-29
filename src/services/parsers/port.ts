export function parseServerPort(port: number): number {
    // Port numbers can run from 0 to 65353. Port numbers from 0 to 1023 are reserved
    // for common TCP/IP applications and are called well-known ports.
    const min = 1024, max = 65353;
    if (port < min || port > max) {
        throw new Error(`Incorrect port number. Port number must be >= ${min} and <= ${max}`);
    }

    return port;
}