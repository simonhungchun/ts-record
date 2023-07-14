// string、number、boolean、null、undefined
// let 变量名:类型 = 值
let a: number = 1;
a = 2;
a = 3;
// 类型推导
// 类型的本质: 集合或取值范围
let b: boolean = false; // false true
let c: false = false;
let b1: false | true = false;

let c1: number | string;
let c2: number | "";
c1 = c2!;
// c2 = c1!;
// 类型number | string 兼容 number | ""
// number | "" 兼容于 类型number | string

let d1: false;
let d2: false;
d1 = d2!;
d2 = d1!;
// d1的类型和d2的类型是全等的

c1 = 123;
// 子类型的数据可以赋值给父类型的变量
// 顶部类型 就是所有类型的父类型
// 父类型
// 子类型
// 底部类型 就是所有类型的子类型

// 类型兼容性

let string: String = new String(0);
let isActive: Boolean = new Boolean(0);
// null和undefined
let n: null = null;
let u: undefined = undefined;

// T1 T2 T3 T4
// let t1: T1;
// let t2: T2;
// t1 = t2!;
// t2 = t1!;

let t1: string = u;
let t2: number = u;
let t3: boolean = u;
let t4: null = u;
let t5: undefined = u;
// null 和 undefined是底部类型

// any类型 （typescript => anyscript）
let t6: any = 1;
let t7: any = undefined;
let t8: any = null;
let t9: any = "";
let t10: any = false;
let t11: any;
let t12: any;
t11 = t12;
t6.fn();

let t13: string = t11;
let t14: boolean = t11;

let t15: unknown;
t15 = 13;
// 经过大家的严谨判定 unknown是一个顶部类型
if (typeof t15 === "number") {
  t15.toFixed();
}
t15 = "13";
if (typeof t15 === "string") {
  t15.includes("");
}

// 顶部类型（any unknown）底部类型（any undefined null）
// 类型兼容性 (赋值操作判定)
// A >= B 且 B >= A 则 A === B
// 仅 T >= U 则 U是T的子类型
