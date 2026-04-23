const myJSON = localStorage.getItem('items');
const myJSON2 = localStorage.getItem('total');

const items = JSON.parse(myJSON);
const total = JSON.parse(myJSON2);

const tableBody = document.getElementById("tbody");
for (let i = 0; i < items.length; ++i) {
  const currItem = items[i];
  let itemName = currItem.itemName;
  let price = currItem.price;
  let discount = currItem.discount;
  let quantity = currItem.quantity;
  let taxable = currItem.taxable;
  
  const tableRow = document.createElement("tr");
  tableBody.appendChild(tableRow);
  
  let cell1 = document.createElement("td");
  cell1.innerText = itemName;
  tableRow.appendChild(cell1);
  let cell2 = document.createElement("td");
  cell2.innerText = "$" + Number(price).toFixed(2);
  tableRow.appendChild(cell2);
  let cell3 = document.createElement("td");
  if(discount) {
    cell3.innerText = "-" + discount + "%";
  }
  tableRow.appendChild(cell3);
  let cell4 = document.createElement("td");
  cell4.innerText = quantity;
  tableRow.appendChild(cell4);
  let cell5 = document.createElement("td");
  if (taxable) {
    cell5.innerText = "yes";
  } else {
    cell5.innerText = "no";
  }
  tableRow.appendChild(cell5);
}

const receipt = document.getElementById("receipt");
const amount = document.createElement("h3");
amount.innerText = "Total: $" + Number(total).toFixed(2);
receipt.appendChild(amount);
