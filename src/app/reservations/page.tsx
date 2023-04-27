"use client";

import reservationService from "../../../features/reservation/reservationService";
import Card from "../new-reservation/card";

export default async function TicketPage() {
  if (typeof window === "undefined") return null;

  const { count, data: reservations } =
    await reservationService.getAllReservations();

  return (
    <div>
      <h1 className="heading">Reservations</h1>
      <p>There are {count} reservations</p>
      {JSON.stringify(reservations)}

      {reservations.map((reservation) => (
        <Card
          key={reservation._id}
          shop={reservation.massageShop}
          href=""
          interactive={false}
        />
      ))}
    </div>
  );
}
