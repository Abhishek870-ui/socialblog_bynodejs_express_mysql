let token = window.localStorage.getItem('token')


//this function create for logout functionality
function logout() {

    $.post("http://localhost:8080/delete/logout", {
            "token": token
        },
        function(data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus:  " + status);
        })
    alert("logged out ")

    window.open("login.html", "_self")
    console.log('out');

    window.localStorage.removeItem('token')

}

// this function create for profile pic show on header
// function LOAD() {

//     if (window.localStorage.getItem('login') != null) {

//         $.get("http://localhost:8080/fetch", (data) => {
//             //console.log(data)
//             let x = ""

//                 for (i = 0; i < data.length; i++) {
//                     x = x +
//                         `
//                      <img src = ${data[i].pic}>
//                      `
//                 }
//             document.getElementById("pic").innerHTML = x;
//             console.log(x)
//         })
//     }
// }

// LOAD()