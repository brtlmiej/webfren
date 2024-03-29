/* v8 ignore start */
export type HttpClient = {
    get: (url: string) => Promise<HttpResponse>;
}

export type HttpResponse = {
    status: number;
}
/* v8 ignore stop */