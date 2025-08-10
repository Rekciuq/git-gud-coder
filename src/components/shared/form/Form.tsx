"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import TextField from "./fields/TextField";
import isEqual from "lodash/isEqual";
import PasswordField from "./fields/PasswordField";
import ImageField from "./fields/ImageField";
import RadioField from "./fields/RadioField";
import CheckBoxesField from "./fields/CheckBoxesField";
import { SchemaType } from "@/types/shared/schema";
import RangeField from "./fields/RangeField";
import { useEffect } from "react";

type FormProps<T extends ZodSchema> = {
  handleSubmit: SubmitHandler<SchemaType<T>>;
  schema: T;
  defaultValues?: SchemaType<T>;
  children: React.ReactNode;
  className?: string;
  methods?: UseFormReturn<SchemaType<T>>;
};

const Form = <T extends ZodSchema>({
  handleSubmit,
  schema,
  defaultValues,
  children,
  className,
  methods,
}: FormProps<T>) => {
  const form = useForm<SchemaType<T>>({
    resolver: zodResolver(schema, {}, { mode: "sync" }),
    mode: "all",
    defaultValues,
  });
  const finalForm = methods ? methods : form;

  useEffect(() => {
    if (!defaultValues) return;
    if (!isEqual(finalForm.getValues(), defaultValues))
      finalForm.reset(defaultValues);
  }, [defaultValues, finalForm]);

  return (
    <FormProvider {...finalForm}>
      <form
        className={className}
        onSubmit={finalForm.handleSubmit(handleSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.TextField = TextField;
Form.PasswordField = PasswordField;
Form.ImageField = ImageField;
Form.RadioField = RadioField;
Form.CheckboxesField = CheckBoxesField;
Form.RangeField = RangeField;
Form.Submit = FormSubmitButton;

export default Form;
