export const initialState = {
  plants: {
    data: [
      {
        id: 1,
        polishName: 'Hortensja bukietowa',
        latinName: '',
        type: 'Vanille Fraise Renhy',
        content: '',
        size: '2m',
        floweringDate: 'VII, VIII, IX, X',
        conditions: '',
        cutting: '',
        fertilizing: '',
        photo: '/images/20200826_122049.jpg',
        price: 40,
      },
      {
        id: 2,
        polishName: 'Hibiskus',
        latinName: 'Hibiskus syriacus',
        type: '',
        content: '',
        size: '1,5-2m',
        floweringDate: 'VII, VIII, IX',
        conditions: 'słońce, półcień',
        cutting: '',
        fertilizing: '',
        photo: '/images/20200826_121659.jpg',
        price: 40,

      },

    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
