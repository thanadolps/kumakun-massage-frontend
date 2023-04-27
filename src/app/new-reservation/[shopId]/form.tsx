"use client";

import { FaQuestionCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import reservationService from "../../../../features/reservation/reservationService";
import { useRouter } from "next/navigation";
import shopService from "../../../../features/reservation/shopService";
import { toast } from "react-toastify";

export default function ReservationForm(props: { shopId: string }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationRequest>();

  const onSubmit = async (data: ReservationRequest) => {
    console.log(data);
    try {
      await shopService.makeReservation(data);
    } catch (e) {
      toast.error(e.response.data.message);
    }
    toast.success("Reservation created successfully");
    router.push("/new-reservation");
  };

  return (
    <>
      {/* <section className="heading">
        <h1>
          <FaQuestionCircle /> Create New Reservation
        </h1>
        <p>Please fill out the form below to create a new reservation</p>
      </section> */}
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input hidden {...register("massageShopId")} value={props.shopId} />
          <div className="form-group">
            <label htmlFor="datetime">Date Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="datetime"
              required
              {...register("datetime", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block text-black bg-green-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() =>
                confirm(
                  "Are you sure you want to cancel? All information will be gone"
                ) && router.back()
              }
              className="btn btn-block text-black bg-red-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
