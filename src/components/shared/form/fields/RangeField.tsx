"use client";

import { cn } from "@/lib/cn";
import Input from "../Input";
import Label from "../Label";
import { useRef } from "react";
import { useCreateRangeField } from "@/features/dashboard/hooks/useCreateRangeField";
import { useFormContext } from "react-hook-form";

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

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);

  const { watch } = useFormContext();

  const minInputValue = watch(minRangeName);
  const maxInputValue = watch(maxRangeName);

  const createdRange = useCreateRangeField({
    rangeBarRef,
    minValue: Number(minInputValue),
    maxValue: Number(maxInputValue),
    capValue: max,
  });
  console.log(createdRange);

  return (
    <div className={cn(baseClassNames, className)}>
      {!!label && <Label text={label} />}
      <div className="inline-flex gap-10 justify-between">
        <Input
          ref={minRangeRef}
          min={min}
          max={max - 1}
          name={minRangeName}
          type="number"
        />
        <Input
          ref={maxRangeRef}
          min={min + 1}
          max={max}
          name={maxRangeName}
          type="number"
        />
      </div>
      <div className="w-full py-4 text-primary-text text-xs">
        <div className="relative flex w-full items-center">
          <div
            style={{ left: createdRange.position.inPixels.minThumb }}
            ref={minThumbDivRef}
            onMouseDown={createdRange.events.mouseDown.minThumb}
            className="w-4 h-4 z-10 absolute bg-primary-text"
          ></div>
          <div
            style={{ left: createdRange.position.inPixels.maxThumb }}
            ref={maxThumbDivRef}
            onMouseDown={createdRange.events.mouseDown.maxThumb}
            className="w-4 h-4 z-10 absolute bg-primary-text"
          ></div>
          <div ref={rangeBarRef} className="w-full bg-panel h-2 mx-2"></div>
          <div
            style={{
              width:
                createdRange.position.inPixels.maxThumb -
                createdRange.position.inPixels.minThumb,
              left: createdRange.position.inPixels.minThumb,
            }}
            className="h-2 bg-primary-text absolute mx-2 pointer-events-none"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RangeField;
