import { commonS2SApi } from 'api';
import { HEADER_URL } from 'utils/constants';
import { getKeyFromCookie, urlFormatter } from 'utils/helpers';
// import { getKeyFromCookie, urlFormatter } from 'utils/helpers';

const headerRequest = async (store: any, cookie: any, params: any, setHeaderValue: any) => {
  let ssoToken = getKeyFromCookie('ssoToken',cookie);
  let userType = getKeyFromCookie('userType',cookie);

  const headerUrlWithSsoToken = urlFormatter(HEADER_URL,[ssoToken,userType]);
  store.dispatch(commonS2SApi.endpoints.getApi.initiate({ url: headerUrlWithSsoToken, params })).then((res: any) => {

    setHeaderValue('header', res.data);
  });
  return Promise.all(store.dispatch(commonS2SApi.util.getRunningQueriesThunk()));
};
export { headerRequest };