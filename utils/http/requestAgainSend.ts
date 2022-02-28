import { CreatAxiosResponse } from "@/types/axios";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { checkStatus } from "./checkStatus";
/**
 * 请求重试功能
 */
const RETRY_CODE = "5";
const DEFAULT_NUM = 0;
export function againRequest(error: AxiosError, axios: AxiosInstance): Promise<AxiosInstance | AxiosResponse<unknown, unknown>> {
  const config = error?.config as CreatAxiosResponse;
  const { retry, retryDelay } = config.requestOptions;
  const retryNum = retry || DEFAULT_NUM;
  const statusCode = error.response?.status?.toString().charAt(0);
  // 没有配置的直接返回
  if (retryNum === DEFAULT_NUM || !error.config) {
    checkStatus(error?.response?.status || 1000);
    return Promise.reject(error);
  }
  // 5xx开头的错误码在重试才有意义
  if (statusCode !== RETRY_CODE) return Promise.reject(error);
  // 记录一个变量判断当前重新发送了几次
  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= retryNum) {
    checkStatus(error?.response?.status || 1000);
    return Promise.reject(error);
  }
  // 重试次数
  config.__retryCount += 1;
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, retryDelay || 1000);
  });
  // 重新发起axios请求
  return backoff.then(() => {
    return axios(config);
  });
}
