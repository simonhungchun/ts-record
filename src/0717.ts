// never表达的是什么？
type T1 = "" & boolean;
// 如何定义函数类型？
// 函数类型：参数类型+返回值类型
const v1 = function (a: number, b: number): number {
  return a + b;
};
const v2 = function () {
  while (true) {
    console.log(123);
  }
};
// 利用类型推导
type T2 = {
  name: string;
  age: number;
  gender: boolean;
  fav: string[];
};
const v3: T2 = {
  name: "cc",
  age: 18,
  gender: false,
  fav: ["123", "234"],
};
// 使用interface（接口）关键字来定义对象类型
interface T3 {
  name: string;
  age: number;
  gender: boolean;
  fav: string[];
}
const v4: T3 = {
  name: "cc",
  age: 18,
  gender: false,
  fav: ["123", "234"],
};
// 定义的变量比接口多了(少了)一些属性是不允许的

// interface如果重名 那么‘混合’

// 定义接口的可选属性
interface T4 {
  name?: string;
  age: number;
  gender: boolean;
  fav: string[];
}
const v5: T4 = {
  age: 18,
  gender: false,
  fav: ["123", "234"],
};
// 接口定义只读属性
interface T5 {
  name?: string;
  readonly age: number;
  gender: boolean;
  fav: string[];
}
const v6: T5 = {
  age: 18,
  gender: false,
  fav: ["123", "234"],
};
v6.gender = true;
// v6.age = 123; 无法给age赋值，因为age是一个只读属性

// 操作符：keyof 类型
type T6 = keyof typeof v6;
type T7 = T5[keyof T5];
type T8 = (typeof v6)[keyof typeof v6];

// 定义接口的任意属性
interface T9 {
  foo: number; // 优先级更高
  [key: string | number | symbol]: any;
}
const v7: T9 = {
  foo: 123,
  0: 123,
  1: 345,
  length: 2,
  [Symbol("age")]: 123,
};
// 对象类型兼容性：
// A extends B 判断A是否兼容于B（B是不是A的父类型）
type T10 = 1 extends number ? true : false;
// 当A兼容B且B也兼容A则A和B全等
type T11 = 1 extends 1 ? (1 extends 1 ? true : false) : false;

interface T12 {
  a: string;
  b: number;
}
interface T13 {
  b: number;
}
interface T14 {}

type T15 = T12 extends T13 ? 1 : 0;

// 函数类型的定义
// 函数声明定义类型：在圆括号内部参数后面定义参数类型 在圆括号后面定义返回值类型
function v8(arr: any[]): number {
  return arr.length;
}
// 1. 在圆括号内部参数后面定义参数类型 在圆括号后面定义返回值类型
let v9 = function (arr: any[] = []): number {
  return arr.length;
};
let v10: (arr: any[]) => number = function (arr) {
  return arr.length;
};
// let v11: (arr: any[]) => number = function (arr: any[]): number {
//   return arr.length;
// };

const sum: (a: number, b: number, c?: string) => number = function (
  m,
  n,
  p = ""
) {
  console.log(p);
  return m + n;
};
sum(1, 2, "hello");

function sumAll(...rest: number[]) {
  return rest.reduce(function (prev, current) {
    return prev + current;
  }, 0);
}
sumAll(1, 2, 3, 4);
// 函数的重载
// $("#app").attr('class', 'abc')
// $("#app").attr('class')
function fn(a: number): number[];
function fn(a: number, b: number): number;
function fn(a: number, b?: number) {
  if (b) {
    return a + b;
  }
  return [a];
}
fn(1);
fn(1, 2);
function attr(dom: HTMLElement, attrname: string): string;
function attr(dom: HTMLElement, attrname: string, attrvalue: string): void;
function attr(dom: HTMLElement, attrname: string, attrvalue?: string) {
  if (typeof attrvalue === "string") {
    dom.setAttribute(attrname, attrvalue);
  } else {
    return dom.getAttribute(attrname);
  }
}
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | undefined {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
reverse(123);

// 函数类型的兼容性
// 参数逆变 返回值协变

// type T16 = () => 1;
// type T17 = () => number;

// type T18 = (x: "123", y: string) => void;
// type T19 = (x: string | "123", y: "") => void;

// type T20 = T19 extends T18 ? 1 : 0;
// type T21 = { x: "" } extends { x: string } ? true : false;

// 函数的兼容性判断
// 函数的类型是取决于 参数类型和返回类型搭配的。
// 控制变量原则：
// 控制参数个数类型相同
type T22 = () => string | number;
type T23 = () => string;
type T24 = () => number;

type T25 = T23 extends T22 ? "T22>=T23" : never;
type T26 = T24 extends T22 ? "T22>=T24" : never;
// 如果只考虑函数的返回值类型 那么函数的类型兼容性取决于函数的返回值的兼容性

// 控制返回值类型相同
type T27 = (x: string) => number;
type T28 = (x: number) => number;

type T29 = T27 extends T28 ? "T28>=T27" : never;
type T30 = T28 extends T27 ? "T27>=T28" : never;

type T31 = (x: 1 | 2 | 3) => number;
type T32 = (x: number) => number;

type T33 = T31 extends T32 ? "T32>=T31" : never;
type T34 = T32 extends T31 ? "T31>=T32" : never;
// T31.x <= T32.x => T31 >= T32
// T >= U => F(T) <= F(U)

// 如果函数A是函数B的父类型
// A的参数为B参数的子类型
// A的返回值为B的父类型

const ele = document.getElementById("app");
ele?.addEventListener("click", function (e) {});

// 交叉类型(对象中的使用)
type T35 = { a: number; b: "123" };
type T36 = { b: string };

type T37 = T35 & T36; // { a: number; b: string }

let v37: T37 = {
  a: 1,
  b: "123",
};

// in关键字 (只能“循环”联合类型)
let v38 = [1, 2, 3, 4, 5] as const; // 1|2|3|4|5
type _T38 = {
  [key in (typeof v38)[number]]: key;
};
type T38 = { 1: 1; 2: 2; 3: 3; 4: 4; 5: 5 };

let o = {
  a: "123",
  b: 123,
  c: false,
};
type T39 = typeof o;
type T40 = keyof T39;
type T41 = {
  readonly [k in T40]?: T39[k];
};
