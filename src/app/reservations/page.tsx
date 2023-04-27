"use client";

import reservationService from "../../../features/reservation/reservationService";
import Card from "../new-reservation/card";

export default async function TicketPage() {
  if (typeof window === "undefined") return null;

  const { count, data: reservations } =
    await reservationService.getAllReservations();

  return (
    <div>
      <section>
        <h1 className="heading">Reservations</h1>
        <h2>
          There are <b>{count}</b>/3 reservations
        </h2>
      </section>

      <section className="flex flex-col gap-4">
        {reservations.map((reservation) => (
          <div key={reservation._id}>
            <span>@{reservation.datetime}</span>
            <Card
              shop={reservation.massageShop}
              href=""
              interactive={false}
              actions={"awd"}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
