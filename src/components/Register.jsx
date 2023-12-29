import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import emailjs from "@emailjs/browser"
import { useRef } from "react";
export const Register = () => {
    const form = useRef();
    const validateSchema = yup.object({
        FirstName: yup.string().required(),
        LastName: yup.string().required(),
        Email: yup.string().email().required(),
        Age: yup.number().positive().integer().min(18).max(100).required(),
        Password: yup.string().min(4).required(),
        ConfirmPassword: yup.string().oneOf([yup.ref("Password")], "Password does not match").required()
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validateSchema)
    });

    const onSubmit = () => {
        emailjs.sendForm(import.meta.env.VITE_SERVICEID, import.meta.env.VITE_TEMPLATEID, form.current, import.meta.env.VITE_PUBLICKEY)
        .then(() => {
            alert("Your details has been sent to joeldasari10@gmail.com")
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="h-[500px] max-sm:w-[325px] w-[400px] border-[1px] rounded-lg shadow-lg flex gap-2 p-10 flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)} ref={form}>
        <p className="text-xl font-medium mb-2">REGISTER FORM</p>
        <input type="text" placeholder="First Name" {...register("FirstName")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.FirstName?.message}</p>
        <input type="text" placeholder="Last Name" {...register("LastName")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.LastName?.message}</p>
        <input type="email" placeholder="Email" {...register("Email")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.Email?.message}</p>
        <input type="number" placeholder="Age" {...register("Age")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.Age?.message}</p>
        <input type="password" placeholder="Password" {...register("Password")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.Password?.message}</p>
        <input type="password" placeholder="Confirm Password" {...register("ConfirmPassword")} className="w-[250px] border-2 border-black outline-none text-sm rounded-sm p-1"/>

        <p className="text-xs text-red-500 text-center">{errors.ConfirmPassword?.message}</p>

        <button className="w-[250px] bg-black text-white rounded-sm p-1">REGISTER</button>
      </form>
    </div>
  );
  };