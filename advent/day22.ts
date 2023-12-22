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

type Uniq<T extends Reindeer[], Set extends Reindeer[] = []> = T extends [infer El extends Reindeer, ...infer Rest extends Reindeer[]]
	? El extends Set[number]
		? [...Uniq<Rest, Set>]
		: [El, ...Uniq<Rest, [...Set, El]>]
	: [];

type Flatten<A extends Reindeer[][]> = A extends [infer El extends Reindeer[], ...infer Rest extends Reindeer[][]]
  ? [...El, ...Flatten<Rest>]
  : []

type Validate<Board extends Reindeer[][][]> = Uniq<Flatten<Board[number]>>['length'] extends 9 ? true : false
