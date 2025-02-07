/**
 * Carousel（走马灯）
 *
 * @author tangjiahui
 * @date 2024/1/7
 */
import { Carousel } from "antd";
import { ComponentProps } from "@/engine";
import styles from "./index.module.less";
import { CarouselOptions } from "./attributes";
import classNames from "classnames";
import React, { RefObject, useEffect, useMemo, useRef } from "react";
import { CarouselRef } from "antd/lib/carousel";

export default function (props: ComponentProps<CarouselOptions>) {
  const { options, width, height } = props;
  const carouselRef: RefObject<CarouselRef> = useRef<CarouselRef>(null);
  const itemStyle: React.CSSProperties = {
    width,
    height,
    position: "relative",
    color: "rgba(0,0,0,0.65)",
  };

  // 显示空的面板列表
  const renderPanels = useMemo(() => {
    return Array(options?.count)
      .fill(null)
      .map((_, index) => {
        return (
          <div key={index}>
            <div style={itemStyle} />
          </div>
        );
      });
  }, [options.count]);

  // 跳转指定索引位置面板（索引从0开始）
  useEffect(() => {
    if (options?.value !== undefined) {
      carouselRef.current?.goTo?.(options?.value);
    }
  }, [options?.value]);

  return (
    <div
      style={{ width, height, borderColor: options?.borderColor }}
      className={classNames(styles.carousel, options?.bordered && styles.carousel_bordered)}
    >
      <Carousel
        ref={carouselRef}
        autoplay={options?.autoplay}
        style={{ width, height }}
        dotPosition={"bottom"}
      >
        {renderPanels}
      </Carousel>
    </div>
  );
}
