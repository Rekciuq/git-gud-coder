import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  MouseEvent,
  useMemo,
} from "react";

type UseCreateRangeFieldProps = {
  rangeBarRef: RefObject<HTMLDivElement | null>;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onDragEnd?: () => void;
};

export const useCreateRangeField = (props: UseCreateRangeFieldProps) => {
  const { rangeBarRef, min, max, minValue, maxValue } = props;

  const savedProps = useRef(props);
  useLayoutEffect(() => {
    savedProps.current = props;
  });

  const [barWidth, setBarWidth] = useState(0);
  const isMinThumbDraggingRef = useRef(false);
  const isMaxThumbDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    const updateBarWidth = () => {
      const rect = rangeBarRef.current?.getBoundingClientRect();
      if (rect) {
        setBarWidth(rect.width);
      }
    };

    updateBarWidth();
    const resizeObserver = new ResizeObserver(updateBarWidth);
    if (rangeBarRef.current) {
      resizeObserver.observe(rangeBarRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [rangeBarRef]);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (!isMinThumbDraggingRef.current && !isMaxThumbDraggingRef.current) {
        return;
      }

      const {
        rangeBarRef,
        min,
        max,
        minValue,
        maxValue,
        onMinChange,
        onMaxChange,
      } = savedProps.current;

      const rangeBar = rangeBarRef.current;
      if (!rangeBar || barWidth === 0) return;

      const barRect = rangeBar.getBoundingClientRect();
      const offsetX = event.clientX - barRect.left;
      const newPercentage = Math.max(0, Math.min(offsetX / barRect.width, 1));
      const range = max - min;
      const newValue = Math.round(min + newPercentage * range);

      if (isMinThumbDraggingRef.current) {
        const clampedValue = Math.min(newValue, maxValue);
        onMinChange(clampedValue);
      } else if (isMaxThumbDraggingRef.current) {
        const clampedValue = Math.max(newValue, minValue);
        onMaxChange(clampedValue);
      }
    };

    const handleMouseUp = () => {
      if (isMinThumbDraggingRef.current || isMaxThumbDraggingRef.current) {
        isMinThumbDraggingRef.current = false;
        isMaxThumbDraggingRef.current = false;
        setIsDragging(false);

        savedProps.current.onDragEnd?.();
      }
    };

    const controller = new AbortController();
    window.addEventListener("mousemove", handleMouseMove, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", handleMouseUp, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [barWidth]);

  const positions = useMemo(() => {
    const range = max - min;
    if (range === 0 || barWidth === 0) {
      return { minThumbPx: 0, maxThumbPx: 0 };
    }
    const minPercent = (minValue - min) / range;
    const maxPercent = (maxValue - min) / range;
    return {
      minThumbPx: minPercent * barWidth,
      maxThumbPx: maxPercent * barWidth,
    };
  }, [minValue, maxValue, min, max, barWidth]);

  const handleMinMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isMinThumbDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleMaxMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isMaxThumbDraggingRef.current = true;
    setIsDragging(true);
  };

  return {
    isDragging,
    position: {
      inPixels: {
        maxThumb: positions.maxThumbPx,
        minThumb: positions.minThumbPx,
      },
    },
    events: {
      mouseDown: {
        maxThumb: handleMaxMouseDown,
        minThumb: handleMinMouseDown,
      },
    },
  };
};
