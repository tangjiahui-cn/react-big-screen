/**
 * 缩放比率下拉框
 *
 * @author tangjiahui
 * @date 2025/3/25
 */
import { Button, Dropdown, message, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { IInputNumber } from "@/components/Attributes";

interface Props {
  value?: number; // 缩放比率(单位1)
  onChange?: (value: number) => void;
}

export default function ScaleSelect(props: Props) {
  const { value = 1 } = props;
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState<number>();

  const displayText = useMemo(() => `${value * 100}%`, [value]);

  function handleOpen() {
    setVisible(true);
    setCustom(undefined);
  }

  function handleSelect(value: number) {
    props?.onChange?.(Number(value) / 100);
    setVisible(false);
  }

  return (
    <Dropdown
      open={visible}
      menu={{
        items: [
          { label: "200%", key: 200 },
          { label: "150%", key: 150 },
          { label: "125%", key: 125 },
          { label: "100%", key: 100 },
          { label: "75%", key: 75 },
          { label: "50%", key: 50 },
          {
            key: "",
            label: (
              <Space style={{ userSelect: "none" }}>
                <IInputNumber size={"small"} min={1} value={custom} onChange={setCustom} />
                <span>%</span>
                <Button
                  type={"primary"}
                  size={"small"}
                  onClick={() => {
                    if (!value) {
                      message.warn("请填写值");
                    }
                    handleSelect(custom as number);
                  }}
                >
                  确定
                </Button>
              </Space>
            ),
          },
        ],
        onClick({ key }) {
          if (key) {
            handleSelect(key as any);
          }
        },
      }}
      onOpenChange={(visible) => {
        if (!visible) {
          setVisible(false);
        }
      }}
    >
      <span style={{ cursor: "pointer" }} onMouseEnter={handleOpen}>
        <span style={{ marginRight: 4 }}>{displayText}</span>
        <DownOutlined />
      </span>
    </Dropdown>
  );
}
