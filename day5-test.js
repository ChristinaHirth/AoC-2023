const assert = require('assert');
const day5 = require('./day5')

/**
 *
 * @type {[location:number,humidity:number,rangeLength:number][]}
 */
const humidity2location = [
    [60, 56, 37],
    [56, 93, 4]
]
/**
 *
 * @type {[humidity:number,temp:number,rangeLength:number][]}
 */
const temp2humidity = [
    [0, 69, 1],
    [1, 0, 69]
]

/**
 *
 * @type {[temp:number,light:number,rangeLength:number][]}
 */
const light2temp = [
    [45, 77, 23],
    [81, 45, 19],
    [68, 64, 13]
]

/**
 *
 * @type {[water:number,fertilizer:number,rangeLength:number][]}
 */
const water2light = [
    [88, 18, 7],
    [18, 25, 70]
]
/**
 *
 * @type {[fertilizer:number,soil:number,rangeLength:number][]}
 */
const fertilizer2water = [
    [49, 53, 8],
    [0, 11, 42],
    [42, 0, 7],
    [57, 7, 4]
]
/**
 *
 * @type {[soil:number,seed:number,rangeLength:number][]}
 */
const soil2fertilizer = [
    [0, 15, 37],
    [37, 52, 2],
    [39, 0, 15]
]

const seeds = [79, 14, 44, 13]
/**
 *
 * @type {[soil:number,seed:number,rangeLength:number][]}
 */
const seed2soil = [[50, 98, 2], [52, 50, 48]]

const getDestination = (source) => (suite) => {
    let result
    for (let n of suite) {
        if (source === n[1]) result = n[0]
        else if (source > n[1] && source <= n[1] + n[2]) result = source - n[1] + n[0]
        if (!!result) return result
    }
    if (!result) {
        result = source
    }
    return result
}
const localSuites = [seed2soil, soil2fertilizer, fertilizer2water, water2light, light2temp, temp2humidity, humidity2location]
const getLocation = (seed, suites) => {
    let target = seed
    for (const suite of suites) {
        target = getDestination(target)(suite)
    }
    return target
}

const getSeedsFromPairs = (seeds) => {
    const result = []
    for (let i = 0; i < seeds.length; i = i + 2) {
        result.push([seeds[i], seeds[i + 1]])
    }
}

describe('day 5 test data', function () {
    describe('find destination', function () {
        it('should return soil 81 when the seed is 79', function () {
            assert.equal(getDestination(79)(seed2soil), 81);
        });
        it('should return fertilizer 81 when the soil is 81', function () {
            assert.equal(getDestination(81)(soil2fertilizer), 81);
        });
        it('should return water 81 when the fertilizer is 81', function () {
            assert.equal(getDestination(81)(fertilizer2water), 81);
        });
        it('should return light 74 when the water is 81', function () {
            assert.equal(getDestination(81)(water2light), 74);
        });
        it('should return temperature 78 when the light is 74', function () {
            assert.equal(getDestination(74)(light2temp), 78);
        });
        it('should return humidity 78 when the temperature is 78', function () {
            assert.equal(getDestination(78)(temp2humidity), 78);
        });
        it('should return location 82 when the humidity is 78', function () {
            assert.equal(getDestination(78)(humidity2location), 82);
        });

        it('should return location 82 for seed 79', function () {
            assert.equal(getLocation(79, localSuites), 82)
        })
        it('should return location 43 for seed 14', function () {
            assert.equal(getLocation(14, localSuites), 43)
        })
        it('should return location 86 for seed 55', function () {
            assert.equal(getLocation(55, localSuites), 86)
        })
        it('should return location 35 for seed 13', function () {
            assert.equal(getLocation(13, localSuites), 35)
        })
    });
});

describe('day5 challenge data', function () {
    describe('find destinations', function () {
        it('should find all locations', function () {
            const results = day5.targetSeeds.map(seed => getLocation(seed, day5.suites)).sort((n1, n2) => n1 - n2)
            assert.equal(results.length, day5.targetSeeds.length)
            assert.equal(results[0], 462648396)
        })
    })
})