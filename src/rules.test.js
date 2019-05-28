import { isCellAliveInNextGeneration, getNumNeighbors } from './rules';
import { Grid } from './Grid';

describe('Given a live cell with', () => {
    test('0 neighbours should die', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 0 })).toBe(false);
    });

    test('fewer than 2 neighbours should die', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 1 })).toBe(false);
    });

    test('2 neighbours should live', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 2 })).toBe(true);
    });

    test('3 neighbours should live', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 3 })).toBe(true);
    });
});

describe('Given a dead cell with', () => {
    test('1 neighbour should remain dead', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 1, isAlive: false })).toBe(false);
    });
    test('3 neighbours should become alive', () => {
        expect(isCellAliveInNextGeneration({ numNeighbors: 3, isAlive: false })).toBe(true);
    });
});

describe('Given a cell on a board with', () => {
    test('no neighbors should return 0', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
        ]);
        const position = { x: 0, y: 0 };
        expect(grid.getNumNeighbors(position)).toBe(0);
    });
    test('one neighbor should return 1', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
        ]);
        const position = { x: 0, y: 0 };
        expect(grid.getNumNeighbors(position)).toBe(1);
    });

    test('one neighbor below current should return 1', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 0, y: -1 },
        ]);
        const position = { x: 0, y: 0 };
        expect(grid.getNumNeighbors(position)).toBe(1);
    });

    test('one other cell but no neighbors in a column should return 0', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 0, y: 2 },
        ]);
        const position = { x: 0, y: 0 };
        expect(grid.getNumNeighbors(position)).toBe(0);
    });

    test('2 cells in neighborhood and one out should return 2', () => {
        const grid = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 2, y: 1 },
        ];
        const position = grid[0];
        expect(getNumNeighbors({ grid, position })).toBe(2);
    });

    test('8 cells in neighborhood and one out should return 8', () => {
        const grid = new Grid([
            { x: 1, y: -1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },

            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },

            { x: 0, y: -1 },
            { x: 0, y: 1 },

            { x: 0, y: 2 },
        ]);
        const position = { x: 0, y: 0 };
        expect(grid.getNumNeighbors(position)).toBe(8);
    });

});

describe('Given a grid', () => {
    test('no cells has nothing alive at 0,0', () => {
        const grid = new Grid([]);
        expect(grid.isAlive({ x: 0, y: 0 })).toBe(false);
    });
    test('1 cell at 0,0 is alive at 0,0', () => {
        const grid = new Grid([{ x: 0, y: 0 }]);
        expect(grid.isAlive({ x: 0, y: 0 })).toBe(true);
    });
    test('1 cell at 0,0 is dead at 0,1', () => {
        const grid = new Grid([{ x: 0, y: 0 }]);
        expect(grid.isAlive({ x: 0, y: 1 })).toBe(false);
    });
    test('1 cell at 0,0 is dead at 1,0', () => {
        const grid = new Grid([{ x: 0, y: 0 }]);
        expect(grid.isAlive({ x: 1, y: 0 })).toBe(false);
    });
});

describe('Given a grid', () => {
    test('with 1 cell, the next generation should have no cells', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
        ]);

        expect(grid.getNextGeneration().length).toBe(0);
    });

    test('with 3 cells in a column, the next generation should have 3 cell', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
        ]);

        expect(grid.getNextGeneration().length).toBe(3);
    });

    test('with 3 unconnected cells, the next generation should have 0 cells', () => {
        const grid = new Grid([
            { x: -10, y: 0 },
            { x: 0, y: 1 },
            { x: 5, y: 0 },
        ]);

        expect(grid.getNextGeneration().length).toBe(0);
    });

    test('with 3 cells in an L, the next generation should have 4 cells', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
        ]);

        expect(grid.getNextGeneration().length).toBe(4);
    });

    test('with 2 cells in a Z, the next generation should have 2 cells in position', () => {
        const grid = new Grid([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 1 },
        ]);

        const next = grid.getNextGeneration();

        expect(next.length).toBe(2);
        const keys = next.map(Grid.getKey);

        expect(keys).toContain('1,0');
        expect(keys).toContain('1,1');
    });
});
