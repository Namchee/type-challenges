type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WinMatchup = {
	'👊🏻': '✌🏽',
	'🖐🏾': '👊🏻',
	'✌🏽': '🖐🏾',
}

type WhoWins<
	T extends RockPaperScissors,
	U extends RockPaperScissors
> = WinMatchup[U] extends T
	? 'win'
	: WinMatchup[T] extends U
		? 'lose'
		: 'draw';
