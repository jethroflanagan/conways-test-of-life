export const isCellAliveInNextGeneration = ({ numNeighbors, isAlive = true }) => {
    if (!isAlive) {
        return (numNeighbors === 3);
    }
    return (numNeighbors >= 2);
};

const isCurrentCell = ({ position, otherPosition }) => {
    return (position.x === otherPosition.x && position.y === otherPosition.y);
};

export const getNumNeighbors = ({ grid, position }) => {
    const { x, y } = position;
    const neighbors = grid.filter((otherPosition) => {
        if (Math.abs(x - otherPosition.x) <= 1 &&
            Math.abs(y - otherPosition.y) <= 1) {
            return !isCurrentCell({ position, otherPosition });
        }
        return false;
    });
    return neighbors.length;
}

