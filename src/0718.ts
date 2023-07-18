// 类型断言 (as、 <T>)
let v1: unknown = 123;
interface T1 {
  [k: keyof any]: any;
}
(v1 as T1).fn = function () {};
(<T1>v1).fn();
type T2 = keyof any;
let v2: number = 1;
(<1>v2).valueOf();

let v3 = {};
(function () {
  (v3 as { a: number }).a = 1;
})();
console.log((<{ a: number }>v3).a);
const ele = document.getElementById("abc");
(ele as HTMLElement).addEventListener("abort", function () {});
// 非空断言 (排除undefind和null的)
// HTMLElement | null
// HTMLElement
const ele1 = document.getElementById("app");
ele1!.addEventListener("abort", function () {});
function v4(value: string | null | undefined) {
  return value!.length;
}
export default {};

// 确定赋值断言
let v5!: number;
let v6!: 1 | 2;
function f() {
  v5 = 123;
  v6 = 2;
}
f();
v5 = v6;

// 常量断言 （ts默认从宽推导）
let v7 = 1 as const;
const v8 = 1;

// number => []
let v9 = 1;
let v10 = [];

// (广)泛(类)型
// 类型参数
// 定义一个函数 参数类型A和返回值类型A一样
// function v11(value: string): string;
// function v11(value: boolean): boolean;
// 泛型函数
function v11<A>(value: A): A {
  return value;
}
v11<string>("");
v11<[]>([]);
v11<1>(1);

v11("");
v11([]);
v11(1);
// 泛型接口
interface T3<T> {
  a: string;
  b: null;
  c: T;
}

let v12: T3<string> = {
  a: "",
  b: null,
  c: "",
};

// 泛型类型
type T4<T> = {
  a: string;
  b: null;
  c: T;
};

let v13: T4<string[]> = {
  a: "",
  b: null,
  c: [""],
};

// T3<T4<number[]>>

let v14: T3<T4<number[]>> = {
  a: "",
  b: null,
  c: {
    a: "",
    b: null,
    c: [1],
  },
};

// 泛型默认类型

type T5<T, U = "", M = boolean, N = null> = T | U | M | N;
let v15: T5<123> = false;

// 条件类型
// extends 位置处在类型表达式中
type T6<T> = T extends true ? any[] : boolean;
let v16: T6<true> = [];
// 泛型约束
// extends 位置处于泛型变量定义的<>内部
type T7<T extends string | number = "1"> = T;

let v17: T7<1 | 2 | "1" | "2"> = 1;
let v18: T7 = "1";

// infer 类型的"解构赋值"
type ArrayFirstItem<T extends any[]> = T extends [infer A, infer B, ...any[]]
  ? A | B
  : never;

type FunctionReturnType<F extends (...rest: any[]) => any> = F extends (
  ...rest: any[]
) => infer X
  ? X
  : never;

type T8 = ArrayFirstItem<[string, number, boolean]>;

type T9 = FunctionReturnType<() => string>;
