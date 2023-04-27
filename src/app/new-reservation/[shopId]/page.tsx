import ReservationForm from "./form";
import shopService from "../../../../features/reservation/shopService";
import Card from "../card";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default async function Page({ params }: { params: ParsedUrlQuery }) {
  const id = params.shopId as string;
  const { data: shop } = await shopService.getMassageShop(id);
  console.log("On reservation page for shop = ", shop);

  return (
    <div className="w-full rounded bg-white p-4">
      <h1 className="heading text-center h-full">Create New Reservation</h1>

      <section className="my-8">
        <Card shop={shop} interactive={false} href={`${shop.id}`} />
      </section>

      <section>
        <ReservationForm shopId={id} />
      </section>
    </div>
  );
}
