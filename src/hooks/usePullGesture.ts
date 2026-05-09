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

/* ── Module-level handler factory ───────────────────────── */

interface GestureRefs {
  activePointerId: React.MutableRefObject<number | null>;
  startY: React.MutableRefObject<number>;
  elementRef: React.MutableRefObject<HTMLElement | null>;
  onMoveRef: React.MutableRefObject<
    (pullStrength: number, offsetY: number) => void
  >;
  onReleaseRef: React.MutableRefObject<() => void>;
}

function createGestureHandlers(refs: GestureRefs) {
  const move = (e: PointerEvent) => {
    if (e.pointerId !== refs.activePointerId.current) return;

    const deltaY = Math.max(
      0,
      e.clientY - refs.startY.current - DEAD_ZONE_PX,
    );
    const clamped = Math.min(deltaY, MAX_PULL_PX);
    const strength = clamped / MAX_PULL_PX;

    refs.onMoveRef.current(strength, clamped);
  };

  const up = (e: PointerEvent) => {
    if (e.pointerId !== refs.activePointerId.current) return;

    refs.activePointerId.current = null;
    refs.elementRef.current?.releasePointerCapture(e.pointerId);

    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);

    refs.onReleaseRef.current();
  };

  return { move, up };
}

/* ── Hook ───────────────────────────────────────────────── */

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

  useEffect(() => {
    onStartRef.current = options.onStart;
    onMoveRef.current = options.onMove;
    onReleaseRef.current = options.onRelease;
  });

  const handlers = useRef<{
    move: (e: PointerEvent) => void;
    up: (e: PointerEvent) => void;
  } | null>(null);

  /* Lazy-initialise handlers on mount via effect */
  useEffect(() => {
    if (handlers.current) return;
    handlers.current = createGestureHandlers({
      activePointerId,
      startY,
      elementRef,
      onMoveRef,
      onReleaseRef,
    });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (activePointerId.current !== null) return;

      /* Ensure handlers exist (first pointer event may fire
         in the same microtask as the mount effect) */
      if (!handlers.current) {
        handlers.current = createGestureHandlers({
          activePointerId,
          startY,
          elementRef,
          onMoveRef,
          onReleaseRef,
        });
      }

      e.preventDefault();
      activePointerId.current = e.pointerId;
      startY.current = e.clientY;

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      window.addEventListener("pointermove", handlers.current.move);
      window.addEventListener("pointerup", handlers.current.up);
      window.addEventListener("pointercancel", handlers.current.up);

      onStartRef.current();
    },
    [disabled],
  );

  const refCallback = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      const h = handlers.current;
      if (!h) return;
      window.removeEventListener("pointermove", h.move);
      window.removeEventListener("pointerup", h.up);
      window.removeEventListener("pointercancel", h.up);
    };
  }, []);

  return {
    ref: refCallback,
    onPointerDown: handlePointerDown,
    style: { touchAction: "none", cursor: disabled ? "default" : "grab" },
  };
}
