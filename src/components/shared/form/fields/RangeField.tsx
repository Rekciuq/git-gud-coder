"use client";

import { cn } from "@/lib/cn";
import Input from "../Input";
import Label from "../Label";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type RangeFieldProps = {
  name: string;
  label?: string;
  className?: string;
  min: number;
  max: number;
};

const RangeField = ({ name, label, className, min, max }: RangeFieldProps) => {
  const baseClassNames = "bg-background flex flex-col";
  const minRangeName = `min-${name}`;
  const maxRangeName = `max-${name}`;

  const rangeBarRef = useRef<HTMLDivElement>(null);

  const minThumbDivRef = useRef<HTMLDivElement>(null);
  const maxThumbDivRef = useRef<HTMLDivElement>(null);

  const isMinThumbDraggingRef = useRef(false);
  const minThumbStartXRef = useRef(0);

  const isMaxThumbDraggingRef = useRef(false);
  const maxThumbStartXRef = useRef(0);

  const [barWidth, setBarWidth] = useState(0);
  const [minThumbPercent, setMinThumbPercent] = useState(0);
  const [maxThumbPercent, setMaxThumbPercent] = useState(1);

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
  }, []);

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
  }, [minThumbPositionX, maxThumbPositionX, barWidth]);

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);

  return (
    <div className={cn(baseClassNames, className)}>
      {!!label && <Label text={label} />}
      <Input
        ref={minRangeRef}
        min={min}
        max={max}
        name={minRangeName}
        className="hidden"
        type="range"
      />
      <Input
        ref={maxRangeRef}
        min={min}
        max={max}
        name={maxRangeName}
        className="hidden"
        type="range"
      />
      <div className="w-full py-4 text-primary-text text-xs">
        <div className="w-full inline-flex justify-between pb-2">
          <p>{min}</p>
          <p>{max}</p>
        </div>
        <div className="relative flex w-full items-center">
          <div
            style={{ left: minThumbPositionX }}
            ref={minThumbDivRef}
            onMouseDown={(event) => {
              event.preventDefault();
              isMinThumbDraggingRef.current = true;

              const barRect = rangeBarRef.current?.getBoundingClientRect();
              if (!barRect) return;

              minThumbStartXRef.current =
                event.clientX - barRect.left - minThumbPositionX;
            }}
            className="w-4 h-4 z-10 absolute bg-primary-text"
          ></div>
          <div
            style={{ left: maxThumbPositionX }}
            ref={maxThumbDivRef}
            onMouseDown={(event) => {
              event.preventDefault();

              isMaxThumbDraggingRef.current = true;

              const barRect = rangeBarRef.current?.getBoundingClientRect();
              if (!barRect) return;

              maxThumbStartXRef.current =
                event.clientX - barRect.left - maxThumbPositionX;
            }}
            className="w-4 h-4 z-10 absolute bg-primary-text"
          ></div>
          <div ref={rangeBarRef} className="w-full bg-panel h-2 mx-2"></div>
          <div
            style={{
              width: maxThumbPositionX - minThumbPositionX,
              left: minThumbPositionX,
            }}
            className="h-2 bg-primary-text absolute mx-2 pointer-events-none"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RangeField;
