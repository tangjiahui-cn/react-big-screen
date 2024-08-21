/**
 * App
 */
import Head from './Head';
import Menu from './Menu';
import Body from './Body';
import Attributes from './Attributes';
import styles from './index.module.less';
import 'antd/dist/antd.min.css';

/**
 * 操作流程：
 * （1）从Menu拖拽组件到Body
 * （2）在Body上编辑JSON
 * （3）通过Attribute修改选中实例的属性
 * （4）保存JSON
 * （5）预览JSON
 */
export default function App() {
  return (
    <div className={styles.page}>
      <div className={styles.page_head}>
        <Head />
      </div>
      <div className={styles.page_body}>
        <div className={styles.page_body_left}>
          <Menu />
        </div>
        <div className={styles.page_body_body}>
          <Body />
        </div>
        <div className={styles.page_body_right}>
          <Attributes />
        </div>
      </div>
    </div>
  );
}
