export const matchEncouragements = [
  "Wah steady lah!",
  "Power sia!",
  "Confirm plus chop!",
  "Swee lah!",
  "Not bad not bad!",
  "Solid leh!",
  "Can one!",
  "Walao eh, pro!",
]

export const completionEncouragements = [
  "Shiok ah! All matched!",
  "Wah you damn zai sia!",
  "GG well played!",
  "Alamak, too easy for you!",
  "Bojio! Share this game lah!",
  "Your memory power one leh!",
  "Huat ah!",
]

export const streakEncouragements = [
  "On fire sia! {n}-day streak!",
  "Everyday come makan — steady!",
  "Wah, consistent leh! {n} days!",
]

export function getRandomEncouragement(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)]
}
