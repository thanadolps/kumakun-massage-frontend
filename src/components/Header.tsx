import { A, useNavigate } from "solid-start";
import { FaSolidCalendar, FaSolidUser } from "solid-icons/fa";
import { OcSignin2, OcSignout2 } from "solid-icons/oc";
import { useStore } from "@nanostores/solid";
import { authStore, logout, reset } from "../features/auth/authStore";
import scheduleService from "../features/reservation/schedule";

export default function Header() {
  const navigate = useNavigate();
  const auth = useStore(authStore);
  const onLogout = async () => {
    await logout();
    await reset();
    await navigate("/");
  };

  return (
    <header class="header">
      <div class="logo">
        <A href="/">Support Desk</A>
        <br />
      </div>
      <ul>
        {auth().user ? (
          <>
            <li>
              <button onClick={scheduleService.downloadSchedule}>
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
  );
}
