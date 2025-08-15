"use client";

import Form from "@/components/shared/form/Form";
import { DB_TEACHER_ROLE, DB_USER_ROLE } from "@/constants/database";
import { uploadImageToBucket } from "@/features/file/helpers/uploadImageToBucket";
import { getQueryClient, useTRPC } from "@/lib/trpc/client/client";
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
  const queryClient = getQueryClient();
  const getPresignedUrlOptions = trpc.upload.getPresignedUrl.queryOptions();
  const { refetch: getPresignedUrl } = useQuery({
    ...getPresignedUrlOptions,
    enabled: false,
  });

  const { mutateAsync: signupUser, isPending } = useMutation(
    trpc.auth.signup.mutationOptions({}),
  );

  const roles: RadioOption[] = [
    { title: "User", value: DB_USER_ROLE.toString() },
    { title: "Teacher", value: DB_TEACHER_ROLE.toString() },
  ];

  return (
    <Form
      handleSubmit={async (values) => {
        const { data: presignedUrl } = await getPresignedUrl();

        try {
          const imageUrl = await uploadImageToBucket({
            presignedUrl: presignedUrl?.url,
            file: values.image,
          });

          const { login, firstName, lastName, password, role } = values;

          const newUser: SchemaType<typeof serverSignupSchema> = {
            login,
            firstName,
            lastName,
            role,
            password,
            imageUrl,
          };

          await signupUser(newUser);
          await queryClient.invalidateQueries();
          router.refresh();
          ToastEmitter.success("Signed up successfully!");
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
