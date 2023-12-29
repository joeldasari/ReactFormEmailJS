import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
export const Register = () => {
  const form = useRef();
  const validateSchema = yup.object({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    Email: yup.string().email().required(),
    Age: yup.number().positive().integer().min(18).max(100).required(),
    Password: yup.string().min(4).required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Password does not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const onSubmit = () => {
    alert("Your details has been sent to joeldasari10@gmail.com");
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICEID,
        import.meta.env.VITE_TEMPLATEID,
        form.current,
        import.meta.env.VITE_PUBLICKEY,
      )
      .then(
        () => {
          alert("Greetings from Joel 🎉");
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <form
        className="flex h-[500px] w-[400px] flex-col items-center justify-center gap-2 rounded-lg border-[1px] p-10 shadow-lg max-sm:w-[325px]"
        onSubmit={handleSubmit(onSubmit)}
        ref={form}
      >
        <p className="mb-2 text-xl font-medium">REGISTER FORM</p>
        <input
          type="text"
          placeholder="First Name"
          {...register("FirstName")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.FirstName?.message}
        </p>
        <input
          type="text"
          placeholder="Last Name"
          {...register("LastName")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.LastName?.message}
        </p>
        <input
          type="email"
          placeholder="Email"
          {...register("Email")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.Email?.message}
        </p>
        <input
          type="number"
          placeholder="Age"
          {...register("Age")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.Age?.message}
        </p>
        <input
          type="password"
          placeholder="Password"
          {...register("Password")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.Password?.message}
        </p>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("ConfirmPassword")}
          className="w-[250px] rounded-sm border-2 border-black p-1 text-sm outline-none"
        />

        <p className="text-center text-xs text-red-500">
          {errors.ConfirmPassword?.message}
        </p>

        <button className="w-[250px] rounded-sm bg-black p-1 text-white">
          REGISTER
        </button>
      </form>
    </div>
  );
};
