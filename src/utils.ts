import type { MoveRange, ChessBoardLayout, Position, ResultMoveRange } from './type'
import { ChessType, ChessColor, Direction, CHESS_BOARD_DIMENSION } from './type'
import { Chess } from 'component/Chess'

const [X_DIMENSION, Y_DIMENSION] = CHESS_BOARD_DIMENSION

const generalMoveRange: MoveRange = {
    [Direction.TOP]: [{ x: 0, y: -1 }],
    [Direction.LEFT]: [{ x: -1, y: 0 }],
    [Direction.RIGHT]: [{ x: 1, y: 0 }],
    [Direction.DOWN]: [{ x: 0, y: 1 }]
}

const advisorMoveRange: MoveRange = {
    [Direction.TOP]: [{ x: 1, y: -1 }],
    [Direction.LEFT]: [{ x: -1, y: -1 }],
    [Direction.RIGHT]: [{ x: 1, y: 1 }],
    [Direction.DOWN]: [{ x: -1, y: 1 }]
}

const elephantMoveRange: MoveRange = {
    [Direction.TOP]: [{ x: 2, y: -2 }],
    [Direction.LEFT]: [{ x: -2, y: -2 }],
    [Direction.RIGHT]: [{ x: 2, y: 2 }],
    [Direction.DOWN]: [{ x: -2, y: 2 }]
}

const horseMoveRange: MoveRange = {
    [Direction.TOP]: [
        { x: 1, y: -2 },
        { x: -1, y: -2 }
    ],
    [Direction.LEFT]: [
        { x: -2, y: 1 },
        { x: -2, y: -1 }
    ],
    [Direction.RIGHT]: [
        { x: 2, y: 1 },
        { x: 2, y: -1 }
    ],
    [Direction.DOWN]: [
        { x: 1, y: 2 },
        { x: -1, y: 2 }
    ]
}

// Black in top, red in bottom
export const directions = Object.values(Direction)

const redDisplayName: Record<ChessType, string> = {
    [ChessType.GENERAL]: '帥',
    [ChessType.ADVISOR]: '仕',
    [ChessType.ELEPHANT]: '相',
    [ChessType.HORSE]: '傌',
    [ChessType.SOLDIER]: '兵',
    [ChessType.CANNON]: '炮',
    [ChessType.CHARIOT]: '俥'
}

const blackDisplayName: Record<ChessType, string> = {
    [ChessType.GENERAL]: '將',
    [ChessType.ADVISOR]: '士',
    [ChessType.ELEPHANT]: '象',
    [ChessType.HORSE]: '馬',
    [ChessType.SOLDIER]: '卒',
    [ChessType.CANNON]: '砲',
    [ChessType.CHARIOT]: '車'
}

export const chessColor = (color: ChessColor) => {
    return color === ChessColor.RED ? ' 紅' : '黑'
}

export function createChesses() {
    const redChesses = [
        new Chess(ChessType.CHARIOT, ChessColor.RED, { x: 0, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.HORSE, ChessColor.RED, { x: 1, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.ELEPHANT, ChessColor.RED, { x: 2, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.ADVISOR, ChessColor.RED, { x: 3, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.GENERAL, ChessColor.RED, { x: 4, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.ADVISOR, ChessColor.RED, { x: 5, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.ELEPHANT, ChessColor.RED, { x: 6, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.HORSE, ChessColor.RED, { x: 7, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.CHARIOT, ChessColor.RED, { x: 8, y: Y_DIMENSION - 1 }),
        new Chess(ChessType.CANNON, ChessColor.RED, { x: 1, y: Y_DIMENSION - 3 }),
        new Chess(ChessType.CANNON, ChessColor.RED, { x: 7, y: Y_DIMENSION - 3 }),
        new Chess(ChessType.SOLDIER, ChessColor.RED, { x: 0, y: Y_DIMENSION - 4 }),
        new Chess(ChessType.SOLDIER, ChessColor.RED, { x: 2, y: Y_DIMENSION - 4 }),
        new Chess(ChessType.SOLDIER, ChessColor.RED, { x: 4, y: Y_DIMENSION - 4 }),
        new Chess(ChessType.SOLDIER, ChessColor.RED, { x: 6, y: Y_DIMENSION - 4 }),
        new Chess(ChessType.SOLDIER, ChessColor.RED, { x: 8, y: Y_DIMENSION - 4 })
    ]

    const blackChesses = [
        new Chess(ChessType.CHARIOT, ChessColor.BLACK, { x: 0, y: 0 }),
        new Chess(ChessType.HORSE, ChessColor.BLACK, { x: 1, y: 0 }),
        new Chess(ChessType.ELEPHANT, ChessColor.BLACK, { x: 2, y: 0 }),
        new Chess(ChessType.ADVISOR, ChessColor.BLACK, { x: 3, y: 0 }),
        new Chess(ChessType.GENERAL, ChessColor.BLACK, { x: 4, y: 0 }),
        new Chess(ChessType.ADVISOR, ChessColor.BLACK, { x: 5, y: 0 }),
        new Chess(ChessType.ELEPHANT, ChessColor.BLACK, { x: 6, y: 0 }),
        new Chess(ChessType.HORSE, ChessColor.BLACK, { x: 7, y: 0 }),
        new Chess(ChessType.CHARIOT, ChessColor.BLACK, { x: 8, y: 0 }),
        new Chess(ChessType.CANNON, ChessColor.BLACK, { x: 1, y: 2 }),
        new Chess(ChessType.CANNON, ChessColor.BLACK, { x: 7, y: 2 }),
        new Chess(ChessType.SOLDIER, ChessColor.BLACK, { x: 0, y: 3 }),
        new Chess(ChessType.SOLDIER, ChessColor.BLACK, { x: 2, y: 3 }),
        new Chess(ChessType.SOLDIER, ChessColor.BLACK, { x: 4, y: 3 }),
        new Chess(ChessType.SOLDIER, ChessColor.BLACK, { x: 6, y: 3 }),
        new Chess(ChessType.SOLDIER, ChessColor.BLACK, { x: 8, y: 3 })
    ]
    return [...redChesses, ...blackChesses]
}

export function baseRow(chessSide: ChessColor) {
    const positionY = chessSide === ChessColor.RED ? Y_DIMENSION - 1 : 0
    const left: Chess[] = [
        new Chess(ChessType.CHARIOT, chessSide, { x: 0, y: positionY }),
        new Chess(ChessType.HORSE, chessSide, { x: 1, y: positionY }),
        new Chess(ChessType.ELEPHANT, chessSide, { x: 2, y: positionY }),
        new Chess(ChessType.ADVISOR, chessSide, { x: 3, y: positionY })
    ]
    const right: Chess[] = [
        new Chess(ChessType.ADVISOR, chessSide, { x: 5, y: positionY }),
        new Chess(ChessType.ELEPHANT, chessSide, { x: 6, y: positionY }),
        new Chess(ChessType.HORSE, chessSide, { x: 7, y: positionY }),
        new Chess(ChessType.CHARIOT, chessSide, { x: 8, y: positionY })
    ]

    return [...left, new Chess(ChessType.GENERAL, chessSide, { x: 4, y: positionY }), ...right]
}

export function canonRow(chessSide: ChessColor) {
    const positionY = chessSide === ChessColor.RED ? Y_DIMENSION - 3 : 2
    return [
        null,
        new Chess(ChessType.CANNON, chessSide, { x: 1, y: positionY }),
        null,
        null,
        null,
        null,
        null,
        new Chess(ChessType.CANNON, chessSide, { x: 7, y: positionY }),
        null
    ]
}

export function soldierRow(chessSide: ChessColor) {
    const positionY = chessSide === ChessColor.RED ? Y_DIMENSION - 4 : 3
    return [
        new Chess(ChessType.SOLDIER, chessSide, { x: 0, y: positionY }),
        null,
        new Chess(ChessType.SOLDIER, chessSide, { x: 2, y: positionY }),
        null,
        new Chess(ChessType.SOLDIER, chessSide, { x: 4, y: positionY }),
        null,
        new Chess(ChessType.SOLDIER, chessSide, { x: 6, y: positionY }),
        null,
        new Chess(ChessType.SOLDIER, chessSide, { x: 8, y: positionY })
    ]
}

export function emptyRow() {
    return [null, null, null, null, null, null, null, null, null]
}

export function isOverPalace(chessSide: ChessColor, x: number, y: number) {
    const xMin = 3
    const xMax = 5
    const yMin = chessSide === ChessColor.RED ? 7 : 0
    const yMax = chessSide === ChessColor.RED ? 9 : 2

    return x < xMin || x > xMax || y < yMin || y > yMax
}

export function isOverRiver(chessSide: ChessColor, y: number) {
    return chessSide === ChessColor.BLACK ? y > 4 : y < 5
}

export function isOverBoard(x: number, y: number) {
    return y > Y_DIMENSION - 1 || x > X_DIMENSION - 1 || y < 0 || x < 0
}

export function isTargetBoxReachable(chessSide: ChessColor, x: number, y: number, boardLayout: ChessBoardLayout) {
    if (isOverBoard(x, y)) {
        return false
    }
    const targetChess = boardLayout[y][x]
    return targetChess ? targetChess.color !== chessSide : true
}

export function getPalaceMoveRange(
    chessSide: ChessColor,
    x: number,
    y: number,
    boardLayout: ChessBoardLayout,
    moveRange: MoveRange
) {
    return Object.values(moveRange)
        .flatMap(movements => {
            return movements.map(movement => {
                const nextX = movement.x + x
                const nextY = movement.y + y
                return isTargetBoxReachable(chessSide, nextX, nextY, boardLayout) &&
                    !isOverPalace(chessSide, nextX, nextY)
                    ? { x: nextX, y: nextY }
                    : null
            })
        })
        .filter(Boolean)
}

// expect same X || same Y
export function getCoorRange(a: Position, b: Position) {
    const range: Position[] = []

    const start = a.x === b.x ? (a.y > b.y ? b.y : a.y) : a.x > b.x ? b.x : a.x
    const end = a.x === b.x ? (a.y > b.y ? a.y : b.y) : a.x > b.x ? a.x : b.x

    for (let i = start; i <= end; i++) {
        range.push({ x: a.x === b.x ? a.x : i, y: a.x === b.x ? i : a.y })
    }

    return range
}

export function getClosestChess(
    x: number,
    y: number,
    boardLayout: ChessBoardLayout,
    direction: Direction,
    startX: number = x,
    startY: number = y
): {
    chess: Chess | null
    x: number
    y: number
} {
    const currBox = boardLayout[y][x]
    const isStartPoint = startX === x && startY === y
    const isMax = (() => {
        switch (direction) {
            case Direction.TOP:
                return y === 0
            case Direction.RIGHT:
                return x === X_DIMENSION - 1
            case Direction.DOWN:
                return y === Y_DIMENSION - 1
            case Direction.LEFT:
                return x === 0
        }
    })()

    if (isMax) {
        return { chess: isStartPoint ? null : currBox, x, y }
    }

    if (currBox && !isStartPoint) {
        return { chess: currBox, x, y }
    }

    switch (direction) {
        case Direction.TOP:
            return getClosestChess(x, y - 1, boardLayout, direction, startX, startY)
        case Direction.RIGHT:
            return getClosestChess(x + 1, y, boardLayout, direction, startX, startY)
        case Direction.DOWN:
            return getClosestChess(x, y + 1, boardLayout, direction, startX, startY)
        case Direction.LEFT:
            return getClosestChess(x - 1, y, boardLayout, direction, startX, startY)
    }
}

export function chessDisplayName(type: ChessType, color: ChessColor) {
    const isRed = color === ChessColor.RED

    return isRed ? redDisplayName[type] : blackDisplayName[type]
}

function getSoldierMoveRange(
    chessSide: ChessColor,
    x: number,
    y: number,
    boardLayout: ChessBoardLayout
): ResultMoveRange {
    const isSoldierOverRiver = isOverRiver(chessSide, y)
    const moveRange: MoveRange = {
        [Direction.TOP]: [{ x: 0, y: chessSide === ChessColor.RED ? -1 : 0 }],
        [Direction.LEFT]: isSoldierOverRiver ? [{ x: 1, y: 0 }] : [],
        [Direction.RIGHT]: isSoldierOverRiver ? [{ x: -1, y: 0 }] : [],
        [Direction.DOWN]: [{ x: 0, y: chessSide === ChessColor.RED ? 0 : 1 }]
    }

    return Object.values(moveRange)
        .map(movement => {
            if (movement.length > 0) {
                const nextX = x + movement[0].x
                const nextY = y + movement[0].y

                return isTargetBoxReachable(chessSide, nextX, nextY, boardLayout)
                    ? {
                          x: nextX,
                          y: nextY
                      }
                    : null
            }
            return null
        })
        .filter(Boolean)
}

function getGeneralMoveRange(
    chessSide: ChessColor,
    x: number,
    y: number,
    boardLayout: ChessBoardLayout
): ResultMoveRange {
    const moveRange = getPalaceMoveRange(chessSide, x, y, boardLayout, generalMoveRange)
    const oppositeDir = chessSide === ChessColor.RED ? Direction.TOP : Direction.DOWN
    const closestChess = getClosestChess(x, y, boardLayout, oppositeDir)
    const isOppositeGeneralExposed =
        closestChess.chess && closestChess.chess.type === ChessType.GENERAL && closestChess.chess.color !== chessSide

    if (isOppositeGeneralExposed) {
        moveRange.push({ x: closestChess.x, y: closestChess.y })
    }

    return moveRange
}

function getCanonMoveRange(
    chessSide: ChessColor,
    x: number,
    y: number,
    boardLayout: ChessBoardLayout
): ResultMoveRange {
    const firstClosestChesses = directions.map(direction => getClosestChess(x, y, boardLayout, direction))
    const secondClosestChesses = firstClosestChesses.map((firstClosestChess, idx) =>
        getClosestChess(firstClosestChess.x, firstClosestChess.y, boardLayout, directions[idx])
    )

    return secondClosestChesses.flatMap((secondClosestChess, idx) => {
        const firstClosestChess = firstClosestChesses[idx]
        const resultRange = getCoorRange({ x, y }, { x: firstClosestChess.x, y: firstClosestChess.y }).filter(
            _ => !isOverBoard(_.x, _.y) && !boardLayout[_.y][_.x]
        )
        if (
            isTargetBoxReachable(chessSide, secondClosestChess.x, secondClosestChess.y, boardLayout) &&
            secondClosestChess.chess
        ) {
            resultRange.push({ x: secondClosestChess.x, y: secondClosestChess.y })
        }
        return resultRange
    })
}

function getChariotMoveRange(
    chessSide: ChessColor,
    x: number,
    y: number,
    boardLayout: ChessBoardLayout
): ResultMoveRange {
    const closestChesses = directions.map(direction => getClosestChess(x, y, boardLayout, direction))

    return closestChesses.flatMap(closestChess => {
        return getCoorRange({ x, y }, { x: closestChess.x, y: closestChess.y }).filter(_ =>
            isTargetBoxReachable(chessSide, _.x, _.y, boardLayout)
        )
    })
}

function getElephantMoveRange(chessSide: ChessColor, x: number, y: number, boardLayout: ChessBoardLayout) {
    const constraint: Record<Direction, { x: number; y: number }> = {
        [Direction.TOP]: { x: x + 1, y: y - 1 },
        [Direction.LEFT]: { x: x - 1, y: y - 1 },
        [Direction.RIGHT]: { x: x + 1, y: y + 1 },
        [Direction.DOWN]: { x: x - 1, y: y + 1 }
    }

    return Object.entries(elephantMoveRange)
        .flatMap(([direction, movements]) => {
            const constraintInDir = constraint[direction as Direction]
            const isConstraint =
                isOverBoard(constraintInDir.x, constraintInDir.y) || !!boardLayout[constraintInDir.y][constraintInDir.x]

            return isConstraint
                ? null
                : movements.map(movement => {
                      const nextX = movement.x + x
                      const nextY = movement.y + y
                      return isTargetBoxReachable(chessSide, nextX, nextY, boardLayout) &&
                          !isOverRiver(chessSide, nextY)
                          ? { x: nextX, y: nextY }
                          : null
                  })
        })
        .filter(Boolean)
}

function getHorseMoveRange(chessSide: ChessColor, x: number, y: number, boardLayout: ChessBoardLayout) {
    const constraint: Record<Direction, { x: number; y: number }> = {
        [Direction.TOP]: { x, y: y - 1 },
        [Direction.LEFT]: { x: x - 1, y },
        [Direction.RIGHT]: { x: x + 1, y },
        [Direction.DOWN]: { x, y: y + 1 }
    }

    return Object.entries(horseMoveRange)
        .flatMap(([direction, movements]) => {
            const constraintInDir = constraint[direction as Direction]
            const isConstraint =
                isOverBoard(constraintInDir.x, constraintInDir.y) || !!boardLayout[constraintInDir.y][constraintInDir.x]

            return isConstraint
                ? null
                : movements.map(movement => {
                      const nextX = movement.x + x
                      const nextY = movement.y + y
                      return isTargetBoxReachable(chessSide, nextX, nextY, boardLayout)
                          ? { x: x + movement.x, y: y + movement.y }
                          : null
                  })
        })
        .filter(Boolean)
}

export function getMoveRange(
    x: number,
    y: number,
    chessType: ChessType,
    chessSide: ChessColor,
    boardLayout: ChessBoardLayout
): ResultMoveRange {
    switch (chessType) {
        case ChessType.ADVISOR:
            return getPalaceMoveRange(chessSide, x, y, boardLayout, advisorMoveRange)
        case ChessType.SOLDIER:
            return getSoldierMoveRange(chessSide, x, y, boardLayout)
        case ChessType.GENERAL:
            return getGeneralMoveRange(chessSide, x, y, boardLayout)
        case ChessType.CANNON:
            return getCanonMoveRange(chessSide, x, y, boardLayout)
        case ChessType.CHARIOT:
            return getChariotMoveRange(chessSide, x, y, boardLayout)
        case ChessType.ELEPHANT:
            return getElephantMoveRange(chessSide, x, y, boardLayout)
        case ChessType.HORSE:
            return getHorseMoveRange(chessSide, x, y, boardLayout)
    }
}
