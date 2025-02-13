/**
 * EditEventDialog
 *
 * @author tangjiahui
 * @date 2025/2/11
 * @author 编辑event弹窗。
 */
import { message, Modal } from "antd";
import engine, {
  ComponentNodeEvent,
  ComponentNodeEventTarget,
  ComponentNodeEventTargetOpt,
  ComponentNodeType,
} from "@/engine";
import styles from "./index.module.less";
import EventOptions from "./components/EventOptions";
import { useEffect, useMemo, useState } from "react";
import TargetComponentNodesList from "./components/TargetComponentNodesList";
import TargetOperateList from "./components/TargetOperateList";
import { cloneDeep } from "lodash-es";

interface Props {
  triggerId?: string;
  triggerName?: string;
  componentNode?: ComponentNodeType;
  visible?: boolean;
  onClose?: () => void;
}

export default function EditEventDialog(props: Props) {
  const { componentNode, triggerId, triggerName } = props;
  const [currentEvent, setCurrentEvent] = useState<ComponentNodeEvent>();
  const [currentEventTarget, setCurrentEventTarget] = useState<ComponentNodeEventTarget>();
  const [currentEventTargetOpt, setCurrentEventTargetOpt] = useState<ComponentNodeEventTargetOpt>();

  // 当前target对应组件的cId
  const currentTargetCId = useMemo(() => {
    return engine.componentNode.get(currentEventTarget?.id)?.cId;
  }, [currentEventTarget]);

  // 选中 event.targets 中的一项
  function handleSelectEventTarget(targetId?: string) {
    const target = currentEvent?.targets?.find?.((target) => target.id === targetId);
    setCurrentEventTarget(target);
    setCurrentEventTargetOpt(target?.opts?.[0]);
  }

  // 选中 event.target[xx].opts 中的一项
  function handleSelectEventTargetOpt(operateId?: string) {
    setCurrentEventTargetOpt(
      currentEventTarget?.opts?.find?.((opt) => opt?.operateId === operateId),
    );
  }

  // 更新 event.targets
  function handleUpdateTargets(targets: ComponentNodeEventTarget[]) {
    setCurrentEvent({
      ...currentEvent,
      targets,
    });

    // 如果是新增的第一项
    if (targets.length === 1) {
      setCurrentEventTarget(targets?.[0]);
    }
  }

  // 更新 event.target[xx].opts
  function handleUpdateOpts(opts: ComponentNodeEventTargetOpt[]) {
    currentEvent?.targets?.find?.((target) => {
      if (target.id !== currentEventTarget?.id) return false;
      target.opts = opts;
      return true;
    });
    setCurrentEvent({ ...currentEvent });

    // 如果是新增的第一项
    if (opts.length === 1) {
      setCurrentEventTargetOpt(opts?.[0]);
    }
  }

  // 更新 event.target[xx].opts[xx]
  function handleUpdateOpt(newOpt: ComponentNodeEventTargetOpt) {
    currentEvent?.targets?.find?.((target) => {
      if (target.id !== currentEventTarget?.id) return false;
      target.opts?.find?.((opt: ComponentNodeEventTargetOpt) => {
        if (opt?.operateId !== newOpt?.operateId) return false;
        Object.assign(opt, newOpt);
        return true;
      });
      return true;
    });
    setCurrentEvent({ ...currentEvent });
  }

  function handleSave() {
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
    props?.onClose?.();
  }

  useEffect(() => {
    if (props?.visible) {
      if (!triggerId) {
        message.error("triggerId不存在");
        return;
      }

      let event = componentNode?.events?.find?.((event) => event?.triggerId === triggerId);
      event = cloneDeep(event);
      setCurrentEvent(event);

      const firstTarget = event?.targets?.[0];
      setCurrentEventTarget(firstTarget);

      const firstTargetOpt = firstTarget?.opts?.[0];
      setCurrentEventTargetOpt(firstTargetOpt);
    } else {
      setCurrentEvent(undefined);
      setCurrentEventTarget(undefined);
      setCurrentEventTargetOpt(undefined);
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      width={850}
      okText={"保存"}
      cancelText={"取消"}
      open={props?.visible}
      className={styles.editEventDialog}
      title={`${triggerName || "-"} 事件`}
      bodyStyle={{ height: 500, display: "flex", padding: 16, userSelect: "none" }}
      onCancel={props?.onClose}
      onOk={handleSave}
    >
      <div className={styles.editEventDialog_menu}>
        {/* 目标组件列表 */}
        <TargetComponentNodesList
          className={"border-right"}
          value={currentEventTarget?.id}
          onChange={(targetId) => {
            handleSelectEventTarget(targetId);
          }}
          targets={currentEvent?.targets}
          onChangeTargets={(newTargets) => {
            handleUpdateTargets(newTargets);
          }}
        />
        {/* 目标操作列表 */}
        <TargetOperateList
          value={currentEventTargetOpt?.operateId}
          onChange={(operateId) => {
            handleSelectEventTargetOpt(operateId);
          }}
          cId={currentTargetCId}
          opts={currentEventTarget?.opts}
          onChangeOpts={(opts) => {
            handleUpdateOpts(opts);
          }}
        />
      </div>
      {/* 修改 opt 的 options */}
      <div className={styles.editEventDialog_body}>
        <EventOptions
          value={currentEventTargetOpt}
          onChange={(opt) => {
            handleUpdateOpt(opt);
          }}
        />
      </div>
    </Modal>
  );
}
