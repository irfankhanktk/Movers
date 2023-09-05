// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup
    .string()
    .required('error_pass_enter')
    .min(8, 'error_pass_short'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  first_name: yup.string().required('req_first_name'),
  middle_name: yup.string().required('req_middle_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  surname: yup.string().required('req_surname'),
  // gender: yup.string().required('req_gender'),
  // country_code: yup.string().required('req_country_code'),
  // house_name: yup.string().required('req_house_name'),
  // first_line_of_address: yup.string().required('req_first_line_of_address'),
  // postal_code: yup.string().required('req_postal_code'),
  // city: yup.string().required('req_city'),
  // cnic: yup.number().min(13, 'invalid_cnic'),
  // dob: yup.string().required('req_dob'),
});

export const signupDetailsFormValidation = yup.object().shape({
  // first_name: yup.string().required('req_first_name'),
  // middle_name: yup.string().required('req_middle_name'),
  // email: yup.string().email('invalid_email').required('req_email'),
  // phone: yup
  //   .number()
  //   .typeError('invalid_phone')
  //   .positive('invalid_phone')
  //   .integer('invalid_phone')
  //   .min(8, 'invalid_phone')
  //   .required('Phone is required'),
  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('req_pass')
  //   .oneOf([yup.ref('password')], 'miss_match_pass'),
  // surname: yup.string().required('req_surname'),
  // gender: yup.string().required('req_gender'),
  // country_code: yup.string().required('req_country_code'),
  house_name: yup.string().required('req_house_name'),
  first_line_of_address: yup.string().required('req_first_line_of_address'),
  postal_code: yup.string().required('req_postal_code'),
  city: yup.string().required('req_city'),
  cnic: yup.number().min(13, 'invalid_cnic'),
  dob: yup.string().required('req_dob'),
});
export const updateProfileFormValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  // last_name: yup.string().required('req_first_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),

  doc_cat_id: yup.string().required('req_cat'),
  zip_code: yup.string().required('req_zip_code'),
  city: yup.string().required('req_city'),
  state: yup.string().required('req_state'),
  price: yup.string().required('req_price'),
  experience: yup.string().required('req_experience'),
});
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });
export const updatePasswordValidation = yup.object().shape({
  // email: yup.string().email('invalid_email').required('req_email'),
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('New Password is required')
    .min(8, 'New weak_pass'),
});
export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('New Password is required')
  //   .min(8, 'New weak_pass'),
});
export const addVheicleValidation = yup.object().shape({
  vehicle_type: yup.string().required('type_required'),
  vehicle_make: yup.string().required('req_vehicle_make'),
  vehicle_model: yup.string().required('req_vehicle_model'),
  vehicle_year: yup.string().required('req_vehicle_year'),
  vehicle_load_capacity: yup.string().required('req_vehicle_load_capacity'),

  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('New Password is required')
  //   .min(8, 'New weak_pass'),
});
export const CompanyDetailsValidation = yup.object().shape({
  legal_identity: yup.string().required('req_legal_identity'),
  compnay_registration: yup.string().required('req_compnay_registration'),
  vat_registration: yup.string().required('req_vat_registration'),
});
export const LicenseDetailsValidation = yup.object().shape({
  driving_license_no: yup.string().required('req_driving_license_no'),
  license_issue_date: yup.string().required('req_license_issue_date'),
  license_expiry_date: yup.string().required('req_vat_license_expiry_date'),
});
export const MOTDetailsValidation = yup.object().shape({
  mot_issue_date: yup.string().required('req_mot_issue_date'),
  mot_expiry_date: yup.string().required('req_mot_expiry_date'),
});
export const VehicleInsuranceValidation = yup.object().shape({
  insurance_company: yup.string().required('req_insurance_company'),
  valid_from: yup.string().required('req_valid_from'),
  expiry_date: yup.string().required('req_expiry_date'),
});
export const BankDetailsValidation = yup.object().shape({
  bank_name: yup.string().required('req_bank_name'),
  account_title: yup.string().required('req_account_title'),
  sort_code: yup.string().required('req_sort_code'),
  account_number: yup.string().required('req_account_number'),
});
export const GoodsInTransitValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  valid_from: yup.string().required('req_valid_from'),
  expiry_date: yup.string().required('req_expiry_date'),
});
export const addHotelValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  content: yup.string().required('content_required'),
  star_rate: yup.string().required('hotel_rating_required'),
  video: yup.string().required('link_required').url('invalid_link'),
  policy: yup.array().of(
    yup.object().shape({
      title: yup.string().required('policy_title'),
      content: yup.string().required('policy_content'),
    }),
  ),
  banner_image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      }),
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});
export const addRoomValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  // content: yup.string().required('content_required'),
  number: yup.string().required('number_required'),
  price: yup.string().required('price_required'),
  beds: yup.string().required('beds_required'),
  size: yup.string().required('size_required'),
  adults: yup.string().required('adults_required'),
  ican_import_url: yup.string().required('link_required').url('invalid_link'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      }),
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});

export const addPriceHotelValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  old_password: yup.string().required('req_pass').min(8, 'weak_pass'),
  new_password: yup
    .string()
    .required('New Password is required')
    .min(8, 'New weak_pass'),
});
