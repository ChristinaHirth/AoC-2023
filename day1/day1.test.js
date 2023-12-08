const {equal} = require("assert");
const {calibrationValue, sumAll} = require("./day1");
const data = require("./data")

const example = [
    '1abc2',
    'pqr3stu8vwx',
    'a1b2c3d4e5f',
    'treb7uchet'
]

describe('part 1', () => {
    it('should find the calibration values', () => {
        equal(calibrationValue(example[0]), 12)
        equal(calibrationValue(example[1]), 38)
        equal(calibrationValue(example[2]), 15)
        equal(calibrationValue(example[3]), 77)
        equal(calibrationValue('gs'), 0)
        equal(sumAll(example), 142)

        //const clue1 = sumAll(data)
        // console.log(clue1)
        // to high = 4488690904701194

    })
})