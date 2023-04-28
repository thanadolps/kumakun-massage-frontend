import { authStore, reset, register } from "../features/auth/authStore";
import { toast } from "solid-toast";
import { createForm } from "@felte/solid";
import { FaSolidUser } from "solid-icons/fa";
import { useStore } from "@nanostores/solid";
import { useNavigate } from "solid-start";
import { createEffect } from "solid-js";

type FormData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password2: string;
  role: string;
};

export default function Register() {
  const navigate = useNavigate();
  const auth = useStore(authStore);
  createEffect(() => {
    const { isError, isSuccess, user, message } = auth();

    if (isError) {
      toast.error(message);
      console.error(message);
    }

    console.log();

    //redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }
    reset();
  });

  const { form, isSubmitting } = createForm<FormData>({
    async onSubmit({ name, email, password, password2, role, tel }) {
      console.log("ABCDE");

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
    },
  });

  return (
    <>
      <section class="heading">
        <h1>
          <FaSolidUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section class="form">
        <form use:form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="Enter Your name"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Enter Your email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="tel"
              class="form-control"
              id="tel"
              name="tel"
              placeholder="Enter Your Tel"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Enter Your password"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password2"
              name="password2"
              placeholder="Confirm Your password"
              required
            />
          </div>
          <div class="form-group">
            <select id="role" name="role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="form-group">
            <button class="btn btn-block" disabled={isSubmitting()}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
