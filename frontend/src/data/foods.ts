

// 더미 데이터 (추후에 DB 연동 예정)
export const restaurants = [
  { id: '1', name: '바비든든' },
  { id: '2', name: '값찌개' },
  { id: '3', name: '키친101' },
  { id: '4', name: '51장국밥' },
  { id: '5', name: '중식대장'},
  { id: '6', name: '경성카츠'},
  { id: '7', name: '폭풍분식'}
];

export const foods = [
  {
    id: 'f1',
    restaurantId: '1',
    name: '참치마요 덮밥',
    price: 3500,
    img: require('../assets/image1.png'),
  },
  {
    id: 'f2',
    restaurantId: '1',
    name: '치킨데리야끼 덮밥',
    price: 3500,
    img: require('../assets/image2.png'),
  },
  {
    id: 'f3',
    name: '불쭈꾸미 덮밥',
    restaurantId: '1',
    price: 3500,
    img: require('../assets/image3.png'),
  },
  {
    id: 'f4',
    name: '우삼겹 덮밥',
    restaurantId: '1',
    price: 3500,
    img: require('../assets/image4.png'),
  },
  {
    id: 'f5',
    restaurantId: '2',
    name: '우삼겹 된장찌개',
    price: 6500,
    img: require('../assets/image5.png'),
  },
  {
    id: 'f8',
    restaurantId: '2',
    name: '순두부찌개',
    price: 5500,
    img: require('../assets/image6.png'),
  },
  {
    id: 'f9',
    name: '돼지 김치찌개',
    restaurantId: '2',
    price: 6500,
    img: require('../assets/image7.png'),
  },
  {
    id: 'f10',
    name: '참치 김치찌개',
    restaurantId: '2',
    price: 6000,
    img: require('../assets/image8.png'),
  },
  {
    id: 'f11',
    name: '부대 김치찌개',
    restaurantId: '2',
    price: 6500,
    img: require('../assets/image9.png'),
  },
];
