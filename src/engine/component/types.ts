/**
 * types
 *
 * @author tangjiahui
 * @date 2024/8/20
 */
export type ReactOrVueComponent = any;

export interface ComponentType {
  id: string;
  name: string;
  body: ReactOrVueComponent;
  width: number;
  height: number;
}
