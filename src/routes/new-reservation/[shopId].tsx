import { createResource, Show, Suspense } from "solid-js";
import { useNavigate, useParams } from "solid-start";
import toast from "solid-toast";
import Card from "~/components/Card";
import shopService from "~/features/reservation/shopService";
import { createForm } from "@felte/solid";

export default function Reservation() {
  const id = useParams().shopId;
  const [responses] = createResource(() => shopService.getMassageShop(id));
  const shop = () => responses()?.data;
  console.log("On reservation page for shop = ", shop);

  return (
    <div class="w-full rounded bg-white p-4">
      <h1 class="heading text-center h-full">Create New Reservation</h1>

      <section class="my-8">
        <Show when={shop()}>
          {(shop) => (
            <Card shop={shop()} interactive={false} href={`${shop().id}`} />
          )}
        </Show>
      </section>

      <section>
        <ReservationForm shopId={id} />
      </section>
    </div>
  );
}

function ReservationForm(props: { shopId: string }) {
  const navigate = useNavigate();

  const { form } = createForm<ReservationRequest>({
    initialValues: {
      massageShopId: props.shopId,
    },
    async onSubmit(data) {
      console.log(data);
      try {
        await shopService.makeReservation(data);
        toast.success("Reservation created successfully");
        navigate("/reservations");
      } catch (e) {
        console.error(e);
        toast.error(e.response.data.message || e.message);
      }
    },
  });

  return (
    <>
      <section class="form">
        <form use:form>
          <div class="form-group">
            <label for="datetime">Date Time</label>
            <input
              type="datetime-local"
              class="form-control"
              id="datetime"
              required
              name="datetime"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-block text-black bg-green-300">
              Submit
            </button>
            <button
              type="button"
              onClick={() =>
                confirm(
                  "Are you sure you want to cancel? All information will be gone"
                ) && navigate(-1)
              }
              class="btn btn-block text-black bg-red-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
