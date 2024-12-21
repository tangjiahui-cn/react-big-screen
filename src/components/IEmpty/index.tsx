/**
 * Empty
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import React from 'react';
import { Empty } from 'antd';
import styles from './index.module.less';
import classNames from 'classnames';

interface EmptyType {
  description?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function IEmpty(props: EmptyType) {
  const { description = '暂无数据' } = props;
  return (
    <div className={classNames(props.className, styles.iEmpty)} style={props?.style}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
    </div>
  );
}
