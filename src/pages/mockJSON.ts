import { JsonType } from '@/engine';

export const mockJSON: JsonType = {
  componentNodes: [
    {
      id: '1',
      name: '按钮一',
      cId: 'button',
      cName: '按钮',
      x: 0,
      y: 0,
      width: 80,
      height: 32,
      options: {
        type: 'primary',
        children: '按钮一',
      },
    },
    {
      id: '2',
      name: '按钮二',
      cId: 'button',
      cName: '按钮',
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      options: {
        type: 'default',
        children: '按钮二',
      },
    },
  ],
  config: {
    width: 1920,
    height: 1080,
  },
  used: {},
};
