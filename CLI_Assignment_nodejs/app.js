
const prompt = require('prompt-sync')(); 

const fetch = require('node-fetch');
const fs = require('fs');

const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({format: 'Progress | {bar} | {comment}'}
, cliProgress.Presets.legacy);


function getMode(mode){
    

        switch(mode.toLowerCase()){
            case "0":  
            case "cli": return 0;
            break;
            case "1":
            case "interactive": return 1;
            break;
            default: throw new Error("Invalid mode \n . \n . \n 0 / 1 (or) CLI / Interactive")
        }
        
    
}

function progressBar(time,cmnt){
    
    bar1.update(time,{comment:cmnt})

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    progressBar(30,"Links fetched")
    if (!response.ok) {
      throw Error(response.statusText);
    }

    response.json().then(function(values){
        var hits=values.query.searchinfo.totalhits;
        var allHits=values.query.search
        fs.appendFileSync("results.txt", `================= ${searchQuery} - Top 20 results out of ${hits} results ===============\n\n` );
        var temp=30;
        var files=Math.min(20,hits)
        var offset=Math.floor(150/files)
        var count=1;
        allHits.forEach(function(ele){
            temp+=offset;
            progressBar(temp,`Writing ${count}/${files} links`)
            sleep(300);
            count+=1
            fs.appendFileSync("results.txt",`${ele.title} -------> https://en.wikipedia.org/?curid=${ele.pageid}\n`);
        })
        progressBar(190,"All links written")
        
        fs.appendFileSync("results.txt","\n")

        setTimeout(function(){
            progressBar(200,"")
        bar1.stop();
        console.log("Check the results.txt file")
        },1000)
        
    })
    
    
  }



  



function searchTermMain(){

    var searchTerm="";
    var myArgs = process.argv.slice(2);


//=============== -m or --mode made mandatory =========================

if(myArgs[0]!="-m" && myArgs[0]!="--mode"){
throw new Error("Specifying Mode is Mandatory \n . \n . \n -m or --mode")
}


//================== get mode and assign search term =====================



if(getMode(myArgs[1])==0){

if(myArgs[2]!="-v" && myArgs[2]!="--value"){
    throw new Error("expecting -v (or) --value to enter search term");
}

if(myArgs[3]==undefined){
    throw new Error("Search Term cannot be empty");
}

searchTerm=myArgs[3];
}

else{

    searchTerm=prompt("Enter the search Term : ");
    searchTerm=searchTerm.trim()
    if(searchTerm==""){
        throw new Error("Search Term cannot be empty");        
    }
}


bar1.start(200, 0,{comment:"Links being fetched"});
searchWikipedia(searchTerm)

}



searchTermMain();

