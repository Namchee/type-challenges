/* _____________ Your Code Here _____________ */

type TypeComputed<T> = T extends Record<string, () => unknown>
  ? {
      [Key in keyof T]: ReturnType<T[Key]>;
    }
  : never;

declare function SimpleVue<Data, Computed, Methods>(options: {
  data: (this: Record<string, unknown>) => Data;
  computed: Computed & ThisType<Data & TypeComputed<Computed> & Methods>;
  methods: Methods & ThisType<Data & TypeComputed<Computed> & Methods>;
}): Data & TypeComputed<Computed> & Methods;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fname = this;
      const { fullname } = this;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});
