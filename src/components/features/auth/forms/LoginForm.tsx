"use client";

import Form from "@/components/shared/form/Form";
import { useTRPC } from "@/lib/trpc/client/client";
import loginSchema from "@/schemas/auth/login/login.schema";
import ToastEmitter from "@/services/client/ToastEmitter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const { mutate, isPending } = useMutation(
    trpc.auth.login.mutationOptions({
      onSuccess() {
        router.refresh();
        ToastEmitter.success("Logged in successfully!");
      },
    }),
  );

  return (
    <Form
      handleSubmit={(values) => {
        mutate(values);
      }}
      schema={loginSchema}
    >
      <div className="flex flex-col gap-4 mb-4">
        <Form.TextField name="login" label="Login:" />
        <Form.PasswordField name="password" label="Password:" />
      </div>
      <Form.Submit isLoading={isPending} className="ml-auto" type="submit" />
    </Form>
  );
};

export default LoginForm;
