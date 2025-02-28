/**
 * item
 *
 * @author tangjiahui
 * @date 2025/2/18
 */
import { message, Popover, Space } from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import engine, { ComponentNodeType, ComponentPackage, getPackageComponentNodes } from "@/engine";
import styles from "./index.module.less";
import ComponentNodeImage from "@/components/ComponentNodeImage";
import { useAsk } from "@/components/Ask";
import classNames from "classnames";
import { downloadText } from "@/utils";

interface Props {
  data: ComponentPackage;
  onDelete?: (data: ComponentPackage, componentNodes: ComponentNodeType[]) => void;
}

export default function (props: Props) {
  const { data } = props;
  const ask = useAsk();

  // 是否显示下载
  const isDownload = data?.origin !== "system";
  // 是否显示删除
  const isDelete = data?.origin !== "system";

  // 删除package
  function handleDelete() {
    const componentNodes = getPackageComponentNodes(data?.id);
    const ensureDelete = () => props?.onDelete?.(data, componentNodes);

    if (!componentNodes.length) {
      ensureDelete();
    }

    // 如果有相关实例，则提示是否删除
    ask({
      content: (
        <span>
          <span>该操作会同时删除</span>
          <span style={{ color: "red" }}> {componentNodes.length} </span>
          <span>个相关实例 ，确定删除组件包“{data.name}”？</span>
        </span>
      ),
      onOk(close) {
        ensureDelete();
        close();
      },
    });
  }

  // 下载package
  async function handleDownload() {
    const text = await engine.component.getPackageSourceCode(data?.id);
    if (!text) {
      message.warn("源码不存在");
      return;
    }
    const filename = `${data?.name}.js`;
    downloadText(text, filename);
  }

  return (
    <Popover
      placement={"rightTop"}
      title={
        <div className={styles.propertyItemPopover_title}>
          <b>{data?.name}</b>
          <span style={{ color: "rgba(0,0,0,0.25)" }}>v{data?.version}</span>
        </div>
      }
      content={
        <Space direction={"vertical"} className={styles.propertyItemPopover}>
          {data?.description && (
            <div className={styles.propertyItemPopover_description}>{data?.description}</div>
          )}
          <div className={styles.propertyItemPopover_statistic}>
            共包含组件<b> {data?.components?.length} </b>个：
          </div>
          <div className={styles.propertyItemPopover_body}>
            <Space
              size={4}
              direction={"vertical"}
              style={{ width: 300, maxHeight: 160, overflowY: "auto" }}
            >
              {data?.components?.map?.((component) => {
                return (
                  <div key={component?.cId} className={styles.propertyItemPopover_body_item}>
                    <div className={styles.propertyItemPopover_body_item_icon}>
                      <ComponentNodeImage
                        src={component?.icon}
                        style={{ maxHeight: "80%", maxWidth: 32 }}
                      />
                    </div>
                    <span>{component?.cName}</span>
                  </div>
                );
              })}
            </Space>
          </div>
        </Space>
      }
    >
      <div className={styles.propertyItem} onContextMenu={(e) => e.preventDefault()}>
        <span>{data?.name}</span>
        <Space>
          <DeleteOutlined
            title={"删除"}
            className={classNames(
              styles.propertyItem_icon,
              !isDelete && styles.propertyItem_icon_disabled,
            )}
            onClick={isDelete ? handleDelete : undefined}
          />
          <DownloadOutlined
            title={"下载到本地"}
            className={classNames(
              styles.propertyItem_icon,
              !isDownload && styles.propertyItem_icon_disabled,
            )}
            onClick={isDelete ? handleDownload : undefined}
          />
        </Space>
      </div>
    </Popover>
  );
}
