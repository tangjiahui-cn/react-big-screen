/**
 * Favorites
 *
 * @author tangjiahui
 * @date 2025/2/5
 * @description 收藏夹。
 */
import styles from "./index.module.less";
import { FavoritesComponentType, useFavorites } from "@/engine";
import IEmpty from "@/components/IEmpty";
import Item from "./components/Item";
import useEditFavoriteDialog from "./components/EditFavoriteDialog";
import useFavoriteDetailDialog from "./components/FavoriteDetailDialog";
import { useEngineContext } from "@/export/context";

export default function () {
  const { engine } = useEngineContext();
  const favorites = useFavorites();
  const favoriteDetailDialog = useFavoriteDetailDialog();
  const editFavoriteDialog = useEditFavoriteDialog({
    onOk(updateFavorite) {
      engine.favorites.update(updateFavorite.id, updateFavorite);
    },
  });

  // 删除一个favorite
  function handleDelete(favorite: FavoritesComponentType) {
    engine.favorites.delete(favorite);
  }

  return (
    <div className={styles.favorites}>
      {!favorites?.length && <IEmpty />}
      {favorites.map((favorite: FavoritesComponentType) => {
        return (
          <Item
            key={favorite.id}
            favorite={favorite}
            onDelete={() => handleDelete(favorite)}
            onEdit={() => {
              editFavoriteDialog.open({
                favorite,
              });
            }}
            onDetail={() => {
              favoriteDetailDialog.open({
                favorite,
              });
            }}
          />
        );
      })}
    </div>
  );
}
