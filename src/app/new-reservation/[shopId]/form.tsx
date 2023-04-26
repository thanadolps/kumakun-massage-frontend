"use client";

import { FaQuestionCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import reservationService from "../../../../features/reservation/reservationService";
import { useRouter } from "next/navigation";

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
      // TODO: ask what to do here?
      // console.log(await reservationService.makeReservation(data));
    } catch (e) {
      console.log(e);
    }
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              {...register("name", {
                required: true,
                maxLength: 50,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              {...register("address", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Tel</label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              required
              {...register("tel", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="opentime">Open Time</label>
            <input
              type="time"
              className="form-control"
              id="opentime"
              required
              {...register("opentime", {
                required: true,
              })}
            />{" "}
          </div>
          <div className="form-group">
            <label htmlFor="closetime">Close Time</label>
            <input
              type="time"
              className="form-control"
              id="closetime"
              required
              {...register("closetime", {
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
