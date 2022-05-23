/**
*
* Assume we are fetching the data from a rest endpoint in the get data function.
* we can simulate the same by replacing the setTimeout with fetch api and executing the same in a browser.
*
*/

function getData(uId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log("Fetched the data!");
            resolve("skc@gmail.com");
            }, 4000);
    });

}

async function test() {

    console.log("start")

    console.log("Email id of the user id is: " + await getData("skc"));
    console.log("end");
    
}

test();
    
    