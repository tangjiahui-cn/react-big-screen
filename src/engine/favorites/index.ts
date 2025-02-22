/**
 * 收藏夹
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来管理所有的收藏夹。
 */
import { FavoritesComponentType } from "..";

type ListenerCallback = (list: FavoritesComponentType[]) => void;

export default class Favorites {
  private favorites: FavoritesComponentType[] = [];
  private listeners: ListenerCallback[] = [];

  // 触发listeners
  private notifyChange() {
    const list = this.getAll();
    this.listeners.forEach((cb) => {
      cb(list);
    });
  }

  // 监听收藏夹变更
  public onChange(listener: ListenerCallback) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((cb) => {
        return cb !== listener;
      });
    };
  }

  // 添加到收藏夹
  public add(favoriteComponent: FavoritesComponentType | FavoritesComponentType[]) {
    const list = Array.isArray(favoriteComponent) ? favoriteComponent : [favoriteComponent];
    this.favorites.push(...list);
    this.notifyChange();
  }

  // 设置收藏夹
  public set(favoriteComponent: FavoritesComponentType | FavoritesComponentType[]) {
    this.favorites = Array.isArray(favoriteComponent) ? favoriteComponent : [favoriteComponent];
    this.notifyChange();
  }

  // 更新收藏组件
  public update(
    id: string,
    extFavorite:
      | Partial<FavoritesComponentType>
      | ((favorite: FavoritesComponentType) => Partial<FavoritesComponentType>),
  ) {
    const favorite = this.get(id);
    if (!favorite) {
      return;
    }
    Object.assign(
      favorite,
      typeof extFavorite === "function" ? extFavorite(favorite) : extFavorite,
    );
    this.notifyChange();
  }

  // 删除收藏组件
  public delete(id: string | FavoritesComponentType | (string | FavoritesComponentType)[]) {
    // 待删除ids
    const deleteIds = (Array.isArray(id) ? id : [id]).reduce((ids, item) => {
      const id = typeof item === "string" ? item : item?.id;
      if (id) ids.push(id);
      return ids;
    }, [] as string[]);

    this.favorites = this.favorites.filter((favorite) => {
      return !deleteIds.includes(favorite.id);
    });

    this.notifyChange();
  }

  // 获取一个收藏组件
  public get(id: string): FavoritesComponentType | undefined {
    return this.favorites.find((favorite) => favorite.id === id);
  }

  // 获取全部收藏组件
  public getAll(): FavoritesComponentType[] {
    return this.favorites;
  }
}
