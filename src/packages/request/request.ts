/**
 * request
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
import request from "umi-request";

request.interceptors.request.use((url, options) => {
  // 是否启用接口缓存
  if (options?.useCache === undefined) {
    options.useCache = true;

    // 设置接口缓存时间
    if (options.ttl === undefined) {
      options.ttl = 2000;
    }
  }

  return {
    url,
    options,
  };
});

export default request;
