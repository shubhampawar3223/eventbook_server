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
    data.interests = !isEmpty(data.interests) ? data.interests : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
      }
    
      if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
      }
    
      if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
      }
    
    if(Validator.isEmpty(data.firstName)){
        errors.FirstName= "First Name is required"
    }
    if(Validator.isEmpty(data.lastName)){
        errors.LastName= "Last Name is required"
    }
    if(Validator.isEmpty(data.dob)){
        errors.DOB= "DOB is required"
    }
    if(Validator.isEmpty(data.collageName)){
        errors.CollageName= "Collage Name is required"
    }
    if(Validator.isEmpty(data.gradYear)){
        errors.PassingYear= "Passing year is required"
    }
    if(Validator.isEmpty(data.gender)){
        errors.Gender= "Gender is required"
    }
    if(Validator.isEmpty(data.mobileNo)){
        errors.MobNo= "Mobile No is required"
    }
     if(Validator.isEmpty(data.interests)){
         errors.interests= "Interests are required"
     }
  return{
      errors,
      isValid: isEmpty(errors)
  };

};