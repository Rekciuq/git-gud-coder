import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";

type UseCreateRangeFieldProps = {
  rangeBarRef: RefObject<HTMLDivElement | null>;
  minValue: number;
  maxValue: number;
  capValue: number;
};

const convertNumberToPercentage = (num: number, maxNum: number) => {
  if (maxNum === 0) return 0;
  return num / maxNum;
};

export const useCreateRangeField = ({
  rangeBarRef,
  minValue,
  maxValue,
  capValue,
}: UseCreateRangeFieldProps) => {
  const [barWidth, setBarWidth] = useState(0);

  const [minThumbPercent, setMinThumbPercent] = useState(
    convertNumberToPercentage(minValue, capValue) || 0,
  );

  const [maxThumbPercent, setMaxThumbPercent] = useState(
    convertNumberToPercentage(maxValue, capValue) || 1,
  );

  useEffect(() => {
    const convertedValue = convertNumberToPercentage(minValue, capValue);
    setMinThumbPercent(
      convertedValue <= maxThumbPercent ? convertedValue : maxThumbPercent || 0,
    );
  }, [minValue, capValue, maxThumbPercent]);

  useEffect(() => {
    const convertedValue = convertNumberToPercentage(maxValue, capValue);
    setMaxThumbPercent(
      convertedValue >= minThumbPercent ? convertedValue : minThumbPercent || 1,
    );
  }, [maxValue, capValue, minThumbPercent]);

  const isMinThumbDraggingRef = useRef(false);
  const minThumbStartXRef = useRef(0);

  const isMaxThumbDraggingRef = useRef(false);
  const maxThumbStartXRef = useRef(0);

  useLayoutEffect(() => {
    const updateBarWidth = () => {
      const rect = rangeBarRef.current?.getBoundingClientRect();
      if (rect) setBarWidth(rect.width);
    };

    updateBarWidth();

    const resizeObserver = new ResizeObserver(updateBarWidth);
    if (rangeBarRef.current) {
      resizeObserver.observe(rangeBarRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [rangeBarRef]);

  const minThumbPositionX = barWidth * minThumbPercent;
  const maxThumbPositionX = barWidth * maxThumbPercent;

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "mouseup",
      () => {
        isMinThumbDraggingRef.current = false;
        isMaxThumbDraggingRef.current = false;
      },
      { signal: controller.signal },
    );

    window.addEventListener(
      "mousemove",
      (event) => {
        const rangeBar = rangeBarRef.current;
        if (!rangeBar) return;

        const barRect = rangeBar.getBoundingClientRect();

        if (isMinThumbDraggingRef.current) {
          const offsetX = event.clientX - barRect.left;
          let newPosition = offsetX - minThumbStartXRef.current;
          newPosition = Math.max(0, Math.min(newPosition, maxThumbPositionX));
          setMinThumbPercent(newPosition / barWidth);
        }

        if (isMaxThumbDraggingRef.current) {
          const offsetX = event.clientX - barRect.left;
          let newPosition = offsetX - maxThumbStartXRef.current;
          newPosition = Math.max(
            minThumbPositionX,
            Math.min(newPosition, barWidth),
          );
          setMaxThumbPercent(newPosition / barWidth);
        }
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [minThumbPositionX, maxThumbPositionX, barWidth, rangeBarRef]);

  return {
    position: {
      inPixels: {
        maxThumb: maxThumbPositionX,
        minThumb: minThumbPositionX,
      },
      inPercentages: {
        maxThumb: Math.round(maxThumbPercent * 100),
        minThumb: Math.round(minThumbPercent * 100),
      },
    },
    events: {
      mouseDown: {
        maxThumb: (event: MouseEvent<HTMLDivElement>) => {
          event.preventDefault();

          isMaxThumbDraggingRef.current = true;

          const barRect = rangeBarRef.current?.getBoundingClientRect();
          if (!barRect) return;

          maxThumbStartXRef.current =
            event.clientX - barRect.left - maxThumbPositionX;
        },
        minThumb: (event: MouseEvent<HTMLDivElement>) => {
          event.preventDefault();
          isMinThumbDraggingRef.current = true;

          const barRect = rangeBarRef.current?.getBoundingClientRect();
          if (!barRect) return;

          minThumbStartXRef.current =
            event.clientX - barRect.left - minThumbPositionX;
        },
      },
    },
  };
};
