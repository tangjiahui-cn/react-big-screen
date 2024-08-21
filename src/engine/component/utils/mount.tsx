/**
 * mount component to dom.
 *
 * @author tangjiahui
 * @date 2024/8/20
 */
import { createApp } from 'vue';
import { isValidElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { ReactOrVueComponent } from '../types';

type UnMountFn = () => void;

export function mountVueComponent(component: ReactOrVueComponent, dom: HTMLElement): UnMountFn {
  const root = createApp(component);
  root.mount(dom);
  return () => root.unmount();
}

export function mountReactComponent(component: ReactOrVueComponent, dom: HTMLElement): UnMountFn {
  const root = createRoot(dom);
  if (typeof component === 'function') {
    const Component = component;
    root.render(<Component />);
  } else if (isValidElement(component)) {
    root.render(component);
  } else {
    throw new Error('Invalid React Component.');
  }
  return () => root.unmount();
}

export function mountComponent(component: ReactOrVueComponent, dom: HTMLElement): UnMountFn {
  if (!component) {
    throw new Error('Invalid component.');
  }
  if (!dom) {
    throw new Error('Invalid DOM.');
  }

  const isVue = component?.hasOwnProperty('setup');
  if (isVue) {
    return mountVueComponent(component, dom);
  }

  return mountReactComponent(component, dom);
}
