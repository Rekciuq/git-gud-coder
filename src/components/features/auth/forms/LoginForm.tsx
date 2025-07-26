"use client";

import Form from "@/components/shared/form/Form";
import loginSchema from "@/schemas/auth/login/login.schema";

const LoginForm = () => {
  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  };

  return (
    <Form handleSubmit={handleSubmit} schema={loginSchema}>
      <div className="flex flex-col gap-4 mb-4">
        <Form.TextField name="login" label="Login:" />
        <Form.PasswordField name="password" label="Password:" />
      </div>
      <Form.Submit className="ml-auto" type="submit" />
    </Form>
  );
};

export default LoginForm;
