/**
 * 颜色取值器
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Dropdown } from "antd";
import styles from "./IColorPicker.module.less";

type Hex = string;
type RGBA = string;
type ColorType = Hex | RGBA;

interface Props {
  // 颜色（默认白色）
  value?: ColorType;
  // 回调 (hex | rgba)
  onChange?: (value: ColorType) => void;
  // 样式
  style?: React.CSSProperties;
}

export function IColorPicker(props: Props) {
  const { value = "white" } = props;
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown
      open={visible}
      trigger={["click"]}
      overlayClassName={styles.IColorPicker_overlay}
      onOpenChange={(v) => {
        if (!v) setVisible(false);
      }}
      menu={{
        items: [
          {
            key: "color",
            label: (
              <div>
                <SketchPicker
                  color={value}
                  onChange={(value) => {
                    const { rgb } = value;
                    const color =
                      rgb.a === 1 ? value.hex : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
                    props?.onChange?.(`${color}` || "#fff");
                  }}
                />
              </div>
            ),
          },
        ],
      }}
    >
      <div
        className={styles.IColorPicker}
        style={{ backgroundColor: value, ...props?.style }}
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      />
    </Dropdown>
  );
}
