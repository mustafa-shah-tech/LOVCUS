/* LOVCUS - Long Term Vision:
"LOVCUS aims to become a trusted handmade lifestyle brand that turns emotions into products and moments into memories."
*/

// Products will be loaded from Supabase (with fallback to static data)
let products = [];

// Static fallback products in case Supabase is unavailable
const staticProducts = [
    { id: 1, name: "Forest Flower Crystal", price: 399.0, category: "bracelet", image: "images/lovcus-bead-bracelet-online-pakistan009.jpeg", description: "Add a touch of elegance to your wrist with this handcrafted green and gold floral bracelet. This beautiful piece features delicate craftsmanship, making it a perfect accessory for nature lovers. Our crystal beaded jewelry is designed to stand out, whether for daily wear or special occasions in Pakistan."},
    { id: 2, name: "The Flutter Bracelet", price: 399.0, category: "custom-bracelet", image: "images/tanzeela.jpeg", description: "This personalized stretch bracelet features black alphabet beads that can be customized with your choice of name. Accented by alternating black and clear crackle-effect glass beads, the design is elegantly finished with dangling silver-tone chains holding a sparkling glitter butterfly, speckled beads, and a chic black enamel flower charm."},
    {
        id: 3,
        name: "Soulmate Bracelet",
        price: 399,
        category: "bracelet",
        image: "images/lovcus-soulmate-couple-bracelet-pakistan.jpeg",
        description:
            "Our Soulmate Bracelet is a beautiful handmade piece crafted with love ❤️ and attention to detail. This customized bracelet is designed to be a meaningful gift for yourself or someone special, making it a perfect token of affection and friendship in Pakistan.",
    },
    { id: 4, name: "Green & Champagne Crystals", price: 549.0, category: "bracelet", image: "images/lovcus-handmade-bead-bracelet0005.jpeg", description: "Elevate your style with this sparkling, handcrafted crystal bracelet. Intricately woven using high-quality emerald green and champagne gold bicone beads, this piece catches the light beautifully, making it an ideal accessory for both festive events and daily elegance."},
    { id: 5, name: "The Flutter Bracelet", price: 399.0, category: "custom-bracelet", image: "images/tooba.jpeg", description: "This personalized stretch bracelet features black alphabet beads that spell out your customized name, accented by alternating black and clear crackle-effect glass beads. The design is elegantly finished with three dangling silver-tone chains holding a sparkling glitter butterfly and a chic black enamel flower charm. A trendy and aesthetic accessory for any jewelry collection."},
    { id: 6, name: "Custom Beaded Crystal with Copper Clasp", price: 999.0, category: "custom-bracelet", image: "images/lovcus-handmade-bracelet-gift007.jpg", description: "A beautifully handcrafted beaded bracelet featuring an intricate weave of vibrant green and sparkling champagne-gold faceted crystal beads. You can personalize this piece with a custom name, making it a unique self-treat or a thoughtful gift for someone special."},
    { id: 7, name: "Crystal Floral Cuff Bracelet", price: 899.0, category: "bracelet", image: "images/lovcus-fashion-beaded-bracelet008.jpg", description: "This sparkling emerald and champagne crystal beaded cuff bracelet features a stunning floral motif. It comes with an antique copper-toned lobster clasp and extension chain, ensuring a versatile and comfortable fit for any wrist size."},
    { id: 8, name: "Sweetheart Crystal", price: 399.0, category: "custom-bracelet", image: "images/sweetheart-crystal.jpeg", description: "Our Sweetheart Crystal is a stunning handmade personalized charm bracelet stack in a bold pink and black theme. This layered set features cracked glass crystal beads, custom alphabet beads for personalized names, and elegant gold-tone charms including a heart, butterfly, and pearl. It's the perfect blend of sweet and bold for a custom jewelry gift."},
    { id: 9, name: "Emerald Sparkle Crystal & Pearl Woven Bracelet", price: 399.0, category: "bracelet", image: "images/handmade-crystal-bracelet-trendy-jewelry-gift-for-her.jpeg", description: "Beautifully finished with a secure silver lobster clasp, this emerald sparkle crystal and pearl woven bracelet is the perfect accessory for a fresh look. It makes a thoughtful gift for birthdays, Eid, or any special celebration."},
    { id: 10, name: "Blue Ombre Beaded", price: 499.0, category: "bracelet", image: "images/blue-ombre-beaded-bracelet.jpeg", description: "This blue ombre beaded bracelet is handcrafted with premium materials to ensure durability and style. It's a versatile piece that complements both casual and formal outfits, making it a must-have for your jewelry collection."},
    { id: 11, name: "Midnight Blue Crystal Set", price: 2499.0, category: "full set", image: "images/midnight-blue-crystal-set-bead-handmade-jewelry.jpeg", description: "Complete your look with our luxurious midnight blue crystal set. This full set includes matching pieces that radiate elegance and sophistication. Ideal for weddings and formal events in Pakistan."},
];

// --- CART STATE ---
let cart = JSON.parse(localStorage.getItem('lovcus_cart')) || [];

// --- SUPABASE SETUP ---
const SUPABASE_URL = "https://gbxvnnkkymtlskpgfpei.supabase.co";
const SUPABASE_KEY = "sb_publishable_5gFdDNycdvnVZwIl-ZM9fQ_CCsKkGDM";
const _supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Fetch products from Supabase, fall back to static list
async function fetchProducts() {
    if (!_supabase) { products = staticProducts; return; }
    const { data, error } = await _supabase.from('products').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) {
        products = staticProducts;
    } else {
        products = data;
    }
}

let reviews = [];

// --- DYNAMIC HEADER & FOOTER INJECTION ---
document.addEventListener("DOMContentLoaded", async () => {
    // Load products from Supabase first
    await fetchProducts();
    // Inject Header (With Search & Cart Icons)
    const headerPlace = document.getElementById("header-placeholder");
    if (headerPlace) {
        headerPlace.innerHTML = `
        <header> 
            <a href="./" class="logo" style="text-decoration: none;">
                <img src="images/logo.png" alt="Logo" class="logo-img" width="40" height="40">LOVCUS
            </a>
            
            <div class="header-icons">
                <!-- Search Icon -->
                <button class="search-icon-btn" onclick="toggleSearch()" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
                
                <!-- Cart Icon -->
                <button class="cart-icon-btn" onclick="toggleCart()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <span id="cart-count" class="cart-badge">0</span>
                </button>

                <!-- Mobile Menu Icon -->
                <div class="mobile-menu-btn" onclick="toggleMenu()">☰</div>
            </div>

            <nav class="nav-links">
                <ul class="nav-list">
                    <li><a href="./">Home</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="policy.html">Policy</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </nav>

            <!-- Hidden Search Bar -->
            <div id="search-bar" class="search-container">
                <input type="text" id="search-input" class="search-input" placeholder="Search for bracelets, gifts..." onkeypress="handleSearch(event)">
            </div>
        </header>
    `;
    }

    // Inject Footer
    const footerPlace = document.getElementById("footer-placeholder");
    if (footerPlace) {
        footerPlace.innerHTML = `
        <footer>
            <h3>LOVCUS</h3>
            <p>Made with Love ❤️</p>
            
            <div class="footer-socials">
                <a href="https://www.instagram.com/lovcus5432?igsh=MTUya2x4ajdoNzhhdQ==" target="_blank" aria-label="Follow LOVCUS on Instagram">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="LOVCUS Instagram - Handmade Jewelry Showcase">
                </a>

                <a href="https://www.tiktok.com/@lovcus5?_r=1&_t=ZS-936596nmzV2" target="_blank" aria-label="Watch LOVCUS on TikTok">
                    <img src="https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg" alt="LOVCUS TikTok - Jewelry Making Process">
                </a>

                <a href="https://www.facebook.com/share/18Fku7dqFf/" target="_blank" aria-label="Join LOVCUS on Facebook">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="LOVCUS Facebook Page - Customer Reviews and Updates">
                </a>
            </div>

            <p style="font-size: 0.8rem; margin-top: 20px;">&copy; 2026 LOVCUS Pakistan.</p>
        </footer>
        <a href="https://wa.me/923270880908" class="whatsapp-float" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 35px; height: 35px; margin-top: 2px;">
        </a>
    `;
    }

    // Initialize Cart UI
    updateCartBadge();
    injectCartHTML();

    // Initialize Page Specific Logic
    const path = window.location.pathname;
    if (path.endsWith("index.html") || path === "/" || path.endsWith("/")) {
        loadHomeProducts(); // Loads only 8 items
    } else if (path.includes("shop.html")) {
        loadShop(); // Loads ALL items (for shop.html)
    } else if (path.includes("product.html")) {
        loadProductDetail(); 
    }
});

// --- UTILS ---
function sanitizeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- MENU TOGGLE ---
function toggleMenu() {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        navbar.classList.toggle("active");
    }
}

// --- SEARCH LOGIC ---
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            document.getElementById('search-input').focus();
        }
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        if (query.length > 0) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    }
}

// --- CART LOGIC ---
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();
    updateCartBadge();
    toggleCart(); // Show cart
}

function updateItemQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    saveCart();
    renderCartItems();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('lovcus_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? 'flex' : 'none';
    }
}

function toggleCart() {
    const overlay = document.querySelector('.cart-overlay');
    const sidebar = document.querySelector('.cart-sidebar');
    if (!sidebar) return;

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    } else {
        renderCartItems();
        overlay.style.display = 'block';
        setTimeout(() => sidebar.classList.add('open'), 10);
    }
}

function injectCartHTML() {
    // Only inject if it doesn't exist
    if (document.querySelector('.cart-sidebar')) return;

    const cartHTML = `
        <div class="cart-overlay" onclick="toggleCart()"></div>
        <div class="cart-sidebar">
            <div class="cart-header">
                <span>Your Cart</span>
                <button class="cart-close-btn" onclick="toggleCart()">&times;</button>
            </div>
            <div class="cart-items-container" id="cart-items"></div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cart-total-price">PKR 0</span>
                </div>
                <button class="btn" style="width: 100%;" onclick="checkoutCart()">Checkout via WhatsApp</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('cart-total-price');

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; margin-top:50px; color:#999;">Your cart is empty.</p>';
        totalPriceEl.innerText = 'PKR 0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>PKR ${item.price}</p>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="updateItemQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateItemQty(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    totalPriceEl.innerText = `PKR ${total}`;
}

function checkoutCart() {
    if (cart.length === 0) return alert("Cart is empty!");

    const phone = "923270880908";
    let message = "Hi LOVCUS! I want to order:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `▪️ ${item.quantity}x ${item.name} (PKR ${itemTotal})\n`;
    });

    message += `\n💰 *Total Price: PKR ${total}*`;
    message += `\n\nPlease confirm my order.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// --- SHOP PAGE LOGIC (Safe + Search + Filter) ---
function loadShop() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    let displayProducts = products;

    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        displayProducts = products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
        const title = document.querySelector('.section-title');
        if (title) title.innerHTML = `Results for "${sanitizeHTML(searchQuery)}" <br> <a href="shop.html" style="font-size:0.8rem; color:var(--accent-color)">(Clear Search)</a>`;
    }

    if (displayProducts.length === 0) {
        grid.innerHTML = `<div class="no-products-message">No products found. <br> Check back later!</div>`;
        return;
    }

    grid.innerHTML = displayProducts
        .map((product) => {
            let displayImage;
            if (product.images && product.images.length > 0) {
                displayImage = product.images[0];
            } else {
                displayImage = product.image;
            }

            return `
        <div class="product-card">
            <img src="${displayImage}" alt="${product.name}" loading="lazy" width="300" height="300" style="object-fit: cover;">
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

// --- HOME PAGE LOGIC (LIMIT 8 ITEMS) ---
function loadHomeProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const limitedProducts = products.slice(0, 8);

    grid.innerHTML = limitedProducts
        .map((product) => {
            let displayImage;
            if (product.images && product.images.length > 0) {
                displayImage = product.images[0];
            } else {
                displayImage = product.image;
            }

            return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            <img src="${displayImage}" alt="${product.name}" loading="lazy" width="300" height="300" style="object-fit: cover;">
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

// --- PRODUCT DETAIL LOGIC (With Add to Cart) ---
function loadProductDetail() {
    const detailContainer = document.getElementById("product-detail-container");
    if (!detailContainer) return;

            const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = products.find((p) => p.id == productId);

    if (product) {
        // Fix 1: Dynamic Meta Title
        document.title = `${product.name} | PKR ${product.price} | LOVCUS`;
        const canonicalEl = document.getElementById('canonical-tag') || document.createElement('link');
        canonicalEl.id = 'canonical-tag';
        canonicalEl.rel = 'canonical';
        canonicalEl.href = `https://lovcus.store/product.html?id=${productId}`;
        if (!canonicalEl.parentNode) document.head.appendChild(canonicalEl);

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = `Buy ${product.name} for PKR ${product.price}. Handmade with love by LOVCUS Pakistan.`;

        // Update static fallback elements so Google eventually learns the real content
        const staticH1 = document.getElementById('product-h1');
        if (staticH1) staticH1.textContent = product.name;
        const staticDesc = document.getElementById('product-desc-static');
        if (staticDesc) staticDesc.textContent = product.description.substring(0, 200);

        let displayImage;
        if (product.images && product.images.length > 0) {
            displayImage = product.images[0];
        } else {
            displayImage = product.image;
        }

        const ogUpdates = {
            'og-title': `${product.name} | LOVCUS Pakistan`,
            'og-desc': `Buy ${product.name} for PKR ${product.price}. ${product.description.substring(0, 100)}`,
            'og-image': `https://lovcus.store/${displayImage}`,
            'og-url': `https://lovcus.store/product.html?id=${product.id}`
        };
        Object.entries(ogUpdates).forEach(([id, content]) => {
            const el = document.getElementById(id);
            if (el) el.content = content;
        });

        // Fix 2: Refined Product Schema Markup
        const schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": "https://lovcus.store/" + displayImage,
            "url": "https://lovcus.store/product.html?id=" + product.id,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "PKR",
                "price": product.price,
                "availability": "https://schema.org/InStock"
            }
        };
        let schemaScript = document.getElementById('product-schema');
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'product-schema';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        schemaScript.text = JSON.stringify(schema);
        // Escape quotes for the addToCart function arguments
        const safeName = product.name.replace(/'/g, "\\'");
        const safeImage = displayImage.replace(/'/g, "\\'");

        detailContainer.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 40px; justify-content: center;">
                <div style="flex: 1; min-width: 300px;">
                    <!-- Fix 3: Descriptive Image Alt Text -->
                    <img src="${displayImage}" style="border-radius: 10px; width: 100%;" alt="${product.name} - Handmade Bracelet Pakistan">
                </div>
                <div style="flex: 1; min-width: 300px;">
                    <h1 style="font-family: var(--font-heading); margin-bottom: 10px;">${product.name}</h1>
                    <h2 style="color: var(--accent-color); margin-bottom: 20px;">PKR ${product.price}</h2>
                    <div class="product-description" style="color: var(--text-color); font-size: 1rem; line-height: 1.6;">
                    <h3 style="margin-bottom: 10px; color: var(--accent-color);">Description</h3>
                    <p style="margin-bottom: 20px;">${product.description}</p>
                </div>    
                    <div class="alert-box">
                        <strong>⚠️ Payment Policy:</strong> Minimum 30% advance payment required.
                    </div>

                    <div style="display: flex; gap: 10px; flex-direction: column;">
                        <!-- Add to Cart -->
                        <button onclick="addToCart(${product.id}, '${safeName}', ${product.price}, '${safeImage}')" 
                                class="btn" style="background: white; border: 2px solid var(--accent-color); color: var(--accent-color);">
                            Add to Cart 🛒
                        </button>
                        
                        <!-- Direct WhatsApp Order -->
                        <button onclick="orderViaWhatsApp('${safeName}', ${product.price})" class="btn" style="width: 100%;">
                            Buy Now (WhatsApp)
                        </button>
                    </div>

                    <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">Delivery: 3-5 Working Days </p>
                </div>
            </div>
        `;

        // Load Reviews for this product
        renderReviews(product.id);
    } else {
        detailContainer.innerHTML = "<p>Product not found.</p>";
    }
}

// --- WHATSAPP ORDER LOGIC ---
function orderViaWhatsApp(itemName, price) {
    const phone = "923270880908";
    const message = `Hi LOVCUS! I want to order: ${itemName} (PKR ${price}). Please confirm availability.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}


// --- REVIEWS LOGIC (Global via Supabase) ---
async function renderReviews(productId) {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList || !_supabase) return;

    // Fetch from Supabase
    const { data, error } = await _supabase
        .from('reviews')
        .select('*')
        .eq('productid', productId)
        .order('created_at', { ascending: false });

    if (error) {
        // Silently fail on error rather than exposing to console in production
        reviewsList.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">Unable to load reviews at this time.</p>';
        return;
    }

    reviews = data || [];

    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color:#999; padding: 20px;">No reviews yet. Be the first to share your thoughts!</p>';
        return;
    }

    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${sanitizeHTML(review.name)}</span>
                <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
            </div>
            <p class="review-text">"${sanitizeHTML(review.text)}"</p>
        </div>
    `).join('');
}

async function handleReviewSubmit(event) {
    event.preventDefault();
    if (!_supabase) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    if (!productId) return;

    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!ratingInput) {
        alert("Please select a star rating.");
        return;
    }

    const rating = parseInt(ratingInput.value);

    // Save to Supabase
    const { error } = await _supabase
        .from('reviews')
        .insert([{ productid: productId, name: sanitizeHTML(name), rating, text: sanitizeHTML(text) }]);

    if (error) {
        // Silently fail or use toast message
        alert("Failed to post review. Please try again.");
        return;
    }

    // Reset form
    event.target.reset();

    // Rerender reviews from database
    renderReviews(productId);

    alert("Thank you for your feedback!");
}

/* --- CATEGORY FILTER LOGIC --- */
function filterProducts(category) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const filteredList = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
    );

    if (filteredList.length === 0) {
        grid.innerHTML = `<div class="no-products-message">No products found in "<strong>${category}</strong>". <br> Check back later!</div>`;
        return;
    }

    grid.innerHTML = filteredList
        .map((product) => {
            let displayImage;
            if (product.images && product.images.length > 0) {
                displayImage = product.images[0];
            } else {
                displayImage = product.image;
            }

            return `
        <div class="product-card">
            <img src="${displayImage}" alt="${product.name}" loading="lazy" width="300" height="300" style="object-fit: cover;">
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
