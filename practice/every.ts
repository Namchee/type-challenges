type Every<Arr extends unknown[], Value> = Arr[number] extends Value ? true : false;

type TestOne = Every<[0, 0, 0], 0>
type TestTwo = Every<[0, 0, 0, 0, 1], 0>
