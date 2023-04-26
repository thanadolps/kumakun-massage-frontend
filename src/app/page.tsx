import Link from "next/link";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../images/logo/2.png";

export default function Home() {
  return (
    <>
      <section className="heading">
        <Image src={Logo} alt="KumaKun Icon" width={256} height={256} />
        <h1>KumaKun: A Massage Reservation System</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link href="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Reservation
      </Link>
      <Link href="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View My Reservation
      </Link>
    </>
  );
}
