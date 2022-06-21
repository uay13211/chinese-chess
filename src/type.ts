import type { Chess } from 'component/Chess'

export const CHESS_BOARD_DIMENSION = [9, 10]
export const CHESS_BOARD_PADDING = 40
export const BOARD_CELL_WIDTH = 70
export const BOARD_CELL_HEIGHT = 70

export const LINE_MARGIN = 10

export enum ChessType {
    CANNON = 'CANNON',
    GENERAL = 'GENERAL',
    ADVISOR = 'ADVISOR',
    ELEPHANT = 'ELEPHANT',
    HORSE = 'HORSE',
    CHARIOT = 'CHARIOT',
    SOLDIER = 'SOLDIER'
}

export enum Direction {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    LEFT = 'LEFT'
}

export enum ChessColor {
    BLACK = 'BLACK',
    RED = 'RED'
}

export type Position = { x: number; y: number }

export type MoveRange = Record<Direction, Position[]>

export type ResultMoveRange = (Position | null)[]

export type ChessBoardLayout = (Chess | null)[][]
