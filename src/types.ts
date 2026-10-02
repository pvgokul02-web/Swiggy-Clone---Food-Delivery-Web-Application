export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  title: string;
  required: boolean;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  rating?: number;
  ratingCount?: number;
  category: string;
  customizable?: boolean;
  optionGroups?: MenuItemOptionGroup[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  ratingCount: string;
  deliveryTimeMinutes: number;
  costForTwo: number;
  location: string;
  distanceKm: number;
  isVeg: boolean;
  discountHeader?: string;
  discountSubheader?: string;
  isPromoted?: boolean;
  items: MenuItem[];
}

export interface SelectedOption {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
  itemTotalPrice: number;
}

export interface Address {
  id: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  title: string;
  addressLine1: string;
  addressLine2: string;
  landmark?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
  description: string;
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'DISPATCHED' | 'DELIVERED';

export interface Order {
  id: string;
  restaurant: Restaurant;
  items: CartItem[];
  itemTotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  platformFee: number;
  taxes: number;
  tip: number;
  grandTotal: number;
  address: Address;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  driverVehicle: string;
}

export interface CuisineCategory {
  id: string;
  name: string;
  image: string;
}

export type ActiveTab = 'food' | 'instamart' | 'dineout' | 'search' | 'orders' | 'resume';
