export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "seller";
  sellerCode: string;
};