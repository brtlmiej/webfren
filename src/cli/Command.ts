/**
 * Represents command available from CLI.
 */
export type Command = {
    readonly name: string;
    readonly description: string;
    readonly arguments: ReadonlyArray<Argument>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly action: (...args: any[]) => void | Promise<void>;
}

/**
 * Represents declaration of __Command__ argument.
 */
export type Argument = {
    readonly name: string;
    readonly description: string;
    readonly required: boolean;
}