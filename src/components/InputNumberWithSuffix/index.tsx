/**
 * InputNumberWithSuffix
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import { InputNumber, InputNumberProps } from 'antd';
import styles from './index.module.less';
import React from 'react';
import classNames from 'classnames';

interface InputNumberWithSuffixProps extends InputNumberProps {
  suffix?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export default function InputNumberWithSuffix(props: InputNumberWithSuffixProps) {
  const { suffix, containerStyle, containerClassName, ...rest } = props;
  return (
    <div
      style={containerStyle}
      className={classNames(styles.inputNumberWithSuffix, containerClassName)}
    >
      <InputNumber size={'small'} style={{ width: 70 }} {...rest} />
      {suffix && <div className={styles.inputNumberWithSuffix_suffix}>{suffix}</div>}
    </div>
  );
}
