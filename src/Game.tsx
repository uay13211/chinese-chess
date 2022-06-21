import React from 'react'
import { ChessBoard as UIChessBoard } from 'component/ChessBoard'
import { GameOverPopover } from 'component/GameOverPopover'
import { ChessBoardLayout, ChessColor, ChessType, Position, ResultMoveRange } from 'type'
import { makeAutoObservable } from 'mobx'
import { createChesses, chessColor } from 'utils'
import { CHESS_BOARD_DIMENSION } from './type'
import { Chess, ChessView } from 'component/Chess'
import { observer } from 'mobx-react'
import { ChessPlaceholder } from 'component/ChessPlaceholder'

class Game {
    public chesses: Chess[] = []
    public activeChess: Chess | null = null
    public currentPlayer: ChessColor = ChessColor.RED
    public winner: ChessColor | null = null

    constructor() {
        this.resetChesses()
        makeAutoObservable(this)
    }

    public get layout(): ChessBoardLayout {
        const [X_DIMENSION, Y_DIMENSION] = CHESS_BOARD_DIMENSION
        const resultLayoutChessBoardLayout: ChessBoardLayout = Array.from({ length: Y_DIMENSION }, () =>
            Array.from({ length: X_DIMENSION }, () => null)
        )
        this.chesses.forEach(chess => {
            const { x, y } = chess.position
            resultLayoutChessBoardLayout[y][x] = chess
        })
        return resultLayoutChessBoardLayout
    }

    public get moveRange(): ResultMoveRange {
        if (!this.activeChess) {
            return []
        } else {
            return this.activeChess.getMoveRange(this.layout)
        }
    }

    onChessClick = (chess: Chess) => {
        if (chess.color !== this.currentPlayer) {
            return
        }
        if (this.activeChess === chess) {
            this.activeChess = null
        } else {
            this.activeChess = chess
        }
    }

    onChessMove = (position: Position) => {
        if (this.activeChess) {
            const { x, y } = position
            const targetChess = this.layout[y][x]
            if (targetChess) {
                this.removeChess(targetChess)
                if (targetChess.type === ChessType.GENERAL) {
                    this.winner = this.currentPlayer
                }
            }
            this.activeChess.moveTo(position)
            this.activeChess = null
            this.currentPlayer = this.currentPlayer === ChessColor.RED ? ChessColor.BLACK : ChessColor.RED
        }
    }

    removeChess = (chess: Chess) => {
        this.chesses = this.chesses.filter(_ => _ !== chess)
    }

    resetChesses = () => {
        this.chesses = createChesses()
    }

    resetGame = () => {
        this.resetChesses()
        this.activeChess = null
        this.currentPlayer = ChessColor.RED
        this.winner = null
    }
}

export const GameView = observer(() => {
    const [game] = React.useState(() => new Game())
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <UIChessBoard>
                {game.layout.map(row =>
                    row.map((chess, idx) =>
                        chess ? (
                            <ChessView
                                key={`${chess.color}-${chess.type}-${idx}`}
                                chess={chess}
                                onClick={() => game.onChessClick(chess)}
                                isActive={game.activeChess === chess}
                            />
                        ) : null
                    )
                )}
                {game.moveRange.map(position => {
                    return position && <ChessPlaceholder position={position} onClick={game.onChessMove} />
                })}
            </UIChessBoard>
            <div style={{ position: 'relative', left: 50 }}>
                <button onClick={game.resetGame}>New Game</button>
                <div>Current Player: {chessColor(game.currentPlayer)}</div>
            </div>
            {game.winner && <GameOverPopover winner={game.winner} onNewGame={game.resetGame} />}
        </div>
    )
})
