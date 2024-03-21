import mongoose from 'mongoose';

import { createUser } from '@services/auth';
import { createRestaurant } from '@services/restaurant';

const restaurants = [
  {
    name: 'Pizza Hut',
    description:
      'Pizza Hut is an American multinational pizza restaurant chain and international franchise founded in 1958 in Wichita, Kansas by Dan and Frank Carney. The chain, headquartered in Plano, Texas, operates 17,639 restaurants worldwide as of 2020. It is owned by Yum! Brands, Inc.',
    image: 'https://www.worldatlas.com/r/w1200/upload/c9/df/f9/shutterstock-1150633349.jpg',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: 'Panda Express',
    description:
      'Panda Express is an American fast food restaurant chain that specializes in American Chinese cuisine. With over 2,200 locations, it is the largest Asian-segment restaurant chain in the United States, where it was founded, and is mainly located in North America and Asia.',
    image:
      'https://c8.alamy.com/comp/2F1Y47N/panda-express-chinese-fast-food-restaurant-in-lilburn-metro-atlanta-georgia-usa-2F1Y47N.jpg',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: 'Boston Market',
    description:
      'Boston Market Corporation, known as Boston Chicken until 1995, is an American fast casual restaurant chain headquartered in Golden, Colorado. Since 2020, it has been owned by the Rohan Group. Boston Market has its greatest presence in the Northeastern and Midwestern United States, but also has a large presence in California, Florida, and Texas.',
    image:
      'https://c8.alamy.com/comp/2CBYW77/houston-texasusa-03252020-boston-market-main-entrance-in-houston-tx-fast-casual-restaurant-chain-serving-rotisserie-style-meals-since-1985-2CBYW77.jpg',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: "Bush's Chicken",
    description:
      "Bush's Chicken (stylized as Bush's Chicken!) is a fast food restaurant serving fried chicken. The company is headquartered in Waco, Texas and has over 75 franchise locations in Central, North, South, and West Texas. The chain serves fried chicken, fried okra, fries, mashed potatoes, corn nuggets, jalapeño poppers, yeast rolls and macaroni and cheese. Bush's Chicken also sells sweet and unsweet iced tea by the gallon jug.",
    image: 'https://www.foodwellsaid.com/wp-content/uploads/Bush%E2%80%99s-Chicken-Menu-Prices.jpg',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: "Dave's Hot Chicken",
    description:
      "Dave's Hot Chicken is an American fast casual restaurant chain specializing in Nashville-style hot chicken. Founded in Los Angeles, California with a single restaurant in 2017, the chain has expanded to over 100 locations in 4 countries in 2022. Dave's Hot Chicken is headquartered in Pasadena, California.",
    image: 'https://assets.biztimes.com/2021/03/IMG_7231.jpg',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: 'Zafferano',
    description:
      'Join us for breakfast beneath vaulted ceilings in Zafferano’s light-filled dining room, then return in the evening for artful plates of Central Italian specialities, best enjoyed on the terrace on a cool summer’s night.',
    image: 'https://resizer.otstatic.com/v2/photos/xlarge/2/42326275.webp',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: 'Sky Grill',
    description:
      "Immerse yourself in a world of culinary excellence at our fine dining Sky Grill Restaurant, boasting a breathtaking panoramic view. As you step into our elegant and sophisticated space, prepare to be captivated by the stunning vistas that unfold before your eyes. Our talented chefs create masterful dishes using the finest ingredients, ensuring a culinary journey that delights the senses. From the first bite to the last, every dish is a work of art, perfectly paired with an extensive selection of wines. Whether it's a romantic dinner for two or a gathering with friends, our restaurant promises an unforgettable dining experience that combines exquisite cuisine with a backdrop that is simply unparalleled.",
    image: 'https://resizer.otstatic.com/v2/photos/xlarge/2/53444260.webp',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: '360 Bar',
    description:
      "Experience the height of luxury and sophistication at our rooftop 360 revolving bar. Indulge in breathtaking panoramic views, sip on expertly crafted cocktails, and enjoy the vibrant atmosphere as the bar gently rotates, providing a unique and unforgettable experience. Whether you're celebrating a special occasion or simply seeking a memorable night out, our 360 Bar is the perfect destination for discerning guests looking for an elevated experience.",
    image: 'https://resizer.otstatic.com/v2/photos/xlarge/3/49093025.webp',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
  {
    name: 'Cilantro',
    description:
      'Dine on Middle Eastern and Mediterranean inspired cuisine in the colorful, cilantro. Azerbaijan was an historical crossroad between Europe, Asia and Africa, making it an important hub of food and recipe exchange. In cilantro, you can experience this intricate marriage of flavors from across the globe with subtly spiced fish and vegetable dishes, featuring local olives and chickpeas and honey-sweetened pastries, reminiscent of those from the Ottoman Empire. The energy and colors of the region are reflected throughout this all-day dining venue, through artwork, decorative screens and atmospheric pendant lights.',
    image: 'https://resizer.otstatic.com/v2/photos/xlarge/2/26334437.webp',
    startingHour: '10:00 AM',
    closingHour: '22:00 PM',
  },
];

const users = [
  {
    email: 'dan@gmail.com',
    firstName: 'Dan',
    lastName: 'Brown',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'yusuf@gmail.com',
    firstName: 'Yusuf',
    lastName: 'Travis',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'eleanor@gmail.com',
    firstName: 'Eleanor',
    lastName: 'Rogers',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'teagan@gmail.com',
    firstName: 'Teagan',
    lastName: 'Green',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'kamari@gmail.com',
    firstName: 'Kamari',
    lastName: 'Henderson',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'vanessa@gmail.com',
    firstName: 'Vanessa',
    lastName: 'Randolph',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'tori@gmail.com',
    firstName: 'Tori',
    lastName: 'Kelley',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'haylee@gmail.com',
    firstName: 'Haylee',
    lastName: 'Villanueva',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
  {
    email: 'alisson@gmail.com',
    firstName: 'Alisson',
    lastName: 'Schmitt',
    password: 'qwerty123456',
    isRestaurantOwner: true,
    restaurant: {
      id: '',
      name: '',
    },
  },
];

mongoose
  .connect('mongodb://localhost:27017/restaurant-reservation')
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log('connected to db!');
  });

const populateRestaurantOwnerUsers = async () => {
  for (let i = 0; i < restaurants.length; i++) {
    const createdRestaurant = await createRestaurant(restaurants[i]);

    if (createRestaurant) {
      users[i].restaurant.id = createdRestaurant._id.toString();
      users[i].restaurant.name = createdRestaurant.name;
      await createUser(users[i]);
    }
  }

  mongoose.disconnect();
};

populateRestaurantOwnerUsers();
