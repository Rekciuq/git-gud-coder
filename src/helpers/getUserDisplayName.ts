type GetUserDisplayNameProps = {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
};

export const getUserDisplayName = ({
  firstName,
  lastName,
  email,
}: GetUserDisplayNameProps) =>
  [firstName, lastName].filter(Boolean).join(" ") || email;
