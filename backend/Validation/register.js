const validator= require("validator");
const isEmpty =require("is-empty");

module.exports = data => {
    
    let flaws = {};

    let {name , email , password} =data;

    if(!isEmpty(name)){
        name=name;
    }

    else{
        name="";
    }

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
       flaws.email="Email is Required";
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

    if(validator.isEmpty(name)){
        flaws.name= "Name is Required";
    }

    return {
        flaws,
        isValid: isEmpty(flaws)
     };

};