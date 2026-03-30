import { MosaicPath } from './types';

export type MosaicDropTargetPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';
export const MosaicDropTargetPosition = {
  TOP: 'top' as const,
  BOTTOM: 'bottom' as const,
  LEFT: 'left' as const,
  RIGHT: 'right' as const,
};

export interface MosaicDropData {
  path?: MosaicPath;
  position?: MosaicDropTargetPosition;
  tabReorderIndex?: number; // For tab reordering within the same container
  /**
   * When true, an application drop target (outside the mosaic tree) handled the drop
   * and applied tree updates itself. Drag sources must not call `show()` / reset the hide.
   * Return this from `drop()` only after mutations are applied.
   */
  handledOutsideMosaic?: boolean;
}

export interface MosaicDragItem {
  mosaicId: string;
  /**
   * Path of the node hidden when the drag started — same path passed to `hide()`.
   * Lets external drop targets (e.g. a toolbar) know what to extract from the layout.
   */
  sourcePath: MosaicPath;
  isTab?: boolean;
  tabIndex?: number;
  tabKey?: string | number;
  tabContainerPath?: MosaicPath;
  hideTimer?: number;
}

// Union type for different drop scenarios
export type DropInfo = 
  | { type: 'split', position: MosaicDropTargetPosition }
  | { type: 'tab-container' }
  | { type: 'tab-reorder', insertIndex: number };