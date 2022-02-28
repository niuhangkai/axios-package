export enum ExceptionalCode {
  ERROR = "请求错误(400)",
  UNAUTHORIZED = "未授权,请登录(401)",
  ACCESS_DENIED = "拒绝访问(403)",
  NOT_FOUND = "请求地址出错(404)",
  NOT_ALLOW = "请求方法未允许(405)",
  TIME_OUT = "请求超时(408)",
  SERVER_ERROR = "服务器内部错误(500)",
  SERVER_ERROR1 = "服务未实现(501)",
  NETWORK_ERROR = "网络错误(502)",
  SERVER_UNAVAILABLE = "服务不可用(503)",
  GETWAY_TIMEOUT = "网关超时(504)",
  HTTP_VERSION_ERROR = "HTTP版本不受支持(505)",
  UNKNOWN_ERROR = "未知错误"
  // Gateway timeout
}

export function checkStatus(status: number, msg?: string): void {
  let errMessage = "";
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // 自定义401逻辑处理
      // userStore.setToken(undefined);
      // errMessage = msg || t('sys.api.errMsg401');
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true);
      // } else {
      //   userStore.logout(true);
      // }
      break;
    case 403:
      errMessage = ExceptionalCode.ACCESS_DENIED;
      break;
    // 404请求不存在
    case 404:
      errMessage = ExceptionalCode.NOT_FOUND;
      break;
    case 405:
      errMessage = ExceptionalCode.NOT_ALLOW;
      break;
    case 408:
      errMessage = ExceptionalCode.TIME_OUT;
      break;
    case 500:
      errMessage = ExceptionalCode.SERVER_ERROR;
      break;
    case 501:
      errMessage = ExceptionalCode.SERVER_ERROR1;
      break;
    case 502:
      errMessage = ExceptionalCode.NETWORK_ERROR;
      break;
    case 503:
      errMessage = ExceptionalCode.SERVER_UNAVAILABLE;
      break;
    case 504:
      errMessage = ExceptionalCode.GETWAY_TIMEOUT;
      break;
    case 505:
      errMessage = ExceptionalCode.HTTP_VERSION_ERROR;
      break;
    default:
      errMessage = ExceptionalCode.UNKNOWN_ERROR;
      break;
  }
  alert("失败提示");
  // 自定义弹窗逻辑
  // if (errMessage) {
  //   if (errorMessageMode === 'modal') {
  //     createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
  //   } else if (errorMessageMode === 'message') {
  //     error({ content: errMessage, key: `global_error_message_status_${status}` });
  //   }
  // }
}
