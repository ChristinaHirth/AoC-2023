const {equal, deepEqual} = require("assert");

const data = require("./data.json")
const {getValues, mapDirections} = require("./day8");
const testData = {
    directions: data.testDirections,
    values: data.testValues
}

describe('part 1', () => {
    it('should parse directions and values', () => {
        equal(testData.directions, "LLR")
        deepEqual([...getValues(testData).keys()], ["AAA", "BBB", "ZZZ"])
        deepEqual(getValues(testData).get('AAA'), ["BBB", "BBB"])
    })
    it('should find the target in 6 steps', () => {

        const steps = mapDirections(testData)
        equal(steps.length, 6)

        const steps2 = mapDirections({values: data.testVal2, directions: data.testDir2})
        equal(steps2.length, 2)

        const clue = mapDirections(data)
        equal(clue.length, 17141) // 610, to low
    })
})