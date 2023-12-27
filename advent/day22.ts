/** Because "dashing" implies speed */
type Dasher = '💨';
type Dancer = '💃';
type Prancer = '🦌';
type Vixen = '🌟';
type Comet = '☄️';
type Cupid = '❤️';
type Donner = '🌩️';
type Blitzen = '⚡';
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Uniq<T extends Reindeer[]> = T extends [infer El extends Reindeer, ...infer Rest extends Reindeer[]]
	? El extends Rest[number]
		? false
		: Uniq<Rest>
	: true;

type Flatten<A extends Reindeer[][]> = A extends [infer El extends Reindeer[], ...infer Rest extends Reindeer[][]]
  ? [...El, ...Flatten<Rest>]
  : []
type IsRowValid<Board extends Reindeer[][][]> = Uniq<Flatten<Board[number]>> extends true ? true : false

type NextSet = {
	0: 1,
	1: 2,
	2: 3,
}
type GenerateColumnCollection<Board extends Reindeer[][][], Set extends number, Col extends number> = [
	Board[0][Set][Col],
	Board[1][Set][Col],
	Board[2][Set][Col],
	Board[3][Set][Col],
	Board[4][Set][Col],
	Board[5][Set][Col],
	Board[6][Set][Col],
	Board[7][Set][Col],
	Board[8][Set][Col],
]
type IsColumnValid<
	Board extends Reindeer[][][],
	Set extends number = 0,
	Col extends number = 0,
> = Set extends keyof NextSet
	? Col extends keyof NextSet
		? Uniq<GenerateColumnCollection<Board, Set, Col> > extends true
			? IsColumnValid<Board, Set, NextSet[Col]>
			: false
		: IsColumnValid<Board, NextSet[Set], 0>
	: true

type IsAreaValid<
	Board extends Reindeer[][][],
	Set extends number = 0
> = Board extends [infer A extends Reindeer[][], infer B extends Reindeer[][], infer C extends Reindeer[][], ...infer Rest extends Reindeer[][][]]
	?	Set extends keyof NextSet
		? Uniq<[...A[Set], ...B[Set], ...C[Set]]> extends true
			? IsAreaValid<Board, NextSet[Set]>
			: false
		: IsAreaValid<Rest, 0>
	: true

type Validate<Board extends Reindeer[][][]> = [IsRowValid<Board>, IsColumnValid<Board>, IsAreaValid<Board>][number] extends true
	? true
	: false;
