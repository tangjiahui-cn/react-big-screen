/**
 * 属性配置
 *
 * @author tangjiahui
 * @date 2025/2/6
 */
import { ComponentNodeType } from "@/engine";
import EditList from "./components/EditList";
import { createAttributesByConfig } from "@/engine";

export const DEFAULT_OPTIONS: CarouselOptions = {
  bordered: true,
  borderColor: "#ccc", // 边框颜色
};

export interface CarouselOptions {
  children?: ComponentNodeType[]; // 子元素
  bordered?: boolean; // 是否显示边框
  borderColor?: string; // 边框颜色
  count?: number; // 面板数量
}

export default createAttributesByConfig<CarouselOptions>(
  [
    { key: "bordered", label: "边框", component: "checkbox" },
    { key: "borderColor", label: "边框颜色", component: "colorPicker" },
    {
      key: "_",
      label: "面板",
      component: ({ useExtra }) => {
        const { componentNode, onChangeComponentNode } = useExtra();
        return (
          <EditList
            value={componentNode.currentPanelId}
            onSelect={(currentPanelId) => {
              onChangeComponentNode({
                currentPanelId,
              });
            }}
            list={componentNode.panels}
            onChange={(panels) => {
              onChangeComponentNode({
                panels: [...panels],
              });
            }}
          />
        );
      },
    },
  ],
  DEFAULT_OPTIONS,
);
