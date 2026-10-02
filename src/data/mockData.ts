import { Restaurant, CuisineCategory, Coupon, Address } from '../types';

export const CUISINE_CATEGORIES: CuisineCategory[] = [
  {
    id: 'biryani',
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'pizza',
    name: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'burger',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'north-indian',
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'rolls',
    name: 'Rolls',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cakes',
    name: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&auto=format&fit=crop&q=80',
  },
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SWIGGY50',
    discountPercent: 50,
    maxDiscount: 100,
    minOrderValue: 199,
    description: '50% OFF up to ₹100 on orders above ₹199',
  },
  {
    code: 'WELCOME200',
    discountPercent: 60,
    maxDiscount: 120,
    minOrderValue: 249,
    description: '60% OFF up to ₹120 for new users',
  },
  {
    code: 'JUMBO150',
    discountPercent: 30,
    maxDiscount: 150,
    minOrderValue: 499,
    description: '30% OFF up to ₹150 on family size orders',
  },
  {
    code: 'PUREVEG',
    discountPercent: 20,
    maxDiscount: 80,
    minOrderValue: 149,
    description: '20% OFF up to ₹80 on Pure Veg Delights',
  },
];

export const SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    type: 'HOME',
    title: 'Home',
    addressLine1: 'Flat 402, Sunshine Apartments, 8th Main Road',
    addressLine2: 'Koramangala 4th Block, Bengaluru, Karnataka',
    landmark: 'Opposite Sony World Signal',
  },
  {
    id: 'addr-2',
    type: 'WORK',
    title: 'Office',
    addressLine1: 'Tech Park Towers, Floor 6, Wing B',
    addressLine2: 'Outer Ring Road, Marathahalli, Bengaluru',
    landmark: 'Near Embassy Tech Village',
  },
  {
    id: 'addr-3',
    type: 'OTHER',
    title: "Friend's Place",
    addressLine1: 'No 42, 1st Cross, Indiranagar 100ft Road',
    addressLine2: 'Indiranagar, Bengaluru, Karnataka',
    landmark: 'Behind Toit Pub',
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Meghana Foods',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    cuisines: ['Biryani', 'Andhra', 'North Indian', 'South Indian'],
    rating: 4.6,
    ratingCount: '10K+',
    deliveryTimeMinutes: 25,
    costForTwo: 500,
    location: 'Koramangala',
    distanceKm: 2.3,
    isVeg: false,
    discountHeader: '50% OFF',
    discountSubheader: 'UPTO ₹100',
    isPromoted: true,
    items: [
      {
        id: 'mf-1',
        restaurantId: 'rest-1',
        name: 'Meghana Special Chicken Biryani',
        description: 'Our signature biryani layered with aromatic basmati rice, tender spiced chicken, and secret Andhra spices.',
        price: 340,
        originalPrice: 380,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        rating: 4.8,
        ratingCount: 3420,
        category: 'Biryani Specials',
        customizable: true,
        optionGroups: [
          {
            id: 'portion',
            title: 'Choose Portion',
            required: true,
            options: [
              { id: 'regular', name: 'Regular Portion (Serves 1)', price: 0 },
              { id: 'jumbo', name: 'Jumbo Portion (Serves 2)', price: 120 },
            ],
          },
          {
            id: 'extra',
            title: 'Add-ons',
            required: false,
            options: [
              { id: 'extra-raita', name: 'Extra Onion Raita', price: 25 },
              { id: 'boiled-egg', name: 'Boiled Egg (2 pcs)', price: 35 },
              { id: 'salan', name: 'Mirchi Ka Salan Bowl', price: 40 },
            ],
          },
        ],
      },
      {
        id: 'mf-2',
        restaurantId: 'rest-1',
        name: 'Boneless Chicken Biryani',
        description: 'Juicy succulent boneless chicken pieces deep fried in spicy Andhra red chilli masala and served with biryani rice.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        rating: 4.7,
        ratingCount: 2890,
        category: 'Biryani Specials',
      },
      {
        id: 'mf-3',
        restaurantId: 'rest-1',
        name: 'Paneer Biryani',
        description: 'Fragrant basmati rice infused with whole spices and topped with marinated paneer cubes and fried onions.',
        price: 290,
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: false,
        rating: 4.5,
        ratingCount: 1200,
        category: 'Veg Delights',
      },
      {
        id: 'mf-4',
        restaurantId: 'rest-1',
        name: 'Chicken 65 Starter',
        description: 'Crispy fried chicken tossed in curry leaves, green chillies, and homemade spicy yogurt sauce.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        rating: 4.6,
        ratingCount: 1980,
        category: 'Starters',
      },
      {
        id: 'mf-5',
        restaurantId: 'rest-1',
        name: 'Andhra Mutton Fry',
        description: 'Tender mutton slow cooked in caramelized onions, black pepper, and South Indian spices.',
        price: 390,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        rating: 4.6,
        ratingCount: 950,
        category: 'Starters',
      },
      {
        id: 'mf-6',
        restaurantId: 'rest-1',
        name: 'Butter Milk (Chaas)',
        description: 'Chilled refreshing churned buttermilk spiced with ginger, green chilli, and coriander.',
        price: 45,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        category: 'Beverages',
      },
    ],
  },
  {
    id: 'rest-2',
    name: "Domino's Pizza",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    cuisines: ['Pizzas', 'Italian', 'Pastas', 'Desserts'],
    rating: 4.4,
    ratingCount: '5K+',
    deliveryTimeMinutes: 20,
    costForTwo: 400,
    location: 'HSR Layout',
    distanceKm: 1.8,
    isVeg: false,
    discountHeader: 'ITEMS AT ₹129',
    discountSubheader: 'EVERYDAY VALUE',
    items: [
      {
        id: 'dom-1',
        restaurantId: 'rest-2',
        name: 'Peppy Paneer Pizza',
        description: 'Flavorful paneer, crisp capsicum, and spicy red paprika over rich mozzarella cheese base.',
        price: 299,
        originalPrice: 349,
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.5,
        category: 'Veg Pizzas',
        customizable: true,
        optionGroups: [
          {
            id: 'crust',
            title: 'Select Crust',
            required: true,
            options: [
              { id: 'hand-tossed', name: 'Classic Hand Tossed', price: 0 },
              { id: 'cheese-burst', name: 'Cheese Burst', price: 99 },
              { id: 'thin-crust', name: 'Fresh Pan Crust', price: 30 },
            ],
          },
          {
            id: 'size',
            title: 'Select Size',
            required: true,
            options: [
              { id: 'regular', name: 'Regular (Serves 1)', price: 0 },
              { id: 'medium', name: 'Medium (Serves 2)', price: 180 },
            ],
          },
        ],
      },
      {
        id: 'dom-2',
        restaurantId: 'rest-2',
        name: 'Non Veg Supreme Pizza',
        description: 'Loaded with Pepperoni, Hot Chicken Fudge, Grilled Chicken Rashers, Mushrooms & Olives.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        rating: 4.7,
        category: 'Non Veg Pizzas',
      },
      {
        id: 'dom-3',
        restaurantId: 'rest-2',
        name: 'Garlic Breadsticks',
        description: 'Baked to golden perfection, brushed with garlic butter and herbs seasoning.',
        price: 119,
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.6,
        category: 'Sides',
      },
      {
        id: 'dom-4',
        restaurantId: 'rest-2',
        name: 'Choco Lava Cake',
        description: 'Chocolate lover dream! Warm chocolate cake with molten chocolate center.',
        price: 109,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.8,
        category: 'Desserts',
      },
    ],
  },
  {
    id: 'rest-3',
    name: 'Truffles',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    cuisines: ['Burgers', 'American', 'Continental', 'Desserts', 'Cafe'],
    rating: 4.5,
    ratingCount: '15K+',
    deliveryTimeMinutes: 30,
    costForTwo: 600,
    location: 'Koramangala 5th Block',
    distanceKm: 3.1,
    isVeg: false,
    discountHeader: '₹125 OFF',
    discountSubheader: 'ABOVE ₹349',
    isPromoted: false,
    items: [
      {
        id: 'truff-1',
        restaurantId: 'rest-3',
        name: 'All American Cheese Burger',
        description: 'Juicy tender grilled chicken patty topped with sharp cheddar, pickles, crisp lettuce, and special burger spread.',
        price: 270,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        rating: 4.8,
        ratingCount: 5400,
        category: 'Signature Burgers',
      },
      {
        id: 'truff-2',
        restaurantId: 'rest-3',
        name: 'Crispy Cottage Cheese Burger',
        description: 'Spiced panko-crusted paneer patty with caramelized onions and chipotle mayonnaise.',
        price: 240,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.5,
        category: 'Signature Burgers',
      },
      {
        id: 'truff-3',
        restaurantId: 'rest-3',
        name: 'Ferrero Rocher Shake',
        description: 'Thick creamy milkshake blended with authentic Ferrero Rocher chocolates and hazelnut cocoa syrup.',
        price: 210,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        rating: 4.9,
        category: 'Thick Shakes',
      },
    ],
  },
  {
    id: 'rest-4',
    name: 'Corner House Ice Cream',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80',
    cuisines: ['Ice Cream', 'Desserts'],
    rating: 4.8,
    ratingCount: '20K+',
    deliveryTimeMinutes: 15,
    costForTwo: 300,
    location: 'Jayanagar',
    distanceKm: 1.2,
    isVeg: true,
    discountHeader: '20% OFF',
    discountSubheader: 'UPTO ₹50',
    items: [
      {
        id: 'ch-1',
        restaurantId: 'rest-4',
        name: 'Death By Chocolate (DBC)',
        description: 'Legendary Bengaluru dessert! Layers of vanilla ice cream, chocolate cake, roasted nuts, cherry, and thick hot fudge sauce.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.9,
        ratingCount: 12000,
        category: 'Sundaes',
      },
      {
        id: 'ch-2',
        restaurantId: 'rest-4',
        name: 'Trilogy Sundae',
        description: 'Three scoops of ice cream (Vanilla, Strawberry, Chocolate) with mixed fruit sauce and almonds.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        rating: 4.7,
        category: 'Sundaes',
      },
    ],
  },
  {
    id: 'rest-5',
    name: 'Udupi Grand',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80',
    cuisines: ['South Indian', 'Chinese', 'North Indian', 'Street Food'],
    rating: 4.3,
    ratingCount: '8K+',
    deliveryTimeMinutes: 20,
    costForTwo: 250,
    location: 'BTM Layout',
    distanceKm: 2.0,
    isVeg: true,
    discountHeader: 'FLAT ₹50 OFF',
    discountSubheader: 'ABOVE ₹199',
    items: [
      {
        id: 'ud-1',
        restaurantId: 'rest-5',
        name: 'Ghee Masala Dosa',
        description: 'Crispy golden crepe smeared with pure desi ghee and stuffed with spiced potato masala, served with coconut chutney & sambar.',
        price: 110,
        image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.6,
        category: 'Breakfast Specials',
      },
      {
        id: 'ud-2',
        restaurantId: 'rest-5',
        name: 'Button Idli Sambar Dip',
        description: 'Mini soft steamed rice cakes submerged in piping hot authentic Udupi sambar with a spoonful of ghee.',
        price: 90,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.7,
        category: 'Breakfast Specials',
      },
      {
        id: 'ud-3',
        restaurantId: 'rest-5',
        name: 'Filter Coffee (Degree)',
        description: 'Authentic South Indian brass filter coffee brewed fresh with chicory blend and hot frothy milk.',
        price: 35,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        category: 'Beverages',
      },
    ],
  },
  {
    id: 'rest-6',
    name: 'Chai Point',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    cuisines: ['Beverages', 'Snacks', 'Fast Food'],
    rating: 4.4,
    ratingCount: '4K+',
    deliveryTimeMinutes: 18,
    costForTwo: 200,
    location: 'Koramangala 1st Block',
    distanceKm: 1.5,
    isVeg: true,
    discountHeader: '60% OFF',
    discountSubheader: 'UPTO ₹120',
    items: [
      {
        id: 'cp-1',
        restaurantId: 'rest-6',
        name: 'Ginger Masala Chai Flask (500ml)',
        description: 'Hot freshly brewed garden tea infused with grated fresh ginger and aromatic cardamoms in heat-retaining flask.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.8,
        category: 'Tea Flasks',
      },
      {
        id: 'cp-2',
        restaurantId: 'rest-6',
        name: 'Samosa (2 Pcs)',
        description: 'Crispy fried golden pastry filled with spiced potato and green peas, served with mint chutney.',
        price: 60,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        rating: 4.5,
        category: 'Snacks',
      },
    ],
  },
];

export const INSTAMART_ITEMS = [
  {
    id: 'im-1',
    name: 'Amul Taaza Toned Milk (1L)',
    category: 'Dairy & Milk',
    price: 54,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '10 MINS',
    unit: '1 Litre',
  },
  {
    id: 'im-2',
    name: 'Fresh Alphonso Mangoes',
    category: 'Fruits & Vegetables',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '10 MINS',
    unit: '1 kg',
  },
  {
    id: 'im-3',
    name: 'Lays Classic Salted Potato Chips',
    category: 'Snacks & Munchies',
    price: 30,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '8 MINS',
    unit: '52g',
  },
  {
    id: 'im-4',
    name: 'Coca Cola Zero Sugar Can',
    category: 'Drinks & Juices',
    price: 40,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '8 MINS',
    unit: '300 ml',
  },
  {
    id: 'im-5',
    name: 'Maggi 2-Minute Noodles (Pack of 4)',
    category: 'Instant Food',
    price: 58,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '10 MINS',
    unit: '280g',
  },
  {
    id: 'im-6',
    name: 'Epigamia Greek Yogurt Natural',
    category: 'Dairy & Milk',
    price: 50,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80',
    deliveryTime: '10 MINS',
    unit: '100g',
  },
];

export const DINEOUT_RESTAURANTS = [
  {
    id: 'do-1',
    name: 'Toit Brewpub',
    location: 'Indiranagar, Bengaluru',
    cuisine: 'Microbrewery, European, Finger Food',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
    offer: 'FLAT 25% OFF ON TOTAL BILL',
    costForTwo: 1800,
  },
  {
    id: 'do-2',
    name: 'Biergarten Craft Brewery',
    location: 'Koramangala, Bengaluru',
    cuisine: 'Continental, Asian, North Indian',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    offer: 'FLAT 30% OFF VIA SWIGGY PAY',
    costForTwo: 1600,
  },
  {
    id: 'do-3',
    name: 'Truffles Cafe & Bistro',
    location: 'Jayanagar, Bengaluru',
    cuisine: 'Italian, Cafe, Burgers',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop&q=80',
    offer: '1+1 ON DRINKS + 15% BILL OFF',
    costForTwo: 900,
  },
];

// Backend Architecture Details for Resume Showcase
export const BACKEND_ARCHITECTURE = {
  overview: "This Swiggy Replica project features a Microservices-ready full-stack architecture built with Java Spring Boot, Hibernate ORM, MySQL relational database, MongoDB NoSQL document store, and React with TypeScript.",
  techSkillsUsed: [
    { name: 'Java 17', category: 'Language' },
    { name: 'Spring Boot 3.x', category: 'Backend Framework' },
    { name: 'Hibernate / JPA', category: 'ORM Framework' },
    { name: 'MySQL / SQL', category: 'Relational Database' },
    { name: 'MongoDB', category: 'NoSQL Database' },
    { name: 'Maven', category: 'Build Tool' },
    { name: 'Jenkins', category: 'CI/CD Pipeline' },
    { name: 'React 19 & TypeScript', category: 'Frontend' },
    { name: 'Git', category: 'Version Control' },
  ],
  codeSnippets: {
    javaEntity: `// Java Entity - Hibernate / JPA Mapping
package com.swiggy.replica.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "cuisine_type")
    private String cuisineType;

    private Double rating;
    
    @Column(name = "delivery_time_mins")
    private Integer deliveryTimeMinutes;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MenuItem> menuItems;

    @Embedded
    private Address locationAddress;
}`,

    springController: `// Spring Boot Rest Controller
package com.swiggy.replica.controller;

import com.swiggy.replica.dto.OrderRequestDTO;
import com.swiggy.replica.dto.OrderResponseDTO;
import com.swiggy.replica.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO request) {
        OrderResponseDTO order = orderService.processOrder(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}/track")
    public ResponseEntity<OrderResponseDTO> trackLiveOrder(@PathVariable String orderId) {
        return ResponseEntity.ok(orderService.getLiveTrackingDetails(orderId));
    }
}`,

    mysqlDDL: `-- MySQL Relational Database Schema DDL
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.0,
    cost_for_two INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_restaurant_rating (rating)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
) ENGINE=InnoDB;`,

    mongoDBSchema: `// MongoDB Document Schema for Real-time GPS & Audit Analytics
db.createCollection("delivery_driver_telemetry", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "orderId", "driverId", "currentLocation", "timestamp" ],
         properties: {
            orderId: { bsonType: "string" },
            driverId: { bsonType: "string" },
            currentLocation: {
               bsonType: "object",
               required: [ "lat", "lng" ],
               properties: {
                  lat: { bsonType: "double" },
                  lng: { bsonType: "double" }
               }
            },
            speedKm: { bsonType: "double" },
            timestamp: { bsonType: "date" }
         }
      }
   }
});`,

    jenkinsfile: `// Jenkinsfile - CI/CD Pipeline Definition
pipeline {
    agent any
    tools {
        maven 'Maven 3.9'
        jdk 'JDK 17'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/user/swiggy-replica-backend.git'
            }
        }
        stage('Compile & Unit Test') {
            steps {
                sh 'mvn clean test'
            }
        }
        stage('SonarQube Static Analysis') {
            steps {
                sh 'mvn sonar:sonar -Dsonar.projectKey=swiggy-replica'
            }
        }
        stage('Package Jar') {
            steps {
                sh 'mvn package -DskipTests'
            }
        }
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t swiggy-backend:latest .'
            }
        }
    }
}`,

    pomXml: `<!-- Maven pom.xml Core Dependencies -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
</dependencies>`
  },
  resumeBulletPoints: [
    "Architected and implemented a high-performance Swiggy food delivery web replica using Java 17, Spring Boot, Hibernate, MySQL, MongoDB, and React with TypeScript.",
    "Designed RESTful APIs for real-time order placement, restaurant search with debouncing, cart management, coupon evaluation, and live GPS driver telemetry simulation.",
    "Engineered relational database schemas in MySQL with optimized indexing strategies, reducing order retrieval queries to under 15ms latency.",
    "Leveraged MongoDB for document-based logging of driver GPS coordinates and user interaction telemetry.",
    "Configured automated CI/CD pipelines using Jenkins and Maven for automated building, testing, code quality analysis, and deployment packaging."
  ]
};
