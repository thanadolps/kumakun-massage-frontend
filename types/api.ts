type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  tel: string;
};

type RegisterResponse =
  //   | {
  //       success: false;
  //     }
  {
    success: true;
    _id: string;
    name: string;
    email: string;
    token: string;
  };

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse =
  //   | {
  //       success: false;
  //       msg: boolean;
  //     }
  {
    success: true;
    _id: string;
    token: string;
  };
