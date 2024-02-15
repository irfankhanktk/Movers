// export const IP = 'https://getmovers.katashempstead.com';
// export const IP = 'https://luggage.prismatic-technologies.com';
export const IP = 'https://getmovers.co.uk';
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
    driver_location: 'updateDriverLocation',
    get_home_banner: 'bannerList',
    // change_password: 'doctor/changePassword',
    // otp_verify: 'doctor/otpVerify',
    // forget_password: 'doctor/forgetPassword',
    uploadImage: 'updateImage',
    update_profile: 'user/2',
    driverTerms: 'getDriverTerms',
    privacypolicy: 'getDriverPrivacy',
    contactUs: 'contactUsInfo',
    delete_account: 'deleteAccount',
  },
  orderlist: {
    getorder: 'DriverOrderList',
    getorderdetails: 'OrderDetails',
    orderStatus: 'DriverOrderStatus',
    StatusChangeOrder: 'orderStatus',
    orderHistory: 'DriverHistory',
  },
  notification: {
    getNotification: 'driverNotification',
    read_notification: 'notificationRead',
  },
  vehcile: {
    create_vehilce: 'vehicle/create',
    store_vehicle: 'vehicle',
    vehicle_list: 'vehicleList',
    vehicle_list_order: 'vehicleList',
    update_vehicle: 'vehicle/',
  },
  status_change: {
    status: 'onlineStatus',
  },
  document: {
    update_document: 'driverUpdate',
    get_document: 'getDriverDetails',
  },
  chat: {
    get_message: 'chat/messages/',
    get_latest_message: 'chat/get-new-messages/',
    get_conservation: 'chat/conversations',
    send_message: 'chat/insert-message',
    create_conservation: 'chat/create-conversation',
  },
  all_hospitals: 'doctor/allHospital',
};
