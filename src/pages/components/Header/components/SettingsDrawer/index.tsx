/**
 * SettingsDrawer
 *
 * @author tangjiahui
 * @date 2026/7/20
 * @description 设置 Drawer，支持拖拽不超过画布等配置项
 */
import { useEffect, useState } from "react";
import { Drawer, Switch } from "antd";
import { createBindModalHook } from "@/hooks";
import { useEngineContext } from "@/export/context";
import { GlobalConfig } from "@/engine";

export default createBindModalHook((props) => {
  const { engine } = useEngineContext();
  const [config, setConfig] = useState<GlobalConfig>(() => ({
    ...engine.config.getConfig(),
  }));

  // 打开 Drawer 时从 engine 同步最新配置到本地 state
  useEffect(() => {
    if (props?.visible) {
      setConfig((prev) => ({
        ...prev,
        ...engine.config.getConfig(),
      }));
    }
  }, [props?.visible]);

  return (
    <Drawer
      title='设置'
      placement='right'
      open={props?.visible}
      onClose={props?.onCancel}
      afterVisibleChange={(visible) => {
        if (!visible) props?.afterClose?.();
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>拖拽不超过画布</span>
        <Switch
          checked={config?.dragClampEnabled ?? false}
          onChange={(checked) => {
            setConfig((prev) => ({ ...prev, dragClampEnabled: checked }));
            engine.config.setConfig({ dragClampEnabled: checked });
          }}
        />
      </div>
    </Drawer>
  );
});
