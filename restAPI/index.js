

// ================== IMPORTS =================================

const express=require("express")
const joi=require("joi")


//================Initialisation===============================

const app=express()

app.use(express.json())

const port = 3000 || process.env.PORT

var notes = [

{'title':'todo','note':'got to go to birthday party at 5.00 pm'},
{'title':'dream11 team','note':'6 english and 5 indian players'}

]

// ================== GET METHODS =================================




    /*################## TEST SERVICE ###########*/

app.get("/",function(req,res){
    res.send("Welcome to Manage Notes Application");
})



    /*################## GET ALL NOTES ###########*/

app.get("/api/notes",function(req,res){
    res.send(notes);
})



    /*################## GET NOTES BY TITLE ###########*/

app.get("/api/notes/:title",function(req,res){
    var title=req.params.title.toLowerCase()

    var note=getNotesByTitle(title)
    

    if(!note){
        res.status(404).send("Data Not Found")
        return ;
    }
    res.send(note)
})


// ================== POST METHODS =================================

app.post("/api/notes",function(req,res){
    var note=req.body

    const {error}=validateNotes(note)

    if(error){
        res.status(400).send({"message":error.details[0].message})
        return ;
    }
    
    if(!getNotesByTitle(note.title)){
        notes.push(note)
        res.send({"message":"Pushed Successfully"})
        return ;
    }

    res.status(409).send({"message":"Title Already Exists"})

    
})





// ================== PUT METHODS =================================



    /*################## OVERWRTIE NOTES ###########*/


app.put("/api/notes/overWrite",function(req,res){
    var newNote=req.body

    const {error}=validateNotes(newNote)
    
    if(error){
        res.status(400).send({"message":error.details[0].message})
        return ;
    }

    var note=getNotesByTitle(newNote.title)

    if(!note){
        res.status(404).send({"message":"Data Not Found"})
        return ;
    }

    note.note=newNote.note
    res.send({"message":"Updated Successfully"})
    

})



    /*################## APPEND NOTES BY TITLE ###########*/

app.put("/api/notes/append",function(req,res){
    var newNote=req.body

    const {error}=validateNotes(newNote)
    
    if(error){
        res.status(400).send({"message":error.details[0].message})
        return ;
    }

    var note=getNotesByTitle(newNote.title)

    if(!note){
        res.status(404).send({"message":"Data Not Found"})
        return ;
    }

    note.note+=" "+newNote.note
    res.send({"message":"Updated Successfully"})
    

})



// ================== DELETE METHODS =================================


app.delete("/api/notes/:title",function(req,res){
    const title=req.params.title
    
    var note=getNotesByTitle(title)
    if(!note){
        res.status(404).send({"message":"Data Not Found"})
        return ;
    }

    const index=notes.indexOf(note)
    notes.splice(index,1)

    res.send({"message":"Deleted Successfully"})
        

})



//===================       UDF     =================================



function validateNotes(note){
    const schema= joi.object( {"title":joi.string().min(3).required(),
                    "note":joi.string().required()  })

    return schema.validate(note)

    
}


function getNotesByTitle(title){
    var note=notes.find(function(eachNote){
        return eachNote.title==title
        })
    
    return note
}




//========================== listen to port ============================

app.listen(port,function(){
    console.log(`Listerning to port ${port}`)
})