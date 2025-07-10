"use client";

import PasswordField from "@/components/shared/form/fields/PasswordField";
import TextField from "@/components/shared/form/fields/TextField";
import Form from "@/components/shared/form/Form";
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
      <div className="flex flex-col gap-4 mb-4">
        <TextField name="login" label="Login:" />
        <PasswordField name="password" label="Password:" />
      </div>
      <Form.Submit className="ml-auto" type="submit" />
    </Form>
  );
};

export default LoginForm;
