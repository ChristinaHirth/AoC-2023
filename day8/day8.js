const {sortAsc} = require("../day5/day5");
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

const mapDirections = ({values, directions}, start = "AAA", target = new RegExp(/ZZZ/)) => {
    const directionsMap = getValues({values})
    let index = 0
    const steps = []
    let current = start;
    let next
    while (!current || !current.match(target)) {
        next = findNextDirection(current, directions[index])(directionsMap)
        current = next
        steps.push(current)
        index++
        if (steps.length % directions.length === 0) index = 0
    }
    return steps
}

function getNext(index, paths, directions, directionsMap) {
    const {steps, start} = paths
    const current = steps[0] || start
    const extendedDirections = !directions[index] ? directions.concat(directions) : directions
    const next = findNextDirection(current, extendedDirections[index])(directionsMap)
    steps[0] = next
    return next;
}

const mapDirections2 = ({values, directions}) => {
    const directionsMap = getValues({values})
    let extendedDirections = directions;
    for (let i = 0; i < 100; i++) {
        extendedDirections = directions.concat(extendedDirections)
    }
    const interimStart = new RegExp(/[0-9A-Z]{2}A/)

    const allStarts = [...directionsMap.keys()].filter(k => k.match(interimStart))
    console.log({allStarts})
    const allPaths = allStarts.map(start => ({
        start, steps: [start]
    }))
    let index = 0
    for (index = 0; index < 50000000000; index++) {
        const x = allPaths.map(paths => getNext(index, paths, extendedDirections, directionsMap))
        if (!!x.find(step => step[2] === 'Z') && x.every(step => step[2] === 'Z')) {
            return index + 1
        }
    }
    console.log({index})
}

module.exports = {
    getValues,
    mapDirections,
    mapDirections2
}