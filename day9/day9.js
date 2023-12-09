const getDiffList = list => {
    const result = []
    for (let i = 0; i < list.length - 1; i++) {
        result.push(list[i + 1] - list[i])
    }
    return result
}

const getAllDiffLists = list => {
    const allDiffs = [].concat([list])
    let current = [...list]
    do {
        current = getDiffList(current)
        allDiffs.push(current)
    } while (!current.every(e => e === 0))
    return allDiffs
}

const getNextDiffs = list => {
    const allDiffs = getAllDiffLists(list)
    for (let i = allDiffs.length - 1; i > 0; i--) {
        const diffList = allDiffs[i]
        const nextList = allDiffs[i - 1]
        const lastEntry = diffList[diffList.length - 1] + nextList[nextList.length - 1]
        nextList.push(lastEntry)
    }
    return allDiffs.map(diffs => diffs[diffs.length - 1])
}

const getFormerDiffs = list => {
    const allDiffs = getAllDiffLists(list)
    for (let i = allDiffs.length - 1; i > 0; i--) {
        const diffList = allDiffs[i]
        const nextList = allDiffs[i - 1]
        //console.log({i, next: nextList[1], current: diffList[0]})
        const firstEntry = nextList[0] - diffList[0]
        allDiffs[i - 1].unshift(firstEntry)
    }
    return allDiffs.map(diffs => diffs[0])
}

const sumAllDiffs = (lists) => {
    const lastDiffs = lists.map(getNextDiffs);
    return lastDiffs.reduce((acc, current) => {
        return acc + current[0];
    }, 0)
}
const sumAllFormerDiffs = (lists) => {
    const lastDiffs = lists.map(getFormerDiffs);
    return lastDiffs.reduce((acc, current) => {
        return acc + current[0];
    }, 0)
}

module.exports = {
    getAllDiffLists,
    getNextDiffs,
    sumAllDiffs,
    getFormerDiffs,
    sumAllFormerDiffs
}