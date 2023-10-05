// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup.string().required('req_pass').min(8, 'req_pass_short'),
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
  cnic: yup.number().required('req_cnic').min(13, 'invalid_cnic'),
  dob: yup.string().required('req_dob'),
});
export const UpdateProfileFormValidation = yup.object().shape({
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

  surname: yup.string().required('req_surname'),
  house_name: yup.string().required('req_house_name'),
  first_line_of_address: yup.string().required('req_first_line_of_address'),
  postal_code: yup.string().required('req_postal_code'),
  city: yup.string().required('req_city'),
  cnic: yup.number().min(13, 'invalid_cnic'),
  dob: yup.string().required('req_dob'),
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
  company_reg: yup.string().required('req_compnay_registration'),
  vat_reg: yup.string().required('req_vat_registration'),
});
export const LicenseDetailsValidation = yup.object().shape({
  driver_license_no: yup.string().required('req_driving_license_no'),
  license_issue_date: yup.string().required('req_license_issue_date'),
  license_expiry_date: yup.string().required('req_vat_license_expiry_date'),
});
export const MOTDetailsValidation = yup.object().shape({
  mot_issued_date: yup.string().required('req_mot_issue_date'),
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
  goods_name: yup.string().required('req_name'),
  goods_valid_from: yup.string().required('req_valid_from'),
  goods_expiry_date: yup.string().required('req_expiry_date'),
});
