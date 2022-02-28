import { AxiosTransform, RequestMethods } from "@/types/axios";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
export const transform: AxiosTransform = {
  beforeRequestHook: (config, options) => {
    // 统一get和post传递参数
    const { urlPrefix /**retry, joinTime, ignoreCancelToken*/ } = options;
    // 拼接前缀
    config.requestOptions = options;
    if (urlPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toLocaleLowerCase() === RequestMethods.GET || config.method?.toUpperCase() === RequestMethods.DELETE) {
      config.params = params;
    } else if (config.method?.toLocaleLowerCase() === RequestMethods.POST || config.method?.toUpperCase() === RequestMethods.PUT) {
      config.data = params || data;
      config.params = undefined;
    }
    return config;
  }
};
