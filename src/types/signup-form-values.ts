export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: "customer" | "seller";
  sellerCode: string;
};