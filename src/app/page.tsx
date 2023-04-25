import Image from "next/image";
import Link from "next/link";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section className="heading">
        <h1>Vac Q: A Vaccine Booking System</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link href="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Appointment
      </Link>
      <Link href="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View My Appointments
      </Link>
    </>
  );
}
