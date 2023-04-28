import { Show, type VoidComponent } from "solid-js";
import { A } from "solid-start";
import {
  FaSolidCircleQuestion,
  FaSolidLock,
  FaSolidTicket,
} from "solid-icons/fa";
import logo from "../images/logo/2.png";
import { useStore } from "@nanostores/solid";
import { authStore } from "~/features/auth/authStore";

const Home: VoidComponent = () => {
  const auth = useStore(authStore);

  return (
    <>
      <section class="heading">
        <img src={logo} alt="KumaKun Icon" width={256} height={256} />
        <h1>KumaKun: A Massage Reservation System</h1>
        <p>Please choose from an option below</p>
      </section>

      <Show
        when={auth().user}
        fallback={
          <A
            href="/login"
            class="block text-center mb-12 mx-4 rounded-md p-4 bg-red-200"
          >
            <FaSolidLock class="inline" /> Must login before accessing
            Reservation
          </A>
        }
      >
        <A href="/new-reservation" class="btn btn-reverse btn-block">
          <FaSolidCircleQuestion />
          Create New Reservation
        </A>
        <A href="/reservations" class="btn btn-block">
          <FaSolidTicket />
          View My Reservation
        </A>
      </Show>
    </>
  );
};

export default Home;
