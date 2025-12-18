import { createContext } from 'react';

export type PanelMode = 'create' | 'edit' | 'detail';
export type PanelType =
  | 'users'
  | 'templates'
  | 'blog'
  | 'orders'
  | 'payments'
  | 'contacts'
  | 'logs'
  | 'deploy'
  | 'landing';

export interface RightPanelState {
  isOpen: boolean;
  type?: PanelType;
  mode?: PanelMode;
  id?: string;
  payload?: any;
}

export interface RightPanelContextValue extends RightPanelState {
  openPanel: (config: { type: PanelType; mode: PanelMode; id?: string; payload?: any }) => void;
  closePanel: () => void;
  setPanelData: (data: Partial<RightPanelState>) => void;
}

export const RightPanelContext = createContext<RightPanelContextValue | undefined>(undefined);
