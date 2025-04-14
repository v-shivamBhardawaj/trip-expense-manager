import { buildCreateApi, coreModule, reactHooksModule, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isServer } from 'utils';
import { PROD_BASE_URL, TIMEOUT } from "../../utils/constants";


let createApiFunction = createApi;

/*
For data prefetching during SSR we need to use a modified createApi function.
You can remove this modification if you do not need this api to be used on the server.
*/
if (isServer) {
  createApiFunction = buildCreateApi(
    coreModule(),
    // eslint-disable-next-line camelcase
    reactHooksModule({ unstable__sideEffectsInRender: true }),
  );
}

//GET Api S2S
export const commonS2SApi = createApiFunction({
  reducerPath: 'commonS2SApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PROD_BASE_URL,
  }),
  endpoints: builder => ({
    getApi: builder.query<any, any>({
      query: ({ headersReqParams, url, params, timeout }) => {
        console.log(url);
        return {
          url,
          headers: headersReqParams,
          params: params,
          timeout: timeout || TIMEOUT,
          responseHandler: (response: { text: () => any }) => response.text()
        }
      },
    }),
    postApi: builder.query<any, any>({
      query: ({ headersReqParams, url, params, timeout }) => {
        return {
          url,
          method: 'POST',
          headers: headersReqParams,
          'body': params,
          timeout: timeout || TIMEOUT,
          responseHandler: (response: { text: () => any }) => response.text()
        }
      },
    }),
    postApiWithTenantId: builder.query<any, any>({
      query: ({ headersReqParams, url, params, timeout }) => {
        return {
          url,
          method: 'POST',
          headers: headersReqParams,
          'body': params,
          timeout: timeout || TIMEOUT,
          responseHandler: (response: { text: () => any }) => response.text()
        }
      },
    })
  })
});

export const commonApi = createApiFunction({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: builder => ({
    getApi: builder.query<any, any>({
      query: ({ headersReqParams, url, params, timeout }) => {
        return {
          url,
          headers: headersReqParams,
          params: params,
          timeout: timeout || TIMEOUT
        }
      },
    }),
    postApi: builder.query<any, any>({
      query: ({ headersReqParams, url, data, timeout }) => {
        return {
          url,
          method: 'POST',
          headers: headersReqParams,
          'body': data,
          timeout: timeout || TIMEOUT
        }
      },
    }),
    postApiNoBody: builder.query<any, any>({
      query: ({ headersReqParams, url, data, timeout }) => {
        return {
          url,
          method: 'POST',
          headers: headersReqParams,
          params: data,
          timeout: timeout || TIMEOUT
        }
      },
    })
  })
})