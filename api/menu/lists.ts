import { http } from "@/utils/http";
import { GetMenuListResponsetModel, PageRequestParams, GetListResponseModel, LoginRequestParams, GetLoginResponseModel } from "./types/listsModel";

enum Api {
  GetMenuList = "/getMenuList", // 获取主页列表
  GetList = "/lists", // 获取分页
  Login = "/login",
  Delete = "/remove"
}

/**
 * @description  get请求示例，获取主页列表
 * @return {Promise<GetMenuListResponsetModel>}
 */

export const getMenuList = (): Promise<GetMenuListResponsetModel> => {
  return http.get<GetMenuListResponsetModel>(
    {
      url: Api.GetMenuList
    },
    {
      urlPrefix: "/api"
    }
  );
};

/**
 * @description  get传递参数 请求示例，获取主页列表
 * @return {Promise<GetListResponseModel>}
 */

export const getList = (params: PageRequestParams): Promise<GetListResponseModel> => {
  return http.get<GetListResponseModel>(
    {
      url: Api.GetList,
      params
    },
    {
      urlPrefix: "/api"
    }
  );
};

/**
 * get传递数组参数示例
 */

/**
 * post 示例
 */
export const login = (params: LoginRequestParams): Promise<GetLoginResponseModel> => {
  return http.post<GetLoginResponseModel>(
    {
      url: Api.Login,
      params
    },
    {
      urlPrefix: "/ap0i",
      retry: 3,
      retryDelay: 2000,
      ignoreCancelToken: true
    }
  );
};

export const remove = (params: PageRequestParams): Promise<Response> => {
  return http.delete<Response>(
    {
      url: Api.Delete,
      params
    },
    {
      urlPrefix: "/api",
      retry: 5
    }
  );
};
