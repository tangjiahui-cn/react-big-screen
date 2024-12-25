import { JsonType } from '@/engine';

export const mockJSON: JsonType = {
  panels: [
    {
      panelId: '1',
      name: '首页',
      groups: {
        'group-aaa': {
          groupId: 'group-bbb',
        },
        'group-bbb': {
          groupId: false,
        },
      },
      children: [
        {
          id: 'aaaaa', // 实例id
          cId: 'button', // 组件模板id（group表示groupId）
          width: 100,
          height: 50,
          options: {
            // 组件配置项
            type: 'primary',
            children: '查询',
          },
          groupId: 'group-aaa', // 当前组件成组时，会有groupId
        },
        {
          id: 'bbbbb',
          cId: 'button',
          width: 200,
          height: 32,
          options: {
            type: 'default',
            children: '重置',
          },
        },
      ],
    },
  ],
  config: {
    width: 1920,
    height: 1080,
  },
};
