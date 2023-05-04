import Card from "../components/Card";
import reservationService from "../features/reservation/reservationService";
import { createMemo, createSignal, For, Show, Suspense } from "solid-js";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  createRouteAction,
  createRouteData,
  useRouteData,
} from "solid-start/data";
import toast from "solid-toast";
import { useStore } from "@nanostores/solid";
import { authStore } from "~/features/auth/authStore";
import { A } from "solid-start";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export function routeData() {
  return createRouteData(reservationService.getAllReservations);
}

export default function ReservationPage() {
  const responses = useRouteData<typeof routeData>();
  const reservations = () => responses()?.data ?? [];
  const auth = useStore(authStore);

  // Group reservations by user
  const groupedReservations = createMemo(() => {
    const grouped = new Map<string, ReservationResponse[]>();
    reservations().forEach((reservation) => {
      const key = reservation.user;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)?.push(reservation);
    });
    return grouped;
  });

  return (
    <div class="p-6">
      {/* <section>
        <h1 class="heading mb-0 pl-0">Reservations</h1>
      </section> */}

      <section class="flex flex-col gap-4 divide-y-4">
        <Suspense fallback={"Fetching Reservation..."}>
          <Show
            when={groupedReservations().size > 0}
            fallback={
              <span>
                No reservation!{" "}
                <A class="underline" href="/new-reservation">
                  Go book one now!
                </A>
              </span>
            }
          >
            <For each={Array.from(groupedReservations().entries())}>
              {([reserver, reservation]) => (
                <div>
                  <h2 class="heading mb-0 pl-0 pb-2">
                    {reserver === auth().user?._id
                      ? "My Reservations"
                      : `${reserver}.reservation`}{" "}
                    <span class="font-normal">
                      (
                      <span
                        class={reservation.length === 3 ? "text-red-400" : ""}
                      >
                        {reservation.length}/3
                      </span>
                      )
                    </span>
                  </h2>

                  <For each={reservation}>
                    {(reservation) => (
                      <ReservationBlock reservation={reservation} />
                    )}
                  </For>
                </div>
              )}
            </For>
          </Show>
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
        deling.pending || changing.pending
          ? "opacity-50 pointer-events-none cursor-progress"
          : ""
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
              ({timeAgo.format(Date.parse(props.reservation.datetime))})
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
