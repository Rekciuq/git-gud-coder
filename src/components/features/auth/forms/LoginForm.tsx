"use client";

import PasswordField from "@/components/shared/form/fields/PasswordField";
import TextField from "@/components/shared/form/fields/TextField";
import Form from "@/components/shared/form/Form";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import { useTRPC } from "@/lib/trpc/client/client";
import loginSchema from "@/schemas/auth/login/login.schema";
import { useQuery } from "@tanstack/react-query";

const LoginForm = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Hi" }));
  console.log(data);

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  return (
    <Form handleSubmit={handleSubmit} schema={loginSchema}>
      <TextField name="login" label="Login:" />
      <PasswordField name="password" label="Password:" />
      <FormSubmitButton type="submit" />
      <FormSubmitButton type="update" />
    </Form>
  );
};

export default LoginForm;
