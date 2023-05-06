import { A, useNavigate } from "solid-start";
import { FaSolidCalendar, FaSolidUser } from "solid-icons/fa";
import { OcSignin2, OcSignout2 } from "solid-icons/oc";
import { useStore } from "@nanostores/solid";
import { authStore, logout, reset } from "../features/auth/authStore";
import scheduleService from "../features/reservation/schedule";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import authService from "~/features/auth/authService";
import toast from "solid-toast";

const bannerPool = [
  "Love",
  "Life",
  "Happiness",
  "Joy",
  "Massage",
  "Kuma",
  "Bear",
];

function sampleBanner() {
  return bannerPool[Math.floor(Math.random() * bannerPool.length)];
}

export default function Header() {
  const navigate = useNavigate();
  const auth = useStore(authStore);
  const onLogout = async () => {
    await logout();
    await reset();
    await navigate("/");
  };

  const [banner, setBanner] = createSignal(sampleBanner());
  const timer = setInterval(async () => {
    let oldBanner = banner();
    let newBanner = sampleBanner();
    while (oldBanner === newBanner) {
      newBanner = sampleBanner();
    }

    // Untype the old banner
    while (oldBanner.length > 0) {
      oldBanner = oldBanner.slice(0, oldBanner.length - 1);
      setBanner(oldBanner);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Type the new banner
    for (const char of newBanner) {
      setBanner((oldBanner) => oldBanner + char);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }, 5000);
  onCleanup(() => {
    clearInterval(timer);
  });

  const [sendingVerification, setSendingVerification] = createSignal(false);
  async function resendVerification() {
    setSendingVerification(true);
    try {
      await authService.resendVerificationEmail();
      toast.success("Verification email has been sent, check the inbox");
    } catch (err) {
      console.error(err);
      toast.error(`Failed to send verification email: ${err}`);
    }
    setSendingVerification(false);
  }

  return (
    <>
      <header class="header">
        <div class="logo">
          <A href="/">
            KumaKun is <i>{banner()}</i>
          </A>
          <br />
        </div>
        <ul>
          {auth().user ? (
            <>
              <li>
                <button
                  disabled={!auth().user?.isVerified}
                  onClick={scheduleService.downloadSchedule}
                  class={
                    auth().user?.isVerified
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }
                >
                  <FaSolidCalendar />
                </button>
              </li>
              <li>
                <button class="btn" onClick={onLogout}>
                  <OcSignout2 />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <A href="/login">
                  <OcSignin2 />
                  Login
                </A>
              </li>
              <li>
                <A href="/register">
                  <FaSolidUser />
                  Register
                </A>
              </li>
            </>
          )}
        </ul>
      </header>

      <Show when={auth().user?.isVerified === false}>
        <section class="block text-center mb-12 mx-4 rounded-md p-4 bg-amber-200">
          <p>
            You has not been verified, some features may be restricted. Please
            check the email for verification link.
          </p>
          <button
            class="btn btn-sm m-auto btn-invert"
            onClick={resendVerification}
            disabled={sendingVerification()}
          >
            Resend verification email
          </button>
        </section>
      </Show>
    </>
  );
}
