type RBACRole = keyof typeof ROLES;
export type RBACPermission = (typeof ROLES)[RBACRole][number];

const ROLES = {
  admin: ["view:profile"],
  teacher: ["create:course", "update:course", "delete:course"],
  user: ["view:profile", "view:chats"],
} as const;

export function hasPermission(roleId: number, permission: RBACPermission) {
  const dbRoles = {
    1: "admin",
    2: "user",
    3: "teacher",
  };

  const role = dbRoles[roleId as keyof typeof dbRoles];

  return (
    ROLES[role as keyof typeof ROLES] as readonly RBACPermission[]
  ).includes(permission);
}
