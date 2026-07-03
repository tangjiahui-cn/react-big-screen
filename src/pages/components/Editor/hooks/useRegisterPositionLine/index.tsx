/**
 * 定位线
 *
 * @author tangjiahui
 * @date 2026/7/3
 */
import React from "react";
import { useEngineContext } from "@/export/context";
import { useConfig } from "@/engine";
import { useStateWithRef } from "@/hooks";
import styles from "./index.module.less";

interface PositionItem {
  key: any;
  x: number;
  y: number;
  componentNodeX: number;
  componentNodeY: number;
  zIndex: number;
}

export function useRegisterPositionLine(editorDomRef: React.MutableRefObject<HTMLElement | null>) {
  const { engine } = useEngineContext();
  const scale = useConfig((config) => config.scale);

  const domMapRef = React.useRef<Record<string, HTMLElement | null>>({});
  const [positions, setPositions, positionsRef] = useStateWithRef<PositionItem[]>([]);

  // 移动
  function move(deltaX: number, deltaY: number) {
    if (!domMapRef.current) {
      return;
    }

    if (!positionsRef.current?.length) {
      return;
    }

    setTimeout(() => {
      const scale = engine.config.getConfig().scale;

      positionsRef.current?.forEach?.((position) => {
        const dom = domMapRef.current![position.key];

        if (dom) {
          const componentNodeX = position.componentNodeX + deltaX;
          const componentNodeY = position.componentNodeY + deltaY;
          dom.style.width = `${position.x + deltaX * scale}px`;
          dom.style.height = `${position.y + deltaY * scale}px`;
          dom.innerText = `${Math.round(componentNodeX)},${Math.round(componentNodeY)}`;
        }
      });
    });
  }

  // 刷新
  function flush() {
    if (!editorDomRef.current) {
      console.error("editorDomRef.current is not mounted yet");
      return;
    }

    setTimeout(() => {
      const selectedInstances = engine.instance.getAllSelected();
      const editDomRect = editorDomRef.current!.getBoundingClientRect();
      domMapRef.current = {};

      const positions = selectedInstances.map((ins) => {
        const domRect = ins.getContainerDom().getBoundingClientRect();
        const componentNode = ins.getComponentNode();
        return {
          key: ins.id,
          x: domRect.x - editDomRect.x,
          y: domRect.y - editDomRect.y,
          zIndex: componentNode.level || 1,
          componentNodeX: componentNode.x,
          componentNodeY: componentNode.y,
        };
      });

      setPositions(positions);
    });
  }

  React.useEffect(() => {
    flush();
  }, [scale]);

  React.useEffect(() => {
    return engine.instance.onSelectedChange(() => {
      flush();
    });
  }, []);

  React.useEffect(() => {
    return engine.componentNode.onChange(async () => {
      flush();
    });
  }, []);

  const children = (
    <>
      {positions.map((position) => {
        return (
          <div
            ref={(el) => {
              if (domMapRef.current) {
                domMapRef.current[position.key] = el;
              }
            }}
            key={position.key}
            className={styles.positionLine}
            style={{
              width: position.x,
              height: position.y,
              zIndex: position.zIndex,
            }}
          >
            {`${position.componentNodeX},${position.componentNodeY}`}
          </div>
        );
      })}
    </>
  );

  return {
    children,
    move,
    flush,
  };
}
