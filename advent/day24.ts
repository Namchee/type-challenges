type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type Length<T extends any[]> =
    T extends { length: infer L } ? L : never;
type BuildTuple<L extends number, T extends any[] = [], Value = any> =
    T extends { length: L } ? T : BuildTuple<L, [...T, Value], Value>;

type Add<A extends number, B extends number> =
    Length<[...BuildTuple<A>, ...BuildTuple<B>]>;
type Subtract<A extends number, B extends number> =
    BuildTuple<A> extends [...(infer U), ...BuildTuple<B>]
        ? Length<U>
        : never;

type FindSantaColumn<
	Input extends MazeItem[],
	Column extends number[] = []
> = Input extends [infer El, ...infer Rest extends MazeItem[]]
	? El extends '🎅'
		? Column['length']
		: FindSantaColumn<Rest, [...Column, 0]>
	: never;
type FindSanta<
	Input extends MazeMatrix,
	Row extends number[] = [],
> = Input extends [infer El extends MazeItem[], ...infer Rest extends MazeMatrix]
	? '🎅' extends El[number]
		? [Row['length'], FindSantaColumn<El>]
		: FindSanta<Rest, [...Row, 0]>
	: never;

type RowLimit<Input extends MazeMatrix> = Input['length'];
type ColumnLimit<Input extends MazeMatrix> = Input extends [infer El extends MazeItem[], ...infer _] ? El['length'] : never;

type Escape<Input extends MazeMatrix> = Input extends [infer El extends MazeItem[], ...infer Rest extends MazeMatrix]
	? [BuildTuple<El['length'], [], DELICIOUS_COOKIES>, ...Escape<Rest>]
	: [];

type RemoveSantaFromRow<Input extends MazeItem[]> = Input extends [infer El, ...infer Rest extends MazeItem[]]
	? El extends '🎅'
		? [Alley, ...RemoveSantaFromRow<Rest>]
		: [El, ...RemoveSantaFromRow<Rest>]
	: [];
type RemoveSanta<Input extends MazeMatrix> = Input extends [infer El extends MazeItem[], ...infer Rest extends MazeMatrix]
	? [RemoveSantaFromRow<El>, ...RemoveSanta<Rest>]
	: [];

type FillSantaToColumn<
	Input extends MazeItem[],
	Column extends number,
	Itr extends number[] = [],
> = Input extends [infer El, ...infer Rest extends MazeItem[]]
	? Itr['length'] extends Column
		? ['🎅', ...FillSantaToColumn<Rest, Column, [...Itr, 0]>]
		: [El, ...FillSantaToColumn<Rest, Column, [...Itr, 0]>]
	: [];
type FillSanta<
	Input extends MazeMatrix,
	Row extends number,
	Column extends number,
	Itr extends number[] = [],
> = Input extends [infer El extends MazeItem[], ...infer Rest extends MazeMatrix]
	? Itr['length'] extends Row
		? [FillSantaToColumn<El, Column>, ...FillSanta<Rest, Row, Column, [...Itr, 0]>]
		: [El, ...FillSanta<Rest, Row, Column, [...Itr, 0]>]
	: [];

type MoveUp<Input extends MazeMatrix> = FindSanta<Input> extends [infer Row extends number, infer Col extends number]
	? Row extends 0
		? Escape<Input>
		: Input[Subtract<Row, 1>][Col] extends Alley
			? FillSanta<RemoveSanta<Input>, Subtract<Row, 1>, Col>
			: Input
	: never;
type MoveLeft<Input extends MazeMatrix> = FindSanta<Input> extends [infer Row extends number, infer Col extends number]
	? Col extends 0
		? Escape<Input>
		: Input[Row][Subtract<Col, 1>] extends Alley
			? FillSanta<RemoveSanta<Input>, Row, Subtract<Col, 1>>
			: Input
	: never;
type MoveRight<Input extends MazeMatrix> = FindSanta<Input> extends [infer Row extends number, infer Col extends number]
	? Col extends Subtract<ColumnLimit<Input>, 1>
		? Escape<Input>
		: Add<Col, 1> extends keyof MazeMatrix[number]
			? Add<Col, 1> extends number
				? Input[Row][Add<Col, 1>] extends Alley
					? FillSanta<RemoveSanta<Input>, Row, Add<Col, 1> >
					: Input
				: never
			: never
	: never;
type MoveDown<Input extends MazeMatrix> = FindSanta<Input> extends [infer Row extends number, infer Col extends number]
	? Row extends Subtract<RowLimit<Input>, 1>
		? Escape<Input>
		: Add<Row, 1> extends keyof MazeMatrix
			? Add<Row, 1> extends number
				? Input[Add<Row, 1>][Col] extends Alley
					? FillSanta<RemoveSanta<Input>, Add<Row, 1>, Col>
					: Input
				: never
			: never
	: never;

type Move<Input extends MazeMatrix, Direction extends Directions> = Direction extends 'up'
	? MoveUp<Input>
	: Direction extends 'left'
		? MoveLeft<Input>
		: Direction extends 'right'
			? MoveRight<Input>
			: Direction extends 'down'
				? MoveDown<Input>
				: Input;
