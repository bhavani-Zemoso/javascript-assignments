const tableList = document.querySelector("#tableList");
const menuList = document.querySelector("#menuList");
const tableSearchBar = document.querySelector("#tableSearchBar");
const menuSearchBar = document.querySelector("#menuSearchBar");
const modals = document.querySelector("#modals");

let tables = [

    {
        "name": "Table 1",
        "totalPrice": 0,
        "totalItems": 0
    },

    {
        "name": "Table 2",
        "totalPrice": 0,
        "totalItems": 0
    },

    {
        "name": "Table 3",
        "totalPrice": 0,
        "totalItems": 0
    }
];

let menu = [

     {
         'name' : 'Festive Corn Salad',
         'category': 'Sides',
         'price': 229.0,
         'quantity': 1
     },

     {
         "name": "Mexican Street Corn",
         "category": "starters",
         "price": 249.0,
         "quantity": 1
     },

     {
        "name": "Chilly Rellenos",
        "category": "starters",
        "price": 269.0,
        "quantity": 1
    },

    {
        "name": "Mushroom Mango Salsa Tacos",
        "category": "starters",
        "price": 289.0,
        "quantity": 1
    },

    {
        "name": "California Crunchy Burritos",
        "category": "main course",
        "price": 349.0,
        "quantity": 1
    },

    {
        "name": "Sizzling Mexican Rice with Cottage Cheese Vera Cruz",
        "category": "main course",
        "price": 349.0,
        "quantity": 1
    },

    {
        "name": "Grandma's Enchiladas",
        "category": "main course",
        "price": 349.0,
        "quantity": 1
    },

    {
        "name": "Mango Pudding",
        "category": "desserts",
        "price": 199.0,
        "quantity": 1
    },

    {
        "name": "Mango Punch",
        "category": "beverages",
        "price": 169.0,
        "quantity": 1
    },

    {
        "name": "Strawberry Margarita",
        "category": "beverages",
        "price": 189.0,
        "quantity": 1
    },

];

let tableOrders1 = [];
let tableOrders2 = [];
let tableOrders3 = [];

const loadTables = (tables) => {

    let count = 0;

    const htmlString = tables.map((table) => {
        count++;
        return `
        <div class="card m-2" data-toggle="modal" data-target="#modal${count}" onclick="changeColor(${count})" id="modal ${count}">
            <div class="card-body">
            <li class="tables" id="table ${count}">
                <div class="card-title">${table.name}</div>
                <div class="card-text"><span>Rs.${table.totalPrice}&nbsp;</span><span>|&nbsp;Total items: ${table.totalItems}</span></div>
            </li>
            </div>
        </div>
        `;
    })
        .join('');

    tableList.innerHTML = htmlString;
}

const loadMenu = (menu) => {

    let count = 0;

    const htmlString = menu.map((item) => {
        count++;
        return `
        <div class="card m-2 p-4">
            <div class="card-body">
                <li id="item ${count}" draggable="true" class="items">
                    <div class="card-title">${item.name}</div>
                    <div class="card-text">${item.price}</div>
                </li>
            </div>
        </div>
        `;
    })
    .join('');

    menuList.innerHTML = htmlString;

}

const loadModals = (tables) => {
    
    let count = 0;

    const htmlString = tables.map((table) => {

        count++;

        return `
        <!-- Modal -->
        <div class="modal fade" id="modal${count}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header bg-warning">
                <h5 class="modal-title" id="exampleModalLongTitle">${table.name} : Order Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="revertColor(${count})">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableOrders${count}">
                    <tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="revertColor(${count})">Close</button>
                <button type="button" class="btn btn-warning" onclick="closeSession(${count})">Generate Bill</button>
            </div>
            </div>
        </div>
        </div>
        `
    })
    .join('');

    modals.innerHTML = htmlString;
}

loadTables(tables);
loadMenu(menu);
loadModals(tables);

function dragstartHandler(ev) {
    //ev.preventDefault();
    let temp = ev.target.id;
    console.log(temp);
    let dragStartIndex = parseInt(temp.charAt(temp.length-1));

    ev.dataTransfer.setData("text/plain", JSON.stringify(menu[dragStartIndex-1]));
    //console.log(JSON.stringify(menu[dragStartIndex-1]));
    ev.dataTransfer.effectAllowed = "copy"; 
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    
}

function dropHandler(ev) {
    ev.preventDefault();

    let itemObject = ev.dataTransfer.getData("text/plain");
    itemObject = JSON.parse(itemObject);

    addIntoTable(itemObject, this.getAttribute('id'));

    resetListeners();
}

window.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll(".items");
    const tableItems = document.querySelectorAll(".tables");

    for(i = 0; i < menuItems.length; i++)
    menuItems[i].addEventListener("dragstart", dragstartHandler);

    for(i = 0; i < tableItems.length; i++)
    {
        tableItems[i].addEventListener("dragover", dragoverHandler);
        tableItems[i].addEventListener("drop", dropHandler);
    }
    
});

tableSearchBar.addEventListener('keyup', (e) => {

    const searchString = e.target.value.toLowerCase();

    const filteredTables = tables.filter((table) => {

        return (table.name.toLowerCase().includes(searchString));
    });

    loadTables(filteredTables);
});

menuSearchBar.addEventListener('keyup' ,(e) => {

    const searchString = e.target.value.toLowerCase();

    const filteredMenu = menu.filter((item) => {

        return (item.name.toLowerCase().includes(searchString) || 
                item.category.toLowerCase().includes(searchString));
    });

    loadMenu(filteredMenu);
});


function addIntoTable(itemObject, tableId)
{
    let index = parseInt(tableId.charAt(tableId.length-1));
    console.log("table id : " + tableId);

    itemObject.subtotal = itemObject.price * itemObject.quantity;

    tables[index-1].totalItems += 1;
    tables[index-1].totalPrice += itemObject.subtotal;

    let tableOrders = returnRequiredTable(index);

    let orderIndex = tableContains(itemObject, tableOrders);
        if(orderIndex == -1)
        tableOrders.push(itemObject);
        else
        {
            tableOrders[orderIndex].quantity += 1;
            tableOrders[orderIndex].subtotal = tableOrders[orderIndex].price * tableOrders[orderIndex].quantity;
        }

    updateModal(index, tableOrders);
     
    loadTables(tables);

    resetListeners();
}

function resetListeners()
{
    const tableItems = document.querySelectorAll(".tables");

    for(i = 0; i < tableItems.length; i++)
    {
        tableItems[i].addEventListener("dragover", dragoverHandler);
        tableItems[i].addEventListener("drop", dropHandler);
    }
}

function updateModal(index, tableOrders)
{
    let currentTableBody = document.getElementById(`tableOrders${index}`);

    let count = 0;

    const htmlString = tableOrders.map((order) => {
        count++;
        //console.log("I'm here");
        return `
            <tr>
                <td>${count}</td>
                <td>${order.name}</td>
                <td>${order.subtotal}</td>
                <td><input type="number" name="quantity" value="${order.quantity}" id="inputValues${index}${count}" onchange="updateDetails(${index}, ${count})" min="1" class="input-group"/></td>
                <td class="fa fa-trash-o" onclick="removeOrder(${index}, ${count})"></td>
            </tr>
        `;
    })
    .join('');

    let totalString = "";

    if(tables[index-1].totalPrice != 0)
    totalString = `
        <tr>
            <td colspan="2">TotalPrice</td>
            <td colspan="3">${tables[index-1].totalPrice}</td>
        </tr>
    `;

    currentTableBody.innerHTML = htmlString + totalString;
}

function updateDetails(index, count)
{
    //console.log(order);
    console.log(index + " " + count);
    let newQuantity = document.getElementById(`inputValues${index}${count}`).value;
    console.log(newQuantity);

    let tableOrders = returnRequiredTable(index);

    let order = tableOrders[count-1];
    order.quantity = newQuantity;
    order.subtotal = order.price * order.quantity;
    updateTotal(tableOrders, index);
    updateModal(index, tableOrders);


    loadTables(tables);

    resetListeners();

}

function updateTotal(tableOrders, index)
{
    let totalPrice = 0;
    let totalQuantity = 0;
    for(i = 0; i < tableOrders.length; i++)
    {
        totalPrice += parseInt(tableOrders[i].subtotal);
        totalQuantity += parseInt(tableOrders[i].quantity);
    }

    tables[index-1].totalItems = totalQuantity;
    tables[index-1].totalPrice = totalPrice;
}

function removeOrder(index, count)
{
    let tableOrders = returnRequiredTable(index);

    tableOrders.splice(count-1, 1);
    updateTotal(tableOrders, index);
    updateModal(index, tableOrders);
    
    loadTables(tables);

    resetListeners();
}

function tableContains(itemObject, tableOrders)
{
    let orderIndex = tableOrders.findIndex((order) => (order.name) === (itemObject.name));
    console.log(orderIndex);
    return orderIndex;
}

function closeSession(index)
{
    tables[index-1].totalItems = 0;
    tables[index-1].totalPrice = 0;

    let tableOrders = returnRequiredTable(index);

    tableOrders.length = 0;
    updateTotal(tableOrders, index);
    updateModal(index, tableOrders);


    loadTables(tables);

    resetListeners();
    
}

function returnRequiredTable(index)
{
    if(index == 1)
    return tableOrders1;
    else if(index == 2)
    return tableOrders2;
    else if(index == 3)
    return tableOrders3;
}

function changeColor(index)
{
    let element = document.getElementById(`modal ${index}`);

    element.style.background = "#DDE0F6";
}

function revertColor(index)
{
    let element = document.getElementById(`modal ${index}`);

    element.style.background = "white";
}

