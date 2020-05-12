	//i for while and if loops
	var i = 0;


function validateForm(){
	//alert("beginning validation");
	//set i equal to 0 for beginning validation
	i = 0;


	//variables defined for each data type for blank field check
	var nameInput = document.forms["assign3"]["name"].value;
	var addressInput = document.forms["assign3"]["address"].value;
	var cityInput = document.forms["assign3"]["city"].value;
	var phoneInput = document.forms["assign3"]["phone"].value;
	var emailInput = document.forms["assign3"]["email"].value;
	var dateInput = document.forms["assign3"]["birth"].value;
	var messageInput = document.forms["assign3"]["message"].value;
	var verificationInput = document.forms["assign3"]["verification"].value;



	validateNotBlank(nameInput, "name");
	validateNotBlank(addressInput, "address");
	validateNotBlank(cityInput, "city");
	validateNotBlank(phoneInput, "phone");
	validateNotBlank(emailInput, "email");
	validateNotBlank(dateInput, "birth");
	validateNotBlank(messageInput, "message");
	validateNotBlank(verificationInput, "verification");


	validateName(nameInput);

	validateAddress(addressInput);

	validatePhone(phoneInput);

	validateEmail(emailInput);

	validateVerification(verificationInput);


	//validateDate(dateInput);



		//alert("after functions");

	if (i < 1){

	return false;

	} else if(i >= 0){

		return true;
	}





	//alert("ending validation");
	//document.getElementById("assign3").submit();

}


//general "field not blank" validation - may need more testing

function validateNotBlank(value, label){
	if (value == null || value == ""){

		alert("Please enter a value for " + label);
		//return false;
		i = -9999;

	}
	i++;
	//return true;

}


//name validation function - tested, WORKS

function validateName(value){


	var nameREGEX = /^[a-zA-Z]+ [a-zA-Z]+$/;

	if (nameREGEX.test(value)){
		i++;
		//return true;

	} else{

		alert("This is not a valid name. Please enter in your name in the format 'Firstname Lastname'");
		//return false;
		i = -9999;
	}
}


//email validation function - tested, WORKS

function validateEmail(value){


	var emailREGEX = /\S+@\S+\.\S+/;

	if (emailREGEX.test(value)){
		i++;
		//return true;

	} else{

		alert("This is not a valid email. Please enter in your email in the format 'address@domain.xxx'");
		//return false;
		i = -9999;
	}
}


//address field validation function - tested, WORKS

function validateAddress(value){
	var addressREGEX = /^\s*\S+(?:\s+\S+){2}/;

	if (addressREGEX.test(value)){
		i++;
		//return true;
	} else{

		alert("Invalid address. Please enter in a valid addresss in the format '# streetname'.");
		i = -9999;
	}

}


//phone field validation function - tested, WORKS

function validatePhone(value){
	var phoneREGEX = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;

	if (phoneREGEX.test(value)){
		i++;
		//return true;
	} else{

		alert("Invalid phone number. Please enter in a valid phone number.");
		i = -9999;
	}

}

//security question validation

function validateVerification(value){
	var number = 30;

	if (number == value){
		i++;
		//return true;
	} else{

		alert("Invalid security question answer. Please try again.");
		i = -9999;
	}

}





//works except for valid date range checker, MOVING ON
/*
function validateDate(input){
var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
var returnval=false

if (!validformat.test(input))
	{
alert("Invalid Date Format. Please correct and submit again.");
//return false;
i = -9999;
	}

	else{ //Detailed check for valid date ranges
var monthfield=input.split("/")[0]
var dayfield=input.split("/")[1]
var yearfield=input.split("/")[2]
var dayobj = new Date(yearfield, monthfield-1, dayfield)

	}
if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
{
alert("Invalid Day, Month, or Year range detected. Please correct and submit again with mm/dd/yyyy formatting.")
//return false;
i = -9999;
}
else{
	//return true;
	i++;
}
}
*/
