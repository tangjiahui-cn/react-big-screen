/**
 * EditList-item
 *
 * @author tangjiahui
 * @date 2025/2/9
 */
import styles from "./item.module.less";
import { Input, message, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { PanelData } from "@/engine";
import { useState } from "react";
import classNames from "classnames";

interface Props {
  isSelected?: boolean; // 是否选中
  value?: PanelData; // panel
  onDelete?: () => void;
  onUpdate?: (panel: PanelData) => void;
  onSelect?: () => void;
}

export default function (props: Props) {
  const { value } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState<string>(value?.label || "");
  const [hover, setHover] = useState<boolean>(false);

  function handleEdit() {
    setName(value?.label || "");
    setIsEdit(true);
  }

  function handleSave() {
    if (!name) {
      message.warn("必须填写名称");
      return;
    }
    setIsEdit(false);
    props?.onUpdate?.({
      ...value,
      label: name,
    } as any);
  }

  return (
    <div className={styles.editItem}>
      {/* radio图标 */}
      <div
        className={styles.editItem_left}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => props?.onSelect?.()}
      >
        <div
          className={classNames(
            styles.editRadio,
            props?.isSelected && styles.editRadio_selected,
            hover && styles.editRadio_hover,
          )}
        />
      </div>
      {/* 编辑输入框 / 文字展示 */}
      <div className={styles.editItem_body}>
        {isEdit ? (
          <Input
            value={name}
            size={"small"}
            maxLength={100}
            placeholder={"请输入"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div
            title={value?.label || ""}
            className={classNames(
              styles.editItem_body_text,
              hover && styles.editItem_body_text_hover,
            )}
            onClick={() => props?.onSelect?.()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {value?.label}
          </div>
        )}
      </div>
      <div className={styles.editItem_right}>
        {/* 操作 */}
        <Space>
          {isEdit ? (
            <Tooltip title={"保存"}>
              <SaveOutlined className={styles.editList_opt} onClick={handleSave} />
            </Tooltip>
          ) : (
            <Tooltip title={"编辑"}>
              <EditOutlined className={styles.editList_opt} onClick={handleEdit} />
            </Tooltip>
          )}
          <Tooltip title={"删除"}>
            <DeleteOutlined className={styles.editList_opt} onClick={() => props?.onDelete?.()} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}
