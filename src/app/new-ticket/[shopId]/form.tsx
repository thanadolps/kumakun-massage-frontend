import { FaQuestionCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  address: string;
  tel: string;
  opentime: string;
  closetime: string;
  massageShop: string;
};

export default function ReservationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleFormSubmit = (data: FormValues) => {
    console.log(data);
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <button type="submit" className="btn btn-block text-black">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
