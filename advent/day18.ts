type Count<T extends string[], Item extends string, Temp extends string[] = []> =
	T extends [infer El, ...infer Rest extends string[]]
		? El extends Item
			? Count<Rest, Item, [Item, ...Temp]>
			: Count<Rest, Item, Temp>
		: Temp['length'];
