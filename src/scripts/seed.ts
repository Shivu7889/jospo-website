import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Direct MongoDB connection for seed script (not using the lib singleton)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://shivampatelsp889_db_user:uPJHC6Fo8V1WkX2X@cluster0.x9jhd8w.mongodb.net/jospo?retryWrites=true&w=majority&appName=Cluster0";

// ─── Product Schema (inline for seed script) ───
const ProductSchema = new mongoose.Schema(
  {
    name: String, slug: { type: String, unique: true }, category: String,
    image: String, fanSize: String, airFlow: String, tankCapacity: String,
    powerConsumption: String, coolingArea: String, coolingAreaSqM: Number,
    dimensions: String, badge: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seo: { metaTitle: { type: String, default: "" }, metaDescription: { type: String, default: "" } },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: String, email: { type: String, unique: true },
    password: String, role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const PageSeoSchema = new mongoose.Schema(
  {
    pageSlug: { type: String, unique: true }, metaTitle: String,
    metaDescription: String, ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" }, ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    structuredData: { type: String, default: "" },
  },
  { timestamps: true }
);

const TestimonialSchema = new mongoose.Schema(
  {
    name: String, location: String, role: String,
    rating: Number, text: String, product: { type: String, default: "" },
    isActive: { type: Boolean, default: true }, sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FaqSchema = new mongoose.Schema(
  {
    question: String, answer: String,
    isActive: { type: Boolean, default: true }, sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Data ───

const productsData = [
  { name: "JOSPO Rolex 35L", slug: "rolex-35l", category: "personal", image: "/images/products/rolex-35l.jpg", fanSize: "12 Inch", airFlow: "2,400 m³/h", tankCapacity: "35 Litres", powerConsumption: "114 Watts", coolingArea: "40 sq. m", coolingAreaSqM: 40, dimensions: "460 × 435 × 860 mm", badge: "Compact", sortOrder: 0, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Rolex 65L", slug: "rolex-65l", category: "medium", image: "/images/products/rolex-65l.jpg", fanSize: "12 Inch", airFlow: "2,400 m³/h", tankCapacity: "65 Litres", powerConsumption: "114 Watts", coolingArea: "40 sq. m", coolingAreaSqM: 40, dimensions: "460 × 435 × 1080 mm", badge: "", sortOrder: 1, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Amaze 90L", slug: "amaze-90l", category: "medium", image: "/images/products/amaze-90l.jpg", fanSize: "16 Inch", airFlow: "3,500 m³/h", tankCapacity: "90 Litres", powerConsumption: "160 Watts", coolingArea: "58 sq. m", coolingAreaSqM: 58, dimensions: "620 × 440 × 1270 mm", badge: "Popular", sortOrder: 2, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Signature 100L", slug: "signature-100l", category: "large", image: "/images/products/signature-100l.png", fanSize: "18 Inch", airFlow: "4,800 m³/h", tankCapacity: "100 Litres", powerConsumption: "160 Watts", coolingArea: "80 sq. m", coolingAreaSqM: 80, dimensions: "625 × 430 × 1270 mm", badge: "Best Seller", sortOrder: 3, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Turbo GT 110L", slug: "turbo-gt-110l", category: "large", image: "/images/products/turbo-gt-110l.jpg", fanSize: "17 Inch", airFlow: "4,200 m³/h", tankCapacity: "110 Litres", powerConsumption: "160 Watts", coolingArea: "70 sq. m", coolingAreaSqM: 70, dimensions: "620 × 475 × 1360 mm", badge: "", sortOrder: 4, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Fusion 110L", slug: "fusion-110l", category: "large", image: "/images/products/fusion-110l.jpg", fanSize: "17 Inch", airFlow: "4,200 m³/h", tankCapacity: "110 Litres", powerConsumption: "160 Watts", coolingArea: "70 sq. m", coolingAreaSqM: 70, dimensions: "620 × 475 × 1360 mm", badge: "", sortOrder: 5, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Defender 135L", slug: "defender-135l", category: "industrial", image: "/images/products/defender-135l.jpg", fanSize: "20 Inch", airFlow: "7,900 m³/h", tankCapacity: "135 Litres", powerConsumption: "250 Watts", coolingArea: "131 sq. m", coolingAreaSqM: 131, dimensions: "800 × 560 × 1415 mm", badge: "Heavy Duty", sortOrder: 6, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Storm 130L", slug: "storm-130l", category: "industrial", image: "/images/products/storm-130l.jpg", fanSize: "20 Inch", airFlow: "8,000 m³/h", tankCapacity: "130 Litres", powerConsumption: "250 Watts", coolingArea: "133 sq. m", coolingAreaSqM: 133, dimensions: "800 × 550 × 1415 mm", badge: "", sortOrder: 7, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Rolex 135L", slug: "rolex-135l", category: "industrial", image: "/images/products/rolex-135l.jpg", fanSize: "20 Inch", airFlow: "7,500 m³/h", tankCapacity: "135 Litres", powerConsumption: "250 Watts", coolingArea: "125 sq. m", coolingAreaSqM: 125, dimensions: "800 × 535 × 1415 mm", badge: "", sortOrder: 8, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
  { name: "JOSPO Tent Plus 200L", slug: "tent-plus-200l", category: "industrial", image: "/images/products/tent-plus-200l.jpg", fanSize: "26 Inch", airFlow: "16,000 m³/h", tankCapacity: "200 Litres", powerConsumption: "450 Watts", coolingArea: "266 sq. m", coolingAreaSqM: 266, dimensions: "1090 × 575 × 1595 mm", badge: "Max Power", sortOrder: 9, features: ["Honeycomb cooling pads for superior cooling", "Heavy-duty castor wheels for mobility", "Auto-drain functionality", "Anti-rust body construction", "High-speed copper motor", "Ice chamber for extra cooling"] },
];

const pageSeoData = [
  { pageSlug: "home", metaTitle: "JOSPO Cooling Solutions Pvt. Ltd. | India's Trusted Air Cooler Manufacturer", metaDescription: "JOSPO is a leading manufacturer of high-performance desert, commercial & industrial air coolers in Bhiwadi, Rajasthan. Energy-efficient cooling solutions for homes, offices, factories & warehouses. Get a quote today!", keywords: ["Air Cooler Manufacturer India", "Industrial Air Cooler Manufacturer", "Desert Air Cooler Manufacturer", "Commercial Air Cooler Supplier", "JOSPO Air Cooler"] },
  { pageSlug: "about", metaTitle: "About Us | JOSPO Cooling Solutions", metaDescription: "Learn about JOSPO Cooling Solutions — India's trusted manufacturer of high-performance air coolers for residential, commercial, and industrial applications." },
  { pageSlug: "faq", metaTitle: "FAQ | JOSPO Cooling Solutions", metaDescription: "Frequently asked questions about JOSPO air coolers — cooling capacity, electricity consumption, delivery, warranty, and more." },
  { pageSlug: "cooling-finder", metaTitle: "Cooling Finder | JOSPO Cooling Solutions", metaDescription: "Find the perfect air cooler for your space. Answer 4 quick questions and get a personalized recommendation from JOSPO." },
  { pageSlug: "manufacturing", metaTitle: "Manufacturing | JOSPO Cooling Solutions", metaDescription: "Explore JOSPO's state-of-the-art manufacturing facility in Bhiwadi, Rajasthan. Advanced machinery, quality control, and skilled workforce." },
  { pageSlug: "why-choose", metaTitle: "Why Choose JOSPO | JOSPO Cooling Solutions", metaDescription: "Discover why JOSPO is India's trusted air cooler manufacturer — premium quality, energy efficiency, nationwide distribution, and reliable support." },
  { pageSlug: "blog", metaTitle: "Blog | JOSPO Cooling Solutions", metaDescription: "Read the latest articles about cooling tips, product guides, and industry news from JOSPO Cooling Solutions." },
];

const testimonialsData = [
  { name: "Rajesh Sharma", location: "Jaipur, Rajasthan", role: "Shop Owner", rating: 5, text: "We installed 4 JOSPO Defender 135L coolers in our warehouse. The cooling performance is outstanding even in peak summer of Rajasthan. The build quality is exceptional and maintenance is minimal. Highly recommended for commercial use.", product: "Defender 135L", sortOrder: 0 },
  { name: "Priya Mehta", location: "Ahmedabad, Gujarat", role: "Homeowner", rating: 5, text: "The JOSPO Signature 100L has been a game-changer for our home. It cools our entire hall effortlessly and the water tank lasts the whole night. Very energy efficient — our electricity bill barely went up!", product: "Signature 100L", sortOrder: 1 },
  { name: "Anil Verma", location: "Delhi NCR", role: "Factory Manager", rating: 5, text: "After trying multiple brands, JOSPO Tent Plus 200L is the only cooler that effectively cools our 2000 sq ft production floor. The 26-inch fan delivers massive air flow. We've now ordered 10 more units.", product: "Tent Plus 200L", sortOrder: 2 },
  { name: "Suresh Patel", location: "Indore, MP", role: "Distributor", rating: 5, text: "As a distributor, I've been associated with JOSPO for 3 years. Their products have zero complaints from customers, margins are healthy, and the after-sales support team is always responsive. Best brand to work with.", product: "", sortOrder: 3 },
  { name: "Mohammed Arif", location: "Hyderabad, Telangana", role: "Restaurant Owner", rating: 4, text: "We use JOSPO Storm 130L in our outdoor seating area. Even in humid conditions, the cooling is remarkably effective. Our customers always appreciate the comfortable dining experience.", product: "Storm 130L", sortOrder: 4 },
  { name: "Kavita Joshi", location: "Lucknow, UP", role: "Office Manager", rating: 5, text: "The JOSPO Amaze 90L is perfect for our office space. It's quiet, powerful, and the design looks very professional. The large tank means we only refill once a day. Great product!", product: "Amaze 90L", sortOrder: 5 },
];

const faqsData = [
  { question: "Which cooler is best for my room?", answer: "The ideal cooler depends on your room size. For rooms up to 40 sq. m, the JOSPO Rolex 35L or 65L is perfect. For medium-sized spaces (40–80 sq. m), consider the Amaze 90L or Signature 100L. For large halls or commercial spaces (80–135 sq. m), the Defender 135L or Storm 130L delivers excellent performance. Use our Cooling Solution Finder tool above for a personalized recommendation.", sortOrder: 0 },
  { question: "How much electricity do JOSPO coolers consume?", answer: "JOSPO coolers are designed for energy efficiency. Our personal coolers consume as low as 114 watts, while our industrial models use up to 250–450 watts — still far less than air conditioning systems. On average, running a JOSPO cooler costs ₹2–₹8 per hour depending on the model, making them one of the most economical cooling solutions available.", sortOrder: 1 },
  { question: "Do you provide dealer/distributor opportunities?", answer: "Yes, JOSPO actively seeks reliable dealers and distributors across India. We offer attractive margins, marketing support, and after-sales service backup. Contact us on WhatsApp at 9602243363 or email jospoindia@gmail.com to discuss partnership opportunities.", sortOrder: 2 },
  { question: "Which cooler is suitable for industrial use?", answer: "For industrial applications such as factories, warehouses, and large workshops, we recommend the JOSPO Defender 135L (131 sq. m coverage), Storm 130L (133 sq. m coverage), or the Tent Plus 200L (266 sq. m coverage) for maximum cooling power. These models feature heavy-duty construction, large fans, and high air delivery for demanding environments.", sortOrder: 3 },
  { question: "How do I get pricing information?", answer: "For the latest pricing and bulk order discounts, simply click the 'Get Quote on WhatsApp' button or message us directly at 9602243363. Our sales team typically responds within minutes during business hours. You can also email us at jospoindia@gmail.com for detailed quotations.", sortOrder: 4 },
  { question: "Do you supply across India?", answer: "Yes, JOSPO Cooling Solutions supplies air coolers to dealers, distributors, and customers across all Indian states. We have an established logistics network ensuring safe and timely delivery nationwide. We also entertain bulk orders for commercial and industrial clients with special pricing.", sortOrder: 5 },
];

// ─── Seed Function ───

async function seed() {
  console.log("🌱 Starting database seed...\n");

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB\n");

  const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const PageSeo = mongoose.models.PageSeo || mongoose.model("PageSeo", PageSeoSchema);
  const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
  const FAQ = mongoose.models.Faq || mongoose.model("Faq", FaqSchema);

  // 1. Seed Admin User
  console.log("👤 Seeding admin user...");
  const existingAdmin = await User.findOne({ email: "admin@jospo.in" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Jospo@2026", 10);
    await User.create({
      name: "JOSPO Admin",
      email: "admin@jospo.in",
      password: hashedPassword,
      role: "admin",
    });
    console.log("   ✅ Admin user created: admin@jospo.in / Jospo@2026\n");
  } else {
    console.log("   ⏭️  Admin user already exists, skipping.\n");
  }

  // 2. Seed Products
  console.log("📦 Seeding products...");
  const existingProducts = await Product.countDocuments();
  if (existingProducts === 0) {
    await Product.insertMany(productsData);
    console.log(`   ✅ ${productsData.length} products seeded.\n`);
  } else {
    console.log(`   ⏭️  ${existingProducts} products already exist, skipping.\n`);
  }

  // 3. Seed Page SEO
  console.log("🔍 Seeding page SEO data...");
  for (const seo of pageSeoData) {
    await PageSeo.findOneAndUpdate(
      { pageSlug: seo.pageSlug },
      seo,
      { upsert: true, new: true }
    );
  }
  console.log(`   ✅ ${pageSeoData.length} page SEO entries seeded.\n`);

  // 4. Seed Testimonials
  console.log("⭐ Seeding testimonials...");
  const existingTestimonials = await Testimonial.countDocuments();
  if (existingTestimonials === 0) {
    await Testimonial.insertMany(testimonialsData);
    console.log(`   ✅ ${testimonialsData.length} testimonials seeded.\n`);
  } else {
    console.log(`   ⏭️  ${existingTestimonials} testimonials already exist, skipping.\n`);
  }

  // 5. Seed FAQs
  console.log("❓ Seeding FAQs...");
  const existingFaqs = await FAQ.countDocuments();
  if (existingFaqs === 0) {
    await FAQ.insertMany(faqsData);
    console.log(`   ✅ ${faqsData.length} FAQs seeded.\n`);
  } else {
    console.log(`   ⏭️  ${existingFaqs} FAQs already exist, skipping.\n`);
  }

  console.log("🎉 Database seeding complete!");
  console.log("\n📋 Admin Login Credentials:");
  console.log("   Email:    admin@jospo.in");
  console.log("   Password: Jospo@2026");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
