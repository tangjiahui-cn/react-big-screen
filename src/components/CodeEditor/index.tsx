/**
 * CodeEditor
 *
 * @author tangjiahui
 * @date 2025/2/12
 * @description 代码编辑器
 */
import styles from "./index.module.less";
import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { useUpdateEffect } from "ahooks";
import "./useWorker";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  language?: string | "javascript" | "json";

  loading?: boolean; // 加载中
  readOnly?: boolean; // 是否只读
  minimap?: boolean; // 是否显示右侧小地图
}

export default function CodeEditor(props: Props) {
  const domRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>();

  useEffect(() => {
    const editor = monaco.editor.create(domRef.current!, {
      theme: "vs-light",
      value: props?.value,
      language: props?.language || "text",
      fontSize: 12,
      tabSize: 4,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      readOnly: props?.readOnly,
      minimap: {
        enabled: props?.minimap ?? true,
        showSlider: undefined,
      },
      readOnlyMessage: {
        value: "禁止编辑",
      },
    });
    editor.onDidChangeModelContent(() => {
      const code: string = editor.getValue();
      props?.onChange?.(code);
    });
    editorRef.current = editor;
    return () => {
      editor.dispose();
    };
  }, [props?.language]);

  useUpdateEffect(() => {
    const value = `${props?.value || ""}`;
    // 如果相同则不设置
    if (value === editorRef?.current?.getValue?.()) {
      return;
    }
    editorRef.current?.setValue?.(value);
  }, [props?.value]);

  return (
    <div className={styles.jsonEditor} style={props?.style}>
      <div ref={domRef} className={styles.jsonEditor_render} />

      {props?.loading && (
        <div className={styles.jsonEditor_loading}>
          <LoadingOutlined style={{ fontSize: 20 }} />
        </div>
      )}
    </div>
  );
}
