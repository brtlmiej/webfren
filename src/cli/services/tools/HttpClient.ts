export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpClient {
    get: (url: string) => Promise<HttpResponse>;
    post: (url: string, data: Record<string, unknown> | string) => Promise<HttpResponse>;
    put: (url: string, data: Record<string, unknown> | string) => Promise<HttpResponse>;
    delete: (url: string) => Promise<HttpResponse>;
    request: (url: string, method: HttpMethod, data?: Record<string, unknown> | string) => Promise<HttpResponse>;
}

export type HttpResponse = {
    status: number;
    data: string;
    responseTimeInMs: number;
}