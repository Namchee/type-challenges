type Connect4Chips = "🔴" | "🟡";
type Connect4EmptyCell = "  ";
type Connect4Cell = Connect4Chips | Connect4EmptyCell;
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
	["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type NewGame = {
	board: EmptyBoard;
	state: "🟡";
};

type GameState = {
	board: Connect4Cell[][];
	state: Connect4State;
};

type ConstructRow<
	Row extends Connect4Cell[],
	Index extends number,
	Val extends Connect4Chips,
	Counter extends number[] = [],
> = Row extends [infer El, ...infer Rest extends Connect4Cell[]]
	? Counter["length"] extends Index
		? [Val, ...ConstructRow<Rest, Index, Val, [...Counter, 0]>]
		: [El, ...ConstructRow<Rest, Index, Val, [...Counter, 0]>]
	: [];

type HasConsecutiveChips<Arr extends Connect4Cell[], Chip extends Connect4Chips> = Arr extends [
	infer A extends Connect4Cell,
	infer B extends Connect4Cell,
	infer C extends Connect4Cell,
	infer D extends Connect4Cell,
	...infer Rest extends Connect4Cell[],
]
	? A extends Chip
		? B extends Chip
			? C extends Chip
				? D extends Chip
					? true
					: HasConsecutiveChips<[B, C, D, ...Rest], Chip>
				: HasConsecutiveChips<[B, C, D, ...Rest], Chip>
			: HasConsecutiveChips<[B, C, D, ...Rest], Chip>
		: HasConsecutiveChips<[B, C, D, ...Rest], Chip>
	: false;

type IsWinningRow<Board extends Connect4Cell[][], Chip extends Connect4Chips> = Board extends [
	infer Row extends Connect4Cell[],
	...infer Rest extends Connect4Cell[][],
]
	? HasConsecutiveChips<Row, Chip> extends true
		? true
		: IsWinningRow<Rest, Chip>
	: false;

type IsWinningColumn<
	Board extends Connect4Cell[][],
	Chip extends Connect4Chips,
	Column extends number[] = [],
> = Column["length"] extends 7
	? false
	: HasConsecutiveChips<
				[
					Board[0][Column["length"]],
					Board[1][Column["length"]],
					Board[2][Column["length"]],
					Board[3][Column["length"]],
					Board[4][Column["length"]],
					Board[5][Column["length"]],
				],
				Chip
		  > extends true
		? true
		: IsWinningColumn<Board, Chip, [...Column, 0]>;

type IsWinningDiagonalToRight<
	Board extends Connect4Cell[][],
	Chip extends Connect4Chips,
	I extends number[] = [],
	J extends number[] = [],
	Temp extends Connect4Cell[] = [],
> = I["length"] extends 3
	? J["length"] extends 4
		? IsWinningDiagonalToRight<Board, Chip, [...I, 0], [], []>
		: HasConsecutiveChips<[...Temp, Board[I["length"]][J["length"]]], Chip> extends true
			? true
			: IsWinningDiagonalToRight<
					Board,
					Chip,
					[...I, 0],
					[...J, 0],
					[...Temp, Board[I["length"]][J["length"]]]
				>
	: false;

type RowSet = {
	3: [2, 1, 0];
	4: [3, 2, 1];
	5: [4, 3, 2];
};
type ColumnSet = {
	0: [1, 2, 3];
	1: [2, 3, 4];
	2: [3, 4, 5];
	3: [4, 5, 6];
};
type NextRow = {
	5: 4;
	4: 3;
	3: 2;
};
type NextColumn = {
	0: 1;
	1: 2;
	2: 3;
	3: 4;
};

type IsWinningDiagonalToLeft<
	Board extends Connect4Cell[][],
	Chip extends Connect4Chips,
	I = 5,
	J = 0,
> = I extends keyof NextRow
	? J extends keyof NextColumn
		? HasConsecutiveChips<
				[
					Board[I][J],
					Board[RowSet[I][0]][ColumnSet[J][0]],
					Board[RowSet[I][1]][ColumnSet[J][1]],
					Board[RowSet[I][2]][ColumnSet[J][2]],
				],
				Chip
			> extends true
			? true
			: IsWinningDiagonalToLeft<Board, Chip, I, NextColumn[J]>
		: IsWinningDiagonalToLeft<Board, Chip, NextRow[I], 0>
	: false;

type IsWinning<Board extends Connect4Cell[][], Chip extends Connect4Chips> = IsWinningRow<
	Board,
	Chip
> extends true
	? true
	: IsWinningColumn<Board, Chip> extends true
		? true
		: IsWinningDiagonalToRight<Board, Chip> extends true
			? true
			: IsWinningDiagonalToLeft<Board, Chip> extends true
				? true
				: false;

type IsDraw<Board extends Connect4Cell[][]> = Board extends [
	infer El extends Connect4Cell[],
	...infer Rest extends Connect4Cell[][],
]
	? El[number] extends Connect4EmptyCell
		? false
		: IsDraw<Rest>
	: true;

type FillBoard<
	Board extends Connect4Cell[][],
	Index extends number,
	Val extends Connect4Chips,
> = Board extends [...infer Rest extends Connect4Cell[][], infer Last extends Connect4Cell[]]
	? Last[Index] extends Connect4EmptyCell
		? [...Rest, ConstructRow<Last, Index, Val>]
		: [...FillBoard<Rest, Index, Val>, Last]
	: [];

type Connect4<Input extends GameState, Column extends number> = Input["state"] extends Connect4Chips
	? {
			board: FillBoard<Input["board"], Column, Input["state"]>;
			state: IsWinning<FillBoard<Input["board"], Column, Input["state"]>, "🔴"> extends true
				? "🔴 Won"
				: IsWinning<FillBoard<Input["board"], Column, Input["state"]>, "🟡"> extends true
					? "🟡 Won"
					: IsDraw<FillBoard<Input["board"], Column, Input["state"]>> extends true
						? "Draw"
						: Input["state"] extends "🔴"
							? "🟡"
							: "🔴";
		}
	: never;
