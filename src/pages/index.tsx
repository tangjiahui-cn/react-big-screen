/**
 * Page
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import Header from './components/Header';
import Attributes from './components/Attributes';
import Editor from './components/Editor';
import Library from './components/Library';
import engine, { usePanel } from '@/engine';
import { builtInComponents } from '@/built-in';
import { mockJSON } from './mockJSON';
import { useEffectOnce } from '@/hooks';

export default function Page() {
  const panel = usePanel();

  useEffectOnce(() => {
    // register built-in components.
    engine.component.registerComponentList(builtInComponents);
    // load JSON
    engine.loadJSON(JSON.stringify(mockJSON));
    engine.panel.useFirstPanel();
    // log global
    console.log('zz get: ', engine.getGlobalState());
  });

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Header />
      </div>
      <div className={styles.page_body}>
        <div className={styles.page_body_left}>
          <Library />
        </div>
        <div className={styles.page_body_main}>
          <Editor panel={panel} />
        </div>
        <div className={styles.page_body_right}>
          <Attributes />
        </div>
      </div>
      {/*<div className={styles.page_footer}>底部区域</div>*/}
    </div>
  );
}
