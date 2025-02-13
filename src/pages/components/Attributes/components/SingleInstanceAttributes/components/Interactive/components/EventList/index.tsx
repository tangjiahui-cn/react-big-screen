/**
 * EventList
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import engine, { ComponentNodeType } from "@/engine";
import styles from "./index.module.less";
import { useMemo, useState } from "react";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import IEmpty from "@/components/IEmpty";
import EditEventDialog from "@/components/EditEventDialog";
import { message } from "antd";
import { ask } from "@/components/Ask";

interface Item {
  label: string;
  value: string;
}

interface Props {
  componentNode?: ComponentNodeType;
}

export default function EventList(props: Props) {
  const { componentNode } = props;
  const component = useMemo(() => engine.component.get(componentNode?.cId), [componentNode]);
  const [editVisible, setEditVisible] = useState<boolean>(false);

  // 当前弹窗编辑的 triggerId
  const [currentItem, setCurrentItem] = useState<Item>();

  const list: Item[] = useMemo(() => {
    return (
      componentNode?.events?.map((event) => {
        const trigger = component?.triggers?.find?.((x) => x?.value === event.triggerId);
        return {
          label: `${trigger?.label || "-"}`,
          value: `${event.triggerId}`,
        };
      }) || []
    );
  }, [componentNode, component]);

  // 打开编辑弹窗
  function handleOpenEdit(item: Item) {
    if (!item?.value) {
      message.warn("triggerId不存在");
      return;
    }
    setCurrentItem(item);
    setEditVisible(true);
  }

  // 删除一个event
  function deleteEvent(triggerId: string) {
    engine.componentNode.update(componentNode?.id, (config) => {
      return {
        events: [
          ...(config?.events?.filter?.((event) => {
            return event.triggerId !== triggerId;
          }) || []),
        ],
      };
    });
  }

  // 开始删除
  function handleDelete(triggerId?: string) {
    if (!triggerId) {
      message.warn("triggerId不存在");
      return;
    }
    const event = componentNode?.events?.find?.((x) => x?.triggerId === triggerId);
    if (event?.targets?.length) {
      ask({
        title: "提醒",
        content: `已配置${event?.targets?.length || 0}个事件项，确定删除该事件？`,
        onOk(close) {
          deleteEvent(triggerId);
          close();
        },
      });
    } else {
      deleteEvent(triggerId);
    }
  }

  return (
    <div className={styles.eventList}>
      <div className={styles.eventList_head}>绑定事件：</div>
      <div className={styles.eventList_body}>
        {!list?.length && <IEmpty />}
        {list?.map?.((item) => {
          return (
            <div key={item.value} className={styles.eventList_item}>
              <div className={styles.eventList_item_body}>{item.label}</div>
              <div className={styles.eventList_item_opt}>
                <SettingOutlined
                  className={styles.eventList_item_opt_clickable}
                  onClick={() => handleOpenEdit(item)}
                />
                <DeleteOutlined
                  className={styles.eventList_item_opt_clickable}
                  onClick={() => handleDelete(item?.value)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 编辑event弹窗 */}
      <EditEventDialog
        visible={editVisible}
        componentNode={componentNode}
        triggerId={currentItem?.value}
        triggerName={currentItem?.label}
        onClose={() => {
          setEditVisible(false);
        }}
      />
    </div>
  );
}
