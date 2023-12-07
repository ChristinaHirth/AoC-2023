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
const cardLabels2 = 'J23456789TQKA'
const joker = 'J';

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
 * @param withJoker
 * @return string
 */
const getHandAsWeight = (hand, withJoker = false) => {
    const labels = getLabels(hand)
    const weights = labels.map(l => {
        const index = (withJoker ? cardLabels2 : cardLabels).indexOf(l) + 1
        return (index < 10) ? '0' + index : '' + index
    })
    return weights.join('')
}

const occurrences = (handAsString, card) => {
    // console.log(handAsString)
    return Number(handAsString.split(card).length - 1);
}
const allOccurrences = (cards) => {
    const handAsString = cards.join('')
    return cards.map(c => occurrences(handAsString, c))
}
const maxOccurrence = (hand) => allOccurrences(hand).sort(sortDesc)[0]

const numberOfPairs = hand => allOccurrences(hand).filter(o => o === 2).length / 2

const isFullHouse = hand => allOccurrences(hand).filter(v => v === 2 || v === 3).length === 5

const isFullHouseWithJoker = (cards, nrOfJoker) => {
    const differentCards = cards.filter((value, index, self) => self.indexOf(value) === index)
    return differentCards.length === 2 && nrOfJoker === 1;
}

const nrOfPairsWithJoker = (cards, nrOfJoker) => {
    const differentCards = cards.filter((value, index, self) => self.indexOf(value) === index)
    if ((differentCards.length + nrOfJoker) === 5) return onePair
    if ((differentCards.length + nrOfJoker) === 4) return twoPairs
    return 1
}
const fiveAKind = 7
const fourAKind = 6
const fullHouse = 5
const threeAKind = 4
const twoPairs = 3
const onePair = 2

/**
 *
 * @param {string} hand
 * @return {number}
 */
const getHandType = (hand) => {
    const handAsCards = Array.from(hand)
    const nrSameCards = maxOccurrence(handAsCards)

    if (nrSameCards === 5) return fiveAKind
    if (nrSameCards === 4) return fourAKind // four
    if (isFullHouse(handAsCards)) return fullHouse //full house
    if (nrSameCards === 3) return threeAKind // three
    if (numberOfPairs(handAsCards) === 2) return twoPairs //two pairs
    if (numberOfPairs(handAsCards) === 1) return onePair //one pair
    return 1
}

const getHandType2 = hand => {
    const nrJokers = occurrences(hand, joker)
    if (nrJokers === 0) return getHandType(hand)

    if (nrJokers > 3) return fiveAKind
    const regex = new RegExp(joker, 'g')
    const handWithoutJoker = hand.replace(regex, '')
    const cardsButJoker = Array.from(handWithoutJoker);
    const nrSameCards = maxOccurrence(cardsButJoker)
    if (nrSameCards + nrJokers === 5) return fiveAKind
    if (nrSameCards + nrJokers === 4) return fourAKind
    if (isFullHouseWithJoker(cardsButJoker, nrJokers)) return fullHouse
    if (nrSameCards + nrJokers === 3) return threeAKind // three
    return nrOfPairsWithJoker(cardsButJoker, nrJokers)
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
const sortHands2 = (hands) => {
    return hands.map(h => {
        return {bid: h.bid, hand: h.hand, handType: getHandType2(h.hand)}
    }).sort((h1, h2) => {
        const diff = h1.handType - h2.handType;
        if (diff !== 0) return diff

        return getHandAsWeight(h1.hand, true) - getHandAsWeight(h2.hand, true)
    })
}

const totalWinnings = (hands) => sortHands(hands)
    .map((h, i) => h.bid * (i + 1))
    .reduce((acc, value) => acc + value, 0)

const totalWinnings2 = (hands) => sortHands2(hands)
    .map((h, i) => h.bid * (i + 1))
    .reduce((acc, value) => acc + value, 0)


module.exports = {
    allCards,
    getHandAsWeight,
    getHandType,
    sortHands,
    totalWinnings,
    getHandType2,
    sortHands2,
    totalWinnings2,
    fiveAKind, fourAKind, fullHouse, threeAKind, twoPairs, onePair
}