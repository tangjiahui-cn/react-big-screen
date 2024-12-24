/**
 * SizeBar
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import styles from './index.module.less';
import { CloseOutlined } from '@ant-design/icons';
import InputNumberWithSuffix from '@/components/InputNumberWithSuffix';
import { useConfig } from '@/engine/hooks/useConfig.ts';
import engine from '@/engine';

export default function SizeBar() {
  const config = useConfig();

  return (
    <div className={styles.sizeBar}>
      <InputNumberWithSuffix
        suffix={'px'}
        value={config.width}
        onChange={(width) => {
          engine.config.setConfig((config) => {
            return {
              ...config,
              width,
            };
          });
        }}
      />
      <CloseOutlined style={{ fontSize: 10 }} />
      <InputNumberWithSuffix
        suffix={'px'}
        value={config.height}
        onChange={(height) => {
          engine.config.setConfig((config) => {
            return {
              ...config,
              height,
            };
          });
        }}
      />
    </div>
  );
}
