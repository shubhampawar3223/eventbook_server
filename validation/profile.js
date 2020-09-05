const Validator= require('validator');
const isEmpty = require('is-empty');

module.exports= function  validateProfileInput(data){
    let errors={ };

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.firstName= !isEmpty(data.firstName) ? data.firstName: "";
    data.lastName= !isEmpty(data.lastName) ? data.lastName: "";
    data.dob= !isEmpty(data.dob) ? data.dob: "";
    data.collageName = !isEmpty(data.collageName) ? data.collageName : "";
    data.gradYear = !isEmpty(data.gradYear) ? data.gradYear : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
    data.interest1 = !isEmpty(data.interest1) ? data.interest1 : "";
    data.interest2 = !isEmpty(data.interest2) ? data.interest2 : "";
    data.interest3 = !isEmpty(data.interest3) ? data.interest3 : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
      }
    
      if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
      }
    
      if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
      }
    
     if(Validator.isEmpty(data.interest1)){
         errors.interest1= "Interests are required"
     }
     if (Validator.isEmpty(data.interest2)) {
        errors.interest2 = "Password field is required";
      }
      if (Validator.isEmpty(data.interest3)) {
        errors.interest3 = "Password field is required";
      }
  return{
      errors,
      isValid: isEmpty(errors)
  };

};
