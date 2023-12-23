type Any<Arr extends unknown[], Value> = Value extends Arr[number] ? true : false;

type TestThree = Any<[0, 0, 0], 0>
type TestFour = Any<[0, 0, 0, 0, 1], 0>
type TestFive = Any<[1, 2, 3], 0>
