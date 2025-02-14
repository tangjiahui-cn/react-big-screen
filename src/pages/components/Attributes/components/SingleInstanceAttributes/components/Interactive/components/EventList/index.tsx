/**
 * EventList
 *
 * @author tangjiahui
 * @date 2025/2/11
 */
import engine, { ComponentNodeEvent, ComponentNodeType } from "@/engine";
import styles from "./index.module.less";
import { useMemo } from "react";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import IEmpty from "@/components/IEmpty";
import EditEventDialog from "@/components/EditEventDialog";
import { message } from "antd";
import { ask } from "@/components/Ask";
import { useBindModal } from "@/hooks";

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

  // 编辑事件弹窗
  const editEventModal = useBindModal(EditEventDialog, {
    onOk(currentEvent: ComponentNodeEvent) {
      // 将 events 更新到 componentNode
      engine.componentNode.update(componentNode?.id, (config) => {
        config?.events?.find?.((event) => {
          if (event.triggerId !== currentEvent?.triggerId) return false;
          Object.assign(event, currentEvent);
          return true;
        });
        return {
          events: config?.events,
        };
      });
    },
  });

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
    editEventModal.open({
      componentNode,
      triggerId: item?.value,
      triggerName: item?.label,
    });
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
      {editEventModal.children}
    </div>
  );
}
