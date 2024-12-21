/**
 * built-in components
 *
 * @author tangjiahui
 * @date 2024/12/21
 */
import type { Component } from '@/pages/core';
import ICON_BUTTON from '@/static/built-in/button.png';
import ICON_INPUT from '@/static/built-in/input.png';
import ICON_IMAGE from '@/static/built-in/image.png';
import ICON_TABS from '@/static/built-in/tabs.png';

export const components: Component[] = [
  {
    id: 'button',
    name: '按钮',
    icon: ICON_BUTTON,
  },
  {
    id: 'input',
    name: '输入框',
    icon: ICON_INPUT,
  },
  {
    id: 'image',
    name: '图片',
    icon: ICON_IMAGE,
  },
  {
    id: 'tabs',
    name: '标签页',
    icon: ICON_TABS,
  },
];
