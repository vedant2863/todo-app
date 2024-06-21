import { UseFormRegister, FieldError } from "react-hook-form";
import { ZodType, z } from "zod";

export type FormData = {
  username: string;
  email: string;
  password: string;
};


export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
};


export type ValidFieldNames =
  | "username"
  | "email"
  | "password"

export const UserSchema: ZodType<FormData> = z.object({
  username: z.string().min(1, "Username is required").max(20),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(20),
})

