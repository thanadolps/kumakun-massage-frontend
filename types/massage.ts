type MassageShop = {
  id: string;
  name: string;
  address: string;
  tel: string;
  opentime: string;
  closetime: string;
};

type ReservationRequest = {
  massageShopId: string;
  datetime: string;
};

type ReservationResponse = {
  _id: string;
  user: string;
  massageShop: MassageShop;
  datetime: string;
};
