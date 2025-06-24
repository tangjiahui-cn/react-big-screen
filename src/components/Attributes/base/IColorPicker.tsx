/**
 * 颜色取值器
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styles from "./IColorPicker.module.less";
import CustomDropDown from "@/components/CustomDropDown";

type Hex = string;
type RGBA = string;
type ColorType = Hex | RGBA;

export interface IColorPickerProps {
  value?: ColorType; // 颜色（默认白色）
  onChange?: (value: ColorType) => void; // 回调 (hex | rgba)
  style?: React.CSSProperties; // 样式
}

export function IColorPicker(props: IColorPickerProps) {
  const { value = "white" } = props;
  const [visible, setVisible] = useState(false);

  function handleClose() {
    setVisible(false);
  }

  return (
    <CustomDropDown
      visible={visible}
      onClose={handleClose}
      overlayChildren={
        <SketchPicker
          width={"250px"}
          color={value}
          onChange={(value) => {
            const { rgb } = value;
            const color = rgb.a === 1 ? value.hex : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
            props?.onChange?.(`${color}` || "#fff");
          }}
        />
      }
    >
      <div
        className={styles.IColorPicker}
        style={{ backgroundColor: value, ...props?.style }}
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      />
    </CustomDropDown>
  );
}
