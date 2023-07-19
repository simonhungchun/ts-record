// 泛型工具类型
// 将对象类型的所有属性变为可选 _Partial
// in关键字只能循环联合类型
// 如何将对象类型的所有key转换为联合类型 keyof
type _Partial<T> = {
  [k in keyof T]?: T[k];
};
type T1 = {
  a: number;
  b?: string;
  c?: boolean;
};
type T2 = _Partial<T1>;
export default {};
// 实现_Readonly让所有属性只读

type _Readonly<T> = {
  readonly [k in keyof T]: T[k];
};
type T3 = _Readonly<T1>;

// 实现一个_Required让所有属性必选
type _Required<T> = {
  [k in keyof T]-?: T[k];
};
type T4 = _Required<T1>;
// 实现一个_NotReadonly去掉所有属性的只读
type _NotReadonly<T> = {
  -readonly [k in keyof T]: T[k];
};
// 从对象类型中挑选部分属性 组成一个新的类型 _Pick
type _Pick<T, U extends keyof T> = {
  [k in U]: T[k];
};
type T5 = _Pick<T1, "a" | "c">;
// 实现一个_Record构造一个对象
type _Record<T extends keyof any, U> = {
  [k in T]: U;
};
type T6 = _Record<"a", "x">; // {a: 'x'}
type T7 = _Record<"a" | "b", "x">; // {a: 'x', b: 'x'}
type T8 = _Record<"a" | "b", any>; // {a: any, b: any}
type T9 = _Record<keyof any, any>;

// 排除 _Exclude
// 在条件类型中 联合类型操作本质上是对联合类型的每一个成员的操作
// A | B | C extends F 等价于 A extends F | B extends F | C extends F
type _Exclude<T, U> = T extends U ? never : T; // "a"|"b"
type T10 = _Exclude<"a" | "b" | "c", "c">; // 'a'|'b'

// type T11<T> = T extends "a" | "b" | "c" ? T : never;

type _Extract<X, Y> = X extends Y ? X : never;
type T11 = _Extract<"a" | "b" | "c", "c">; // 'a'|'b'

// 定义一个getValue的函数
function getValue<T, K extends keyof T>(o: T, k: K): T[K] {
  return o[k];
}
function getValue1<T extends _Record<keyof any, any>, K extends keyof T>(
  o: T,
  k: K
): T[K] {
  return o[k];
}
// 类型流转断层
getValue({ a: 1, b: "2", c: false }, "b");
getValue1({ a: 1, b: "222" }, "b");

// 如何获取数组类型的第一个类型
type ArrayFirstItem<T> = T extends [infer F, ...infer R] ? [F, R] : never;

// type Reverse<T>

// type T12 = ArrayFirstItem<[number, string, boolean]>;

// 如何取到字符串类型的第一个字符类型
type FirstLetter<S> = S extends `${infer F}${infer R}` ? `${R}${F}` : never;

type T13 = FirstLetter<"abc">;

type Reverse<
  S extends string,
  U extends string = ""
> = S extends `${infer F}${infer R}` ? Reverse<R, `${F}${U}`> : U;
// S 必须是字符串 U必须字符串具有""的默认值
// S = "abc" U =""
// 判断条件 ： S extends `${infer F}${infer R}`
// 条件满足： "abc" extends `{F = 'a'}{ R = 'bc'}`
// 执行Reverse<'bc', 'a'>
// S = "bc" U ="a"
// 判断条件 ： S extends `${infer F}${infer R}`
// 条件满足： "bc" extends `{F = 'b'}{ R = 'c'}`
// 执行Reverse<'c', `ba`>
// S = "c" U ="ba"
// 判断条件 ： S extends `${infer F}${infer R}`
// 条件满足： "c" extends `{F = 'c'}{ R = ''}`
// 执行Reverse<'', `cba`>
// 判断条件 ： S extends `${infer F}${infer R}`
// 不满足 返回U = 'cba'
type T14 = Reverse<"abc">;

// [number, string]
type Push<A extends any[], I> = [...A, I];
type Unshift<A extends any[], I> = [I, ...A];
type Shift<A extends any[]> = A extends [infer F, ...infer R] ? R : never;
type T15 = Push<[number, string], undefined>;
type T16 = Unshift<[number, string], undefined>;
type T17 = Shift<[number, string, null, boolean]>;

// Split<"a:b:c:d", ":">    ["a","b","c","d"]
type Split<
  S extends string,
  M extends string
> = S extends `${infer F}${M}${infer X}` ? [F, X] : never;

type T18 = Split<"a:b:c:d", ":">;

type Fill<N extends number, R extends any[] = []> = R["length"] extends N
  ? R
  : Fill<N, [1, ...R]>;
type T20 = [1, 1, 1, 1];
type T21 = [1, 1];
type Concat<A extends any[], B extends any[]> = [...A, ...B];
type T22 = Concat<T20, T21>;
type T23 = T22["length"];
type T24 = Fill<10>;

type Sum<A extends number, B extends number> = Concat<
  Fill<A>,
  Fill<B>
>["length"];

type T25 = Sum<100, 23>;

/* 练习题：
01. 请定义一个高级类型StartsWith<A, B>判断字符串字面量类型是否以某个前缀字符类型开头。
    StartsWith<"typescript", "t">  // true
    StartsWith<"typescript", "a">  // false
10. 请定义一个高级类型Replace<A, B, C>可以在A中把B替换为C。
    Replace<"typescript", "type", "java"> // javascript
    Replace<"typescript", "java", "js">   // typescript
11. 请定义一个高级类型Trim<A> 能够去掉字符串字面量类型中的空白字符。
    Trim<"a b c"> // "abc"
100.请定义一个高级类型CapitalizeStr<A> 把一个字符串字面量类型的A 转为首字母大写(提示：使用内置类型Uppercase)。
    CapitalizeStr<"abc"> // Abc
101.请定义一个高级类型CamelCase<A> 将字符串字面量类型驼峰化处理。
    CamelCase<"dong_dong_dong"> // "dongDongDong"
110.请定义一个高级类型MapType<A> 将key和value作重复。
    MapType<{a:1, b: 2}> // {aa: [1,1], bb: [22]}
 */
// TypeScript 对联合类型在条件类型中使用时的特殊处理：会把联合类型的每一个元素类型单独传入做类型计算，最后合并。
type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;

type T = UppercaseA<"a" | "b" | "c">;
