"use client";

import Form from "@/components/shared/form/Form";
import { useTRPC } from "@/lib/trpc/client/client";
import loginSchema from "@/schemas/auth/login/login.schema";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const trpc = useTRPC();

  const { mutate } = useMutation(
    trpc.auth.login.mutationOptions({
      onError(error, v, c) {
        console.error(error.data);
        console.error(error.message);
        console.error(error.shape);
        console.error(v);
        console.error(c);
      },
    }),
  );

  return (
    <Form
      handleSubmit={(values) => {
        console.log(values);
        mutate(values);
      }}
      schema={loginSchema}
    >
      <div className="flex flex-col gap-4 mb-4">
        <Form.TextField name="login" label="Login:" />
        <Form.PasswordField name="password" label="Password:" />
      </div>
      <Form.Submit className="ml-auto" type="submit" />
    </Form>
  );
};

export default LoginForm;
