const REGEX = {
  email:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^[A-Za-z ]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,250}$/,
  digit: /[^0-9]/g,
  decimal: /^\d*\.?\d+$/,
  letter: /[^a-zA-Z ]/,
  spaceLetter: /[^a-zA-Z]/,
  address: /^[0-9A-Za-z\s\-.,']+$/,
  phone_no: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  zip: /^\d{5}$/,
  country: /^.+$/,
  number: /^\d*$/,
  alphanumeric:
    /^(?=.*[A-Za-z])[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  removeSpecialChar: /[^\w.]/g,
  nickName: /^[a-zA-Z0-9_-]+$/,
  decimalNumber: /^\d+(\.\d+)?$/,
  firstName: /^[A-Za-z][A-Za-z ]*$/,
  lastName: /^[A-Za-z][A-Za-z .]*$/,
};

export default REGEX;
