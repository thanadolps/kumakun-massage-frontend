import { FaClock, FaMap, FaPhoneAlt } from "react-icons/fa";
import "./card.module.css";
import Link from "next/link";

export default function Card(props: {
  shop: MassageShop;
  interactive?: boolean;
}) {
  const { shop } = props;
  const interactive = props.interactive ?? true;

  return (
    <Link
      href={`/new-reservation/${shop.id}`}
      className={
        "text-left border-2 border-gray-700 rounded-lg flex flex-col p-2 cursor-default" +
        (interactive
          ? "transition-transform duration-75 hover:scale-105 hover:translate-x-1 hover:translate-y-1 hover:rotate-1 cursor-pointer"
          : "")
      }
    >
      <h1 className="text-xl font-bold">{shop.name}</h1>
      <p>
        <FaMap className="inline" />
        {"  "}
        {shop.address}
      </p>
      <p>
        <FaPhoneAlt className="inline" />
        {"  "}
        {shop.tel}
      </p>
      <p>
        <FaClock className="inline" />
        {"  "}
        {`${formatTime(shop.opentime)} - ${formatTime(shop.closetime)}`}
      </p>
    </Link>
  );
}

/**
 * Convert time from [hhmm] format such as 1530 to 3:30PM
 */
function formatTime(time: string): string {
  const hour = parseInt(time.substring(0, 2));
  const minute = parseInt(time.substring(2, 4));
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}
