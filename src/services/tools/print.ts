/**
 * Prints message to console.
 */
export function print(message: string = '', indentation: number = 0): void {
    message = ' '.repeat(indentation) + message;
    console.log(message);
}