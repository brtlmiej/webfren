import { test, beforeEach, vi } from 'vitest';
import { print } from '../print';

const consoleLogStub = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('console', {
        log: consoleLogStub
    });
});

test('print() should log provided message', ({ expect }) => {
    print('lorem ipsum');
    expect(consoleLogStub).toBeCalledWith('lorem ipsum');
});

test('print() should log indentation as number of spaces', ({ expect }) => {
    print('lorem ipsum', 5);
    expect(consoleLogStub).toBeCalledWith('     lorem ipsum');
});

test('print() should log empty string by default', ({ expect }) => {
    print();
    expect(consoleLogStub).toBeCalledWith('');
});