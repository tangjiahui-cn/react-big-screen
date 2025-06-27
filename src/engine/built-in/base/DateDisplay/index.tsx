/**
 * 日期展示组件
 *
 * @author tangjiahui
 * @date 2025/6/25
 */
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, DateDisplayOptions } from "./attributes";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

export default createComponent<DateDisplayOptions>((props) => {
  const { width, height, options } = props;
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function run() {
      domRef.current!.innerHTML = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }

    let timerId = setInterval(run, 1000);
    run();
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div
      style={{
        width,
        height,
        color: options?.color,
        fontSize: options?.fontSize,
        textAlign: options?.textAlign,
        lineHeight: `${options?.lineHeight}px`,
      }}
      // className={styles.dateDisplay}
      ref={domRef}
    >
      {11}
    </div>
  );
}, DEFAULT_OPTIONS);
