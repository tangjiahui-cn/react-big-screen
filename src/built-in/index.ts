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
import Image from './Image';
import Input from './Input';
import Tabs from './Tabs';

export const builtInComponents: ComponentType[] = [
  {
    cId: 'button',
    cName: '按钮',
    icon: ICON_BUTTON,
    width: 64,
    height: 32,
    options: {
      type: 'primary',
      children: '按钮',
    },
    component: Button,
  },
  {
    cId: 'input',
    cName: '输入框',
    icon: ICON_INPUT,
    width: 180,
    height: 32,
    options: {
      allowClear: true,
      defaultValue: '',
      placeholder: '请输入',
    },
    component: Input,
  },
  {
    cId: 'image',
    cName: '图片',
    icon: ICON_IMAGE,
    width: 270,
    height: 150,
    options: {
      src: 'https://ts3.cn.mm.bing.net/th?id=OIP-C.3r1vguZyWFUJ80A2Nf2k3AHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    },
    component: Image,
  },
  {
    cId: 'tabs',
    cName: '标签页',
    icon: ICON_TABS,
    width: 100,
    height: 100,
    options: {
      items: [
        { label: 'Tab1', key: '1' },
        { label: 'Tab2', key: '2' },
      ],
    },
    component: Tabs,
  },
];
