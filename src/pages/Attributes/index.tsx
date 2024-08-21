/**
 * Attributes
 *
 * @author tangjiahui
 * @date 2024/8/21
 */
import { InputNumber, Space } from 'antd';
import styles from './index.module.less';

export default function Menu() {
  return (
    <div className={styles.attributes}>
      <Space>名称：</Space>
      <Space style={{ marginTop: 12, width: '100%' }} direction={'vertical'}>
        <Space style={{ width: '100%' }}>
          <div style={{ width: 50, textAlign: 'right' }}>宽度：</div>
          <InputNumber />
        </Space>
        <Space style={{ width: '100%' }}>
          <div style={{ width: 50, textAlign: 'right' }}>高度：</div>
          <InputNumber />
        </Space>
        <Space style={{ width: '100%' }}>
          <div style={{ width: 50, textAlign: 'right' }}>x：</div>
          <InputNumber />
        </Space>
        <Space style={{ width: '100%' }}>
          <div style={{ width: 50, textAlign: 'right' }}>y：</div>
          <InputNumber />
        </Space>
      </Space>
    </div>
  );
}
