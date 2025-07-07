// CORS Proxy URL
export const CORS_PROXY_URL = '/api/cors-proxy';

// Raw materials data
export const rawMaterials = [
  {
    id: 1,
    name: "Organic Strawberries",
    category: "Fruits",
    currentStock: 45,
    unit: "lbs",
    minStock: 20,
    maxStock: 100,
    costPerUnit: 4.5,
    lastOrdered: "2024-01-05",
    status: "In Stock",
    vendors: [
      { id: 1, name: "Fresh Farm Co.", price: 4.5, rating: 4.8, deliveryTime: "2-3 days" },
      { id: 2, name: "Organic Valley Suppliers", price: 4.75, rating: 4.6, deliveryTime: "1-2 days" },
      { id: 3, name: "Green Harvest Ltd.", price: 4.25, rating: 4.9, deliveryTime: "3-4 days" },
    ],
  },
  {
    id: 2,
    name: "Frozen Mango Chunks",
    category: "Fruits",
    currentStock: 12,
    unit: "lbs",
    minStock: 15,
    maxStock: 80,
    costPerUnit: 3.25,
    lastOrdered: "2024-01-03",
    status: "Low Stock",
    vendors: [
      { id: 1, name: "Tropical Fruits Inc.", price: 3.25, rating: 4.7, deliveryTime: "2-3 days" },
      { id: 2, name: "Exotic Imports", price: 3.5, rating: 4.5, deliveryTime: "1-2 days" },
    ],
  },
  {
    id: 3,
    name: "Greek Yogurt",
    category: "Dairy",
    currentStock: 28,
    unit: "containers",
    minStock: 25,
    maxStock: 60,
    costPerUnit: 2.8,
    lastOrdered: "2024-01-06",
    status: "In Stock",
    vendors: [
      { id: 1, name: "Dairy Fresh Co.", price: 2.8, rating: 4.9, deliveryTime: "1 day" },
      { id: 2, name: "Mountain View Dairy", price: 2.95, rating: 4.7, deliveryTime: "2 days" },
    ],
  },
  {
    id: 4,
    name: "Organic Spinach",
    category: "Vegetables",
    currentStock: 8,
    unit: "lbs",
    minStock: 10,
    maxStock: 40,
    costPerUnit: 3.75,
    lastOrdered: "2024-01-02",
    status: "Low Stock",
    vendors: [
      { id: 1, name: "Green Leaf Farms", price: 3.75, rating: 4.8, deliveryTime: "1-2 days" },
      { id: 2, name: "Organic Valley Suppliers", price: 3.9, rating: 4.6, deliveryTime: "2-3 days" },
    ],
  },
  {
    id: 5,
    name: "Chia Seeds",
    category: "Seeds & Nuts",
    currentStock: 22,
    unit: "lbs",
    minStock: 15,
    maxStock: 50,
    costPerUnit: 8.5,
    lastOrdered: "2024-01-04",
    status: "In Stock",
    vendors: [
      { id: 1, name: "Superfood Suppliers", price: 8.5, rating: 4.9, deliveryTime: "2-3 days" },
      { id: 2, name: "Health Foods Direct", price: 8.75, rating: 4.7, deliveryTime: "1-2 days" },
    ],
  },
  {
    id: 6,
    name: "Coconut Milk",
    category: "Dairy Alternatives",
    currentStock: 35,
    unit: "cans",
    minStock: 30,
    maxStock: 80,
    costPerUnit: 1.95,
    lastOrdered: "2024-01-05",
    status: "In Stock",
    vendors: [
      { id: 1, name: "Tropical Imports", price: 1.95, rating: 4.6, deliveryTime: "2-3 days" },
      { id: 2, name: "Coconut Co.", price: 2.1, rating: 4.8, deliveryTime: "1-2 days" },
    ],
  },
  {
    id: 7,
    name: "Protein Powder (Vanilla)",
    category: "Supplements",
    currentStock: 5,
    unit: "containers",
    minStock: 8,
    maxStock: 25,
    costPerUnit: 24.99,
    lastOrdered: "2024-01-01",
    status: "Critical",
    vendors: [
      { id: 1, name: "Nutrition Plus", price: 24.99, rating: 4.8, deliveryTime: "1-2 days" },
      { id: 2, name: "Protein World", price: 26.5, rating: 4.7, deliveryTime: "2-3 days" },
    ],
  },
  {
    id: 8,
    name: "Frozen Blueberries",
    category: "Fruits",
    currentStock: 18,
    unit: "lbs",
    minStock: 15,
    maxStock: 70,
    costPerUnit: 5.25,
    lastOrdered: "2024-01-06",
    status: "In Stock",
    vendors: [
      { id: 1, name: "Berry Best Farms", price: 5.25, rating: 4.9, deliveryTime: "2-3 days" },
      { id: 2, name: "Wild Berry Co.", price: 5.5, rating: 4.6, deliveryTime: "1-2 days" },
    ],
  },
];

// Vendor data for Organic Strawberries
export const strawberryVendors = [
  {
    id: 1,
    name: "Budget Berry Co.",
    price: 2.99,
    rating: 3.2,
    deliveryTime: "1-2 days",
    sustainability: {
      score: 2.1,
      level: "Poor",
      description: "Uses conventional farming methods with pesticides, minimal environmental consideration"
    },
    environmental: {
      score: 1.8,
      level: "Poor", 
      description: "High carbon footprint, excessive packaging, long-distance shipping"
    },
    pros: ["Cheapest price", "Fast delivery", "Large quantities available"],
    cons: ["Uses pesticides", "Poor sustainability practices", "High environmental impact", "Lower quality berries"],
    location: "Mexico",
    minimumOrder: 50,
    certifications: [],
    contact: {
      phone: "+1-555-0123",
      email: "orders@budgetberry.com",
      website: "www.budgetberry.com"
    }
  },
  {
    id: 2,
    name: "EcoHarvest Organics",
    price: 6.99,
    rating: 4.9,
    deliveryTime: "3-4 days",
    sustainability: {
      score: 9.5,
      level: "Excellent",
      description: "Certified organic, regenerative farming practices, carbon-neutral operations"
    },
    environmental: {
      score: 9.8,
      level: "Excellent",
      description: "Zero-waste packaging, local sourcing, renewable energy powered facilities"
    },
    pros: ["Highest quality", "Excellent sustainability", "Certified organic", "Local sourcing"],
    cons: ["Most expensive", "Slower delivery", "Limited quantities", "Higher minimum order"],
    location: "Local (within 50 miles)",
    minimumOrder: 25,
    certifications: ["USDA Organic", "Fair Trade", "Carbon Neutral", "B Corp"],
    contact: {
      phone: "+1-555-0456",
      email: "hello@ecoharvest.com",
      website: "www.ecoharvest.com"
    }
  },
  {
    id: 3,
    name: "Green Valley Farms",
    price: 4.49,
    rating: 4.3,
    deliveryTime: "2-3 days",
    sustainability: {
      score: 7.2,
      level: "Good",
      description: "Organic farming methods, responsible water usage, moderate environmental impact"
    },
    environmental: {
      score: 6.8,
      level: "Good",
      description: "Recyclable packaging, regional sourcing, energy-efficient facilities"
    },
    pros: ["Good balance of price and quality", "Decent sustainability", "Reliable delivery", "Good customer service"],
    cons: ["Not fully organic", "Moderate environmental impact", "Limited certifications"],
    location: "Regional (within 200 miles)",
    minimumOrder: 30,
    certifications: ["USDA Organic", "Regional Sourcing"],
    contact: {
      phone: "+1-555-0789",
      email: "orders@greenvalleyfarms.com",
      website: "www.greenvalleyfarms.com"
    }
  }
];

// New vendor data structure for the dashboard format
export const vendors = [
  {
    id: 1,
    name: "Fresh Fruit Co.",
    contact: "John Smith",
    email: "john@freshfruit.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    totalOrders: 156,
    materials: [
      { name: "Strawberries", price: 3.5, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Bananas", price: 1.2, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Blueberries", price: 5.8, unit: "lb", quality: "Organic", availability: "Limited" },
      { name: "Mangoes", price: 2.4, unit: "lb", quality: "Premium", availability: "In Stock" },
    ],
    status: "Active",
    lastOrder: "2024-01-15",
    sustainability: {
      localGrown: true,
      organic: true,
      closeDistance: true,
      fairTrade: false,
      carbonNeutral: true
    }
  },
  {
    id: 2,
    name: "Tropical Suppliers",
    contact: "Maria Garcia",
    email: "maria@tropical.com",
    phone: "+1 (555) 987-6543",
    rating: 4.6,
    totalOrders: 89,
    materials: [
      { name: "Pineapple", price: 2.8, unit: "lb", quality: "Premium", availability: "In Stock" },
      { name: "Coconut", price: 1.9, unit: "piece", quality: "Fresh", availability: "In Stock" },
      { name: "Mangoes", price: 2.6, unit: "lb", quality: "Premium", availability: "In Stock" },
      { name: "Passion Fruit", price: 8.5, unit: "lb", quality: "Exotic", availability: "Limited" },
    ],
    status: "Active",
    lastOrder: "2024-01-12",
    sustainability: {
      localGrown: false,
      organic: false,
      closeDistance: false,
      fairTrade: true,
      carbonNeutral: false
    }
  },
  {
    id: 3,
    name: "Green Valley Farms",
    contact: "David Wilson",
    email: "david@greenvalley.com",
    phone: "+1 (555) 456-7890",
    rating: 4.9,
    totalOrders: 203,
    materials: [
      { name: "Spinach", price: 2.2, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Kale", price: 2.8, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Carrots", price: 1.5, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Beets", price: 2.1, unit: "lb", quality: "Organic", availability: "In Stock" },
    ],
    status: "Active",
    lastOrder: "2024-01-14",
    sustainability: {
      localGrown: true,
      organic: true,
      closeDistance: true,
      fairTrade: true,
      carbonNeutral: true
    }
  },
  {
    id: 4,
    name: "Protein Plus",
    contact: "Sarah Johnson",
    email: "sarah@proteinplus.com",
    phone: "+1 (555) 321-0987",
    rating: 4.4,
    totalOrders: 67,
    materials: [
      { name: "Whey Protein", price: 15.5, unit: "lb", quality: "Premium", availability: "In Stock" },
      { name: "Plant Protein", price: 18.2, unit: "lb", quality: "Organic", availability: "In Stock" },
      { name: "Greek Yogurt", price: 4.8, unit: "lb", quality: "Premium", availability: "Limited" },
      { name: "Almond Butter", price: 12.4, unit: "lb", quality: "Organic", availability: "In Stock" },
    ],
    status: "Active",
    lastOrder: "2024-01-10",
    sustainability: {
      localGrown: false,
      organic: true,
      closeDistance: false,
      fairTrade: true,
      carbonNeutral: false
    }
  },
]; 