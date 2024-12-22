/**
 * IconFont
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import './index.less';
import './iconfont.js';

type ICON_TYPE = 'icon-undo' | 'icon-cancel-undo';

export interface IconFontProps {
  type?: ICON_TYPE;
}

export default function IconFont(props: IconFontProps) {
  return (
    <svg className='icon' aria-hidden='true'>
      <use xlinkHref={`#${props?.type}`}></use>
    </svg>
  );
}
