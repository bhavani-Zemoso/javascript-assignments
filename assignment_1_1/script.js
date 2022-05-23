var button = document.querySelector('button');
var print = document.querySelector('h2');

function addGreeting(name)
{
    return "Hello, " + name;
}

function printGreeting(functionName)
{
    let funName = document.getElementById('name').value;
    print.innerText = functionName(funName);
}

button.addEventListener('click', () => {
    console.log("In here");
    printGreeting(addGreeting);
});

