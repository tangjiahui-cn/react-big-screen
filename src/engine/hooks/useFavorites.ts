/**
 * useFavorites
 *
 * @author tangjiahui
 * @date 2024/12/24
 * @description 获取收藏夹列表
 */
import engine, { FavoritesComponentType } from "..";
import { useState } from "react";
import { useEffectOnce } from "@/hooks";

export function useFavorites(): FavoritesComponentType[] {
  const [favorites, setFavorites] = useState<FavoritesComponentType[]>([]);

  useEffectOnce(() => {
    setFavorites(engine.favorites.getAll());
    return engine.favorites.onChange((list) => {
      setFavorites([...list]);
    });
  });

  return favorites;
}
