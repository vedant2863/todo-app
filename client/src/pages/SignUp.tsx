import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../components/FormField";
import { UserSchema } from "../utils/types";



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
    <div className=" bg-red-300 w-full h-full flex justify-center items-center my-30">
      <form onSubmit={handleSubmit(onSubmit)} >
        
        <div className="">
          <label htmlFor="username">Username</label>
          <FormField
            className={'bg-red-200'}
            type="username"
            placeholder="username"
            name="username"
            register={register}
            error={errors.username}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <FormField
            className={'bg-red-200'}
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <FormField
            className={'bg-red-200'}
            type="password"
            placeholder="password"
            name="password"
            register={register}
            error={errors.password}
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>

  );
}

export default SignUp;
