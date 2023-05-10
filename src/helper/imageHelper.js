import { IMAGE_URL } from "@/config/env/index";

export function getUrl(path, baseURL = "xcxio/img") {
  return `${IMAGE_URL}/${baseURL}/${path}`;
}
