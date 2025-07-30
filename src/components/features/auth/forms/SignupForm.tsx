"use client";

import Form from "@/components/shared/form/Form";
import { DB_TEACHER_ROLE, DB_USER_ROLE } from "@/constants/database";
import { FORM_DATA_KEYS } from "@/constants/formData";
import { HTTP_METHODS } from "@/constants/server/http-methods";
import { useTRPC } from "@/lib/trpc/client/client";
import {
  clientSignupSchema,
  serverSignupSchema,
} from "@/schemas/auth/login/signup.schema";
import ToastEmitter from "@/services/client/ToastEmitter";
import { RadioOption } from "@/types/shared/form/field";
import { SchemaType } from "@/types/shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const getPresignedUrlOptions = trpc.upload.getPresignedUrl.queryOptions();
  const { refetch: getPresignedUrl } = useQuery({
    ...getPresignedUrlOptions,
    enabled: false,
  });

  const { mutate: signupUser, isPending } = useMutation(
    trpc.auth.signup.mutationOptions({
      onMutate() {
        router.refresh();
        ToastEmitter.success("Signed up successfully!");
      },
    }),
  );

  const roles: RadioOption[] = [
    { title: "User", value: DB_USER_ROLE.toString() },
    { title: "Teacher", value: DB_TEACHER_ROLE.toString() },
  ];

  return (
    <Form
      handleSubmit={async (values) => {
        const formData = new FormData();
        formData.append(FORM_DATA_KEYS.file, values.image);
        const { data: presignedUrl, error } = await getPresignedUrl();

        try {
          if (!presignedUrl?.url) throw new Error(error?.message);
          const res = await fetch(presignedUrl.url, {
            method: HTTP_METHODS.post,
            body: formData,
          });
          if (!res.ok) throw new Error(await res.text());

          const responseImageURL = await res.json();

          const { login, firstName, lastName, password, role } = values;

          const newUser: SchemaType<typeof serverSignupSchema> = {
            login,
            firstName,
            lastName,
            role,
            password,
            imageUrl: responseImageURL.fileURL,
          };

          signupUser(newUser);
        } catch (error) {
          if (!(error instanceof Error)) return;

          ToastEmitter.error(error.message);
        }
      }}
      schema={clientSignupSchema}
    >
      <div className="flex flex-col gap-4 mb-4">
        <Form.TextField name="login" label="Login:" />
        <Form.ImageField name="image" label="Image:" />
        <Form.TextField name="firstName" label="First Name:" />
        <Form.TextField name="lastName" label="Last Name:" />
        <Form.RadioField name="role" label="Role:" options={roles} />
        <Form.PasswordField name="password" label="Password:" />
        <Form.PasswordField name="confirmPassword" label="Confirm Password:" />
      </div>
      <Form.Submit isLoading={isPending} className="ml-auto" type="submit" />
    </Form>
  );
};

export default SignupForm;
