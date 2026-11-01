# 🍕 Bella Crust Pizzeria

An interactive, responsive full-stack online ordering web application for Bella Crust Pizzeria. Built with Node.js, Express, and Bootstrap 5, allowing customers to customize pizzas, select dips, sides, drinks, and desserts, and monitor their live order ticket with dynamically calculated totals and quantity controls.

---

## 🌟 Features

* **Interactive Order Builder**: Custom pizza configuration with size options and toggleable topping chips.
* **Multi-Item Cart System**: Dedicated "Add to Order" buttons for pizzas, dips, sides, beverages, and desserts.
* **Live Order Ticket**: Real-time order summary updating instantly as items are added, modified, or removed.
* **Quantity Limits & Controls**: Enforces a strict maximum limit of 5 units per item with inline `-` / `+` adjusters and individual item deletion.
* **Responsive UI**: Custom dark-themed layout built with Bootstrap 5 and Bootstrap Icons.
* **Checkout Integration**: Built-in POST handler (`/checkout`) ready for payment gateway redirects (e.g., Stripe Checkout).