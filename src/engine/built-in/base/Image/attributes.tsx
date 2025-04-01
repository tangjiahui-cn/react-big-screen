/**
 * 属性配置页面
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS = {
  src: "https://ts3.cn.mm.bing.net/th?id=OIP-C.3r1vguZyWFUJ80A2Nf2k3AHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
};

export interface ImageOptions {
  src: string; // 图片访问地址
}

export default createAttributesByConfig<ImageOptions>(
  [
    {
      key: "src",
      label: "地址",
      component: "textarea",
      options: {
        autoSize: {
          minRows: 5,
        },
      },
    },
  ],
  DEFAULT_OPTIONS,
);
