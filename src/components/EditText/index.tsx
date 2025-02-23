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
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import classNames from "classnames";

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
      message.warn(props?.emptyMessage);
      return;
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
        <IInput
          value={str}
          style={{ width: "100%" }}
          onChange={(str) => setStr(str)}
          onPressEnter={() => {
            // 按下enter键
            if (isEdit) {
              handleSave();
            }
          }}
        />
      ) : (
        <b className={styles.editText_text} title={`${props?.value || ""}`}>
          {props?.value}
        </b>
      )}
      {isEdit ? (
        <SaveOutlined className={"icon_clickable"} onClick={handleSave} />
      ) : (
        <EditOutlined
          className={classNames(styles.opacity0, "icon_clickable")}
          onClick={handleEdit}
        />
      )}
    </div>
  );
}
