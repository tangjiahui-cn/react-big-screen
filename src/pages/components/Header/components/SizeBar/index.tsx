/**
 * SizeBar
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import styles from './index.module.less';
import { CloseOutlined } from '@ant-design/icons';
import InputNumberWithSuffix from '@/components/InputNumberWithSuffix';
import { useState } from 'react';

export default function SizeBar() {
  const [value, setValue] = useState<{
    width: number;
    height: number;
  }>({
    width: 1920,
    height: 1080,
  });

  return (
    <div className={styles.sizeBar}>
      <InputNumberWithSuffix
        suffix={'px'}
        value={value.width}
        onChange={(width) => {
          setValue({ ...value, width: Number(width || 0) });
        }}
      />
      <CloseOutlined style={{ fontSize: 10 }} />
      <InputNumberWithSuffix
        suffix={'px'}
        value={value.height}
        onChange={(height) => {
          setValue({ ...value, height: Number(height || 0) });
        }}
      />
    </div>
  );
}
