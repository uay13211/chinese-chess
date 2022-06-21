import React from 'react'
import {
    CHESS_BOARD_DIMENSION,
    BOARD_CELL_WIDTH,
    BOARD_CELL_HEIGHT,
    LINE_MARGIN,
    CHESS_BOARD_PADDING
} from '../../type'
import './index.less'

interface Props {
    children?: React.ReactNode
}

const X_CELLS_NO = CHESS_BOARD_DIMENSION[0] - 1
const Y_CELLS_NO = CHESS_BOARD_DIMENSION[1] - 1
const CHESS_BOARD_WIDTH = BOARD_CELL_WIDTH * X_CELLS_NO + LINE_MARGIN * 2 + CHESS_BOARD_PADDING * 2
const CHESS_BOARD_HEIGHT = BOARD_CELL_HEIGHT * Y_CELLS_NO + LINE_MARGIN * 2 + CHESS_BOARD_PADDING * 2
const CHESS_CELLS_WIDTH = CHESS_BOARD_DIMENSION[0] * BOARD_CELL_WIDTH
const CHESS_CELLS_HEIGHT = CHESS_BOARD_DIMENSION[1] * BOARD_CELL_HEIGHT

export const ChessBoard = React.memo(({ children }: Props) => {
    const renderChessBoardCanvas = (node: HTMLCanvasElement | null) => {
        if (node) {
            const ctx = node.getContext('2d')
            if (ctx) {
                ctx.beginPath()
                // line margin
                ctx.moveTo(CHESS_BOARD_PADDING, CHESS_BOARD_PADDING)
                ctx.lineTo(CHESS_BOARD_WIDTH - CHESS_BOARD_PADDING, CHESS_BOARD_PADDING)

                for (let y = 0; y <= Y_CELLS_NO; y++) {
                    const positionY = CHESS_BOARD_PADDING + LINE_MARGIN + y * BOARD_CELL_HEIGHT
                    const initialPositionX = CHESS_BOARD_PADDING + LINE_MARGIN
                    const finalPositionX = CHESS_BOARD_WIDTH - CHESS_BOARD_PADDING - LINE_MARGIN
                    ctx.moveTo(initialPositionX, positionY)
                    ctx.lineTo(finalPositionX, positionY)
                }

                // line margin
                ctx.moveTo(CHESS_BOARD_PADDING, CHESS_BOARD_HEIGHT - CHESS_BOARD_PADDING)
                ctx.lineTo(CHESS_BOARD_WIDTH - CHESS_BOARD_PADDING, CHESS_BOARD_HEIGHT - CHESS_BOARD_PADDING)

                // line margin
                ctx.moveTo(CHESS_BOARD_PADDING, CHESS_BOARD_PADDING)
                ctx.lineTo(CHESS_BOARD_PADDING, CHESS_BOARD_HEIGHT - CHESS_BOARD_PADDING)

                for (let x = 0; x <= X_CELLS_NO; x++) {
                    const positionX = CHESS_BOARD_PADDING + LINE_MARGIN + BOARD_CELL_WIDTH * x
                    const initialPositionY = CHESS_BOARD_PADDING + LINE_MARGIN
                    const riverStartPositionY = initialPositionY + BOARD_CELL_HEIGHT * 4
                    const riverEndPositionY = initialPositionY + BOARD_CELL_HEIGHT * 5
                    const finalPositionY = CHESS_BOARD_HEIGHT - CHESS_BOARD_PADDING - LINE_MARGIN
                    ctx.moveTo(positionX, initialPositionY)
                    if (x !== 0 && x !== X_CELLS_NO) {
                        ctx.lineTo(positionX, riverStartPositionY)
                        ctx.moveTo(positionX, riverEndPositionY)
                    }
                    ctx.lineTo(positionX, finalPositionY)
                }

                // line margin
                ctx.moveTo(CHESS_BOARD_WIDTH - CHESS_BOARD_PADDING, CHESS_BOARD_PADDING)
                ctx.lineTo(CHESS_BOARD_WIDTH - CHESS_BOARD_PADDING, CHESS_BOARD_HEIGHT - CHESS_BOARD_PADDING)
                ctx.rect(0, 0, CHESS_BOARD_WIDTH, CHESS_BOARD_HEIGHT)
                ctx.fillStyle = 'rgb(235, 217, 152)'
                ctx.fill()
                ctx.stroke()
            }
        }
    }

    return (
        <div className="chess-board">
            <div
                className="cells"
                style={{
                    top: CHESS_BOARD_PADDING + LINE_MARGIN - BOARD_CELL_WIDTH / 2,
                    left: CHESS_BOARD_PADDING + LINE_MARGIN - BOARD_CELL_HEIGHT / 2,
                    width: CHESS_CELLS_WIDTH,
                    height: CHESS_CELLS_HEIGHT
                }}
            >
                {children}
            </div>
            <canvas width={CHESS_BOARD_WIDTH} height={CHESS_BOARD_HEIGHT} ref={renderChessBoardCanvas} />
        </div>
    )
})
