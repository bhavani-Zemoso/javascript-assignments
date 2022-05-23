const list = document.querySelector('ul');
const input = document.querySelector('input');
const addButton = document.querySelector('button');

addButton.addEventListener('click', () => {

    const inputValue = input.value;
    input.value = '';

    let item = document.createElement('li');
    let itemInfo = document.createElement('span');
    let deleteButton = document.createElement('button');

    item.appendChild(itemInfo);
    item.appendChild(deleteButton);

    itemInfo.textContent = inputValue;
    deleteButton.textContent = 'Delete';

    list.appendChild(item);

    deleteButton.addEventListener('click', () => {

        list.removeChild(item);
    
    });

    input.focus();
});