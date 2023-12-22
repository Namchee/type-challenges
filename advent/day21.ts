type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '],
  ['  ', '  ', '  '],
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type RowMap = {
  'top': 0,
  'middle': 1,
  'bottom': 2,
};

type ColMap = {
  'left': 0,
  'center': 1,
  'right': 2,
}

type GetIndex<
  Pos extends TicTacToePositions
> = Pos extends `${infer Row extends keyof RowMap}-${infer Col extends keyof ColMap}`
  ? [RowMap[Row], ColMap[Col]]
  : never

type ConstructRow<
  Row extends TicTacToeCell[],
  Col extends number,
  Value extends TicTacToeChip
> = IsValid<Row, Col> extends true
  ? Col extends 0
    ? [Value, Row[1], Row[2]]
    : Col extends 1
    ? [Row[0], Value, Row[2]]
    : [Row[0], Row[1], Value]
  : Row

type IsValid<Row extends TicTacToeCell[], Col extends number> = Row[Col] extends TicTacToeChip ? false : true

type FillBoard<
  Board extends TicTacToeBoard,
  Value extends TicTacToeChip,
  Position extends TicTacToePositions,
> = GetIndex<Position>[0] extends 0
  ? [ConstructRow<Board[0], GetIndex<Position>[1], Value>, Board[1], Board[2]]
  : GetIndex<Position>[0] extends 1
    ? [Board[0], ConstructRow<Board[1], GetIndex<Position>[1], Value>, Board[2]]
    :  [Board[0], Board[1], ConstructRow<Board[2], GetIndex<Position>[1], Value>]

type IsRowFilled<Row extends TicTacToeCell[]> = Row extends [infer Cell, ...infer Rest extends TicTacToeCell[]]
  ? Cell extends TicTacToeEmptyCell
    ? false
    : IsRowFilled<Rest>
  : true;

type IsFilled<Board extends TicTacToeBoard> = Board extends [infer Row extends TicTacToeCell[], ...infer Rest extends TicTacToeBoard]
  ? IsRowFilled<Row> extends true
    ? IsFilled<Rest>
    : false
  : true

type WinningPair = [
  [0, 0, 0, 1, 0, 2],
  [1, 0, 1, 1, 1, 2],
  [2, 0, 2, 1, 2, 2],
  [0, 0, 1, 0, 2, 0],
  [0, 1, 1, 1, 2, 1],
  [0, 2, 1, 2, 2, 2],
  [0, 0, 1, 1, 2, 2],
  [0, 2, 1, 1, 2, 0],
]

type IsWin<
  Board extends TicTacToeBoard,
    Value extends TicTacToeChip,
  Check extends number[][] = WinningPair,
> = Check extends [infer El extends number[], ...infer Rest extends number[][]]
  ? Board[El[0]][El[1]] extends Value
    ? Board[El[2]][El[3]] extends Value
      ? Board[El[4]][El[5]] extends Value
        ? true
        : IsWin<Board, Value, Rest>
      : IsWin<Board, Value, Rest>
    : IsWin<Board, Value, Rest>
  : false

type TicTacToe<
  Game extends TicTacToeGame,
  Position extends TicTacToePositions
> = Game['state'] extends '❌' | '⭕'
  ?
    {
      board: FillBoard<Game['board'], Game['state'], Position>,
      state: IsWin<FillBoard<Game['board'], Game['state'], Position>, '⭕'> extends true
        ? '⭕ Won'
        : IsWin<FillBoard<Game['board'], Game['state'], Position>, '❌'> extends true
          ? '❌ Won'
          : IsFilled<FillBoard<Game['board'], Game['state'], Position>> extends true
            ? 'Draw'
            : FillBoard<Game['board'], Game['state'], Position> extends Game['board']
              ? Game['state']
              : Game['state'] extends '❌' ? '⭕' : '❌'
    }
  : never;
