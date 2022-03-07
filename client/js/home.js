let gdata = ""
function LOAD() {

    $.get("http://localhost:8080/fetch/fetchBlog",
        (data) => {
            gdata = data
            console.log("my frontend comes data",data)
            var x = "", i;
            x = '<div class = "row">'
            for (i = 0; i < data.length; i++) {
                let img='';
                if(data[i].image){
                    img =' <img class="card-img-top" src="'+data[i].image+'" alt="Card image cap">';

                }
                let audio = ''
                if(data[i].audio){
           
            audio = ' <audio controls class="embed-responsive-item"> <source src="'+data[i].audio+'"> </audio> ';
             
                }
                let video = ''
                if (data[i].video){
                    video = '<video controls class="embed-responsive-item"> <source src="'+data[i].video+'"> </video>'
                    
                
                }
                x = x +
                    `
                    <div class="card col w-100 mb-3 ml-5">
                        ${img}
        <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text">${data[i].blogDesc}</p>
        </div>
        <div class="col-sm-4 col-sm-offset-2 embed-responsive embed-responsive-4by3">
                ${audio}
            
        </div>
        <div class="embed-responsive embed-responsive-4by3">
        ${video}
        </div>
       
        <div class="card-footer">
            <p class="text-muted">${data[i].created_at}</p>
            <p class="text-muted">${data[i].full_name}</p>
        </div>
      </div>
      </div>

                    `
            }
            document.getElementById("blogShow").innerHTML = x;
        }
    );
}
LOAD()
