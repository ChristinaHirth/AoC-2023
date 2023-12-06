const assert = require('assert');
const {calculateDistances, allOptions} = require("./day6");

const testTimeDistance = [[7, 9], [15, 40], [30, 200]]
const clueTimeDistance = [[47, 400], [98, 1213], [66, 1011], [98, 1540]]

describe('Calculation of options', () => {
    it('should find 4 options to beat the record of 9 meters in 7ms', () => {
        const records = calculateDistances(...testTimeDistance[0])
        assert.equal(records.length, 4)
    });
    it('should find 8 resp. 9 options to beat the record of 40, resp 200 meters', () => {
        const records = calculateDistances(...testTimeDistance[1])
        assert.equal(records.length, 8)
        const records2 = calculateDistances(...testTimeDistance[2])
        assert.equal(records2.length, 9)
    });

    it('should find 288 test options', () => {
        assert.equal(allOptions(testTimeDistance), 288)
    })

    it('should find all clue options', () => {
        const res = allOptions(clueTimeDistance)
        assert.equal(res, 1660968)
    })

    it('should find the options for 71530 ms', () => {
        const record = calculateDistances(71530, 940200)
        assert.equal(record.length, 71503)

        /*
        const clueRecord = calculateDistances(47986698, 400121310111540)
        console.log(clueRecord.length) => 26499773
         */
    })

})