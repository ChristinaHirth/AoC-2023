const assert = require('assert');
const {
    allCards,
    getHandAsWeight,
    getHandType,
    sortHands,
    totalWinnings,
    getHandType2,
    sortHands2,
    totalWinnings2, fullHouse, fourAKind, threeAKind, onePair, fiveAKind
} = require("./day7");
const input = require('./input')

const newInput = [
    {hand: '2345A', bid: 1}, {hand: 'Q2KJJ', bid: 13}, {hand: 'Q2Q2Q', bid: 19},
    {hand: 'T3T3J', bid: 17}, {hand: 'T3Q33', bid: 11}, {hand: '2345J', bid: 3},
    {hand: 'J345A', bid: 2}, {hand: '32T3K', bid: 5}, {hand: 'T55J5', bid: 29},
    {hand: 'KK677', bid: 7}, {hand: 'KTJJT', bid: 34}, {hand: 'QQQJA', bid: 31},
    {hand: 'JJJJJ', bid: 37},
    {hand: 'JAAAA', bid: 43}, {hand: 'AAAAJ', bid: 59}, {hand: 'AAAAA', bid: 61},
    {hand: '2AAAA', bid: 23}, {hand: '2JJJJ', bid: 53}, {hand: 'JJJJ2', bid: 41}]
const hands = [
    {hand: '32T3K', bid: 765},
    {hand: 'T55J5', bid: 684},
    {hand: 'KK677', bid: 28},
    {hand: 'KTJJT', bid: 220},
    {hand: 'QQQJA', bid: 483},

]
describe('Part 1', () => {
    it('should determine all cards with weight', () => {
        const cards = allCards()

        assert.equal(cards.length, 13)
        assert.deepEqual(cards[0], ['2', 1])
        assert.deepEqual(cards[12], ['A', 13])
    })

    it('should calculate the properties of a hand', () => {

        const handAsWeight = getHandAsWeight('22222')
        assert.equal(handAsWeight, '0101010101')

        const handType = getHandType('22222')
        assert.equal(handType, 7)
        assert.equal(getHandType('22322'), 6)
        assert.equal(getHandType('QQQTT'), 5)
        assert.equal(getHandType('AAA12'), 4)
        assert.equal(getHandType('34355'), 3)
    })

    it('should sort hands and get the total winnings', () => {

        const sorted = sortHands(hands)
        assert.deepEqual(sorted, [
            {hand: '32T3K', handType: 2, bid: 765},
            {hand: 'KTJJT', handType: 3, bid: 220},
            {hand: 'KK677', handType: 3, bid: 28},
            {hand: 'T55J5', handType: 4, bid: 684},
            {hand: 'QQQJA', handType: 4, bid: 483}])

        assert.equal(totalWinnings(hands), 6440)

        assert.equal(totalWinnings(newInput), 6592)

        //const clue = totalWinnings(input)

        //assert.equal(clue, 255048101)
    })
})

describe('part 2', () => {
    it('should use jokers', () => {
        assert.equal(getHandType2('QQJAA'), fullHouse)
        assert.equal(getHandType2('QJJJA'), fourAKind)
        assert.equal(getHandType2('KTJJT'), fourAKind)
        assert.equal(getHandType2('Q2KJJ'), threeAKind)
        assert.equal(getHandType2('T3T3J'), fullHouse)
        assert.equal(getHandType2('7J78J'), fourAKind)
        assert.equal(getHandType2('2345J'), onePair)
        assert.equal(getHandType2('J345A'), onePair)
        assert.equal(getHandType2('T55J5'), fourAKind)
        assert.equal(getHandType2('QQQJA'), fourAKind)
        assert.equal(getHandType2('JJJJ2'), fiveAKind)
        assert.equal(getHandType2('JAAAA'), fiveAKind)


        assert.deepEqual(sortHands2(hands), [
            {hand: '32T3K', handType: 2, bid: 765},
            {hand: 'KK677', handType: 3, bid: 28},
            {hand: 'T55J5', handType: 6, bid: 684},
            {hand: 'QQQJA', handType: 6, bid: 483},
            {hand: 'KTJJT', handType: 6, bid: 220}]
        )

        assert.equal(totalWinnings2(hands), 5905)

        const clue = totalWinnings2(newInput)
        assert.equal(clue, 6839)

        const cluePart2 = totalWinnings2(input)
        assert.equal(cluePart2, 253718286)

    })
})