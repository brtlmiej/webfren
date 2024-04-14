/* v8 ignore start */
export interface HttpClient {
    get: (url: string) => Promise<HttpResponse>;
}

export type HttpResponse = {
    status: number;
    data: string;
    responseTimeInMs: number;
}
/* v8 ignore stop */