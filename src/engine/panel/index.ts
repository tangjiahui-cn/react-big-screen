/**
 * panel
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { PanelType } from '@/engine/type';
import { getGlobalState, setGlobalState } from '@/engine';

export class Panel {
  /**
   * setPanels
   * @param panels all panels data.
   */
  setPanels(panels: PanelType[]): void {
    setGlobalState({
      panels,
    });
  }

  /**
   * use first panel.
   */
  useFirstPanel() {
    setGlobalState((state) => {
      return {
        runtime: {
          ...state.runtime,
          currentPanelId: state.panels[0]?.panelId,
        },
      };
    });
  }

  /**
   * get a panel by panelId.
   * @param panelId
   */
  getPanel(panelId: string) {
    return this.getPanels().find((panel: PanelType): boolean => {
      return panel.panelId === panelId;
    });
  }

  /**
   * get panels.
   */
  getPanels(): PanelType[] {
    return getGlobalState().panels;
  }
}
