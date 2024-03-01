const mbti = {
  INFP: "INFP",
  INFJ: "INFJ",
  ENFP: "ENFP",
  ENFJ: "ENFJ",
  INTJ: "INTJ",
  INTP: "INTP",
  ENTP: "ENTP",
  ENTJ: "ENTJ",
  ISFP: "ISFP",
  ISFJ: "ISFJ",
  ESFP: "ESFP",
  ESFJ: "ESFJ",
  ISTP: "ISTP",
  ISTJ: "ISTJ",
  ESTP: "ESTP",
  ESTJ: "ESTJ"
}

const enneagram = {
  OneW2: "1w2",
  TwoW3: "2w3",
  ThreeW2: "3w2",
  ThreeW4: "3w4",
  FourW3: "4w3",
  FourW5: "4w5",
  FiveW4: "5w4",
  FiveW6: "5w6",
  SixW5: "6w5",
  SixW7: "6w7",
  SevenW6: "7w6",
  SevenW8: "7w8",
  EightW7: "8w7",
  EightW9: "8w9",
  NineW8: "9w8",
  NineW1: "9w1",
}

const zodiac = {
  Aries: "Aries",
  Taurus: "Taurus",
  Gemini: "Gemini",
  Cancer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Scorpio",
  Sagittarius: "Sagittarius",
  Capricorn: "Capricorn",
  Aquarius: "Aquarius",
  Pisces: "Pisces",
}

const sortValue = {
  BEST: 'best',
  RECENT: 'recent',
}

const filterField = {
  MBTI: 'mbti',
  ENNEAGRAM: 'enneagram',
  ZODIAC: 'zodiac',
  NONE: 'none'
}

module.exports = {
  mbti,
  enneagram,
  zodiac,
  sortValue,
  filterField,
}
