/**
 * favorite详情弹窗
 *
 * @author tangjiahui
 * @date 2025/2/22
 */
import { createBindModalHook } from "@/hooks";
import { Descriptions, Modal } from "antd";
import engine, { FavoritesComponentType } from "@/engine";
import styles from "./index.module.less";
import IEmpty from "@/components/IEmpty";
import ComponentNodeImage from "@/components/ComponentNodeImage";

interface Params {
  favorite: FavoritesComponentType;
}

const useFavoriteDetailDialog = createBindModalHook<Params>((props) => {
  const favorite = props?.params?.favorite;

  return (
    <Modal
      centered
      title={<div className={styles.favoriteDetailDialog_title}>{favorite?.name}</div>}
      open={props?.visible}
      onCancel={props?.onCancel}
      afterClose={props?.afterClose}
      okText={"保存"}
      cancelText={"取消"}
      footer={null}
      bodyStyle={{ padding: "12px 24px 24px", height: 500, overflowY: "hidden" }}
    >
      <Descriptions
        column={2}
        labelStyle={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}
        contentStyle={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}
      >
        <Descriptions.Item label={"id"}>{favorite?.id}</Descriptions.Item>
        <Descriptions.Item label={"创建时间"}>{favorite?.gmtCreate}</Descriptions.Item>
      </Descriptions>
      <div className={styles.favoriteDetailDialog_componentNodes}>
        {!favorite?.children?.length && <IEmpty />}
        {favorite?.children?.map?.((componentNode) => {
          const component = engine.component.get(componentNode.cId);
          return (
            <div key={componentNode.id} className={styles.favoriteDetailDialog_item}>
              <ComponentNodeImage
                src={component?.icon}
                style={{ maxWidth: "50%", maxHeight: "50%" }}
              />
              <span>{componentNode.name}</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
});

export default useFavoriteDetailDialog;
