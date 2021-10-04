const validator= require("validator");
const isEmpty =require("is-empty");

module.exports = data => {
    
    let flaws = {};

    let {title , body } =data;


    if(!isEmpty(title)){
        title=title;
    }

    else{
        title="";
    }

    if(!isEmpty(body)){
        body=body;
    }

    else{
        body="";
    }



    if(validator.isEmpty(title)){
       flaws.title="Title is Required";
    }

    if(validator.isEmpty(body)){
        flaws.body = "Body is Required";
    }

    return {
        flaws,
        isValid: isEmpty(flaws)
     };

};