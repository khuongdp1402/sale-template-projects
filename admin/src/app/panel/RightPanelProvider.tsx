import { ReactNode, useCallback, useMemo, useState } from 'react';
import { RightPanelContext, RightPanelState, PanelType, PanelMode } from './RightPanelContext';
import { PanelRenderer } from './PanelRenderer';

export function RightPanelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RightPanelState>({ isOpen: false });

  const openPanel = useCallback((config: { type: PanelType; mode: PanelMode; id?: string; payload?: any }) => {
    setState({ isOpen: true, ...config });
  }, []);

  const closePanel = useCallback(() => {
    setState({ isOpen: false });
  }, []);

  const setPanelData = useCallback((data: Partial<RightPanelState>) => {
    setState((prev) => ({ ...prev, ...data }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      openPanel,
      closePanel,
      setPanelData,
    }),
    [state, openPanel, closePanel, setPanelData]
  );

  return (
    <RightPanelContext.Provider value={value}>
      {children}
      <PanelRenderer />
    </RightPanelContext.Provider>
  );
}
