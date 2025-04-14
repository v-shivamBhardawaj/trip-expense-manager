export interface BaseResponse {
    message: string;
    status: 'SUCCESS' | 'ERROR';
    data?: any;
    error?: any;
    code?:number;
}