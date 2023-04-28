import Card from "../components/Card";
import reservationService from "../features/reservation/reservationService";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Suspense,
} from "solid-js";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  createRouteAction,
  createRouteData,
  useRouteData,
} from "solid-start/data";
import toast from "solid-toast";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export function routeData() {
  return createRouteData(reservationService.getAllReservations);
}

export default function ReservationPage() {
  const responses = useRouteData<typeof routeData>();
  const reservations = () => responses()?.data ?? [];

  return (
    <div class="p-6">
      <section>
        <h1 class="heading mb-0 pl-0">Reservations</h1>
      </section>

      <section class="flex flex-col gap-6">
        <Suspense fallback={"Fetching Reservation..."}>
          <h2 class="pb-4">
            There are <b>{reservations().length}</b>/3 reservations
          </h2>

          <For each={reservations()}>
            {(reservation) => <ReservationBlock reservation={reservation} />}
          </For>
        </Suspense>
      </section>
    </div>
  );
}

function ReservationBlock(props: { reservation: ReservationResponse }) {
  const [deling, del] = createRouteAction(async (id: string) => {
    try {
      await reservationService.deleteReservation(id);
      toast.success("Reservation deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message || e.message);
    }
  });

  // TODO: use this, somehow, maybe reuse form?
  const [changing, change] = createRouteAction(
    async (args: { id: string; data: Partial<ReservationRequest> }) => {
      try {
        await reservationService.updateReservation(args.id, args.data);
        toast.success("Reservation updated successfully");
      } catch (e) {
        console.error(e);
        toast.error(e.response.data.message || e.message);
      }
    }
  );

  const [editing, setEditing] = createSignal(false);

  const dateString = () => {
    const parts = props.reservation.datetime.split(":");
    return parts[0] + ":" + parts[1];
  };
  let dateInput: HTMLInputElement;

  return (
    <div
      class={
        deling.pending ? "opacity-50 pointer-events-none cursor-progress" : ""
      }
    >
      <Card
        shop={props.reservation.massageShop}
        href=""
        interactive={false}
        actions={"awd"}
      />

      {editing() ? (
        <>
          <div class="form-group mt-6 mb-0">
            {" "}
            <input
              type="datetime-local"
              class="form-control"
              id="datetime"
              required
              name="datetime"
              value={dateString()}
              ref={dateInput!}
            />
          </div>
          <button
            class="btn btn-block"
            onClick={async () => {
              if (dateInput.value === dateString()) {
                toast("Datetime remain unchanged");
                setEditing(false);
                return;
              }
              await change({
                id: props.reservation._id,
                data: {
                  datetime: dateInput.value,
                },
              });
              setEditing(false);
            }}
          >
            Update Reservation
          </button>
        </>
      ) : (
        <>
          <div class="w-full text-center bg-emerald-200 p-2">
            <span class="text-lg">
              {/* Display datetime in d/m/y h:m format */}
              {new Date(props.reservation.datetime).toLocaleString("th")}
            </span>{" "}
            <span>
              (
              {timeAgo.format(
                Date.parse(props.reservation.datetime) - Date.now()
              )}
              )
            </span>
          </div>

          <div class="flex w-full">
            <button
              class="btn btn-block flex-1"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              class="btn btn-block text-black bg-red-300 flex-1"
              onClick={() => {
                del(props.reservation._id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
