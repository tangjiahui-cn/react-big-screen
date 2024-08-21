/**
 * Menu
 *
 * @author tangjiahui
 * @date 2024/8/21
 */
import { useEffect, useState } from 'react';
import { ComponentType } from '../../packages/component/types';
import styles from './index.module.less';
import engine from '../../engine';

export default function Menu() {
  const [list, setList] = useState<ComponentType[]>([]);

  useEffect(() => {
    setList(engine.component.getAll());
  }, []);

  return (
    <div className={styles.menu}>
      {list.map((x: ComponentType) => {
        return (
          <div key={x?.id} className={styles.menu_item}>
            {x?.name}
          </div>
        );
      })}
    </div>
  );
}
