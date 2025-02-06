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
import React, { RefObject, useEffect, useRef } from "react";
import { CarouselRef } from "antd/lib/carousel";

export default function (props: ComponentProps<CarouselOptions>) {
  const { options, width, height } = props;
  const carouselRef: RefObject<CarouselRef> = useRef<CarouselRef>(null);
  const itemStyle: React.CSSProperties = {
    width,
    height,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    color: "rgba(0,0,0,0.65)",
    fontWeight: "bold",
  };

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
        <div>
          <div style={itemStyle} />
        </div>
        <div>
          <div style={itemStyle} />
        </div>
        <div>
          <div style={itemStyle} />
        </div>
      </Carousel>
    </div>
  );
}
