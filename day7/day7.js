const {sortDesc} = require("../day5/day5")

/**
 * {card:[label:string, weight:number]}
 * {[card[],handType:string]} hand
 *
 */


/**
 *
 * @type {string}
 */
const cardLabels = '23456789TJQKA'

const cardLabelsList = () => Array.from(cardLabels);

/**
 *
 * @return {[label:string, weight:number][]}
 */
const allCards = () => cardLabelsList().map((label, i) => [label, i + 1])

const getLabels = hand => Array.from(hand);

/**
 *
 * @param {string} hand
 * @return string
 */
const getHandAsWeight = (hand) => {
    const labels = getLabels(hand)
    const weights = labels.map(l => {
        const index = cardLabels.indexOf(l) + 1
        return (index < 10) ? '0' + index : '' + index
    })
    return weights.join('')
}

const occurrences = (handAsString, card) => Number(handAsString.split(card).length - 1)
const allOccurrences = (hand) => {
    const handAsString = hand.join('')
    return hand.map(c => occurrences(handAsString, c))
}
const maxOccurrence = (hand) => allOccurrences(hand).sort(sortDesc)[0]

const numberOfPairs = hand => allOccurrences(hand).filter(o => o === 2).length / 2

const isFullHouse = hand => allOccurrences(hand).filter(v => v === 2 || v === 3).length === 5

/**
 *
 * @param {string} hand
 * @return {number}
 */
const getHandType = (hand) => {
    const handAsCards = Array.from(hand)
    const nrSameCards = maxOccurrence(handAsCards)

    if (nrSameCards === 5) return 7
    if (nrSameCards === 4) return 6
    if (isFullHouse(handAsCards)) return 5
    if (nrSameCards === 3) return 4
    if (numberOfPairs(handAsCards) === 2) return 3
    if (numberOfPairs(handAsCards) === 1) return 2
    return 1

}

const sortHands = (hands) => {
    return hands.map(h => {
        return {bid: h.bid, hand: h.hand, handType: getHandType(h.hand)}
    }).sort((h1, h2) => {
        const diff = h1.handType - h2.handType;
        if (diff !== 0) return diff

        return getHandAsWeight(h1.hand) - getHandAsWeight(h2.hand)
    })
}

const totalWinnings = (hands) => sortHands(hands)
    .map((h, i) => h.bid * (i + 1))
    .reduce((acc, value) => acc + value, 0)


module.exports = {
    allCards,
    getHandAsWeight,
    getHandType,
    sortHands,
    totalWinnings
}