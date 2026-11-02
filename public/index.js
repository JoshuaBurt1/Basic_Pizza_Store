// Data Schema
const SIZES = [
  { label: "Select Pizza Size...", name: "", price: 0 },
  { label: "Small ($10.00)", name: "Small Pizza", price: 10 },
  { label: "Medium ($12.00)", name: "Medium Pizza", price: 12 },
  { label: "Large ($15.00)", name: "Large Pizza", price: 15 },
  { label: "Extra Large ($20.00)", name: "Extra Large Pizza", price: 20 },
  { label: "Panzerotti ($14.00)", name: "Panzerotti", price: 14 },
];

const TOPPINGS = [
  { id: "top_0", name: "Olive", price: 1.0 },
  { id: "top_1", name: "Pepper", price: 2.0 },
  { id: "top_2", name: "Pineapple", price: 2.0 },
  { id: "top_3", name: "Ham", price: 3.0 },
  { id: "top_4", name: "Pepperoni", price: 3.0 },
  { id: "top_5", name: "Bacon", price: 4.0 },
  { id: "top_6", name: "Extra Cheese", price: 5.0 },
];

const DIPS = [
  { label: "Select Dip...", name: "", price: 0 },
  { label: "Jalapeno ($0.50)", name: "Jalapeno Dip", price: 0.5 },
  { label: "Habanero ($0.50)", name: "Habanero Dip", price: 0.5 },
  { label: "Ghost Pepper ($0.50)", name: "Ghost Pepper Dip", price: 0.5 },
  { label: "Ranch ($0.50)", name: "Ranch Dip", price: 0.5 },
  { label: "Three Cheese ($0.50)", name: "Three Cheese Dip", price: 0.5 },
  { label: "Sweet & Sour ($0.50)", name: "Sweet & Sour Dip", price: 0.5 },
  { label: "Plum ($0.50)", name: "Plum Dip", price: 0.5 },
];

const SIDES = [
  { label: "Select Side...", name: "", price: 0 },
  { label: "Chicken Wings ($10.00)", name: "Chicken Wings", price: 10 },
  { label: "Chicken Bites ($12.00)", name: "Chicken Bites", price: 12 },
  { label: "Garlic Bread ($6.00)", name: "Garlic Bread", price: 6 },
  { label: "Cheese Bread ($7.00)", name: "Cheese Bread", price: 7 },
  { label: "Mozzarella Sticks ($8.00)", name: "Mozzarella Sticks", price: 8 },
];

const BEVERAGES = [
  { label: "Select Beverage...", name: "", price: 0 },
  { label: "Coca-Cola ($2.50)", name: "Coca-Cola", price: 2.50 },
  { label: "Diet Coke ($2.50)", name: "Diet Coke", price: 2.50 },
  { label: "Sprite ($2.50)", name: "Sprite", price: 2.50 },
  { label: "Iced Tea ($2.75)", name: "Iced Tea", price: 2.75 },
  { label: "Sparkling Water ($3.00)", name: "Sparkling Water", price: 3.00 },
];

const DESSERTS = [
  { label: "Select Dessert...", name: "", price: 0 },
  { label: "Chocolate Lava Cake ($6.50)", name: "Chocolate Lava Cake", price: 6.50 },
  { label: "Cinnamon Sticks ($5.00)", name: "Cinnamon Sticks", price: 5.00 },
  { label: "Cannoli (2 Pack) ($5.50)", name: "Cannoli (2 Pack)", price: 5.50 },
  { label: "Tiramisu Slice ($6.00)", name: "Tiramisu Slice", price: 6.00 },
  { label: "Apple Pie ($4.00)", name: "Apple Pie", price: 4.00 },
];

const MAX_QTY_PER_ITEM = 5;
let orderCart = [];

// DOM Elements
const pizzaForm = document.getElementById("pizzaForm");
const customerSelect = document.getElementById("customerSelect");

const sizeSelect = document.getElementById("sizeSelect");
const sizeQty = document.getElementById("sizeQty");
const addPizzaBtn = document.getElementById("addPizzaBtn");

const dipSelect = document.getElementById("dipSelect");
const dipQty = document.getElementById("dipQty");
const addDipBtn = document.getElementById("addDipBtn");

const sideSelect = document.getElementById("sideSelect");
const sideQty = document.getElementById("sideQty");
const addSideBtn = document.getElementById("addSideBtn");

const beverageSelect = document.getElementById("beverageSelect");
const beverageQty = document.getElementById("beverageQty");
const addBeverageBtn = document.getElementById("addBeverageBtn");

const dessertSelect = document.getElementById("dessertSelect");
const dessertQty = document.getElementById("dessertQty");
const addDessertBtn = document.getElementById("addDessertBtn");

const toppingContainer = document.getElementById("toppingSelectC");
const summaryContent = document.getElementById("summaryContent");
const priceDisplay = document.getElementById("priceDisplay");
const message = document.getElementById("message");
const clearBtn = document.querySelector(".clear");

// Visit Counter Handler
function handleVisitCounter() {
  let visits = parseInt(localStorage.getItem("bella_crust_visits") || "0", 10);
  
  if (!sessionStorage.getItem("bella_crust_session_active")) {
    visits += 1;
    localStorage.setItem("bella_crust_visits", visits);
    sessionStorage.setItem("bella_crust_session_active", "true");
  } else if (visits === 0) {
    visits = 1;
    localStorage.setItem("bella_crust_visits", visits);
  }

  const visitEl = document.getElementById("visitCount");
  if (visitEl) {
    visitEl.textContent = visits;
  }
}

// Populate Select Menus
function populateSelect(element, items) {
  if (!element) return;
  element.innerHTML = "";
  items.forEach((item, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = item.label;
    element.appendChild(opt);
  });
}

// Populate Toppings
function renderToppings() {
  if (!toppingContainer) return;
  toppingContainer.innerHTML = "";
  TOPPINGS.forEach((topping) => {
    const chip = document.createElement("div");
    chip.className = "topping-pill";

    chip.innerHTML = `
      <input type="checkbox" id="${topping.id}" value="${topping.id}">
      <label for="${topping.id}">+ ${topping.name} ($${topping.price.toFixed(2)})</label>
    `;
    toppingContainer.appendChild(chip);
  });
}

// Initialize Menu Elements & Visit Counter
handleVisitCounter();
populateSelect(sizeSelect, SIZES);
populateSelect(dipSelect, DIPS);
populateSelect(sideSelect, SIDES);
populateSelect(beverageSelect, BEVERAGES);
populateSelect(dessertSelect, DESSERTS);
renderToppings();

function parseQty(inputEl) {
  let val = parseInt(inputEl.value, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > MAX_QTY_PER_ITEM) val = MAX_QTY_PER_ITEM;
  inputEl.value = val;
  return val;
}

function showMessage(msg, type = "info") {
  if (!message) return;
  message.className = `mt-2 small mb-0 text-${type}`;
  message.textContent = msg;
}

function getItemTotalQty(itemName) {
  return orderCart
    .filter(item => item.name === itemName)
    .reduce((sum, item) => sum + item.quantity, 0);
}

// Add Item Handler
function addItemToCart(itemObj, quantity, details = "") {
  if (!itemObj || !itemObj.name) {
    showMessage("Please select a valid item.", "warning");
    return;
  }

  const currentTotal = getItemTotalQty(itemObj.name);
  if (currentTotal >= MAX_QTY_PER_ITEM) {
    showMessage(`Maximum limit of ${MAX_QTY_PER_ITEM} reached for ${itemObj.name}.`, "warning");
    return;
  }

  const allowedQty = Math.min(quantity, MAX_QTY_PER_ITEM - currentTotal);
  if (allowedQty < quantity) {
    showMessage(`Added ${allowedQty}x ${itemObj.name} (capped at max limit of ${MAX_QTY_PER_ITEM}).`, "warning");
  } else {
    showMessage(`Added ${allowedQty}x ${itemObj.name} to your order.`, "success");
  }

  const existingItemIndex = orderCart.findIndex(
    item => item.name === itemObj.name && item.details === details
  );

  if (existingItemIndex > -1) {
    orderCart[existingItemIndex].quantity += allowedQty;
  } else {
    orderCart.push({
      id: Date.now() + Math.random(),
      name: itemObj.name,
      price: itemObj.price,
      quantity: allowedQty,
      details: details
    });
  }

  updateSummary();
}

// Button Event Listeners
if (addPizzaBtn) {
  addPizzaBtn.addEventListener("click", () => {
    const selectedSize = SIZES[sizeSelect.value];
    if (!selectedSize || !selectedSize.name) {
      showMessage("Please select a pizza size first.", "warning");
      return;
    }

    const selectedToppings = [];
    TOPPINGS.forEach((t) => {
      const cb = document.getElementById(t.id);
      if (cb && cb.checked) selectedToppings.push(t);
    });

    const toppingPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const pizzaUnitPrice = selectedSize.price + toppingPrice;
    const qty = parseQty(sizeQty);
    const toppingsText = selectedToppings.length > 0
      ? selectedToppings.map(t => t.name).join(", ")
      : "Plain Cheese";

    addItemToCart(
      { name: selectedSize.name, price: pizzaUnitPrice },
      qty,
      `Toppings: ${toppingsText}`
    );

    sizeSelect.value = 0;
    sizeQty.value = 1;
    document.querySelectorAll('#toppingSelectC input[type="checkbox"]').forEach(cb => cb.checked = false);
  });
}

if (addDipBtn) {
  addDipBtn.addEventListener("click", () => {
    const selected = DIPS[dipSelect.value];
    if (!selected || !selected.name) {
      showMessage("Please select a dip.", "warning");
      return;
    }
    const qty = parseQty(dipQty);
    addItemToCart(selected, qty);
    dipSelect.value = 0;
    dipQty.value = 1;
  });
}

if (addSideBtn) {
  addSideBtn.addEventListener("click", () => {
    const selected = SIDES[sideSelect.value];
    if (!selected || !selected.name) {
      showMessage("Please select a side.", "warning");
      return;
    }
    const qty = parseQty(sideQty);
    addItemToCart(selected, qty);
    sideSelect.value = 0;
    sideQty.value = 1;
  });
}

if (addBeverageBtn) {
  addBeverageBtn.addEventListener("click", () => {
    const selected = BEVERAGES[beverageSelect.value];
    if (!selected || !selected.name) {
      showMessage("Please select a beverage.", "warning");
      return;
    }
    const qty = parseQty(beverageQty);
    addItemToCart(selected, qty);
    beverageSelect.value = 0;
    beverageQty.value = 1;
  });
}

if (addDessertBtn) {
  addDessertBtn.addEventListener("click", () => {
    const selected = DESSERTS[dessertSelect.value];
    if (!selected || !selected.name) {
      showMessage("Please select a dessert.", "warning");
      return;
    }
    const qty = parseQty(dessertQty);
    addItemToCart(selected, qty);
    dessertSelect.value = 0;
    dessertQty.value = 1;
  });
}

// Update Live Summary UI
function updateSummary() {
  if (!summaryContent || !priceDisplay) return;

  const customerName = customerSelect ? customerSelect.value.trim() : "";
  const grandTotal = orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  priceDisplay.textContent = `$${grandTotal.toFixed(2)}`;

  if (orderCart.length === 0) {
    summaryContent.innerHTML = `<p class="text-secondary italic">Start selecting items to see order details here...</p>`;
    return;
  }

  let html = `<div class="order-items-list">`;
  if (customerName) {
    html = `<div class="mb-3 text-warning fw-semibold"><i class="bi bi-person-circle me-1"></i> Customer: ${customerName}</div>` + html;
  }

  orderCart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    html += `
      <div class="order-item-card">
        <div class="order-item-row mb-1">
          <span class="fw-bold">${item.name}</span>
          <span class="fw-bold text-warning">$${itemTotal.toFixed(2)}</span>
        </div>
        ${item.details ? `<div class="small text-light opacity-75 mb-2">${item.details}</div>` : ''}
        <div class="d-flex justify-content-between align-items-center mt-2 pt-1 border-top border-secondary border-opacity-25">
          <span class="small text-secondary">$${item.price.toFixed(2)} each</span>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-qty-sm" onclick="changeQuantity(${index}, -1)">-</button>
            <span class="fw-bold px-1">${item.quantity}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-qty-sm" onclick="changeQuantity(${index}, 1)">+</button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-qty-sm ms-2" onclick="removeItem(${index})"><i class="bi bi-trash-fill"></i></button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  summaryContent.innerHTML = html;
}

// Modify item quantity directly from summary ticket
window.changeQuantity = function(index, delta) {
  if (!orderCart[index]) return;
  const item = orderCart[index];
  const newQty = item.quantity + delta;

  if (newQty <= 0) {
    removeItem(index);
    return;
  }

  if (delta > 0) {
    const itemTotalQty = getItemTotalQty(item.name);
    if (itemTotalQty >= MAX_QTY_PER_ITEM) {
      showMessage(`Cannot exceed maximum limit of ${MAX_QTY_PER_ITEM} for ${item.name}.`, "warning");
      return;
    }
  }

  item.quantity = newQty;
  updateSummary();
};

// Remove item from summary ticket
window.removeItem = function(index) {
  if (orderCart[index]) {
    orderCart.splice(index, 1);
    updateSummary();
  }
};

if (customerSelect) {
  customerSelect.addEventListener("input", updateSummary);
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    pizzaForm.reset();
    orderCart = [];
    document.querySelectorAll('#toppingSelectC input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    sizeQty.value = 1;
    dipQty.value = 1;
    sideQty.value = 1;
    beverageQty.value = 1;
    dessertQty.value = 1;
    showMessage("");
    updateSummary();
  });
}

// Form Submission / Checkout POST
if (pizzaForm) {
  pizzaForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const customerName = customerSelect.value.trim();

    if (!customerName) {
      showMessage("Please enter your name to proceed.", "warning");
      return;
    }

    if (orderCart.length === 0) {
      showMessage("Please add at least one item before checking out.", "warning");
      return;
    }

    const itemsPayload = orderCart.map((item, idx) => ({
      id: idx + 1,
      name: item.details ? `${item.name} (${item.details})` : item.name,
      priceInCents: Math.round(item.price * 100),
      quantity: item.quantity
    }));

    showMessage("Connecting to checkout...", "info");

    fetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        items: itemsPayload
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location.href = url || "success.html";
      })
      .catch((e) => {
        console.error("Checkout Error:", e);
        window.location.href = "success.html";
      });
  });
}