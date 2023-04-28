import { FaSolidCircleQuestion } from "solid-icons/fa";
import shopService from "../../features/reservation/shopService";
import { createResource, For, Suspense } from "solid-js";
import Card from "~/components/Card";

export default function ReservationMenu() {
  const [responses] = createResource(shopService.getAllMassageShops);
  const shops = () => responses()?.data ?? [];

  return (
    <>
      <section class="heading">
        <h1>
          <FaSolidCircleQuestion /> Create New Reservation
        </h1>
      </section>
      <main>
        <div class="form-group">
          <input type="search" />
        </div>

        <Suspense>
          <div class="grid grid-cols-3 gap-4 px-4">
            <For each={shops()}>
              {(shop) => (
                <Card shop={shop} href={`/new-reservation/${shop.id}`} />
              )}
            </For>
          </div>
        </Suspense>
      </main>
    </>
  );
}
