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
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
})

