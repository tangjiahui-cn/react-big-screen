/**
 * Attributes
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import { Empty, Tabs } from 'antd';

export default function Attributes() {
  return (
    <div className={styles.attributes}>
      <Tabs
        style={{ padding: '0 16px' }}
        size={'small'}
        items={[
          { key: '1', label: '属性' },
          { key: '2', label: '数据' },
          { key: '3', label: '交互' },
        ]}
      />
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />
    </div>
  );
}
