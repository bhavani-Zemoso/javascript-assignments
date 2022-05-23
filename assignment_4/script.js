
const localNumber = document.querySelector("#localNumber");
const sessionNumber = document.querySelector("#sessionNumber");

function localCounter()
{
    if(localStorage.localCount)
    localStorage.setItem('localCount', parseInt(localStorage.getItem('localCount')) + 1);
    else
    localStorage.localCount = 1;

    localNumber.innerText = localStorage.getItem("localCount");
}

function sessionCounter()
{
    if(sessionStorage.sessionCount)
    sessionStorage.setItem('sessionCount', parseInt(sessionStorage.getItem('sessionCount')) + 1);
    else
    sessionStorage.sessionCount = 1;

    sessionNumber.innerText = sessionStorage.getItem("sessionCount");
}