import sys
import requests
import time





def getMode(modes):
    modes=modes.lower()
    switcher={"0":0,"cli":0,"1":1,"interactive":1}

    try:
        return switcher[modes]
    except:
        raise Exception("Invalid mode \n . \n . \n 0 / 1 (or) CLI / Interactive")




def searchWikipedia(searchTerm):
    S = requests.Session()

    URL = "https://en.wikipedia.org/w/api.php"

    PARAMS = {
        "action": "query",
        "list":"search",
        "prop":"info",
        "inprop":"url",
        "namespace": "0",
        "srsearch": searchTerm,
        "srlimit": "20",
        "format": "json"
    }

    R = S.get(url=URL, params=PARAMS)
    data = R.json()
    progressBar(10,"Links fetched")
    totalHits=data["query"]["searchinfo"]["totalhits"]
    results=data["query"]["search"]
    file1 = open("results.txt", "a")  
    file1.write("================= "+str(searchTerm)+" - Top 20 results out of "+str(totalHits)+" results ===============\n\n") 

    cnt=1
    temp=10
    nFiles=min(20,totalHits)
    offset=int(35/nFiles)
    
    for info in results:
        temp+=offset
        progressBar(temp,"Writing "+str(cnt)+"/"+str(nFiles)+" Links")
        cnt+=1
        file1.write(info["title"]+" -------> https://en.wikipedia.org/?curid=+"+str(info["pageid"])+"\n") 
        time.sleep(0.3)
    
    progressBar(48,"All the links Written")
    time.sleep(1)
    progressBar(50,"")
    print("\nCheck the results.txt file")
    
        
    file1.close() 


def progressBar(count,cmnt):
    bar="="*count+"-"*(50-count)

    sys.stdout.flush()
    sys.stdout.write("| "+bar+" | "+cmnt+"\r")
    
    
    
    



def searchTermMain():
    commands=sys.argv
    commands.pop(0)
    searchTerm=""

    #========================= Mode made mandatory==============================
    
    if(len(commands)==0 or (commands[0]!="-m" and commands[0]=="--mode")):
        raise Exception("\nSpecifying Mode is Mandatory \n . \n . \n -m or --mode")

    if(len(commands)<2):
        raise Exception("\n -m [--mode] should be followed by 0 / 1 (or) cli / interactive")

    #======================= input depending on mode======================================
    
    if(getMode(commands[1])==0):

        if(len(commands)<4):
            raise Exception(" \n -v [--value] SEARCHTEXT is the format")

        if(commands[2]!="-v" and commands[2]!="--value"):
            raise Exception("\n expecting -v (or) --value to enter search term")
               
        
        searchTerm=commands[3]
    else:
        print("Enter the search term: ")
        searchTerm=input()
        searchTerm=searchTerm.strip()
        if(searchTerm==""):
            raise Exception("Search Term cannot be empty")

    #======================= start progress bar and function is called======================
    progressBar(0,"Links being fetched")
    searchWikipedia(searchTerm)


searchTermMain()



    