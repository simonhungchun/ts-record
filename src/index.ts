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

// 数组的类型定义
// 1. type[]
// 2. Array<type>
let u1: number[] = [1, 2, 3, 4];
let u2: string[] = ["0", "1"];
let u3: Array<boolean> = [false, true];
let u4: Array<undefined> = [undefined];
type Num = number;
type U56 = Num | string | boolean;
// U56这个类型不能准确的反映数组的每一位具体是什么类型，我们可以使用元组来解决这个问题（元组是一种特殊的数组定义）
let u5: U56[] = [1, "1", false, undefined];
let u6: Array<U56> = [1, "1", false, undefined];
// 数组的兼容性如何判断？（协同变化）
// 数组兼容性取决于数组元素的兼容性
let p1: number[];
p1.push(123);
let p2: (1 | 2 | 3)[];
p1 = p2;
// 定义一个数组类型满足 兼容所有数组类型
// any[]、unknown[]
// 定义一个兼容于任何数组的数组类型
// undefined[] null[] any[]
// 多个类型间使用｜联接组成一个类型 （联合类型）
// 通过type关键字给自定义的类型定义名称 以便直接使用名称使用
// type也可以给内置类型给名字
let u7: [number, string, boolean, undefined] = [1, "1", false, undefined];
let u8: [1, "1", false, undefined] = [1, "1", false, undefined];
// 1｜"1"｜ false
// 如果要给一个定义好的元组添加一个元素（必须兼容元组中所有类型组成的联合类型）
u8.push("1");
let u9: [1 | 2, "1" | boolean, false | string, undefined | any] = [
  1,
  "1",
  false,
  undefined,
];
let p3: [] = [];

// 如何控制类型推导的准确性
// 使用as const （常量断言）
let q1 = 1 as const;
let q2 = 1;
let q3 = [1, "2", false] as const;
let q4 = [1, "2", false];

// 在js中 typeof是检测类型的返回字符串
// 在ts中 typeof返回具体的类型

let q11: typeof q1;
let q21: typeof q2;
let q31: typeof q3;
type Q41 = typeof q4;
let q41: Q41;

// 通过q3计算得到一个类型 1 | "2" |  false
type Q32 = (typeof q3)[number];
// 数组类型中对每一个类型的取值[number]

// 交叉类型（交集）
// never
// 交叉类型的结果是取两个类型的公共子类型
type AND = number & 2;
// 联合类型的本质：联合类型的结果是取两个类型的公共父类型
type U4 = 1 | 2;
