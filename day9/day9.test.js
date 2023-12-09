const {equal, deepEqual} = require("assert");
const {getAllDiffLists, getNextDiffs, sumAllDiffs, getFormerDiffs, sumAllFormerDiffs} = require("./day9");
const {data} = require("./data")

describe('part 1', () => {
    const testData = [
        [0, 3, 6, 9, 12, 15],
        [1, 3, 6, 10, 15, 21],
        [10, 13, 16, 21, 30, 45]
    ]
    it('should find all rows', () => {
        const testData = [
            [0, 3, 6, 9, 12, 15],
            [1, 3, 6, 10, 15, 21],
            [10, 13, 16, 21, 30, 45]
        ]
        const firstDiffLists = getAllDiffLists(testData[0])
        equal(firstDiffLists.length, 3)

        const secondDiffLists = getAllDiffLists(testData[1])
        equal(secondDiffLists.length, 4)

        const thirdDiffLists = getAllDiffLists(testData[2])
        equal(thirdDiffLists.length, 5)
    })

    it('should add the next value', () => {
        const testData = [
            [0, 3, 6, 9, 12, 15],
            [1, 3, 6, 10, 15, 21],
            [10, 13, 16, 21, 30, 45]
        ]
        const allValues1 = getNextDiffs(testData[0])
        deepEqual(allValues1, [18, 3, 0])

        const allValues2 = getNextDiffs(testData[1])
        const allValues3 = getNextDiffs(testData[2])

        deepEqual(allValues2, [28, 7, 1, 0])
        deepEqual(allValues3, [68, 23, 8, 2, 0])
    })
    it('should sum the diffs', () => {
        const testData = [
            [0, 3, 6, 9, 12, 15],
            [1, 3, 6, 10, 15, 21],
            [10, 13, 16, 21, 30, 45]
        ]
        equal(sumAllDiffs(testData), 114)

        const clue = sumAllDiffs(data)
        equal(clue, 1974913025)
    })
})

describe('part 2', () => {
    it('should add the former value', () => {
        const allValues2 = getFormerDiffs([1, 3, 6, 10, 15, 21])
        deepEqual(allValues2, [0, 1, 1, 0])

        const allValues3 = getFormerDiffs([10, 13, 16, 21, 30, 45])
        deepEqual(allValues3, [5, 5, -2, 2, 0])

        const allValues1 = getFormerDiffs([0, 3, 6, 9, 12, 15])
        deepEqual(allValues1, [-3, 3, 0])
        const testData = [
            [0, 3, 6, 9, 12, 15],
            [1, 3, 6, 10, 15, 21],
            [10, 13, 16, 21, 30, 45]
        ]
        const sum = sumAllFormerDiffs(testData)
        equal(sum, 2)
        console.log(sum)
        const clue = sumAllFormerDiffs(data)
        equal(clue, 884)


    })
})