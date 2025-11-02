// API manzili
const API_URL = "https://69035efbd0f10a340b23ed3d.mockapi.io/api/products";

const productContainer = document.querySelector("#productContainer");
const searchInput = document.querySelector("input[type='text']");
const cartCount = document.querySelector("#cartCount");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🧮 Savatdagi sonni yangilash
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// 🚀 Ishga tushirish
getProducts();
updateCartCount();

// 📦 Mahsulotlarni yuklash
async function getProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayProducts(data);
  } catch (error) {
    console.error("Ma'lumotlarni yuklashda xato:", error);
  }
}

// 🖼 Mahsulotlarni chiqarish
function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((item) => {
    const product = item.product;
    if (!product) return;

    const isFavorite = favorites.some((fav) => fav.id == product.id);

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl shadow-md p-4 relative hover:shadow-lg transition";

    card.innerHTML = `
      <!-- Like Icon -->
      <img src="${isFavorite ? './img/like-red.png' : './img/like.svg'}"
           alt="like"
           class="absolute top-3 right-3 w-6 h-6 opacity-70 hover:opacity-100 cursor-pointer fav-btn"
           data-id="${product.id}" />

      <!-- Cart Icon -->
      <img src="./img/korzinka.svg"
           alt="cart"
           class="absolute bottom-3 right-3 w-6 h-6 opacity-70 hover:opacity-100 cursor-pointer add-cart"
           data-id="${product.id}" />

      <img src="${product.image}" alt="${product.name}" class="w-full h-36 object-contain mb-4" />
      <h3 class="text-sm font-medium text-gray-700 mb-1">${product.name}</h3>
      <p class="text-gray-900 font-semibold">${product.price}</p>
    `;

    productContainer.appendChild(card);
  });

  attachLikeEvents(products);
  attachCartEvents(products);
}

// ❤️ Sevimlilar
function attachLikeEvents(products) {
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const product = products.find((item) => item.product.id == id).product;

      const index = favorites.findIndex((fav) => fav.id == id);
      if (index !== -1) favorites.splice(index, 1);
      else favorites.push(product);

      localStorage.setItem("favorites", JSON.stringify(favorites));
      displayProducts(products);
    });
  });
}

// 🛒 Korzinkaga qo‘shish
function attachCartEvents(products) {
  document.querySelectorAll(".add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const product = products.find((item) => item.product.id == id).product;

      const exists = cart.find((c) => c.id == id);
      if (!exists) {
        product.quantity = 1;
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Mahsulot savatga qo‘shildi!");
      } else {
        alert("Bu mahsulot savatda mavjud!");
      }

      // Korzinka.html sahifasiga o'tish
      window.location.href = "./karzinka.html";
    });
  });
}

// 🔍 Qidiruv
searchInput.addEventListener("input", async (e) => {
  const value = e.target.value.toLowerCase();
  const res = await fetch(API_URL);
  const data = await res.json();

  const filtered = data.filter((item) =>
    item.product.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});
