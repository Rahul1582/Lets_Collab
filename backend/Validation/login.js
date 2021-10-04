const validator= require("validator");
const isEmpty =require("is-empty");

module.exports = data => {
    
    let flaws = {};

    let {email , password} =data;


    if(!isEmpty(email)){
        email=email;
    }

    else{
        email="";
    }

    if(!isEmpty(password)){
        password=password;
    }

    else{
        password="";
    }

    if(validator.isEmpty(email)){
       flaws.email="Name is Required";
    }

    if(!validator.isEmail(email)){
        flaws.email="Enter a valid Email Id.";
    }

    if(validator.isEmpty(password)){
        flaws.password = "Password is Required";
    }

    if (!validator.isLength(password, { min: 6, max: 15 })) {
        flaws.password = "Password must be at least 6 characters and atmost of 15 characters";
     }


    return {
        flaws,
        isValid: isEmpty(flaws)
     };

};