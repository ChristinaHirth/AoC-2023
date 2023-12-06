const getOptions = (totalTime) => Array.from({length: totalTime + 1}, (e, i) => i)

/**
 *
 * @return number[]
 * @param totalTime{number}
 * @param minDistance{number}
 */
const calculateDistances = (totalTime, minDistance) => {
    const options = getOptions(totalTime)
    const result = options.map((ms) => {
        return (totalTime - ms) * ms
    })
    return result.filter(d => d > minDistance)
}

const allOptions = (times) => {
    const records = times.map(entry => calculateDistances(...entry))
    return records.reduce((acc, record) => acc * record.length, 1)
}

module.exports = {
    calculateDistances,
    allOptions
}