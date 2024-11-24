export const orders = [
  {
    buyerData: {
      name: 'John Doe',
      address: '123 Water St',
      email: 'johndoe@example.com',
    },
    cart: [
      {
        id: 1,
        category: 'agua',
        description: 'Un Pokémon tipo agua conocido por su energía.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        price: 10.99,
        title: 'Squirtle',
        rating: {
          rate: 4.5,
          count: 150,
        },
        qty: 2,
      },
      {
        id: 5,
        category: 'fuego',
        description: 'Pokémon tipo fuego con una llama en su cola.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        price: 11.99,
        title: 'Charmander',
        rating: {
          rate: 4.6,
          count: 200,
        },
        qty: 1,
      },
    ],
    totalPrice: 33.97,
  },
  {
    buyerData: {
      name: 'Jane Smith',
      address: '456 Plant Ave',
      email: 'janesmith@example.com',
    },
    cart: [
      {
        id: 9,
        category: 'planta',
        description: 'Pokémon de planta con una semilla en su espalda.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        price: 10.99,
        title: 'Bulbasaur',
        rating: {
          rate: 4.7,
          count: 180,
        },
        qty: 1,
      },
      {
        id: 14,
        category: 'fuego',
        description: 'Pokémon de fuego que brilla en la oscuridad.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png',
        price: 12.99,
        title: 'Flareon',
        rating: {
          rate: 4.5,
          count: 140,
        },
        qty: 2,
      },
    ],
    totalPrice: 36.97,
  },
  {
    buyerData: {
      name: 'Alice Johnson',
      address: '789 Fire Rd',
      email: 'alicej@example.com',
    },
    cart: [
      {
        id: 7,
        category: 'fuego',
        description: 'Pokémon de fuego con habilidades de vuelo.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        price: 17.99,
        title: 'Charizard',
        rating: {
          rate: 5.0,
          count: 70,
        },
        qty: 1,
      },
      {
        id: 16,
        category: 'agua',
        description: 'Pokémon acuático con una melena majestuosa.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
        price: 19.99,
        title: 'Lapras',
        rating: {
          rate: 4.9,
          count: 80,
        },
        qty: 1,
      },
    ],
    totalPrice: 37.98,
  },
  {
    buyerData: {
      name: 'Michael Brown',
      address: '101 Psychic Ln',
      email: 'michaelb@example.com',
    },
    cart: [
      {
        id: 19,
        category: 'agua',
        description: 'Pokémon de agua con habilidades psíquicas.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png',
        price: 15.99,
        title: 'Golduck',
        rating: {
          rate: 4.7,
          count: 100,
        },
        qty: 2,
      },
    ],
    totalPrice: 31.98,
  },
  {
    buyerData: {
      name: 'Emma White',
      address: '202 Grass Way',
      email: 'emmaw@example.com',
    },
    cart: [
      {
        id: 12,
        category: 'planta',
        description: 'Un Pokémon tipo planta de hojas afiladas.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png',
        price: 9.99,
        title: 'Oddish',
        rating: {
          rate: 4.2,
          count: 130,
        },
        qty: 1,
      },
      {
        id: 18,
        category: 'planta',
        description: 'Pokémon planta que genera veneno.',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png',
        price: 10.99,
        title: 'Weepinbell',
        rating: {
          rate: 4.3,
          count: 120,
        },
        qty: 1,
      },
    ],
    totalPrice: 20.98,
  },
];
