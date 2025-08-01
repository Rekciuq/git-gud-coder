"use client";

import { cn } from "@/lib/cn";
import Input from "../Input";
import Label from "../Label";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useCreateRangeField } from "@/features/dashboard/hooks/useCreateRangeField";
import { useFormContext, useWatch } from "react-hook-form";
import debounce from "lodash/debounce";

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
  const { setValue, getValues } = useFormContext();

  const [minInput, setMinInput] = useState<number>(
    getValues(minRangeName) ?? min,
  );
  const [maxInput, setMaxInput] = useState<number>(
    getValues(maxRangeName) ?? max,
  );

  const debouncedUpdateForm = useMemo(
    () =>
      debounce((minVal: number, maxVal: number) => {
        setValue(minRangeName, minVal, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue(maxRangeName, maxVal, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }, 500),
    [setValue, minRangeName, maxRangeName],
  );

  useEffect(() => () => debouncedUpdateForm.cancel(), [debouncedUpdateForm]);

  const handleDragEnd = useCallback(() => {
    debouncedUpdateForm.flush();
  }, [debouncedUpdateForm]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const clampedVal = Math.min(val, maxInput - 1);
    setMinInput(clampedVal);
    debouncedUpdateForm(clampedVal, maxInput);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const clampedVal = Math.max(val, minInput + 1);
    setMaxInput(clampedVal);
    debouncedUpdateForm(minInput, clampedVal);
  };

  const handleMinThumbChange = useCallback(
    (value: number) => {
      setMinInput(value);
      debouncedUpdateForm(value, maxInput);
    },
    [maxInput, debouncedUpdateForm],
  );

  const handleMaxThumbChange = useCallback(
    (value: number) => {
      setMaxInput(value);
      debouncedUpdateForm(minInput, value);
    },
    [minInput, debouncedUpdateForm],
  );

  const createdRange = useCreateRangeField({
    rangeBarRef,
    min,
    max,
    minValue: minInput,
    maxValue: maxInput,
    onMinChange: handleMinThumbChange,
    onMaxChange: handleMaxThumbChange,
    onDragEnd: handleDragEnd,
  });

  const { isDragging } = createdRange;

  const watchedMin = useWatch({ name: minRangeName });
  const watchedMax = useWatch({ name: maxRangeName });

  useEffect(() => {
    if (!isDragging && watchedMin !== undefined && watchedMin !== minInput) {
      setMinInput(watchedMin);
    }
  }, [isDragging, watchedMin, minInput]);

  useEffect(() => {
    if (!isDragging && watchedMax !== undefined && watchedMax !== maxInput) {
      setMaxInput(watchedMax);
    }
  }, [isDragging, watchedMax, maxInput]);

  const isMinThumbInPriorityZone = minInput >= min + (max - min) * 0.9;

  return (
    <div className={cn(baseClassNames, className)}>
      {!!label && <Label text={label} />}
      <div className="inline-flex gap-10 justify-between">
        <Input
          min={min}
          max={max}
          name={minRangeName}
          type="number"
          value={String(minInput)}
          onChange={handleMinInputChange}
        />
        <Input
          min={min}
          max={max}
          name={maxRangeName}
          type="number"
          value={String(maxInput)}
          onChange={handleMaxInputChange}
        />
      </div>
      <div className="w-full py-4 text-primary-text text-xs">
        <div className="flex w-full items-center justify-center">
          <div ref={rangeBarRef} className="relative w-9/10 bg-panel h-2">
            <div
              style={{
                width:
                  createdRange.position.inPixels.maxThumb -
                  createdRange.position.inPixels.minThumb,
                left: createdRange.position.inPixels.minThumb,
              }}
              className="h-2 bg-primary-text absolute pointer-events-none z-10"
            ></div>
            <div
              style={{
                left: createdRange.position.inPixels.minThumb,
                transform: "translateX(-50%)",
              }}
              onMouseDown={createdRange.events.mouseDown.minThumb}
              className={cn(
                "w-4 h-4 z-20 absolute -top-1 bg-primary-text cursor-pointer",
                isMinThumbInPriorityZone && "z-40",
              )}
            ></div>
            <div
              style={{
                left: createdRange.position.inPixels.maxThumb,
                transform: "translateX(-50%)",
              }}
              onMouseDown={createdRange.events.mouseDown.maxThumb}
              className="w-4 h-4 z-20 -top-1 absolute bg-primary-text cursor-pointer"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeField;
