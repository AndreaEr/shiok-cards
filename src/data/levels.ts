export interface Level {
  id: string
  name: string
  cols: number
  rows: number
  pairs: number
  dishPool: string[]
  unlockStars: number
  starThresholds: [number, number, number]
}

export const levels: Level[] = [
  {
    id: "maxwell",
    name: "Maxwell Food Centre",
    cols: 3,
    rows: 2,
    pairs: 3,
    dishPool: ["chicken-rice", "kaya-toast", "kopi", "satay", "laksa", "ice-kachang"],
    unlockStars: 0,
    starThresholds: [5, 7, 12],
  },
  {
    id: "lau-pa-sat",
    name: "Lau Pa Sat",
    cols: 4,
    rows: 2,
    pairs: 4,
    dishPool: ["satay", "char-kway-teow", "hokkien-mee", "roti-prata", "nasi-lemak", "teh-tarik", "chilli-crab", "bak-kut-teh"],
    unlockStars: 2,
    starThresholds: [6, 9, 15],
  },
  {
    id: "old-airport-road",
    name: "Old Airport Road",
    cols: 4,
    rows: 3,
    pairs: 6,
    dishPool: ["mee-pok", "bak-chor-mee", "wonton-mee", "rojak", "popiah", "chai-tow-kway", "or-luak", "claypot-rice", "duck-rice", "goreng-pisang"],
    unlockStars: 5,
    starThresholds: [8, 12, 20],
  },
  {
    id: "chomp-chomp",
    name: "Chomp Chomp",
    cols: 4,
    rows: 4,
    pairs: 8,
    dishPool: ["satay", "hokkien-mee", "char-kway-teow", "sambal-stingray", "cereal-prawn", "black-pepper-crab", "or-luak", "goreng-pisang", "bandung", "milo-dinosaur", "ice-kachang", "you-tiao"],
    unlockStars: 9,
    starThresholds: [10, 15, 25],
  },
  {
    id: "tiong-bahru",
    name: "Tiong Bahru Market",
    cols: 5,
    rows: 4,
    pairs: 10,
    dishPool: ["chicken-rice", "nasi-lemak", "laksa", "mee-pok", "roti-prata", "kaya-toast", "chendol", "kueh-lapis", "popiah", "chai-tow-kway", "you-tiao", "kopi", "teh-tarik", "cai-fan"],
    unlockStars: 14,
    starThresholds: [12, 18, 30],
  },
  {
    id: "adam-road",
    name: "Adam Road Food Centre",
    cols: 6,
    rows: 4,
    pairs: 12,
    dishPool: ["nasi-briyani", "murtabak", "roti-prata", "vadai", "teh-tarik", "bandung", "nasi-lemak", "mee-siam", "mee-rebus", "rojak", "satay", "goreng-pisang", "ice-kachang", "chendol", "kopi"],
    unlockStars: 18,
    starThresholds: [14, 22, 36],
  },
  {
    id: "amoy-street",
    name: "Amoy Street Food Centre",
    cols: 6,
    rows: 5,
    pairs: 15,
    dishPool: ["chicken-rice", "duck-rice", "cai-fan", "claypot-rice", "bak-kut-teh", "sliced-fish-soup", "fish-head-curry", "hokkien-mee", "wonton-mee", "bak-chor-mee", "char-kway-teow", "laksa", "mee-pok", "chilli-crab", "kopi", "teh-tarik", "kaya-toast", "you-tiao"],
    unlockStars: 22,
    starThresholds: [17, 26, 42],
  },
  {
    id: "newton",
    name: "Newton Food Centre",
    cols: 6,
    rows: 6,
    pairs: 18,
    dishPool: ["chicken-rice", "nasi-lemak", "laksa", "char-kway-teow", "roti-prata", "satay", "kaya-toast", "chilli-crab", "ice-kachang", "kopi", "bak-kut-teh", "hokkien-mee", "mee-pok", "teh-tarik", "nasi-briyani", "black-pepper-crab", "sambal-stingray", "cereal-prawn", "milo-dinosaur", "chendol", "kueh-lapis", "or-luak"],
    unlockStars: 26,
    starThresholds: [20, 30, 50],
  },
]

export function getLevelById(id: string): Level | undefined {
  return levels.find((l) => l.id === id)
}
