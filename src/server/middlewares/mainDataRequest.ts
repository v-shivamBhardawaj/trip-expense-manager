import { commonS2SApi } from "api";
import { CONTENT_TYPE, URL_PARAMS } from "constants/commonConstants";
import { setError, setNoResultFound } from "store/Error/ErrorSlice";
import { setLoaderData } from "store/Loader/LoaderSlice";
import { setMainData } from "store/MainData/MainDataSlice";
import { MAIN_DATA_URL } from "utils/constants";

const { appLogger } = require('../../utils/logger');
// Function to extract parameters from query string and construct dynamic params object
const constructDynamicParams = (query: any, paramNames: any) => {
    const urlParams = new URLSearchParams(query);
    const dynamicParams: any = {};
    paramNames.forEach((paramName: any) => {
        const paramValue = urlParams.get(paramName);
        if (paramValue !== null) {
            dynamicParams[paramName] = paramValue;
        }
    });
    return dynamicParams;
};

const mainDataRequest = async (
    store: any,
    cookie: any,
    query: any,
) => {
    let headersReqParams = {
        "content-type": CONTENT_TYPE.APP_JSON,
        cookie: cookie,
        "Access-Control-Allow-Origin": "*",
    };

    const paramNames = URL_PARAMS;
    // Construct dynamic params object using the reusable function
    const dynamicParams = constructDynamicParams(query, paramNames);

    store
        .dispatch(
            commonS2SApi.endpoints.postApi.initiate({
                headersReqParams,
                url: MAIN_DATA_URL,
                params: dynamicParams,
            })
        )
        .then((res: any) => {
            try {
                let mainData = res.data;
                if (typeof res.data === "string") {
                    mainData = JSON.parse(mainData);
                } else {
                    store.dispatch(setNoResultFound());
                }
                store.dispatch(setMainData(mainData));
                store.dispatch(setLoaderData(mainData.requestParams));
            } catch (e) {
                store.dispatch(setError())
                return false
            }
        });
    appLogger.info(`URL --> ${MAIN_DATA_URL}----- Params--->${JSON.stringify(dynamicParams)}`);
    return Promise.all(
        store.dispatch(commonS2SApi.util.getRunningQueriesThunk())
    );
};
export { mainDataRequest };
