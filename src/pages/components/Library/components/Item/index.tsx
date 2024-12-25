/**
 * Component Item
 *
 * @author tangjiahui
 * @date 2024/12/15
 */
import styles from './index.module.less';
import { ComponentType } from '@/engine';
import classNames from 'classnames';

interface Props {
  className?: string;
  component: ComponentType;
}

export default function (props: Props) {
  const { component } = props;
  return (
    <div className={classNames(styles.componentItem, props?.className)}>
      <div className={styles.componentItem_body}>
        {component.icon ? <img src={component.icon} draggable={false} /> : <span>None</span>}
      </div>
      <div className={styles.componentItem_footer}>{component.name}</div>
    </div>
  );
}
