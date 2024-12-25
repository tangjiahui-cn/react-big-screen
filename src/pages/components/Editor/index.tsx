/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import { useConfig } from '@/engine';

export default function Editor() {
  const config = useConfig();

  return (
    <div className={styles.editor}>
      <div
        className={styles.editor_render}
        style={{ width: config.width, height: config.height }}
      ></div>
    </div>
  );
}
