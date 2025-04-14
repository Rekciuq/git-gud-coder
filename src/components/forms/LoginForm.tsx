import loginSchema from "@/schemas/auth/login/login.schema";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});

const Form = () => {
  const form = useAppForm({
    defaultValues: {
      login: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
      onBlur: loginSchema,
    },
  });
  return <></>;
};

export default Form;
