/**
 * Represents command available from CLI.
 */
export type Command = {
    readonly name: string;
    readonly description: string;
    readonly arguments: ReadonlyArray<Argument>;
    readonly action: (...args: unknown[]) => void | Promise<void>;
}

/**
 * Represents declaration of __Command__ argument.
 */
export type Argument = {
    readonly name: string;
    readonly description: string;
    readonly required: boolean;
}