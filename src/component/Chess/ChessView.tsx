import { BOARD_CELL_WIDTH, BOARD_CELL_HEIGHT } from '../../type'
import { Chess } from './'
import { chessDisplayName } from '../../utils'
import { observer } from 'mobx-react'
import './index.less'

interface Props {
    chess: Chess
    isActive: boolean
    onClick: () => void
}

export const ChessView = observer(({ chess, isActive, onClick }: Props) => {
    const renderChessCanvas = (node: HTMLCanvasElement | null) => {
        if (node) {
            const ctx = node.getContext('2d')
            if (ctx) {
                const radius = BOARD_CELL_WIDTH / 2
                ctx.beginPath()
                ctx.arc(radius, radius, radius, 0, 360)
                ctx.fillStyle = 'rgb(250, 232, 167)'
                ctx.fill()
                ctx.stroke()

                ctx.beginPath()
                ctx.arc(radius, radius, radius - 6, 0, 360)
                ctx.fillStyle = 'rgb(250, 232, 167)'
                ctx.fill()
                ctx.stroke()
            }
        }
    }

    return (
        <div
            className={`chess ${isActive ? 'active' : ''}`}
            style={{
                width: BOARD_CELL_WIDTH,
                height: BOARD_CELL_HEIGHT,
                top: chess.position.y * BOARD_CELL_HEIGHT - (isActive ? 20 : 0),
                left: chess.position.x * BOARD_CELL_WIDTH
            }}
            onClick={onClick}
        >
            <div className={`display-name ${chess.color}`}>{chessDisplayName(chess.type, chess.color)}</div>
            <canvas width={BOARD_CELL_WIDTH} height={BOARD_CELL_HEIGHT} ref={renderChessCanvas} />
        </div>
    )
})
