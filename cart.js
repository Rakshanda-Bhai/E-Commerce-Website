const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 }
];
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cartContainer");
    const totalItem = document.getElementById("totalItem");
    const totalAmount = document.getElementById("totalAmount");
    cartContainer.innerHTML = "";

    if (cart.length == 0) {
        cartContainer.innerHTML = `<div id="cartEmptyMessage">Your cart is empty. Add items to get started!</div>`;
        totalItem.textContent = "Total Items: 0";
        totalAmount.textContent = "Rs 0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const boxDiv = document.createElement("div");
        boxDiv.id = "box";

        const boxDetails = document.createElement("div");
        const boxH3 = document.createElement("h3");
        boxH3.textContent = `${item.name} × ${item.quantity}`;
        const boxH4 = document.createElement("h4");
        boxH4.textContent = `Amount: Rs ${item.price * item.quantity}`;
        boxDetails.appendChild(boxH3);
        boxDetails.appendChild(boxH4);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "secondary-btn";
        removeBtn.addEventListener("click", () => removeFromCart(item.id));

        boxDiv.appendChild(boxDetails);
        boxDiv.appendChild(removeBtn);
        cartContainer.appendChild(boxDiv);

        total += item.price * item.quantity;
    });

    totalItem.textContent = `Total Items: ${cart.length}`;
    totalAmount.textContent = `Rs ${total}`;
}
function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    const existingProduct = cart.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCart();
}
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCart();
}
document.getElementById("emptyCart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    updateCart();
});
document.getElementById("placeOrder").addEventListener("click", () => {
    if (getCart().length === 0) {
        alert("Your cart is empty! Add items before placing an order.");
        return;
    }
    localStorage.setItem("orderPlaced", true);
    window.location.href = "orderPlaced.html"; 
});
updateCart();
