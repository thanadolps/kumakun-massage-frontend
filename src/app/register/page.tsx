"use client";

import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { authStore, reset } from "../../../features/auth/authStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { register } from "../../../features/auth/authStore";
import { FaUser } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password2: string;
  role: string;
};

export default function Register() {
  const router = useRouter();
  const { user, isLoading, isError, isSuccess, message } =
    useSnapshot(authStore);
  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.error(message);
    }

    console.log();

    //redirect when logged in
    if (isSuccess || user) {
      router.push("/");
    }
    reset();
  }, [isError, isSuccess, user, message, router]);

  const { register: reg, handleSubmit } = useForm<FormData>();

  const onSubmit = async ({
    name,
    email,
    password,
    password2,
    role,
    tel,
  }: FormData) => {
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        role,
        tel,
      };
      await register(userData);
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>

        <code>
          {JSON.stringify(
            {
              user,
              isLoading,
              isError,
              isSuccess,
              message,
            },
            null,
            2
          )}
        </code>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              {...reg("name")}
              placeholder="Enter Your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              {...reg("email")}
              placeholder="Enter Your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              id="tel"
              {...reg("tel")}
              placeholder="Enter Your Tel"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              {...reg("password")}
              placeholder="Enter Your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              {...reg("password2")}
              placeholder="Confirm Your password"
              required
            />
          </div>
          <div className="form-group">
            <select
              id="role"
              {...reg("role", { required: true })}
              placeholder="Enter Your Role"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
