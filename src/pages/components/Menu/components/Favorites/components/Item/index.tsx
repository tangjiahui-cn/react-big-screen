/**
 * favorite item
 *
 * @author tangjiahui
 * @date 2025/2/22
 */
import styles from "./index.module.less";
import { BarsOutlined, DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { FavoritesComponentType } from "@/engine";
import { useVirtualDrag } from "@/packages/virtual-drag";
import { useRef } from "react";
import { Tooltip } from "antd";
import { useDomEvents } from "@/hooks";

interface Props {
  favorite: FavoritesComponentType;
  onDelete?: () => void; // 删除回调
  onEdit?: () => void;
  onDetail?: () => void;
}

export default function (props: Props) {
  const { favorite } = props;
  const domRef = useRef<HTMLDivElement>(null);
  const optDomRef = useRef<HTMLDivElement>(null);

  useVirtualDrag(domRef, {
    type: "create-favorite",
    data: {
      favorite,
    },
  });

  useDomEvents(optDomRef, {
    mousedown(e) {
      e.stopPropagation();
    },
  });

  return (
    <div key={favorite.id} className={styles.favoriteItem} ref={domRef}>
      <div className={styles.favoriteItem_head}>
        <StarOutlined />
      </div>
      <div className={styles.favoriteItem_name} title={favorite.id}>
        {favorite.name}
      </div>
      <div className={styles.favoriteItem_footer} ref={optDomRef}>
        <Tooltip title={"编辑"}>
          <EditOutlined onClick={() => props?.onEdit?.()} />
        </Tooltip>
        <Tooltip title={"删除"}>
          <DeleteOutlined onClick={() => props?.onDelete?.()} />
        </Tooltip>
        <Tooltip title={"详情"}>
          <BarsOutlined onClick={() => props?.onDetail?.()} />
        </Tooltip>
      </div>
    </div>
  );
}
