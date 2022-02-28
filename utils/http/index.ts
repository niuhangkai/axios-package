import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { RequestOptions, Response, RequestMethods, ContentTypeEnum, CreateAxiosRequestConfig } from "../../types/axios";
import { transform } from "./transform";
import qs from "qs";
import { isFunction } from "../is";
import { getToken } from "../cache";
import { againRequest } from "./requestAgainSend";
import { AxiosCanceler } from "./axiosCancel";
class Axios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosRequestConfig;
  constructor(options: CreateAxiosRequestConfig) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors(options);
  }
  /**
   * @description 请求响应拦截器
   */
  private setupInterceptors(opt: CreateAxiosRequestConfig) {
    const axiosCanceler = new AxiosCanceler();
    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 设置token
      // config类型推断有问题，暂时先设置为Record<string,any>
      const conf = config as Record<string, any>;
      // authenticationScheme 是否加前面的那个Bear
      const token = getToken();
      conf.headers.Authorization = opt.authenticationScheme ? `${opt.authenticationScheme}${token}` : token;
      // 自动忽略重复请求,默认会取消重复请求
      const { ignoreCancelToken } = conf.requestOptions;
      const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;
      ignoreCancel && axiosCanceler.addPending(config);
      return config;
    });

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<unknown>) => {
        // 移除请求
        res && axiosCanceler.removePending(res.config);
        return res;
      },
      (error: AxiosError) => {
        // 接口调用失败，自动重试，重试几次失败在调用checkStatus弹出提示
        if (!axios.isCancel(error)) {
          // 请求重发
          againRequest(error, this.axiosInstance);
        }
        return Promise.reject(error);
      }
    );
  }

  get<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestMethods.GET }, options);
  }

  post<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestMethods.POST }, options);
  }

  put<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestMethods.PUT }, options);
  }

  delete<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestMethods.DELETE }, options);
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (contentType !== ContentTypeEnum.FORM_URLENCODED || !Reflect.has(config, "data") || config.method?.toLocaleLowerCase() === RequestMethods.GET) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" })
    };
  }

  request<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf = config;
    // 将每个接口单独传入的配置覆盖掉默认的配置
    const opt = Object.assign({}, this.options.requestOptions, options);
    // 获取到请求前的钩子函数
    const { beforeRequestHook } = this.options.transform;
    // 修改配置
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<unknown, AxiosResponse<Response>>(conf)
        .then((res: AxiosResponse<Response>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}

function createAxios(opt?: Partial<CreateAxiosRequestConfig>) {
  return new Axios(
    {
      timeout: 20 * 1000,
      headers: { "Content-Type": ContentTypeEnum.JSON },
      transform,
      // 请求头认证的是否需要Bear头
      authenticationScheme: "Bear ",
      requestOptions: {
        retry: 0,
        retryDelay: 1000,
        urlPrefix: "/api",
        //  是否加入时间戳
        joinTime: true,
        // 忽略重复请求
        ignoreCancelToken: true
      }
    } || opt
  );
}
export const http = createAxios();
