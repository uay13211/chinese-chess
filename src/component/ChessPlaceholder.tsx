import { BOARD_CELL_HEIGHT, BOARD_CELL_WIDTH, Position } from 'type'

interface Props {
    position: Position
    onClick: (position: Position) => void
    children?: React.ReactNode
}

export const ChessPlaceholder = ({ position, onClick, children }: Props) => {
    const { x, y } = position
    return (
        <div
            onClick={() => onClick(position)}
            style={{
                position: 'absolute',
                width: BOARD_CELL_WIDTH,
                height: BOARD_CELL_HEIGHT,
                background: 'yellow',
                top: y * BOARD_CELL_HEIGHT,
                left: x * BOARD_CELL_WIDTH,
                opacity: 0.3,
                borderRadius: '50%',
                zIndex: 3
            }}
        >
            {children}
        </div>
    )
}
