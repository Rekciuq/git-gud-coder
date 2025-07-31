"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { ZodSchema } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import TextField from "./fields/TextField";
import PasswordField from "./fields/PasswordField";
import ImageField from "./fields/ImageField";
import RadioField from "./fields/RadioField";
import CheckBoxesField from "./fields/CheckBoxesField";
import { SchemaType } from "@/types/shared/schema";
import RangeField from "./fields/RangeField";

type FormProps<T extends ZodSchema> = {
  handleSubmit: SubmitHandler<SchemaType<T>>;
  schema: T;
  defaultValues?: SchemaType<T>;
  children: React.ReactNode;
  className?: string;
};

const Form = <T extends ZodSchema>({
  handleSubmit,
  schema,
  defaultValues,
  children,
  className,
}: FormProps<T>) => {
  const methods = useForm<SchemaType<T>>({
    resolver: zodResolver(schema, {}, { mode: "sync" }),
    mode: "all",
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(handleSubmit)}>
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
