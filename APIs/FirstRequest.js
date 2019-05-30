const request = require("request");

/*
//FIRST PART REQUESTS THE WEBISTES
request("http://www.reddit.com", function(error, response, body){
    if(error){
        console.log("Something went wrong");
        console.log(error);
    }else{
        if(response.statusCode === 200){
            //THINGS WORK
            console.log(body)
        }
    }
});
*/

request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body){
    /*
    eval(require("locus"));
    */
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            //YOU CAN USE "." SYNTAX TOO ex: parsedData.name
            console.log(parsedData["name"] + " lives in " + parsedData.address.city);
        }
});
