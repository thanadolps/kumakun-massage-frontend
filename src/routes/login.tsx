import { createForm } from "@felte/solid";
import { OcSignin2 } from "solid-icons/oc";
import { toast } from "solid-toast";
import { authStore, login, reset } from "../features/auth/authStore";
import { useStore } from "@nanostores/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export default function Login() {
  const navigate = useNavigate();
  const auth = useStore(authStore);

  createEffect(() => {
    if (auth().isError) {
      toast.error(auth().message);
    }

    //redirect when logged in
    if (auth().isSuccess || auth().user) {
      navigate("/");
    }
    reset();
  });

  const { form } = createForm<UserData>({
    async onSubmit(userData) {
      await login(userData);
    },
  });

  return (
    <>
      <section class="heading">
        <h1>
          <OcSignin2 /> Login
        </h1>

        <p>Please login to get support</p>
      </section>
      <section class="form">
        <form use:form>
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
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Enter Your password"
              required
            />
          </div>
          <div class="form-group">
            <button class="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
