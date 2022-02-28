import type { RouteMeta } from "vue-router";
export interface RouteItem {
  path: string;
  component: unknown;
  meta: RouteMeta;
  name?: string;
  alias?: string | Array<string>;
  redirect?: string;
  caseSensitive?: boolean;
  children?: Array<RouteItem>;
}

/**
 * @description: Get menu return value
 */
export type GetMenuListResponsetModel = RouteItem[];

/**
 * 名字中带有request的是请求参数类型定义
 * @param {Number} pageSize 加载分页多少
 * @param {Number} pageIndex 分页数
 */
export interface PageRequestParams {
  pageSize: number;
  pageIndex: number;
}
/**
 * 名字中带有response的是响应参数类型定义,这里写清楚每个参数是做什么的
 * @param {Number} pageSize 加载分页多少
 * @param {Number} pageIndex 分页数
 * @param {Number} total // 总共有几页
 * @param {Array<Record<string, unknown>>} 返回的数据
 *
 */
export interface GetListResponseModel {
  pageSize: number;
  pageIndex: number;
  total: number;
  data: Array<Record<string, unknown>>;
}
/**
 * @param {String} username // 用户名
 * @param {String} password //密码
 */
export interface LoginRequestParams {
  username: string;
  password: string;
}

export interface GetLoginResponseModel {
  data: {
    name: string;
    token: string;
  };
  code: number;
  message: string;
}
