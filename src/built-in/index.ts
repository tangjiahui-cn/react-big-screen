/**
 * built-in components
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import type { ComponentType } from '@/engine';
import ICON_BUTTON from '@/static/built-in/button.png';
import ICON_INPUT from '@/static/built-in/input.png';
import ICON_IMAGE from '@/static/built-in/image.png';
import ICON_TABS from '@/static/built-in/tabs.png';

import Button from './Button';

export const builtInComponents: ComponentType[] = [
  {
    cId: 'button',
    name: '按钮',
    icon: ICON_BUTTON,
    component: Button,
  },
  {
    cId: 'input',
    name: '输入框',
    icon: ICON_INPUT,
    component: Button,
  },
  {
    cId: 'image',
    name: '图片',
    icon: ICON_IMAGE,
    component: Button,
  },
  {
    cId: 'tabs',
    name: '标签页',
    icon: ICON_TABS,
    component: Button,
  },
];
