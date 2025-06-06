import { DEV_SERVER_PORT, IS_DEV, DEV_SERVER_HTTPS_PORT, APP_NAME } from '_webpack/constants';
export const SERVER_PORT: number = IS_DEV ? DEV_SERVER_PORT : 3000;
export const IS_RENDER_TO_STREAM: boolean = true;
export const DEV_HTTPS_SERVER: Number = DEV_SERVER_HTTPS_PORT;
export const STATS_FILE_PATH: string = `./${APP_NAME}/stats.json`;
export const KEY_FILE_PATH: string = IS_DEV ? './config/dev.yatra.com-key.pem' : '';
export const CERT_FILE_PATH: string = IS_DEV ? './config/dev.yatra.com.pem' : '';
export const mongoURI = "mongodb+srv://shivam19bhard:Yatra1234@cluster1.g3xg4p1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"



export const ERROR_CODE = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
}