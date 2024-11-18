import { commonS2SApi } from "api";

import { USER_PROFILE_ENDPOINT } from "utils/constants";
import { getKeyFromCookie } from "utils/helpers";

 const authenticateSSO = async (store:any,cookie:any)=>{
    const ssoToken = getKeyFromCookie("ssoToken",cookie);
    const error:any = new Error('Unauthorized: No SSO token provided');
    error.status = 401;
    if (!ssoToken) {
        return false;
    }
        const headersReqParams = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "com.yatra.tenant.header.tenantId": "3740",
        };
        
        let res = await store.dispatch(commonS2SApi.endpoints.postApi.initiate({
            url: USER_PROFILE_ENDPOINT,
            headersReqParams,
            params: { "ssoToken": ssoToken }
        }));
    
        if (typeof res.data == 'string') {
            res.data = JSON.parse(res.data);
        }
        const userId = res?.data?.corporateUser?.userId;
        if(userId)
            return true;
        else
            return false;
    
}
export default authenticateSSO