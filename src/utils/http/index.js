import Request from "luch-request";

import { showTimeOutToast } from "../loading.js";

import { getMobileName, getUuid, getOsType } from "../infoMobile.js";

import { omit } from "lodash-es";

import Env, { TITLE } from "@/config/env/index.js";
const isDev = process.env.NODE_ENV === "development" ? true : false;

/**
 * 2019-12-10 创建请求示例
 */
const http = new Request();
http.setConfig((config) => {
  /* 设置全局配置 */
  if (isDev) {
    config.baseURL = Env.DEV_BASE_API;
  } else {
    config.baseURL = Env.PROD_BASE_API;
  }
  config.header = {
    "content-type": "application/json;charset=UTF-8",
    // #ifdef APP-PLUS
    "X-Device-Name": getMobileName(),
    "X-Device-No": getUuid(),
    "X-Device-Type": getOsType(),
    // #endif
  };

  return config;
});

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  // return statusCode === 200
  return statusCode >= 200 && statusCode <= 300;
};

// 请求之前拦截器
http.interceptors.request.use((config) => {
  _reqlog(config);
  config.header = {
    ...config.header,
    requestId: new Date().getTime(),
  };

  if (config.method == "POST") {
    config.header["content-type"] = "application/x-www-form-urlencoded";
  }

  return config;
});

// 必须使用异步函数，注意
// 请求之后拦截器
http.interceptors.response.use(
  async (response) => {
    _reslog(response);
    if (typeof response.data == "string") {
      response.data = JSON.parse(response.data);
    }

    if (response.data.suc != 1) {
      // 服务端返回的状态码不等于true，则reject()
      const errorMsg = response.data.message || response.data.msg;
      showTimeOutToast(errorMsg);
      return Promise.reject(response);
    }

    return response.data.obj ?? {};
  },
  (response) => {
    // 请求错误 针对不同的状态码做判断
    _reslog(response);
    if (response.statusCode == 401) {
      if (isDev) {
        //测试环境处理方式
        showTimeOutToast("开发阶段: Token过期");
      } else {
        //正式环境不在小程序内弹出登录，应该由主程序进行登录
        showTimeOutToast("Token过期");
      }
    } else if (JSON.stringify(response).indexOf("timeout") !== -1) {
      showTimeOutToast("网络请求超时");
      throw Error("网络请求超时");
    } else if (JSON.stringify(response).indexOf("Network Error") !== -1) {
      showTimeOutToast("网络请求错误");
      throw Error("网络请求错误");
    } else {
      const errorMsg = response.data?.message || response.data?.msg;
      if (errorMsg) {
        showTimeOutToast(errorMsg);
        throw Error(errorMsg);
      } else {
        showTimeOutToast("异常错误");
        throw Error("异常错误");
      }
    }
    return response;
  }
);

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "【" + TITLE + "】 地址：" + JSON.stringify(omit(req, ["data", "params"]))
    );
    if (req.data) {
      console.log(
        "【" + TITLE + "】 请求参数data：" + JSON.stringify(req.data)
      );
    }
    if (req.params) {
      console.log(
        "【" + TITLE + "】 请求参数params：" + JSON.stringify(req.params)
      );
    }
  }
  //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  let _statusCode = res.statusCode;
  if (process.env.NODE_ENV === "development") {
    console.log(
      "【" + TITLE + "】 地址：" + JSON.stringify(omit(res, ["data"]))
    );
    console.log("【" + TITLE + "】 响应结果：" + JSON.stringify(res.data));
  }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
}

export { http };
