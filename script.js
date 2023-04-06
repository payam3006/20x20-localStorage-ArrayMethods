q = console.log;
// localStorage.clear();

const historyItems = document.getElementById("historyItems");
const yourBalanceBox = document.getElementById("yourBalance");
const totalIncomeBox = document.getElementById("totalIncome");
const totalExpenseBox = document.getElementById("totalExpense");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const itemsObject = [];
let lastItem = 0;

// localStorage.name0 = "n0";
// localStorage.amount0 = 100;
// localStorage.name1 = "n1";
// localStorage.amount1 = -200;
// localStorage.name2 = "n2";
// localStorage.amount2 = 50.345345634;

//localStorage push in objectArray...
while (eval(`localStorage.name${lastItem}`)) {
  itemsObject[lastItem] = {
    name: eval(`localStorage.name${lastItem}`),
    amount: parseFloat(eval(`localStorage.amount${lastItem}`)),
  };

  lastItem += 1;
}

function total() {
  if (!itemsObject[0]) {
    return 0;
  } else {
    return itemsObject.reduce(function (total, curObj) {
      return total + curObj.amount;
    }, 0);
  }
}

function totalIncome() {
  if (!itemsObject[0]) {
    return 0;
  } else {
    return itemsObject
      .filter(function (curObj) {
        return curObj.amount > 0;
      })
      .reduce(function (total, curObj) {
        return total + curObj.amount;
      }, 0);
  }
}

function totalExpense() {
  if (!itemsObject[0]) {
    return 0;
  } else {
    return itemsObject
      .filter(function (curObj) {
        return curObj.amount < 0;
      })
      .reduce(function (total, curObj) {
        return total + curObj.amount;
      }, 0);
  }
}

function setItemsFromItemsObject() {
  historyItems.innerHTML = "";
  itemsObject.forEach(function (obj, index) {
    if (obj.amount >= 0) {
      historyItems.innerHTML += `<div id="${index}" class="income item" onmouseover="showClose(${index})" onmouseleave="hideClose(${index})">
    <div id="close${index}" class="close hidden"  onclick="deleteItem(${index})"><i class="fa fa-window-close"></i></div>
    <div class="itemTitle">
        ${obj.name}
    </div>
    <div class="itemAmount">
        ${obj.amount}
    </div>
</div>`;
    } else {
      historyItems.innerHTML += `<div id="${index}" class="expense item" onmouseover="showClose(${index})" onmouseleave="hideClose(${index})">
    <div id="close${index}" class="close hidden"   onclick="deleteItem(${index})"><i class="fa fa-window-close"></i></div>
    <div class="itemTitle">
        ${obj.name}
    </div>
    <div class="itemAmount">
        ${obj.amount}
    </div>
</div>`;
    }
  });
  yourBalanceBox.innerText = dollarUS(total());
  totalExpenseBox.innerText = dollarUS(totalExpense());
  totalIncomeBox.innerText = dollarUS(totalIncome());
}

function setLocalStorageFromItemsObject() {
  localStorage.clear();
  itemsObject.forEach(function (obj, index) {
    // q(obj.name, obj.amount, index);
    eval(`localStorage.name${index}=obj.name`);
    eval(`localStorage.amount${index}=obj.amount`);
  });
}

function deleteItem(i) {
  itemsObject.splice(i, 1);
  setItemsFromItemsObject();
  setLocalStorageFromItemsObject();
}

function addItem() {
  if (text.value && amount.value) {
    itemsObject[itemsObject.length] = {
      name: text.value,
      amount: parseFloat(amount.value),
    };
    setItemsFromItemsObject();
    setLocalStorageFromItemsObject();

    // q(itemsObject);
    // q(text.value);
    // q(amount.value);
  }
}

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

function showClose(i) {
  document.getElementById(`close${i}`).classList.remove("hidden");
}

function hideClose(i) {
  document.getElementById(`close${i}`).classList.add("hidden");
}
/////////////////////////////////////////////
q(itemsObject);
// q(totalIncome());
// q(totalExpense());
// q(total());

setItemsFromItemsObject();
