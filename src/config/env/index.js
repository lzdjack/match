/**
 * 系统全局配置
 */
export default {
  /**
   * 开发环境api
   */
  DEV_BASE_API: "https://tgcid.wbyun.net",

  /**
   * 生产环境api
   */
  PROD_BASE_API: "https://tgcid.wbyun.net",
};

export const IMAGE_URL = "https://tgcid.wbyun.net";

export const isDev = process.env.NODE_ENV === "development" ? true : false;

// 项目title
export const TITLE = "大运河参赛作品展示";
