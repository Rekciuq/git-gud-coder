"use client";

import PasswordField from "@/components/shared/form/fields/PasswordField";
import TextField from "@/components/shared/form/fields/TextField";
import Form from "@/components/shared/form/Form";
import FormSubmitButton from "@/components/shared/form/FormSubmitButton";
import loginSchema from "@/schemas/auth/login/login.schema";

const LoginForm = () => {
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
