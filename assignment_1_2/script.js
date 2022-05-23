
var button = document.querySelector('button');
var firstName;
var lastName;

button.addEventListener('click', () => {
    
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;

    execute();
});

function execute() {


    var print = document.querySelector('h2');

    var initials = (firstName, lastName) =>  firstName[0].toUpperCase() + lastName[0].toUpperCase() ;

    print.innerText = initials(firstName, lastName);

}

