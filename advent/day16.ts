type FindSanta<
	Matrix extends string[][],
	Row extends unknown[] = [],
	Col extends unknown[] = []
> = Row['length'] extends Matrix['length']
	? never
	: '🎅🏼' extends Matrix[Row['length']][number]
		?	'🎅🏼' extends Matrix[Row['length']][Col['length']]
			? [Row['length'], Col['length']]
			: FindSanta<Matrix, Row, [...Col, 0]>
		: FindSanta<Matrix, [...Row, 0], Col>;
