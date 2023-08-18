export const lostItemsQuery = `*[ _type == 'lostItem']{ 
    _id,
    category,
    contact,
    description,
    title,
    image,
    location,
    date,
    _type
}`;
export const foundItemsQuery = `*[ _type == 'foundItem']{ 
    _id,
    category,
    contact,
    description,
    title,
    image,
    location,
    date
}`;
export const lostItemQuery =(id)=>{
  const query = `*[ _type == 'lostItem' && _id == '${id}']`
  return query
}
export const foundItemQuery =(id)=>{
  const query = `*[ _type == 'foundItem' && _id == '${id}']`
  return query
}
export const lostItemQueryWithFilters =(sortBy)=>{
  const query = `*[ _type == 'lostItem' ] | order(date ${sortBy}) `
  return query
}

 

export const regions = [
  "Ayeyarwady",
  "Bago",
  "Chin",
  "Kachin",
  "Kayah",
  "Kayin",
  "Magway",
  "Mandalay",
  "Mon",
  "Rakhine",
  "Sagaing",
  "Shan",
  "Tanintharyi",
  "Yangon",
];
export const lostItemCategories = [
  'Electronics',
  'Jewelry',
  'Clothing',
  'Accessories',
  'Documents',
  'Keys',
  'Wallet',
  'Bag',
  'Eyewear',
  'Books',
  'Toys',
  'Sports Equipment',
  'Tools',
  'Musical Instruments',
  'Luggage',
  'Artwork',
  'Mobile Devices',
  'Stationery',
  'Pets',
  'Medications',
  'Umbrella',
  'Footwear',
  'Cosmetics',
  'Glasses',
  'Cameras',
  'Other'
  // Add more categories here
];
export const socials = [
  {
    name: 'twitter',
    url: '/twitter.svg',
  },
  {
    name: 'linkedin',
    url: '/linkedin.svg',
  },
  {
    name: 'instagram',
    url: '/instagram.svg',
  },
  {
    name: 'facebook',
    url: '/facebook.svg',
  },
];

