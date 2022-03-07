let url = 'http://localhost:8080/';

function validateEmail(email) {

    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validatefname(fname) {

    return fname.match(
        /^[A-Za-z\s]+$/);
}
function validatelname(lname) {

    return lname.match(
        /^[A-Za-z\s]+$/);
}


function validatepassword(password) {

    return password.match(
        /^[a-zA-Z0-9!@#$%^&*]{6,16}$/);
}

function formValidation() {

    let fname = document.getElementById('fname');
    let lname = document.getElementById('lname');

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let cpwd = document.getElementById('cpwd');




    if (fname.value == '') {
        document.getElementById('error-fname').innerHTML = 'Enter First name.';
        return false;
    } else {
        if (validatefname(fname.value)) {
            document.getElementById('error-fname').innerHTML = '';
        } else {
            document.getElementById('error-fname').innerHTML = 'First Name is not valid,Please enter first name';
        }
    }

    if (lname.value == '') {
        document.getElementById('error-lname').innerHTML = 'Enter Last name.';
        return false;
    } else {
        if (validatelname(lname.value)) {
            document.getElementById('error-lname').innerHTML = '';
        } else {
            document.getElementById('error-lname').innerHTML = 'Last Name is not valid,Please enter first name';
        }
    }


    if (email.value == '') {
        document.getElementById('error-email').innerHTML = 'Please enter Email.';
        return false;
    } else {
        if (validateEmail(email.value)) {
            document.getElementById('error-email').innerHTML = '';
        } else {
            document.getElementById('error-email').innerHTML = 'Email is not valid,Please enter valid email address';
        }
    }




    if (password.value == '') {
        document.getElementById('error-password').innerHTML = 'Enter Password.';
        return false;
    } else {
        if (validatepassword(password.value)) {
            document.getElementById('error-password').innerHTML = '';
        } else {
            document.getElementById('error-password').innerHTML = 'Your password must be at least 6 characters and atmost 16.Your password must contain at least one letter.Your password must contain at least one digit.';
        }
    }

    if (cpwd.value == '') {
        document.getElementById('error-cpassword').innerHTML = 'Enter Confirm  Password.';
        return false;
    } else {
        if (password == cpwd) {
            document.getElementById('error-cpassword').innerHTML = '';

        } else {
            document.getElementById('error-cpassword').innerHTML = 'Please enter same password.';

        }

    }
    document.getElementById('error-cpassword').innerHTML = '';

    let postData ={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        password:cpwd.value
   }
    $.ajax({
        url: url+"insert/registerUser",
        type: "post",
        data: postData,
        success: function(res) {
             let fetch=res;
             console.log(res);
             if(fetch.insert=='success'){
                window.location.href=url+"login.html";
             }
        }
    });
    
//   console.log(postData);   

}

function validateClose() {
    window.location.href = "index.html";

}