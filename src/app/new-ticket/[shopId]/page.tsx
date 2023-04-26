"use client";

import { Dialog } from "@headlessui/react";
import ReservationForm from "./form";
import shopService from "../../../../features/reservation/shopService";
import Card from "../card";

export default async function Page({ params }) {
  // Should just use page, otherwise it would load everyshop, even if I want to access this route

  const id = params.shopId as string;
  console.log(params);
  const shop = await shopService.getMassageShop(params.shopId);
  console.log(shop.data.id);

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
          <Dialog.Title className="heading">
            Create New Reservation
          </Dialog.Title>
          {/* <Dialog.Description>
            Please fill out the form below to create a new reservation
          </Dialog.Description> */}

          {/* <Card shop={shop.data} /> */}

          <section className="overflow-scroll">
            <ReservationForm />
          </section>

          {/* <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button> */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
