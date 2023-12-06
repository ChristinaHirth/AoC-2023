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
const getLocation = (seed, suites) => {
    let target = seed
    for (const suite of suites) {
        target = getDestination(target)(suite)
    }
    return target
}
const getRangeLocation = (seedRange, suites) => {
    const locations = []
    const maxLocation = 10516671
    console.log({seedRange})
    for (const seedRangeElement of seedRange) {
        /*const lowestLocation = getLocation(seedRangeElement[0], suites)
        const highestLocation = getLocation(seedRangeElement[1], suites)
        if (lowestLocation > maxLocation && highestLocation > maxLocation) continue
        //if (highestLocation < lowestLocation) {
        locations.push(Math.min(highestLocation))

         */
        for (let seed = seedRangeElement[0]; seed <= seedRangeElement[1]; seed++) {
            let location = getLocation(seed, suites)
            if (location < maxLocation) {
                locations.push(location)
            }
        }
    }
    const result = locations.sort(sortAsc)
    if (result.length > 0) console.log(result[0])
    if (result.length > 1) console.log(result[1])
}

const seedRanges = (seeds) => {
    const result = []
    for (let i = 0; i < seeds.length - 1; i = i + 2) {
        result.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
    }
    return result
}
const sortDesc = (n1, n2) => n2 - n1
const sortAsc = (n1, n2) => n1 - n2

module.exports = {
    getDestination,
    getLocation,
    seedRanges,
    getRangeLocation,
    sortAsc,
    sortDesc
}