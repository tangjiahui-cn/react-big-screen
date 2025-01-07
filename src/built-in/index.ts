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
    cName: '按钮',
    icon: ICON_BUTTON,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    options: {},
    component: Button,
  },
  {
    cId: 'input',
    cName: '输入框',
    icon: ICON_INPUT,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    options: {},
    component: Button,
  },
  {
    cId: 'image',
    cName: '图片',
    icon: ICON_IMAGE,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    options: {},
    component: Button,
  },
  {
    cId: 'tabs',
    cName: '标签页',
    icon: ICON_TABS,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    options: {},
    component: Button,
  },
];
