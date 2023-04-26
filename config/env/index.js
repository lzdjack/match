/**
 * 系统全局配置
 */
export default {

	/**
	 * 开发环境api
	 */
	DEV_BASE_API: 'https://tgcid.wbyun.net',

	/**
	 * 生产环境api
	 */
	PROD_BASE_API: 'https://tgcid.wbyun.net',
}

// 百度云api
export const BAIDU_YUN = 'https://aip.baidubce.com'

// orc key
export const GRANT_TYPE = 'client_credentials';
export const CLIENT_ID = 'yNvGkxjbrIPsRm6lOENDM54M';
export const CLIENT_SECRET = 'P6za0mUtmmuXfU2uZnxDTcfvCZQ0agUn'

//data: {error}

export const isDev = process.env.NODE_ENV === "development" ? true : false;

// 项目title
export const TITLE = '大运河参赛作品展示'