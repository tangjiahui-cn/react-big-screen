/**
 * favorite item
 *
 * @author tangjiahui
 * @date 2025/2/22
 */
import styles from "./index.module.less";
import { StarOutlined } from "@ant-design/icons";
import { FavoritesComponentType } from "@/engine";
import { useVirtualDrag } from "@/packages/virtual-drag";
import { useRef } from "react";

interface Props {
  favorite: FavoritesComponentType;
  onDelete?: () => void;
}

export default function (props: Props) {
  const { favorite } = props;
  const domRef = useRef<HTMLDivElement>(null);

  useVirtualDrag(domRef, {
    type: "create-favorite",
    data: {
      favorite,
    },
  });

  return (
    <div key={favorite.id} className={styles.favoriteItem} ref={domRef}>
      <div className={styles.favoriteItem_head}>
        <StarOutlined />
      </div>
      <div className={styles.favoriteItem_name} title={favorite.id}>
        {favorite.id}
      </div>
      <a className={styles.favoriteItem_footer} onClick={() => props?.onDelete?.()}>
        删除
      </a>
    </div>
  );
}
