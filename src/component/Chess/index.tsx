import { makeAutoObservable } from 'mobx'
import { ChessType, ChessColor, Position, ChessBoardLayout, ResultMoveRange } from '../../type'
import { getMoveRange } from 'utils'
export { ChessView } from './ChessView'

export class Chess {
    constructor(public type: ChessType, public color: ChessColor, public position: Position) {
        makeAutoObservable(this)
    }

    getMoveRange(boardLayout: ChessBoardLayout): ResultMoveRange {
        const { x, y } = this.position
        return getMoveRange(x, y, this.type, this.color, boardLayout)
    }

    moveTo(position: Position) {
        this.position = position
    }
}
