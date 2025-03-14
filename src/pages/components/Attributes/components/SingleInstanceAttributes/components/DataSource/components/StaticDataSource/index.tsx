/**
 * 静态数据源
 *
 * @author tangjiahui
 * @date 2025/3/14
 */
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import CodeEditor from "@/components/CodeEditor";
import { Line } from "@/components/Attributes";
import { message, Tooltip } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useSingleSelectedInstance } from "@/pages/components/Attributes/components/SingleInstanceAttributes";
import engine from "@/engine";

interface Props {
  style?: React.CSSProperties;
}

export default function StaticDataSource(props: Props) {
  const { componentNode } = useSingleSelectedInstance();
  const [code, setCode] = useState<string>("");

  function handleSave() {
    if (!code) {
      return message.warn("json格式不正确");
    }
    try {
      const json = JSON.parse(code);
      engine.componentNode.update(componentNode?.id, {
        staticDataSource: json,
      });
      message.success("修改成功");
    } catch (e) {
      message.warn("json格式不正确");
    }
  }

  useEffect(() => {
    setCode(
      componentNode?.staticDataSource
        ? JSON.stringify(componentNode?.staticDataSource || {}, null, "\t")
        : "",
    );
  }, [componentNode]);

  return (
    <div className={styles.staticDataSource} style={props?.style}>
      <Line label={"配置数据"}>
        <Tooltip title={"保存"}>
          <SaveOutlined className={"icon_clickable"} onClick={handleSave} />
        </Tooltip>
      </Line>
      <CodeEditor
        minimap={false}
        language={"json"}
        style={{ flex: 1 }}
        value={code}
        onChange={setCode}
        options={{
          tabSize: 2,
        }}
      />
    </div>
  );
}
