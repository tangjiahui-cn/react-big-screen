/**
 * request
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
import request from "umi-request";

request.interceptors.request.use((url, options) => {
  options.useCache = true; // 启用接口缓存
  options.ttl = 2000; // 缓存时间 2s
  return {
    url,
    options,
  };
});

export default request;
