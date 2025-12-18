import { useContext } from 'react';
import { RightPanelContext } from './RightPanelContext';

export function useRightPanel() {
  const ctx = useContext(RightPanelContext);
  if (!ctx) throw new Error('useRightPanel must be used within RightPanelProvider');
  return ctx;
}
