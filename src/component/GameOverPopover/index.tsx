import React from 'react'
import { ChessColor } from 'type'
import { chessColor } from 'utils'
import './index.less'

interface Props {
    winner: ChessColor
    onNewGame: () => void
}

export const GameOverPopover = React.memo(({ winner, onNewGame }: Props) => {
    return (
        <div className="overlay">
            Winner: {chessColor(winner)}
            <button onClick={onNewGame}>New Game</button>
        </div>
    )
})
