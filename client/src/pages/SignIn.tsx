import { useForm } from "react-hook-form";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border justify-center w-5/6 mx-auto">
        <input
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
          className=" border"
        />
        <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />

        <input type="submit" className="border" />
      </form>
    </div>
  );
}
