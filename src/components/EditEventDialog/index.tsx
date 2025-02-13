/**
 * EditEventDialog
 *
 * @author tangjiahui
 * @date 2025/2/11
 * @author 编辑event弹窗。
 */
import { Button, message, Modal } from "antd";
import engine, {
  ComponentNodeEventTarget,
  ComponentNodeEventTargetOpt,
  ComponentNodeType,
} from "@/engine";
import styles from "./index.module.less";
import EventOptions from "./components/EventOptions";
import { useEffect, useMemo, useState } from "react";
import TargetComponentNodesList from "./components/TargetComponentNodesList";
import TargetOperateList from "./components/TargetOperateList";

interface Props {
  triggerId?: string;
  triggerName?: string;
  componentNode?: ComponentNodeType;
  visible?: boolean;
  onClose?: () => void;
}

export default function EditEventDialog(props: Props) {
  const { componentNode, triggerId, triggerName } = props;
  // 当前选中events.target
  const [currentTargetId, setCurrentTargetId] = useState<string>();
  // 当前选中events.target.opt
  const [currentTargetOpt, setCurrentTargetOpt] = useState<ComponentNodeEventTargetOpt>();

  // 当前targets
  const targets = useMemo(() => {
    return props?.componentNode?.events?.find?.((x) => x.triggerId === triggerId)?.targets;
  }, [componentNode, triggerId]);

  // 当前target（其包含 opts: {operateId: '', options: {}}）
  const currentTarget = useMemo(() => {
    return targets?.find?.((target) => target.id === currentTargetId);
  }, [targets, currentTargetId]);

  const currentTargetCId = useMemo(() => {
    return engine.componentNode.get(currentTarget?.id)?.cId;
  }, [currentTarget]);

  function handleUpdateTargets(newTargets: ComponentNodeEventTarget[]) {
    engine.componentNode.update(componentNode?.id, (config) => {
      config?.events?.find?.((event) => {
        if (event.triggerId !== triggerId) {
          return false;
        }
        // 更新 targets
        event.targets = newTargets;
        return true;
      });
      return {
        events: [...(config?.events || [])],
      };
    });
  }

  function handleChangeTargetId(targetId?: string) {
    if (targetId === currentTargetId) {
      return;
    }
    setCurrentTargetId(targetId);
    // 自动选中第一个opt
    setCurrentTargetOpt(targets?.find?.((target) => target.id === targetId)?.opts?.[0]);
  }

  function handleUpdateOpts(newOpts: ComponentNodeEventTargetOpt[]) {
    engine.componentNode.update(componentNode?.id, (config) => {
      config?.events?.find?.((event) => {
        if (event.triggerId !== triggerId) return false;
        // 找到 target
        event.targets?.find?.((target) => {
          if (target.id !== currentTargetId) return false;
          // 更新 opts
          target.opts = newOpts;
          return true;
        });
        return true;
      });
      return {
        events: [...(config?.events || [])],
      };
    });
  }

  function handleUpdateOpt(newOpt: ComponentNodeEventTargetOpt) {
    engine.componentNode.update(componentNode?.id, (config) => {
      config?.events?.find?.((event) => {
        if (event.triggerId !== triggerId) return false;
        // 找到 target
        event.targets?.find?.((target) => {
          if (target.id !== currentTargetId) return false;
          // 找到 opts
          target.opts.find((opt) => {
            if (opt.operateId !== newOpt.operateId) return false;
            // 更新opt
            Object.assign(opt, newOpt);
            return true;
          });
          return true;
        });
        return true;
      });
      return {
        events: [...(config?.events || [])],
      };
    });
  }

  function handleChangeOperateId(operateId?: string) {
    setCurrentTargetOpt(currentTarget?.opts?.find?.((opt) => opt.operateId === operateId));
  }

  useEffect(() => {
    if (props?.visible) {
      if (!triggerId) {
        message.error("triggerId不存在");
        return;
      }

      if (!targets?.length) {
        return;
      }

      // 设置第一个 target
      const firstTarget = targets[0];
      setCurrentTargetId(firstTarget.id);

      if (!firstTarget?.opts?.length) {
        return;
      }

      // 设置第一个 target.opt
      const firstOpt = firstTarget.opts[0];
      setCurrentTargetOpt(firstOpt);
    } else {
      setCurrentTargetId(undefined);
      setCurrentTargetOpt(undefined);
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
      footer={<Button onClick={props?.onClose}>关闭</Button>}
    >
      <div className={styles.editEventDialog_menu}>
        {/* 目标组件列表 */}
        <TargetComponentNodesList
          className={"border-right"}
          value={currentTargetId}
          onChange={(targetId) => {
            handleChangeTargetId(targetId);
          }}
          targets={targets}
          onChangeTargets={(newTargets) => {
            handleUpdateTargets(newTargets);
          }}
        />
        {/* 目标操作列表 */}
        <TargetOperateList
          value={currentTargetOpt?.operateId}
          onChange={(operateId) => {
            handleChangeOperateId(operateId);
          }}
          cId={currentTargetCId}
          opts={currentTarget?.opts}
          onChangeOpts={(opts) => {
            handleUpdateOpts(opts);
          }}
        />
      </div>
      {/* 修改 opt 的 options */}
      <div className={styles.editEventDialog_body}>
        <EventOptions
          value={currentTargetOpt}
          onChange={(opt) => {
            handleUpdateOpt(opt);
          }}
        />
      </div>
    </Modal>
  );
}
