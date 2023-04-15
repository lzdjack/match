import {
	http
} from "@/utils/http/index.js"
import {
	isArray
} from 'lodash-es'
import {
	data
} from "../uni_modules/uview-ui/libs/mixin/mixin";

const CSZP_LIST = '/cszplb';
const CSZP_DETAIL = '/cszpxx'
const PHONE_ZC = '/sjyzm';
const PHONE_YZ = '/yzmyz';
const ENROLL = '/csyhbm';

/**
 * @description: 获取手机验证码
 * @param params
 * @return: {*}
 * @author: *
 */
export function getPhoneApi(phone) {
	return http.post(PHONE_ZC, data: {
		phone
	})
}

/**
 * @description: 验证手机验证码
 * @param params
 * @return: {*}
 * @author: *
 */
export function yzPhoneApi(phone) {
	return http.post(PHONE_YZ, data: {
		phone
	})
}

/**
 * @description: 报名
 * @param params
 * @return: {*}
 * @author: *
 */
export async function enrollApi(data) {
	return http.get(ENROLL, data)
}

/**
 * @description: 参赛作品列表
 * @param {*}
 * @return: {*}
 * @author: *
 */
export function queryWorksListApi(data) {
	return http.get(CSZP_LIST, data)
}

/**
 * @description:参赛作品详细信息
 * @param {*}
 * @return: {*}
 * @author: *
 */
export function findByIdWorksDetailApi() {
	return http.post(CSZP_DETAIL, data)
}