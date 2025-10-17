/**
 * 无限容器
 *
 * @author tangjiahui
 * @date 2025/4/13
 * @description: 支持无限拖拽、缩放。
 */

import React, { useEffect, useRef } from "react";
import { useDomEvents, useListenRef } from "@/hooks";
import { getWheelInfo, range } from "./utils";
import styles from "./index.module.less";
import { startMove } from "@/packages/dragMove/utils/startMove";
import hotkeys from "hotkeys-js";
import globalCursor from "@/packages/globalCursor";
import { isClickMouseLeft, isClickMouseMid } from "@/utils";
import { useEngineContext } from "@/export/context";

function isNumber(v: any): v is number {
  return typeof v === "number";
}

interface InfiniteCanvasProps {
  defaultScale?: number; // 默认缩放
  scaleStep?: number; // 缩放步进
  scaleMax?: number; // 最大缩放比例
  scaleMin?: number; // 最小缩放比例
  offsetX?: number; // 内部元素x轴偏移量
  offsetY?: number; // 内部元素y轴偏移量
  scale?: number; // 缩放scale
  children?: any; // 子元素
  style?: React.CSSProperties; // 样式
  onReset?: () => void; // 点击重置按钮
  onChange?: (scale: number, offsetX: number, offsetY: number) => void; // 回调scale
}

export default function InfiniteContainer(props: InfiniteCanvasProps) {
  const { engine } = useEngineContext();
  const { defaultScale = 1, scaleStep = 0.05, scaleMax = 2, scaleMin = 0.1 } = props;
  const containerDomRef = useRef<HTMLDivElement>(null);
  const innerDomRef = useRef<HTMLDivElement>(null);
  const maskDomRef = useRef<HTMLDivElement>(null);
  const propsRef = useListenRef(props);

  // 当前坐标信息
  const currentInfoRef = useRef<{
    scale: number;
    x: number;
    y: number;
  }>({
    scale: defaultScale,
    x: 0,
    y: 0,
  });

  function emitChange() {
    props?.onChange?.(
      currentInfoRef.current.scale,
      currentInfoRef.current.x,
      currentInfoRef.current.y,
    );
  }

  // 设置内部元素缩放
  function setInnerScale(scale: number) {
    const dom = innerDomRef.current!;
    dom.style.transform = `scale(${scale})`;
    dom.style.transformOrigin = "top left";
  }

  // 临时修改内部元素位置
  function movingInnerPosition(x: number, y: number) {
    const dom = innerDomRef.current!;
    dom.style.transform = `translate(${x}px, ${y}px) scale(${currentInfoRef.current.scale})`;
    dom.style.transformOrigin = "top left";
  }

  // 设置内部元素位置
  function setInnerPosition(x: number, y: number) {
    innerDomRef.current!.style.top = `${y}px`;
    innerDomRef.current!.style.left = `${x}px`;
  }

  // 注册滚轮缩放
  useDomEvents(containerDomRef, {
    // 重置
    mousedown(e) {
      // 按下鼠标中键，重置缩放比例
      if (isClickMouseMid(e)) {
        propsRef.current?.onReset?.();
      }
      // 如果同时按下左键和空格
      if (isClickMouseLeft(e)) {
        if (hotkeys.isPressed("space")) {
          globalCursor.set("grabbing");
        }
      }
    },
    // 鼠标松开
    mouseup(e) {
      if (isClickMouseLeft(e)) {
        if (hotkeys.isPressed("space")) {
          globalCursor.set("grab");
          return;
        }
        globalCursor.revoke();
      }
    },
    wheel(e) {
      const wheelInfo = getWheelInfo(e as WheelEvent);
      const delta = wheelInfo.times * scaleStep * wheelInfo.direction;
      // 计算缩放比例
      currentInfoRef.current.scale = range(
        currentInfoRef.current.scale + delta,
        scaleMin,
        scaleMax,
      );
      setInnerScale(currentInfoRef.current.scale);
      emitChange();
    },
  });

  // 拖拽遮罩层移动内部组件
  useDomEvents(maskDomRef, {
    mousedown(e) {
      startMove({
        startEvent: e,
        startX: e.x,
        startY: e.y,
        onStart(dx: number, dy: number) {
          movingInnerPosition(dx, dy);
        },
        onMove(dx: number, dy: number) {
          movingInnerPosition(dx, dy);
        },
        onEnd(dx: number, dy: number) {
          setInnerScale(currentInfoRef.current.scale);
          setInnerPosition((currentInfoRef.current.x += dx), (currentInfoRef.current.y += dy));
          emitChange();
        },
      });
    },
  });

  // 是否当前支持拖拽遮罩层（按下空格则拖拽遮罩层）
  useEffect(() => {
    let isDown = false;
    keyup();

    function keydown() {
      isDown = true;
      maskDomRef.current!.style.removeProperty("pointer-events");
      maskDomRef.current!.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      globalCursor.set("grab");
    }

    function keyup() {
      isDown = false;
      maskDomRef.current!.style.pointerEvents = "none";
      globalCursor.revoke();
    }

    hotkeys("space", { keyup: true }, (event) => {
      if (event.type === "keydown" && !isDown) {
        keydown();
      }
      if (event.type === "keyup") {
        keyup();
      }
    });
  }, []);

  // 监听scale变化
  useEffect(() => {
    if (isNumber(props.scale) && currentInfoRef.current.scale !== props.scale) {
      setInnerScale((currentInfoRef.current.scale = props.scale));
    }
  }, [props.scale]);

  // 监听offset变化
  useEffect(() => {
    if (
      isNumber(props.offsetX) &&
      isNumber(props.offsetY) &&
      (props.offsetX !== currentInfoRef.current.x || props.offsetY !== currentInfoRef.current.y)
    ) {
      setInnerPosition(
        (currentInfoRef.current.x = props.offsetX),
        (currentInfoRef.current.y = props.offsetY),
      );
    }
  }, [props.offsetX, props.offsetY]);

  return (
    <div className={styles.infiniteCanvas} ref={containerDomRef} style={props?.style}>
      <div className={styles.infiniteCanvas_inner} ref={innerDomRef}>
        {props?.children}
      </div>
      <div className={styles.infiniteCanvas_mask} ref={maskDomRef} />
    </div>
  );
}
