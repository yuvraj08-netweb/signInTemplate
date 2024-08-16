// SELECTING DOM ELEMENTS
const pass = document.querySelector("#password");
const email = document.querySelector("#email");
const submitButton = document.querySelector("#submit");
const rememberMe = document.querySelector("#remember-me");
const googleButton = document.querySelector("#google");
const githubButton = document.querySelector("#github");
const passwordErrorBox = document.querySelector("#passwordError");
const emailErrorBox = document.querySelector('#emailError');

// VARIABLES TO STORE FORM DATA
let emailId,password,remember; 

//ARRAY TO STORE FORM DATA
let formDataArray = [];

document.addEventListener('DOMContentLoaded',()=>{
    formDataArray = JSON.parse(localStorage.getItem("Submits")) || [];
})

//ADDING EVENT LISTENERS
submitButton.addEventListener('click',handleSubmit);

googleButton.addEventListener('click',()=>{
    alert("SignIn With Google Not Enabled");
});

githubButton.addEventListener('click',()=>{
    alert("SignIn With GitHub Not Enabled");
});

// Enter Key Triggers Submit Button
pass.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
    }
});

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//EMAIL INPUT HANDLE
email.addEventListener('input',()=>{
    if(email.value !== ''){
        if (!emailRegex.test(email.value)) {
            emailErrorBox.textContent = 'Please Enter A Valid Email ID';
            return false;
        } else {
            emailErrorBox.textContent = ''; // Clear the error message
            return true;
        }
    }
    else{
        emailErrorBox.textContent = 'Required Feild';
    }
})


// Password validation
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

pass.addEventListener('input',()=>{
    if(pass.value !== ''){
        if (!passwordRegex.test(pass.value)) {
            passwordErrorBox.textContent = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
            return false;
        } else {
            passwordErrorBox.textContent = ''; // Clear the error message
            return true;
        }
    }else {
        passwordErrorBox.textContent = 'Required Feild';
    }
});

// HANDLES SUBMIT ACTION
function handleSubmit(e){

    // checking if the input contains any value or is empty
    if (email.value !== '' && pass.value !=='' ) {

        e.preventDefault();
        let doRemember;
        // Applying checked state
        if (rememberMe.checked) {
            doRemember = true;
        } else {
            doRemember = false;
        }
        const formData = {
            emailId : email.value,
            password : pass.value,
            remember : doRemember
        }

        formDataArray.push(formData);

        localStorage.setItem("Submits", JSON.stringify(formDataArray));
        email.value = '';
        pass.value = '';
        rememberMe.checked = false;

        alert("Form Submitted Succesfully!");
    }
    else {
        alert("Please Enter Both The Feilds!");
    }

}

