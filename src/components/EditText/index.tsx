/**
 * 可编辑文字
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
import { useEffect, useState } from "react";
import { IInput } from "@/components/Attributes/base/IInput";
import { message } from "antd";
import styles from "./index.module.less";

interface Props {
  emptyMessage?: string; // 空校验提示文字
  value?: string;
  onChange?: (value: string) => void;
}

export default function EditText(props: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [str, setStr] = useState("");

  function handleEdit() {
    setStr(props?.value || "");
    setIsEdit(true);
  }

  function handleSave() {
    if (!str) {
      return message.warn(props?.emptyMessage);
    }
    setIsEdit(false);
    props?.onChange?.(str);
  }

  useEffect(() => {
    setIsEdit(false);
  }, [props?.value]);

  return (
    <div className={styles.editText}>
      {isEdit ? (
        <IInput style={{ width: "100%" }} value={str} onChange={(str) => setStr(str)} />
      ) : (
        <b className={styles.editText_text} title={`${props?.value || ""}`}>
          {props?.value}
        </b>
      )}
      {isEdit ? <a onClick={handleSave}>保存</a> : <a onClick={handleEdit}>编辑</a>}
    </div>
  );
}
