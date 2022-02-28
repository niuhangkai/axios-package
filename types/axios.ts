import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosTransform {
  beforeRequestHook: (config: RequestOptions & { requestOptions?: RequestOptions }, options: RequestOptions) => AxiosRequestConfig;
}

export interface CreatAxiosResponse extends AxiosResponse {
  requestOptions: RequestOptions;
  __retryCount: number;
}

export interface RequestOptions extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
  urlPrefix?: string;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
}
/**
 * @param {Number} status 0:成功 -1:其他错误
 */
export interface Response {
  status: number;
  message: string;
  data: unknown;
}

export enum RequestMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8"
}

export interface CreateAxiosRequestConfig extends AxiosRequestConfig {
  authenticationScheme: string;
  transform: AxiosTransform;
  requestOptions: RequestOptions;
}
