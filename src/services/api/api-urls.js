export const IP = 'https://luggage.prismatic-technologies.com';
export const URLS = {
  base_url: `${IP}/api/`,
  image_url: `${IP}/`,
  auth: {
    signup: 'driver',
    create_user: 'user/create',
    login: 'login',
    verify_otp: 'otpVerify',
    get_user_info: 'user/userInfo',
    forgot_password: 'sendOtp',
    update_password: 'UpdatePassword',
    // change_password: 'doctor/changePassword',
    // otp_verify: 'doctor/otpVerify',
    // forget_password: 'doctor/forgetPassword',
    // update_profile: 'doctor/updateProfile',
  },
  vehcile: {
    create_vehilce: 'vehicle/create',
    store_vehicle: 'vehicle',
    vehicle_list: 'vehicle',
  },
  all_hospitals: 'doctor/allHospital',

  notification: {
    get_notification: 'doctor/getNotification',
    read_notification: 'doctor/readNotification',
  },
};
