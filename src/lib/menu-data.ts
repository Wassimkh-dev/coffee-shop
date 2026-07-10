export type MenuItem = {
  name: string;
  price: number;
  description?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  /** Serving note shown under the category heading. */
  note?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "cold-beverages",
    title: "Cold Beverages",
    items: [
      { name: "Minted Lemonade", price: 4.0 },
      { name: "Oreo shake", price: 5.0 },
      { name: "Lotus shake", price: 5.0 },
      { name: "Strawberry shake", price: 5.0 },
      { name: "Chocolate shake", price: 5.0 },
      { name: "Iced tea passion fruit", price: 3.0 },
      { name: "Iced tea peach", price: 3.0 },
      { name: "Lemonade", price: 3.0 },
      { name: "Orange juice", price: 3.0 },
    ],
  },
  {
    id: "hot-drinks",
    title: "Hot Drinks",
    items: [
      { name: "Ginger and honey", price: 3.0 },
      { name: "Tea", price: 2.0 },
      { name: "Green Tea", price: 2.0 },
      { name: "Zhourat", price: 2.0 },
      { name: "Yansoon", price: 2.0 },
      {
        name: "Matte",
        price: 10.0,
        description: "Matte tray includes bizir, bzurat and crackers",
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    items: [
      { name: "Espresso", price: 1.5 },
      { name: "Spanish Latte", price: 4.0 },
      { name: "Caramel Latte", price: 4.0 },
      { name: "Salted Caramel Latte", price: 5.0 },
      { name: "Vanilla Latte", price: 4.0 },
      { name: "Americano", price: 2.5 },
      { name: "Nescafe", price: 3.0 },
      { name: "Turkish coffee", price: 2.0 },
      { name: "Hot Chocolate", price: 4.0 },
      { name: "Cappuccino", price: 3.0 },
    ],
  },
  {
    id: "iced-coffee",
    title: "Iced Coffee",
    items: [
      { name: "Iced Spanish Latte", price: 4.0 },
      { name: "Iced Caramel Latte", price: 4.0 },
      { name: "Iced Salted Caramel Latte", price: 5.0 },
      { name: "Iced Americano", price: 2.5 },
      { name: "Iced Vanilla Latte", price: 4.0 },
    ],
  },
  {
    id: "starters",
    title: "Starters",
    items: [
      { name: "Fries with cheddar", price: 6.0 },
      { name: "Fries", price: 4.0 },
      { name: "Garlic bread", price: 4.0 },
      {
        name: "Mozzarella sticks",
        price: 6.0,
        description: "4 mozzarella sticks with ketchup dip",
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      { name: "Popcorn", price: 2.0 },
      { name: "Crackers", price: 2.0 },
      { name: "Bzurat", price: 2.0 },
      { name: "Carrots", price: 1.5 },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      { name: "Caesar salad", price: 6.0 },
      { name: "Chicken Caesar salad", price: 8.0 },
      { name: "Greek salad", price: 6.0 },
      { name: "Coleslaw salad", price: 4.0 },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    items: [
      {
        name: "The double melt",
        price: 10.0,
        description: "2 beef patties, 2 cheddar patties, barbecue sauce",
      },
      {
        name: "Grilled Chicken",
        price: 7.0,
        description: "150g chicken breast, iceberg, garlic mayo, mustard",
      },
      {
        name: "Sweet Heat",
        price: 9.0,
        description: "150g beef patty, caramelized onion, rocca, barbecue sauce",
      },
      {
        name: "Lebanese burger",
        price: 6.0,
        description: "150g beef patty, coleslaw, fries, ketchup",
      },
      {
        name: "American Classic burger",
        price: 6.0,
        description: "150g beef patty, grilled tomato, grilled onion, barbeque sauce",
      },
      {
        name: "Special burger",
        price: 7.0,
        description:
          "Fried crunchy chicken, turkey, lettuce, barbeque sauce, honey mustard, cheddar",
      },
      {
        name: "Mushroom burger",
        price: 8.0,
        description: "Grilled beef patty, mushroom, onion, fresh cream, lettuce, barbeque",
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    items: [
      { name: "Crispy sandwich", price: 7.0 },
      {
        name: "Chicken sub",
        price: 6.0,
        description: "Grilled chicken, lettuce, corn, mozzarella, with mayo sauce",
      },
      {
        name: "Chicken mushroom",
        price: 8.0,
        description:
          "Grilled chicken, mushroom, onion, mozzarella, lettuce, fresh cream and mayo sauce",
      },
    ],
  },
  {
    id: "cold-sandwiches",
    title: "Cold Sandwiches",
    items: [
      { name: "Halloumi pesto", price: 4.0 },
      { name: "Turkey and cheese", price: 5.0 },
      { name: "Chicken avocado", price: 6.0 },
      { name: "Chicken Caesar", price: 6.0 },
    ],
  },
  {
    id: "platters",
    title: "Platters",
    items: [
      {
        name: "Chicken breast",
        price: 11.0,
        description: "250g grilled chicken breast, fries, salad",
      },
      {
        name: "Healthy chicken breast",
        price: 12.0,
        description: "250g grilled chicken breast, grilled potato, greek salad",
      },
      {
        name: "Chicken mushroom plate",
        price: 13.5,
        description: "250g chicken breast, mushroom sauce, fries, caesar salad",
      },
      {
        name: "Crispy chicken",
        price: 10.0,
        description:
          "5 pieces of crispy chicken, fries, coleslaw, served with barbecue sauce",
      },
    ],
  },
  {
    id: "saj",
    title: "Saj",
    items: [
      { name: "Cheese", price: 3.5 },
      { name: "Turkey and cheese", price: 4.5 },
      { name: "Zaatar", price: 2.0 },
      { name: "Zaatar and cheese", price: 3.0 },
      { name: "Kishk", price: 2.5 },
      { name: "Kishk and cheese", price: 3.0 },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    items: [
      { name: "Croissant", price: 4.0 },
      { name: "Chocolate eclair", price: 3.0 },
      { name: "Pistachio eclair", price: 3.0 },
      { name: "Cookies", price: 4.0 },
      { name: "Cheese cake", price: 5.0 },
      { name: "Lotus cheesecake", price: 5.0 },
      { name: "Strawberry cheesecake", price: 5.0 },
      { name: "House signature cheesecake", price: 6.0 },
      { name: "Dubai chocolate cake", price: 5.0 },
      { name: "Ice-cream 3 flavors", price: 4.5 },
    ],
  },
  {
    id: "crepes",
    title: "Crepes",
    note: "All crepes are served with a scoop of ice cream.",
    items: [
      { name: "Nutella", price: 6.0 },
      { name: "Lotus", price: 6.0 },
      { name: "Nutella with Lotus", price: 7.0 },
      { name: "Nutella with Oreo", price: 7.0 },
      { name: "Nutella with Pistachio", price: 8.0 },
    ],
  },
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    items: [
      { name: "Sparkling water", price: 1.5 },
      { name: "Pepsi", price: 1.5 },
      { name: "Seven-up", price: 1.5 },
      { name: "Mirinda", price: 1.5 },
      { name: "Dark blue", price: 2.0 },
      { name: "Almaza beer", price: 4.0 },
      { name: "Almaza Mexican beer", price: 6.0 },
      { name: "Big water", price: 2.5 },
      { name: "Small water", price: 1.0 },
    ],
  },
  {
    id: "shisha",
    title: "Shisha",
    items: [
      { name: "Apple", price: 7.0 },
      { name: "Lemon and mint", price: 7.0 },
      { name: "Grapes", price: 7.0 },
      { name: "Ras argili", price: 3.0 },
    ],
  },
];
