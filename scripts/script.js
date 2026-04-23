let firstItem = document.querySelector(".item");
let firstItemName = firstItem.querySelector(".itemName");
let firstPrice = firstItem.querySelector(".price");
let firstRemove = firstItem.querySelector(".remove");
let firstDiscount = firstItem.querySelector(".discount");
let firstQuantity = firstItem.querySelector(".quantity");
let firstTaxable = firstItem.querySelector(".taxable");
let goToReceipt = document.getElementById("submit");
let total = 0;
const TAX_RATE = 1.06;

let removes = [firstRemove.addEventListener("click", removeItem)];
let priceListeners = [firstPrice.addEventListener("input", calculateTotal)];
let discountListeners = [firstDiscount.addEventListener("input", calculateTotal)]
let quantityListeners = [firstQuantity.addEventListener("input", calculateTotal)]
let taxableListeners = [firstTaxable.addEventListener("input", calculateTotal)];


function isValid(event) {
  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; ++i) {
    let currItem = items[i];
    let itemName = currItem.querySelector(".itemName");
    let price = currItem.querySelector(".price");
    let quantity = currItem.querySelector(".quantity");

    if (!itemName || !price || !quantity) {
      return false;
    }
    if (!itemName.checkValidity() || !price.checkValidity() || !quantity.checkValidity()) {
      return false;
    }
  }
  addItem();
  return true;
}

function addItem() {
  // creating item div
  const form = document.querySelector('form');
  const submit = document.getElementById('submit');
  const item = document.createElement('div');
  item.classList.add("item");
  form.insertBefore(item, submit);

  // creating item name input
  const itemLabel = document.createElement('label');
  itemLabel.htmlFor = "itemName";
  itemLabel.innerText = "Item";
  item.appendChild(itemLabel);
  const itemName = document.createElement('input');
  itemName.type = "text";
  itemName.classList.add("itemName");
  itemName.classList.add("info");
  itemName.name = "itemName";
  itemName.placeholder = "Item Name";
  itemName.required = true;
  item.appendChild(itemName);

  // creating price input
  const priceLabel = document.createElement('label');
  priceLabel.htmlFor = "price";
  priceLabel.innerText = "$";
  item.appendChild(priceLabel);
  const price = document.createElement('input');
  price.type = "number";
  price.classList.add("price");
  price.classList.add("info");
  price.name = "price";
  price.placeholder = "Price";
  price.min = "0";
  price.step = "any";
  price.required = true;
  item.appendChild(price);

  // creating discount input
  const discountLabel = document.createElement('label');
  discountLabel.htmlFor = "discount";
  discountLabel.innerText = "-%";
  item.appendChild(discountLabel);
  const discount = document.createElement('input');
  discount.type = "number";
  discount.classList.add("discount");
  discount.classList.add("info");
  discount.name = "discount";
  discount.placeholder = "Discount";
  discount.min = "0";
  discount.max = "100";
  item.appendChild(discount);

  // creating quantity input
  const quantityLabel = document.createElement('label');
  quantityLabel.htmlFor = "quantity";
  quantityLabel.innerText = "#";
  item.appendChild(quantityLabel);
  const quantity = document.createElement('input');
  quantity.type = "number";
  quantity.classList.add("quantity");
  quantity.classList.add("info");
  quantity.name = "quantity";
  quantity.placeholder = "Quantity";
  quantity.min = "1";
  quantity.step = "1";
  quantity.value = "1";
  quantity.required = true;
  item.appendChild(quantity);

  // creating fieldset
  const fieldset = document.createElement('fieldset');
  item.appendChild(fieldset);

  // creating label
  const label = document.createElement('label');
  label.htmlFor = "taxable";
  label.innerText = "Taxable?";
  fieldset.appendChild(label);

  // creating taxable input
  const taxable = document.createElement('input');
  taxable.type = "checkbox";
  taxable.classList.add("taxable");
  taxable.name = "taxable";
  taxable.value = "taxable";
  fieldset.appendChild(taxable);

  // adding removeButton
  const remove = document.createElement('button');
  remove.type = "button";
  remove.innerText = "Remove";
  remove.classList.add("remove");
  remove.classList.add("info");
  item.appendChild(remove);
  
  removes.push(remove.addEventListener("click", removeItem));
  priceListeners.push(price.addEventListener("input", calculateTotal));
  discountListeners.push(discount.addEventListener("input", calculateTotal));
  quantityListeners.push(quantity.addEventListener("input", calculateTotal));
  taxableListeners.push(taxable.addEventListener("input", calculateTotal));
  itemName.addEventListener("input", isValid);
  price.addEventListener("input", isValid);
  quantity.addEventListener("input", isValid);
}

function removeItem(event) {
  let items = document.querySelectorAll(".item");
  const item = event.target.parentElement;
  const lastItem = items[items.length - 1];
  const lastPrice = lastItem.querySelector(".price");
  const lastItemName = lastItem.querySelector(".itemName");
  if (event.target.id == "submit") {
    lastItem.remove();
  } else if (items.length > 1 && lastItem != item && event.target.id != "submit") {
      item.remove();
      calculateTotal(event);
  }
}

function calculateTotal(event) {
  let prices = document.querySelectorAll(".price");
  let discounts = document.querySelectorAll(".discount");
  let quantity = document.querySelectorAll(".quantity");
  let taxable = document.querySelectorAll(".taxable");
  let errorFlag = false;
  total = 0;
  for (let i = 0; i < prices.length; ++i) {
    if (prices[i] && discounts[i] && quantity[i]) {
      let marginalPrice = Number(prices[i].value) * (1 - Number(discounts[i].value) / 100.0) * Number(quantity[i].value);
      if (taxable[i].checked) {
        marginalPrice *= TAX_RATE;
      }
      total += marginalPrice;
    }
    errorFlag = errorFlag || (total < 0 || event.target.value < 0 || (Number(quantity[i].value) % 1 !== 0));
  }
  if (errorFlag) {
    document.getElementById("Total").innerText = "ERROR";
  } else {
    document.getElementById("Total").innerText = "$" + total.toFixed(2);
  }
}

function collectData(event) {
  let items = document.querySelectorAll(".item");
  let data = [];
  for (let i = 0; i < items.length; ++i) {
    let currItem = items[i];
    let itemName = currItem.querySelector(".itemName");
    let price = currItem.querySelector(".price");
    let discount = currItem.querySelector(".discount");
    let quantity = currItem.querySelector(".quantity");
    let taxable = currItem.querySelector(".taxable");

    const item = {
      index: i,
      itemName: itemName.value,
      price: price.value,
      discount: discount.value,
      quantity: quantity.value,
      taxable: taxable.checked
    };

    data.push(item);
  }
  let myJSON = JSON.stringify(data);
  localStorage.setItem('items', myJSON);
  localStorage.setItem('total', total);
  console.log(data);
  console.log(myJSON);
}


const myJSON1 = localStorage.getItem('items');
const myJSON2 = localStorage.getItem('total');

const oldItems = JSON.parse(myJSON1);
const totalAmount = JSON.parse(myJSON2);


for (let i = 0; i < oldItems.length; ++i) {
  addItem();
}

const currItems = document.querySelectorAll(".item");

for (let i = 0; i < oldItems.length; ++i) {
  const currItem = oldItems[i];
  const currItem2 = currItems[i];

  currItem2.querySelector(".itemName").value = currItem.itemName;
  currItem2.querySelector(".price").value = currItem.price;
  currItem2.querySelector(".discount").value = currItem.discount;
  currItem2.querySelector(".quantity").value = currItem.quantity;
  currItem2.querySelector(".taxable").value = currItem.taxable;

}

firstItemName.addEventListener("input", isValid);
firstPrice.addEventListener("input", isValid);
firstQuantity.addEventListener("input", isValid);
goToReceipt.addEventListener("click", removeItem);
goToReceipt.addEventListener("click", collectData);
