import { http } from "@/utils/http/index.js";

const CSZP_LIST = "/xcxio/data.aspx";
const CSZP_DETAIL = "/xcxio/data.aspx";
const PHONE_YZ = "/xcxio/data.aspx";
const ENROLL = "/xcxio/data.aspx";

/**
 * @description: 获取手机验证码
 * @param params
 * @return: {*}
 * @author: *
 */
export function getPhoneApi(phone) {
  return http.get(PHONE_YZ, {
    params: {
      act: "getcode",
      pho: phone,
    },
  });
}

/**
 * @description: 报名
 * @param params
 * @return: {*}
 * @author: *
 */
export async function enrollApi(data) {
  return http.post(ENROLL, {
    ...data,
    act: "savemydata",
    uid: 101,
  });
}

/**
 * @description: 参赛作品列表
 * @param {*}
 * @return: {*}
 * @author: *
 */
export function queryWorksListApi(pageNo, tid) {
  return http.get(CSZP_LIST, {
    params: {
      act: "list",
      pid: pageNo,
      tid,
    },
  });
}

/**
 * @description:参赛作品详细信息
 * @param {*}
 * @return: {*}
 * @author: *
 */
export function findByIdWorksDetailApi(id) {
  return http.get(CSZP_DETAIL, {
    params: {
      act: "getpbyid",
      pid: id,
    },
  });
}
