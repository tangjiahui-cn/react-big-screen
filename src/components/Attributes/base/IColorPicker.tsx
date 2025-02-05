/**
 * 颜色取值器
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { useState } from "react";
import { SketchPicker } from "react-color";
import { Dropdown } from "antd";
import styles from "./IColorPicker.module.less";

interface Props {
  // 颜色（默认白色）
  value?: string;
  // 回调 (hex值颜色)
  onChange?: (value: string) => void;
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
            key: "1",
            label: (
              <div>
                <SketchPicker
                  color={value}
                  onChange={(value) => {
                    props?.onChange?.(value?.hex || "#fff");
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
        style={{ backgroundColor: value }}
        onClick={() => {
          if (!visible) setVisible(true);
        }}
      />
    </Dropdown>
  );
}
