"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnapshot } from "valtio";
import { authStore, login, reset } from "../../../features/auth/authStore";

export default function Login() {
  const router = useRouter();
  const { user, isLoading, isError, isSuccess, message } =
    useSnapshot(authStore);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when logged in
    if (isSuccess || user) {
      router.push("/");
    }
    reset();
  }, [isError, isSuccess, user, message, router]);

  const { register, handleSubmit } = useForm<UserData>();
  const onSubmit = async (userData: UserData) => {
    await login(userData);
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>

        <p>Please login to get support</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email")}
              placeholder="Enter Your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password")}
              placeholder="Enter Your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
