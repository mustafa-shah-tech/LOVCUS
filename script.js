/* LOVCUS - Long Term Vision:
"LOVCUS aims to become a trusted handmade lifestyle brand that turns emotions into products and moments into memories."
*/

// --- MOCK DATABASE ---
const products = [
  {
    id: 1,
    name: "Soulmate Bracelet",
    price: 399,
    category: "couples",
    image: "images/bracelet.jpeg",
    desc: "Handmade bracelet crafted with love ❤️, customized just for you. Perfect gift for yourself or someone special.",
  },
  {
    id: 2,
    name: "The Flutter Bracelet",
    price: 399.0,
    category: "custom",
    image: "images/tanzeela.jpeg",
    desc: "This is personalized stretch bracelet features black alphabet beads name customized, accented by alternating black and clear crackle-effect glass beads. The design is finished with three dangling silver-tone chains holding a sparkling glitter butterfly, speckled beads, and a chic black enamel flower charm.",
  },
  {
    id: 2,
    name: "Sweetheart Crystal",
    price: 399.0,
    category: "custom",
    image: "images/sweetheart-crystal.jpeg",
    desc: "Handmade Personalized Charm Bracelet Stack – Pink & Black. This stunning layered set features cracked glass crystal beads, black alphabet beads for custom names, and elegant gold-tone charms including a heart, butterfly, clover, and pearl. The perfect blend of sweet and bold. Customizable with any names or words.",
  },
];

// --- DYNAMIC HEADER & FOOTER INJECTION ---
document.addEventListener("DOMContentLoaded", () => {
  // Inject Header
  document.getElementById("header-placeholder").innerHTML = `
        <header> 
            <a href="index.html" class="logo" style="text-decoration: none; color: inherit;">
                <img src="images/logo.png" alt="Logo" class="logo-img">LOVCUS
            </a>
            <div class="mobile-menu-btn" onclick="toggleMenu()">☰</div>
            <nav id="navbar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="custom.html">Custom Order</a></li>
                    <li><a href="policy.html">Policy</a></li>
                </ul>
            </nav>
        </header>
    `;

  /* REPLACE THE FOOTER SECTION IN SCRIPT.JS WITH THIS */
  const footerPlace = document.getElementById("footer-placeholder");
  if (footerPlace) {
    footerPlace.innerHTML = `
        <footer>
            <h3>LOVCUS</h3>
            <p>Made with Love ❤️</p>
            
            <div class="footer-socials">
                <a href="https://www.instagram.com/lovcus5432?igsh=MTUya2x4ajdoNzhhdQ==" target="_blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram">
                </a>

                <a href="https://www.tiktok.com/@lovcus5?_r=1&_t=ZS-936596nmzV2" target="_blank">
                    <img src="https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg" alt="TikTok">
                </a>

                <a href="https://www.facebook.com/share/18Fku7dqFf/" target="_blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook">
                </a>
            </div>

            <p style="font-size: 0.8rem; margin-top: 20px;">&copy; 2026 LOVCUS Pakistan.</p>
        </footer>
        <a href="https://wa.me/03270880908" class="whatsapp-float" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 35px; height: 35px; margin-top: 2px;">
        </a>
        `;
  }

  // Initialize Page Specific Logic
  // 1. Check if we are on the Home Page (index.html or root /)
  const path = window.location.pathname;
  if (path.endsWith("index.html") || path === "/" || path.endsWith("/")) {
    loadHomeProducts(); // Loads only 8 items
  } else {
    loadShop(); // Loads ALL items (for shop.html)
  }

  loadProductDetail();
});

// --- MENU TOGGLE ---
function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}

// --- SHOP PAGE LOGIC ---
function loadShop() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-price">PKR ${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn" style="margin-top:10px; font-size:0.8rem">View Details</a>
            </div>
        </div>
    `,
    )
    .join("");
}

// --- PRODUCT DETAIL LOGIC ---
function loadProductDetail() {
  const detailContainer = document.getElementById("product-detail-container");
  if (!detailContainer) return;

  // Get ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = products.find((p) => p.id == productId);

  if (product) {
    detailContainer.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 40px; justify-content: center;">
                <div style="flex: 1; min-width: 300px;">
                    <img src="${product.image}" style="border-radius: 10px; width: 100%;">
                </div>
                <div style="flex: 1; min-width: 300px;">
                    <h1 style="font-family: var(--font-heading); margin-bottom: 10px;">${product.name}</h1>
                    <h2 style="color: var(--accent-color); margin-bottom: 20px;">PKR ${product.price}</h2>
                    <p style="margin-bottom: 20px;">${product.desc}</p>
                    
                    <div class="alert-box">
                        <strong>⚠️ Payment Policy:</strong> Minimum 30% advance payment required. No Full Cash on Delivery available.
                    </div>

                    <button onclick="orderViaWhatsApp('${product.name}', ${product.price})" class="btn" style="width: 100%;">Order</button>
                    <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">Delivery: 3-5 Working Days </p>
                </div>
            </div>
        `;
  } else {
    detailContainer.innerHTML = "<p>Product not found.</p>";
  }
}

// --- WHATSAPP ORDER LOGIC ---
function orderViaWhatsApp(itemName, price) {
  const phone = "03270880908"; // YOUR NUMBER
  const message = `Hi LOVCUS! I want to order: ${itemName} (PKR ${price}). Please confirm availability.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* REPLACE YOUR OLD submitCustomOrder FUNCTION WITH THIS */
function submitCustomOrder(event) {
    event.preventDefault();
    const phone = "03270880908"; // REPLACE WITH YOUR REAL NUMBER

    // 1. Get Text Values
    const name = document.getElementById('c-name').value;
    const type = document.getElementById('c-type').value;
    const desc = document.getElementById('c-desc').value;
    const size = document.getElementById('c-size').value; // Get Size

    // 2. Get Selected Colors (Find all boxes that are checked)
    const colorCheckboxes = document.querySelectorAll('input[name="color"]:checked');
    let selectedColors = [];
    colorCheckboxes.forEach((checkbox) => {
        selectedColors.push(checkbox.value);
    });
    
    // If they didn't pick a color, write "None"
    const colorString = selectedColors.length > 0 ? selectedColors.join(", ") : "None selected";

    // 3. Create the WhatsApp Message
    const message = `Hi LOVCUS! Custom Order Request.\n\n👤 Name: ${name}\n📦 Type: ${type}\n📏 Size: ${size}\n🎨 Colors: ${colorString}\n📝 Details: ${desc}`;
    
    // 4. Send
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
/* --- HOME PAGE SPECIFIC LOADER (Limit 8 items) --- */
function loadHomeProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return; // Stop if we are not on the Home Page

  // 1. Get only the first 8 products
  const limitedProducts = products.slice(0, 8);

  grid.innerHTML = limitedProducts
    .map((product) => {
      // Handle image logic (List vs Single)
      let displayImage;
      if (product.images && product.images.length > 0) {
        displayImage = product.images[0];
      } else {
        displayImage = product.image;
      }

      // 2. Render Card with 'onclick' to make the whole thing clickable
      return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            <img src="${displayImage}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-price">PKR ${product.price}</p>
                <span style="font-size: 0.8rem; color: var(--accent-color);">View Details &rarr;</span>
            </div>
        </div>
        `;
    })
    .join("");
}
// --- SHOP PAGE LOGIC (Safe Mode) ---
function loadShop() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map((product) => {
      // Check for list OR single image
      let displayImage;
      if (product.images && product.images.length > 0) {
        displayImage = product.images[0];
      } else {
        displayImage = product.image;
      }

      return `
        <div class="product-card">
            <img src="${displayImage}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-price">PKR ${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn" style="margin-top:10px; font-size:0.8rem">View Details</a>
            </div>
        </div>
        `;
    })
    .join("");
}
// --- SHOP PAGE LOGIC (UPDATED & SAFE) ---
function loadShop() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map((product) => {
      // Safe Image Check: Uses 'images' list if available, otherwise 'image'
      let displayImage;
      if (product.images && product.images.length > 0) {
        displayImage = product.images[0];
      } else {
        displayImage = product.image;
      }

      return `
        <div class="product-card">
            <img src="${displayImage}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-price">PKR ${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn" style="margin-top:10px; font-size:0.8rem">View Details</a>
            </div>
        </div>
        `;
    })
    .join("");
}

// --- HOME PAGE LOGIC (LIMIT 8 ITEMS + BUTTON RESTORED) ---
function loadHomeProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  // Cut the list to only the first 8 items
  const limitedProducts = products.slice(0, 8);

  grid.innerHTML = limitedProducts
    .map((product) => {
      // Safe Image Check
      let displayImage;
      if (product.images && product.images.length > 0) {
        displayImage = product.images[0];
      } else {
        displayImage = product.image;
      }

      // Render Card with CLICKABLE CARD + BUTTON
      return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            <img src="${displayImage}" alt="${product.name}">
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-price">PKR ${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn" style="margin-top:10px; font-size:0.8rem">View Details</a>
            </div>
        </div>
        `;
    })
    .join("");
}
