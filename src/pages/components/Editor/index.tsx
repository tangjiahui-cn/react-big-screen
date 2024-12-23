/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <div className={styles.editor_render} style={{ width: 1920, height: 1080 }}></div>
    </div>
  );
}
