/* Global Variables */
const apiKey = "&appid=d608b3a6b9efc1ca470ef5372f4f1606&units=metric";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
/**
 a variable to store the hostURL that i will use in the get&post routes
 to be able to fetch and send the data from and to the server
 */
const hostURL = "http://127.0.0.1:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// function that will work by clicking on the generate button
// will execute all the processes in the project
document.getElementById("generate").addEventListener("click", function (event) {
    // variable to store the zipcode that will be inserted by the client
    const zipCode = document.getElementById("zip").value;
    //variable to store the feeling that will be inserted by the client
    const whatYouFeel = document.getElementById("feelings").value;

    /* 
     if statement to determine if the client inserted the zip code before
     clicking on the button or not. if he did not, it will alert 
     a message to ask him to insert it   
    */
    if(!zipCode) {

        alert("please insert the Zipcode");
    }
    else {

        /**
         * if the client inserted the zipcode then the get function which will fetch
         * the data from the api will work then will send that data 
         * which is related to that zipcode to the server 
         * through post route then fetch that data again through get route to update
         * the UI with that data
         */
        getDataFromApi(zipCode).then((data) => {

            // used the hostURL with the url to be able to post the data
            // to the server because it needs a full URL to do that process
            postDataToServer(hostURL+"/toServer", 
            {
                date: newDate, 
                temp: data.main.temp,
                feeling: whatYouFeel
            });
        
            toUpdateUI();    
        });
    }
});

// asynchronous function to get the data from the API accourding to the Zipcode
const getDataFromApi = async(zipcode) => {

    const request = await fetch (apiURL + zipcode + apiKey);

    try {

        const receivedData = await request.json();
        
        // if statement to check if the zipcode is correct, if not it will
        // alert a message with the error either city not found or zipcode 
        // is not valid..etc
        if (receivedData.cod !== 200) {

            alert(receivedData.message);
        }
        else {

            return receivedData;
        }
    }
    catch(error) {

        console.log("error",error);
    }
};

// async function to post the data received from the API to the server side 
const postDataToServer = async (url = "" , postedData = {}) =>{

    const response = await fetch(url , {

        method : "POST",
        credentials : "same-origin",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(postedData)
    });

    try {

        const sentData = await response.json();
        return sentData;
    }
    catch(error) {

        console.log("error",error);
    }
};

// async function to get the data once again from the server to update the UI
const toUpdateUI = async () => {

    // used the hostURL with the url to be able to get the data
    // from the server because it needs a full URL to do that process
    const request = await fetch(hostURL+"/fromServer");

    try {

        const usedData = await request.json();
        document.getElementById("date").innerHTML = `DATE : ${usedData.date}`;
        document.getElementById("temp").innerHTML = `Temperatue : ${usedData.temp}&degC`;
        document.getElementById("content").innerHTML = `Your Feeling : ${usedData.feeling}`;
    }
    catch(error) {

        console.log("error",error);
    }
};

