/**
 * Favorites
 *
 * @author tangjiahui
 * @date 2025/2/5
 * @description 收藏夹。
 */
import styles from "./index.module.less";
import engine, { FavoritesComponentType, useFavorites } from "@/engine";
import IEmpty from "@/components/IEmpty";
import Item from "./components/Item";

export default function () {
  const favorites = useFavorites();

  // 删除一个favorite
  function handleDelete(favorite: FavoritesComponentType) {
    engine.favorites.delete(favorite);
  }

  return (
    <div className={styles.favorites}>
      {!favorites?.length && <IEmpty />}
      {favorites.map((favorite: FavoritesComponentType) => {
        return (
          <Item key={favorite.id} favorite={favorite} onDelete={() => handleDelete(favorite)} />
        );
      })}
    </div>
  );
}
