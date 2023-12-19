type Item = ['🛹', '🚲', '🛴', '🏄'];

type ArrayOfLength<
	Length extends number,
	Value extends Item[number],
	Result extends Item[number][] = []
> = Result['length'] extends Length
	? Result
	: ArrayOfLength<Length, Value, [...Result, Value]>;

type Rebuild<
	Input extends number[],
	Index extends unknown[] = [], // we don't care about the type here since it's only used for counters
	Result extends unknown[] = []
> = Input extends [infer Amount extends number, ...infer Rest extends number[]]
	? Index['length'] extends Item['length']
		? Rebuild<Rest, [0], [...Result, ...ArrayOfLength<Amount, Item[0]> ] >
		: Rebuild<Rest, [...Index, 0], [...Result, ...ArrayOfLength<Amount, Item[Index['length']]> ] >
	: Result;
