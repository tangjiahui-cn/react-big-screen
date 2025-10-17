/**
 * TriggerEventButton
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import { Button, Dropdown, MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ComponentNodeType, ComponentType } from "@/engine";
import { useEngineContext } from "@/export/context";

interface Props {
  componentNode?: ComponentNodeType;
  onSelect?: (key: string) => void;
}

export default function TriggerEventButton(props: Props) {
  const { componentNode } = props;
  const { engine } = useEngineContext();
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const component: ComponentType | undefined = useMemo(
    () => engine.component.get(componentNode?.cId),
    [componentNode?.cId],
  );

  useEffect(() => {
    setItems(
      component?.triggers?.map?.((trigger) => {
        return {
          disabled: !!componentNode?.events?.find((event) => event.triggerId === trigger.value),
          key: trigger.value,
          style: { fontSize: 12 },
          label: trigger.label,
        };
      }) || [],
    );
  }, [component, componentNode]);

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items,
        onClick: ({ key }) => {
          props?.onSelect?.(key as any);
        },
      }}
    >
      <Button type={"dashed"} block icon={<PlusOutlined />}>
        组件绑定事件
      </Button>
    </Dropdown>
  );
}
