import { useCallback, useRef, useState } from "react";

/**
 * Swipe-to-dismiss hook for bottom sheets.
 *
 * Returns:
 *  - `dragY`: current vertical drag offset in pixels (≥ 0)
 *  - `isDragging`: whether a drag gesture is currently active
 *  - `isDismissing`: whether the dismiss exit animation is playing
 *  - `handlers`: spread these onto the drag handle element
 *
 * Usage on the drag handle:
 *
 *   const swipe = useSwipeToDismiss(onClose);
 *   <div className="handle" {...swipe.handlers}>...</div>
 *
 * Apply transform/transition to the sheet element so it follows the finger:
 *
 *   style={{
 *     transform: swipe.dragY > 0 ? `translateY(${swipe.dragY}px)` : undefined,
 *     transition: swipe.isDragging ? "none" : undefined,
 *   }}
 *
 * Optionally add a `--dismissing` class while `isDismissing` is true to play
 * a CSS exit animation; the hook will call `onClose` after the configured
 * `dismissDelay`.
 */

interface SwipeToDismissOptions {
  /** Pixels the user must drag downward before release dismisses the sheet. */
  readonly threshold?: number;
  /** Delay (ms) before `onClose` is called after a successful dismiss. */
  readonly dismissDelay?: number;
}

interface SwipeToDismissResult {
  readonly dragY: number;
  readonly isDragging: boolean;
  readonly isDismissing: boolean;
  readonly handlers: {
    readonly onPointerDown: (e: React.PointerEvent) => void;
    readonly onPointerMove: (e: React.PointerEvent) => void;
    readonly onPointerUp: (e: React.PointerEvent) => void;
    readonly onPointerCancel: (e: React.PointerEvent) => void;
  };
}

const DEFAULT_THRESHOLD = 80;
const DEFAULT_DISMISS_DELAY = 0;

export function useSwipeToDismiss(
  onClose: () => void,
  options: SwipeToDismissOptions = {},
): SwipeToDismissResult {
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const dismissDelay = options.dismissDelay ?? DEFAULT_DISMISS_DELAY;

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const dragStartY = useRef(0);
  /* Keep the latest dragY accessible inside pointer-up without
     adding it as a dependency to the callback. */
  const dragYRef = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
      dragStartY.current = e.clientY;
      dragYRef.current = 0;
      setDragY(0);
      setIsDragging(true);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const dy = Math.max(0, e.clientY - dragStartY.current);
      dragYRef.current = dy;
      setDragY(dy);
    },
    [isDragging],
  );

  const finishDrag = useCallback(
    (e: React.PointerEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
      if (!isDragging) return;
      setIsDragging(false);
      if (dragYRef.current > threshold) {
        setIsDismissing(true);
        if (dismissDelay > 0) {
          setTimeout(onClose, dismissDelay);
        } else {
          onClose();
        }
      } else {
        setDragY(0);
        dragYRef.current = 0;
      }
    },
    [isDragging, threshold, dismissDelay, onClose],
  );

  return {
    dragY,
    isDragging,
    isDismissing,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
  };
}
