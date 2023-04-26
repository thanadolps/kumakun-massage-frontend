import { FaQuestionCircle } from "react-icons/fa";
import shopService from "../../../features/reservation/shopService";
import Card from "./card";

export default async function NewTicket({
  children,
}: {
  children: React.ReactNode;
}) {
  const shops = await shopService.getAllMassageShops();

  return (
    <>
      <section className="heading">
        <h1>
          <FaQuestionCircle /> Create New Reservation
        </h1>
      </section>
      <main>
        <div className="form-group">
          <input type="search" />
        </div>

        <div className="grid grid-cols-3 gap-4 px-4">
          {shops.data.map((shop) => (
            <Card key={shop.id} shop={shop} />
          ))}
        </div>
      </main>
      {children}
    </>
  );
}
