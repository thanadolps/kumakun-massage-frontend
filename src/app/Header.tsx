"use client";

import Link from "next/link";
import { FaCalendar, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { authStore, logout, reset } from "../../features/auth/authStore";
import axios from "axios";
import scheduleService from "../../features/reservation/schedule";

export default function Header() {
  const router = useRouter();
  const { user } = useSnapshot(authStore);
  const onLogout = async () => {
    await logout();
    await reset();
    await router.push("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button onClick={scheduleService.downloadSchedule}>
                <FaCalendar />
              </button>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link href="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
