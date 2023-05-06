import { FaSolidClock, FaSolidMap, FaSolidPhone } from "solid-icons/fa";
import type { JSXElement } from "solid-js";
import { A } from "solid-start";

export default function Card(props: {
  href?: string;
  shop: MassageShop;
  interactive?: boolean;
  actions?: JSXElement;
}) {
  const interactive = () => props.interactive ?? true;

  const cardContent = (
    <>
      <h1 class="text-xl font-bold">{props.shop.name}</h1>
      <p>
        <FaSolidMap class="inline" />
        {"  "}
        {props.shop.address}
      </p>
      <p>
        <FaSolidPhone class="inline" />
        {"  "}
        {props.shop.tel}
      </p>
      <p>
        <FaSolidClock class="inline" />
        {"  "}
        {`${formatTime(props.shop.opentime)} - ${formatTime(
          props.shop.closetime
        )}`}
      </p>
    </>
  );

  const cardClass = () =>
    "text-left border-2 border-gray-700 rounded-lg flex flex-col p-2 cursor-default" +
    (interactive()
      ? "transition-transform duration-75 hover:scale-105 hover:translate-x-1 hover:translate-y-1 hover:rotate-1 cursor-pointer"
      : "");

  return (
    <>
      {props.href ? (
        <A href={props.href} class={cardClass()}>
          {cardContent}
        </A>
      ) : (
        <div class={cardClass()}>{cardContent}</div>
      )}
    </>
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
