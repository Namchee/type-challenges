type DayCounter<
	Start extends number,
	End extends number,
	Temp extends unknown[] = ArrayOfLength<Start>
> = Temp['length'] extends End
	? Temp['length']
	: Temp['length'] | DayCounter<Start, End, [...Temp, 0]>;

type ArrayOfLength<
	Length extends number,
	Temp extends unknown[] = []
> = Temp['length'] extends Length
	? Temp
	: ArrayOfLength<Length, [...Temp, 0]>;
