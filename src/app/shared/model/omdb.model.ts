import { MoviePreview } from "./moviePreview.model";

export interface ResponseData<T> {
    Response: string,
    Search: T[],
    totalResult: string,
}