import { isCellAliveInNextGeneration } from './rules';

export class Grid {
    grid = {};

    constructor(cells) {
        cells.map(({ x, y }) => {
            const key = Grid.getKey({ x, y });
            this.grid[key] = true;
        });
    }

    isAlive({ x, y }) {
        const key = Grid.getKey({ x, y });

        return this.grid[key] === true;
    }

    static getKey({ x, y }) {
        return `${x},${y}`;
    }

    getKeyAsPosition(key) {
        const coords = key.split(',');
        return { x: parseInt(coords[0], 10), y: parseInt(coords[1], 10) };
    }

    getNumNeighbors({ x, y }) {
        return this.getNeighborhood({ x, y }).filter(position => this.isAlive(position)).length;
    }

    getNeighborhood({ x, y }) {
        const up = y - 1;
        const down = y + 1;
        const left = x - 1;
        const right = x + 1;
        return [
            { x, y: up},
            { x, y: down},

            { x: left, y: up},
            { x: left, y: y},
            { x: left, y: down},

            { x: right, y: up},
            { x: right, y: y},
            { x: right, y: down},
        ];
    }

    expandGrid() {
        const expanded = {};
        for (const key of Object.keys(this.grid)) {
            const position = this.getKeyAsPosition(key);
            const neighborhood = this.getNeighborhood(position);
            neighborhood.map(({ x, y }) => {
                const key = Grid.getKey({ x, y });
                expanded[key] = true;
            });
        }
        return expanded;
    }

    getNextGeneration() {
        const next = [];
        const expanded = this.expandGrid();
        for (const key of Object.keys(expanded)) {
            const position = this.getKeyAsPosition(key);
            const numNeighbors = this.getNumNeighbors(position);
            if (isCellAliveInNextGeneration({ numNeighbors, isAlive: this.isAlive(position) })) {
                next.push(position);
            }
        }
        return next;
    }
}
