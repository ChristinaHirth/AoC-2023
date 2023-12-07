const assert = require('assert');
const {allCards, getHandAsWeight, getHandType, sortHands, totalWinnings} = require("./day7");
const input = require('./input')

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
        const hands = [
            {hand: '32T3K', bid: 765},
            {hand: 'T55J5', bid: 684},
            {hand: 'KK677', bid: 28},
            {hand: 'KTJJT', bid: 220},
            {hand: 'QQQJA', bid: 483},

        ]
        const sorted = sortHands(hands)
        assert.deepEqual(sorted, [
            {hand: '32T3K', handType: 2, bid: 765},
            {hand: 'KTJJT', handType: 3, bid: 220},
            {hand: 'KK677', handType: 3, bid: 28},
            {hand: 'T55J5', handType: 4, bid: 684},
            {hand: 'QQQJA', handType: 4, bid: 483}])

        assert.equal(totalWinnings(hands), 6440)


        const clue = totalWinnings(input)
        assert.equal(clue, 255048101)
    })
})