"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z, ZodSchema } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import TextField from "./fields/TextField";
import PasswordField from "./fields/PasswordField";

type FormProps<T extends ZodSchema> = {
  handleSubmit: SubmitHandler<z.infer<T>>;
  schema: T;
  defaultValues?: z.infer<T>;
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
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema, {}, { mode: "sync", raw: true }),
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
Form.Submit = FormSubmitButton;

export default Form;
