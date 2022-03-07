$(document).ready(() => {
    $("#send").click((event) => {
        event.preventDefault();
        $.post("http://localhost:8080/fetch/authUser", {
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value

        },
            (data, status) => {
                console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
                if (data.auth == "success") {
                    console.log("id from server  : ", data.id)
                    window.localStorage.setItem('token','')
                    window.localStorage.setItem('login','')
                    window.localStorage.clear();
                    window.localStorage.setItem('token', data.token)
                    window.location.href = "mainpage.html";

                }
                if (data.auth == "failed")
                {
                    alert("Login details not correct")
                }

            })
    })
})


function signup() {
    window.location.href = "signin.html";

}