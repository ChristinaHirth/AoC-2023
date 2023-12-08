const calibrationValue = (input) => {
    const regex = new RegExp(/\d+/g)
    const value = input.match(regex)
    return Number(value[0] + value[value.length - 1])
}

const sumAll = (document) => {
    return document.map(input => calibrationValue(input)).reduce((acc, value) => acc + value, 0)
}

module.exports = {
    calibrationValue,
    sumAll
}