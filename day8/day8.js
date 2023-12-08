const spareCharacters = new RegExp(/[() ]/g)
const mapValues = (valuesString) => {
    return (valuesString.replace(spareCharacters, '')).split(',').map(e => e.trim())
}

const getValues = ({values}) => {
    const map = new Map()
    for (const entry of values) {
        const split = entry.split("=")
        map.set(split[0].trim(), mapValues(split[1]))
    }
    return map
}

const findNextDirection = (current, direction) => (map) => {
    const next = map.get(current)
    return direction === "L" ? next[0] : next[1]
}

const mapDirections = ({values, directions}) => {
    const directionsMap = getValues({values})
    const target = "ZZZ"
    let current = undefined;
    let next
    let index = 0
    const steps = []
    while (current !== target) {
        next = findNextDirection(current || "AAA", directions[index])(directionsMap)
        current = next
        steps.push(current)
        index++
        if (steps.length % directions.length === 0) index = 0
    }
    return steps
}

module.exports = {
    getValues,
    mapDirections
}