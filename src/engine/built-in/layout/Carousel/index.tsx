/**
 * Carousel（走马灯）
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Carousel } from "antd";
import engine, { ComponentProps, EventData } from "@/engine";
import styles from "./index.module.less";
import { CarouselOptions } from "./attributes";
import classNames from "classnames";
import React, { RefObject, useEffect, useMemo, useRef } from "react";
import { CarouselRef } from "antd/lib/carousel";
import { useUnmount } from "ahooks";

type TriggerKeys = "onChange" | "onClick";
type ExposeKeys = "changePanel";

export const triggers: EventData<TriggerKeys>[] = [
  { label: "面板切换", value: "onChange" },
  { label: "面板点击", value: "onClick" },
];
export const exposes: EventData<ExposeKeys>[] = [{ label: "切换面板", value: "changePanel" }];
export default function (props: ComponentProps<CarouselOptions, TriggerKeys, ExposeKeys>) {
  const { options, width, height, componentNode, handleTrigger, useExpose } = props;
  const carouselRef: RefObject<CarouselRef> = useRef<CarouselRef>(null);
  const itemStyle: React.CSSProperties = {
    width,
    height,
    position: "relative",
    color: "rgba(0,0,0,0.65)",
  };

  // 上一个panelId
  const lastPanelId = useRef<string>();

  // 显示空的面板列表
  const renderPanels = useMemo(() => {
    return componentNode.panels?.map((_, index) => {
      return (
        <div key={index}>
          <div style={itemStyle} />
        </div>
      );
    });
  }, [componentNode.panels]);

  // 打开指定index的panel
  function jumpPanel(panelIndex: number) {
    const panelId = componentNode.panels?.[panelIndex]?.value;

    // 不能跳转自身
    if (lastPanelId.current !== undefined && panelId === lastPanelId.current) {
      return;
    }

    // 触发事件
    handleTrigger("onChange", panelIndex);

    // 跳转面板
    carouselRef.current?.goTo?.(panelIndex);
    // 展示指定panels下的所有组件
    // 放入宏任务中是为了等渲染完毕后再显示（因为初次渲染时layout类组件可能会先于子组件渲染）
    if (panelId) {
      setTimeout(() => {
        // 先隐藏上一个panel的所有组件
        engine.componentNode.hidePanel(lastPanelId.current);
        lastPanelId.current = panelId;
        // 显示当前panel的组件
        engine.componentNode.showPanel(panelId);
      });
    }
  }

  // 跳转指定索引位置面板（索引从0开始）
  useEffect(() => {
    const panelIndex = componentNode.panels?.findIndex?.((panel) => {
      return panel?.value === componentNode?.currentPanelId;
    });

    if (panelIndex === undefined) {
      return;
    }

    // 跳转指定面板
    jumpPanel(panelIndex);
  }, [componentNode.currentPanelId, componentNode.panels]);

  useUnmount(() => {
    // 卸载时隐藏当前面板
    engine.componentNode.hidePanel(lastPanelId.current);
  });

  // 注册暴露事件
  useExpose({
    changePanel(panelIndex: number) {
      jumpPanel(panelIndex);
    },
  });

  return (
    <div
      style={{ width, height, borderColor: options?.borderColor }}
      className={classNames(styles.carousel, options?.bordered && styles.carousel_bordered)}
      onClick={() => handleTrigger("onClick")}
    >
      <Carousel
        speed={0}
        ref={carouselRef}
        autoplay={options?.autoplay}
        style={{ width, height }}
        dotPosition={"bottom"}
        afterChange={(currentIndex) => {
          jumpPanel(currentIndex);
        }}
      >
        {renderPanels}
      </Carousel>
    </div>
  );
}
