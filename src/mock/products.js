const pokemons = [
  // Agua
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
  },
  {
    id: 2,
    category: 'agua',
    description: 'Un Pokémon tipo agua con una fuerte concha.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
    price: 12.99,
    title: 'Wartortle',
    rating: {
      rate: 4.7,
      count: 100,
    },
  },
  {
    id: 3,
    category: 'agua',
    description: 'Pokémon de tipo agua con potentes cañones.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
    price: 15.99,
    title: 'Blastoise',
    rating: {
      rate: 4.9,
      count: 80,
    },
  },
  {
    id: 4,
    category: 'agua',
    description: 'Un Pokémon de tipo agua que vive en los océanos.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png',
    price: 9.99,
    title: 'Psyduck',
    rating: {
      rate: 4.3,
      count: 120,
    },
  },
  // Fuego
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
  },
  {
    id: 6,
    category: 'fuego',
    description: 'Un Pokémon de fuego con grandes garras.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    price: 13.99,
    title: 'Charmeleon',
    rating: {
      rate: 4.8,
      count: 90,
    },
  },
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
  },
  {
    id: 8,
    category: 'fuego',
    description: 'Un Pokémon de fuego rápido y ágil.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',
    price: 10.99,
    title: 'Vulpix',
    rating: {
      rate: 4.4,
      count: 140,
    },
  },
  // Planta
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
  },
  {
    id: 10,
    category: 'planta',
    description: 'Pokémon de planta con una flor en crecimiento.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    price: 13.99,
    title: 'Ivysaur',
    rating: {
      rate: 4.8,
      count: 100,
    },
  },
  {
    id: 11,
    category: 'planta',
    description: 'Pokémon planta con un gran árbol en su espalda.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    price: 18.99,
    title: 'Venusaur',
    rating: {
      rate: 5.0,
      count: 60,
    },
  },
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
  },
  // Otros
  {
    id: 13,
    category: 'agua',
    description: 'Un Pokémon de agua muy veloz.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png',
    price: 14.99,
    title: 'Starmie',
    rating: {
      rate: 4.6,
      count: 110,
    },
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
  },
  {
    id: 15,
    category: 'planta',
    description: 'Pokémon de planta con poderes curativos.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png',
    price: 11.99,
    title: 'Chikorita',
    rating: {
      rate: 4.4,
      count: 150,
    },
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
  },
  {
    id: 17,
    category: 'fuego',
    description: 'Pokémon de fuego que es también eléctrico.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png',
    price: 14.99,
    title: 'Magmar',
    rating: {
      rate: 4.5,
      count: 90,
    },
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
  },
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
  },
  {
    id: 20,
    category: 'fuego',
    description: 'Un Pokémon de fuego conocido por su lealtad.',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png',
    price: 10.99,
    title: 'Growlithe',
    rating: {
      rate: 4.6,
      count: 150,
    },
  },
];

export default pokemons;
