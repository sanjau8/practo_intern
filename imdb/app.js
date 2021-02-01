const express = require('express')
const app = express()
const port=3000;

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function remWhiteSpace(text){

    return text.toUpperCase().replace(/\s/g, "")
    
    

}

app.get("/getMovieByName",function(req,res){
    var query=req.query;
    var movieName=query.movieName;
    movieName=remWhiteSpace(movieName)


    var xhttp = new XMLHttpRequest();
    
xhttp.onreadystatechange = function() {
    
  if (this.readyState == 4 && this.status == 200) {
   
   

    var response=JSON.parse(this.responseText);
    
    if(response["Response"]=="False"){
        res.end(JSON.stringify({"status":response["Error"]}));


    }

    res.end(JSON.stringify({"status":"found","name":response["Title"],"rating":response["imdbRating"]}));

    }
  }

xhttp.open("GET", `http://www.omdbapi.com/?t=${movieName}&apikey=d7d3e6d5`, true);
xhttp.send();



    

})

app.listen(port);