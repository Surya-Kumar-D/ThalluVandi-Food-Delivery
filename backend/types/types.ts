// User Type

export type Iuser = Document & {
  name: string;
  email: string;
  slug?: string;
  role?: "customer" | "admin";
  password: string;
  passwordConfirm: string;
};
