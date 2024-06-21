import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema } from "../utils/types";
import FormField from "../components/FormField";
import { FormData } from "../utils/types";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">  username</label>
          <FormField
            type="username"
            placeholder="username"
            name="username"
            register={register}
            error={errors.username}
          />
        </div>
        <div>
          <label htmlFor="Email"> Email </label>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
        </div>
        <div>
          <label htmlFor="password">  password</label>
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
        </div>
        <button
          type="submit"
          className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignUp;
