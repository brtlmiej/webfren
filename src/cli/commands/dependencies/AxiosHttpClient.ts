import axios, { AxiosResponse, AxiosStatic, Timing } from "axios";
import { HttpClient, HttpResponse } from "../../services/tools/HttpClient.js";

/**
 * Implementation of HttpClient using axios library
 */
export class AxiosHttpClient implements HttpClient {
    readonly client: AxiosStatic;

    constructor() {
        this.client = configureAxiosClient();
    }

    async get(url: string): Promise<HttpResponse> {
        try {
            const axiosRes = await axios.get(url);
            return {
                ...axiosRes,
                responseTimeInMs: axiosRes.timing?.elapsedTimeInMs ?? 0
            }
        } catch {
            return {
                status: 500,
                data: 'Unknown error',
                responseTimeInMs: 0
            };
        }
    };

}

function configureAxiosClient(): AxiosStatic {
    axios.interceptors.request.use(request => {
        request.timingStartInMs = Date.now();
        return request;
    });

    axios.interceptors.response.use(response => {
        response.timing = getResponseTiming(response);

        return response;
    }, error => {
        if (error.response) {
            error.response.timing = getResponseTiming(error.response);
        };

        return Promise.reject(error);
    });

    return axios;
}

function getResponseTiming(response: AxiosResponse): Timing {
    let { timingStartInMs: startInMs } = response.config;
    const endInMs = Date.now();

    if (startInMs === undefined) {
        startInMs = endInMs
    }

    const elapsedTimeInMs = Math.round(endInMs - startInMs);

    return {
        startInMs,
        endInMs,
        elapsedTimeInMs
    };
};