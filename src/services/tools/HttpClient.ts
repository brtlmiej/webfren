/* v8 ignore start */
export interface HttpClient {
    get: (url: string) => Promise<HttpResponse>;
}

export type HttpResponse = {
    status: number;
    content: string;
}
/* v8 ignore stop */