const express = require('express'); //requiring express
const dataFile = require('./app/data/animals'); // grabbing data file for json object
const app = express(); //using express 



const PORT = 3000;  // Server Port number
app.set('appData', dataFile); //app accessing data file for Json object
app.set('view engine', 'ejs') //app use ejs as view engine
app.set('views', 'app/views') //app uses view folder for view engine 

app.use(express.static('app')); //serving up the app folder mainly to access images in this case.


/**Route for dog imgaes and information
 * User will be able to access each dog by typing in the dog name in the url route at local host 
 * ex: localhost:3000/dog/ <-- dog name from json in datafile-- >
 */

app.get('/dog/:name', function(req, res){  
    console.log(`METHOD ${req.method}\nURL ${req.url}`) //data from request.
   
    var dogName = req.params.name;  //grabbing the parameter of /:name in route and assigining it to a name 

    /**  dogChoosen is the functoion thats going to assign the names from json object to the variable dogName
     * ex: localhost:3000/dog/Rocco will only show information about the object at that position */ 

    var dogChoosen = dataFile.find(function(pet){  
        return pet.name == dogName;
    })

    //rendering the file dog.ejs  
    res.render('dog', {
        name: dogChoosen.name,
        description: dogChoosen.description,
        imgURL: dogChoosen.imgURL
    });
    
   
})


//promtps user when server is listenings

app.listen(3000, ()=>{
    console.log(`Server Listening on port ${PORT}`)
})