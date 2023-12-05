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

module.exports = {
    getDestination,
    getLocation
}