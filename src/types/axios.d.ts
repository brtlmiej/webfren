import 'axios';

declare module 'axios' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    export interface AxiosRequestConfig<T = any> extends Axios.AxiosRequestConfig {
        timingStartInMs?: number;
    }

    export type Timing = {
        endInMs: number,
        startInMs: number,
        elapsedTimeInMs: number,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    export interface AxiosResponse<T = any> extends Axios.AxiosResponse {
        timing?: Timing
    }
}