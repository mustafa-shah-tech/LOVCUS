const fs = require('fs');
const path = require('path');

const products = [
    { id: 1, slug: "forest-flower-crystal" },
    { id: 2, slug: "flutter-bracelet" },
    { id: 3, slug: "soulmate-bracelet" },
    { id: 4, slug: "green-champagne-crystals" },
    { id: 5, slug: "flutter-bracelet-custom" },
    { id: 6, slug: "custom-beaded-crystal" },
    { id: 7, slug: "crystal-floral-cuff" },
    { id: 8, slug: "sweetheart-crystal" },
    { id: 9, slug: "emerald-sparkle-crystal" },
    { id: 10, slug: "blue-ombre-beaded" },
    { id: 11, slug: "midnight-blue-crystal-set" },
];

const template = fs.readFileSync('product.html', 'utf8');

if (!fs.existsSync('product')) {
    fs.mkdirSync('product');
}

products.forEach(p => {
    const dir = path.join('product', p.slug);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Inject base tag and STATIC_PRODUCT_ID into the head
    let newHTML = template.replace('<head>', `<head>\n  <base href="../../" />\n  <script>window.STATIC_PRODUCT_ID = ${p.id};</script>`);
    
    fs.writeFileSync(path.join(dir, 'index.html'), newHTML, 'utf8');
});

console.log("Pages generated!");
