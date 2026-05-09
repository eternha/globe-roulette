import { useRef, useCallback, useEffect } from "react";

const MAX_PULL_PX = 160;
const DEAD_ZONE_PX = 4;

interface PullGestureOptions {
  /** Called when the pointer first presses down on the element */
  readonly onStart: () => void;
  /** Called on each pointer move with normalized strength and pixel offset */
  readonly onMove: (pullStrength: number, offsetY: number) => void;
  /** Called when the pointer is released */
  readonly onRelease: () => void;
  /** When true, pointer events are ignored (e.g. during launch) */
  readonly disabled?: boolean;
}

interface PullGestureBind {
  readonly ref: React.RefCallback<HTMLElement>;
  readonly onPointerDown: (e: React.PointerEvent) => void;
  readonly style: React.CSSProperties;
}

/**
 * Tracks a vertical pull gesture (downward drag) on a target element.
 *
 * Uses pointer events so it works identically for mouse and touch.
 * Emits callbacks for gesture lifecycle events — the consumer owns
 * the state (pull strength, offset, phase), not this hook.
 */
export function usePullGesture(options: PullGestureOptions): PullGestureBind {
  const { disabled = false } = options;

  const startY = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const activePointerId = useRef<number | null>(null);

  /*
   * Store callbacks in refs so the pointer event handlers never need
   * to be recreated when callback identity changes. This prevents
   * stale closures in the window-level listeners.
   */
  const onStartRef = useRef(options.onStart);
  const onMoveRef = useRef(options.onMove);
  const onReleaseRef = useRef(options.onRelease);
  onStartRef.current = options.onStart;
  onMoveRef.current = options.onMove;
  onReleaseRef.current = options.onRelease;

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (e.pointerId !== activePointerId.current) return;

    const deltaY = Math.max(0, e.clientY - startY.current - DEAD_ZONE_PX);
    const clamped = Math.min(deltaY, MAX_PULL_PX);
    const strength = clamped / MAX_PULL_PX;

    onMoveRef.current(strength, clamped);
  }, []);

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (e.pointerId !== activePointerId.current) return;

      activePointerId.current = null;
      elementRef.current?.releasePointerCapture(e.pointerId);

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);

      onReleaseRef.current();
    },
    [handlePointerMove],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (activePointerId.current !== null) return;

      e.preventDefault();
      activePointerId.current = e.pointerId;
      startY.current = e.clientY;

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      onStartRef.current();
    },
    [disabled, handlePointerMove, handlePointerUp],
  );

  const refCallback = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return {
    ref: refCallback,
    onPointerDown: handlePointerDown,
    style: { touchAction: "none", cursor: disabled ? "default" : "grab" },
  };
}
