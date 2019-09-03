// var xhr = new XMLHttpRequest(); 

// xhr.open("GET", "https://swapi.co/api/"); //most common methods are GET and POST
// xhr.send(); //send the request

// // xhr.onreadystatechange = function() {
// //     if (this.readyState == 4 && this.status ==200) { //readyState 4 = operation has been completed (MORE STATES 0, 1, 2, 3 and 4) status = 200 ok, succeeded, content delivered (301, 401, 403, 404 and 500)
// //         document.getElementById("data").innerHTML = this.responseText; //get element by id from the DOM .innerHTML changes its text
// //     }
// // };

// xhr.onreadystatechange = function () {                  //the console.log calls the readyState so we can see when it is being called.
//     // console.log(this.readyState);                    //this function runs 5 times (states 0,1,2,3 and 4)
//     if(this.readyState == 4 && this.status == 200) {    //we need to setTimeout the next function so it runs after
//         data = JSON.parse(this.responseText);           //this function reaches readyState 4 and status 200
//     }
// };

// setTimeout(function(){//first argument is a function, second argument for how long it should wait before execution
//     console.log(data);
// }, 500);

//**********USING CALLBACK FUNCTION**********

// function getData(cb) { //cb argument = callback
//     var xhr = new XMLHttpRequest();

//     xhr.open("GET", "https://swapi.co/api/");
//     xhr.send();

//     xhr.onreadystatechange = function() {
//         if( this.readyState == 4 && this.status == 200) {
//             cb(JSON.parse(this.responseText));
//         }
//     };
// }
// //down here we don't need to set a timeout here is that we are calling the getData function that will only come up once it is 4-200
// // getData(function(data) { //When this runs, it will parse itsel in as a function [instead of (cb), it would be (function(data)) and it will take (JSON.parse(this.responseText)); as the data argument
// //   console.log(data);
// // });


// //Using this callback function, we have more control over our code as these functions are only invoked when we actually want them to be.
// function printDataToConsole(data) { //here we just got a separate function that takes data as an argument
//     console.log(data);
// }

// //with the separate function, I can call the getData with the "separate function" as an argument
// getData(printDataToConsole); //no opening and closing brackets as we are passing the actual function.


//*******One Step further ************

//removed the call to getData abd created a new function called "whiteToDocument"

// const baseURL = "https://swapi.co/api/"; // took the URL out into a CONSTANT

// function getData(type, cb) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             cb(JSON.parse(this.responseText));
//         }
//     };

//     xhr.open("GET", baseURL + type + "/"); //append the baseURL with the type we're parsing in adds the trailing "/"
//     xhr.send();
// }

// // function writeToDocument(type) { //type = type that comes from the API: film, people, vehicles, planet...
// //     getData(type, function(data) { //we want the getData to get the TYPE parameter
// //         document.getElementById("data").innerHTML = data; //changes innerHTML of "data" to data
// //     });
// // }

// function writeToDocument(type) {
//     var el = document.getElementById("data"); //sets the el (for element) variable to an empty strings everytime the button is clicked
//     el.innerHTML = "";

// //console.dir(data) allows us to browse through the object and to see its format **************************
//     getData(type, function(data) {
//         data = data.results; //results is where the information is shown by the api ** override the data variable with data.results to move us one step further into the directory

//         data.forEach(function(item) {
//             el.innerHTML += "<p>" + item.name + "</p>"; //here we have to use += to add the names of each entry instead of
//         });                                             //the second overwriting the first                    
//     });
// }

//*******************************************************************************************

// const baseURL = "https://swapi.co/api/";

// function getData(type, cb) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             cb(JSON.parse(this.responseText));
//         }
//     };

//     xhr.open("GET", baseURL + type + "/");
//     xhr.send();
// }

// function getTableHeaders(obj) {
//     var tableHeaders = [];

//     Object.keys(obj).forEach(function(key) {
//         tableHeaders.push(`<td>${key}</td>`)
//     });

//     return `<tr>${tableHeaders}</tr>`;
// }

// function writeToDocument(type) {
//     var tableRows = []; //will house each row of data for us
//     var el = document.getElementById("data");
//     el.innerHTML = "";

//     getData(type, function(data) {
//         data = data.results;
//         var tableHeaders = getTableHeaders(data[0]);

//         data.forEach(function(item) {
//             var dataRow = []; //empty array for each individual row

//             Object.keys(item).forEach(function(key) { //iterating over our keys
//                 //dataRow.push(`<td>${item[key]}</td>`); //the function pushes each element into our tableRow ** Passing in KEY as the index, we get the actual content instead of the keys name

//                 var rowData = item[key].toString(); //makes sure tha value of the key is a string
//                 var truncatedData = rowData.substring(0, 15); //shows only the 15 first characters from the key value
//                 dataRow.push(`<td>${truncatedData}</td>`);
//             });
//             tableRows.push(dataRow); //pushing that row into our tableRows array
//         });

//         el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`; // added tableRows here
//     });
// }


//****** FINAL VERSION OF THE CODE *******

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) { //IF THERE'S A VALUE, A url FOR BOTH
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) { //If NEXT but NOT previous
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) { //If NOT next, only previous
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");

    getData(url, function(data) {
        var pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}