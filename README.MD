# 欢迎使用EasyType：一个基于TypeScript的动态类型反射系统

众所周知JavaScript因为语言的特性，无法与JAVA一样提供一种动态类型反射机制，而市面上又缺乏完善的解决方案，EasyType的出现是为了从根本上解决这个问题, 赋予开发者尤其是后端开发者更多的能力。

###### 警告：单元测试未完全覆盖，切勿用于商业项目。
###### 开源只是为了交流技术、不想把一个好的理念埋没在个人手里，由于个人时间关系，本项目可能不会得到良好的维护，期望有成熟的公司或者团队能够改进或者重构它，让他成为node后端必备框架之一。

### 项目起源
从18年开始，我就决定让团队使用node+typescript来开发后端服务，经过一年多的实践，发现各种库都有一套自己的“建模语言”来申明类型，比如mongoose、数据验证器、GraphQL、GRPC、swagger等等。这不禁让我迷惑不解，为什么用了typescript以后还要重复写这么多的类型申明？于是我从19年初开始开发了这个框架陆续来实现。刚开始是通过AST来分析mongoose的schema生成模型接口和定义，但是没有从根本上解决问题，所以接下来是通过直接分析typescript的类申明来实现，后续又引入了json-schema标准，最后对枚举、方法、联合类型、泛型都提供了支持。

### 设计目标
- 能够覆盖typescript绝大多数的类型，尤其是对泛型能提供完善的支持。
- 尽可能的减少侵入，无需改动任何的代码
- 支持Transpile模式，无需构建即可直接运行，而且编译速度非常快
- 能够通过cli运行与构建项目,也能够脱离cli运行或者构建项目

### 方案对比
| 项目  | 对比  |
| ------------ | ------------ |
| [io-ts ](https://github.com/gcanti/io-ts "io-ts ")| 定义了一套类型声明，设计目标可能主要是解决IO传输中的编码与解码  |
| [class-transformer](https://github.com/typestack/class-transformer "class-transformer")  |  定义了一套修饰器，只支持部分的TS类型 |
| [typescript-json-schema](https://github.com/YousefED/typescript-json-schema "typescript-json-schema") |  需要调用CLI生成JSON格式的类型声明，非动态 |
| [tsruntime](https://github.com/goloveychuk/tsruntime "tsruntime") |  是和typescript-json-schema一样在TypeCheck阶段实现，因此不支持Transpile模式 |
| [type-reflect](https://github.com/andywer/type-reflect "type-reflect") |  类似，但功能不够完善 |

### 使用场景
引入EasyType将为你的后端开发带来更大的想象空间，其中我们团队用到的部分就包括：
- 不用添加任何代码，将TS类申明直接转换成mongoose schema
- 不用添加任何代码，可以直接使用各种json-schema数据验证器
- 不用添加任何代码，动态生成API文档，稍微改动就能生成OpenAPI规范的swagger文档，你的接口改动团队其他成员可以随时看到。
- 不用添加任何代码，动态生成RPC声明，比如一键生成GRPC proto申明文件，把微服务开发变成一件很轻松的事情。
- 由于后端能够输出完整的类型申明，因此前端（尤其是后台开发）能够快速的构建出数据显示、操作界面，会使开发变得更快速高效。

### 原理
通过typescript的自定义transform，在编译阶段把类型写入类描述中，最后在运行时生成json-schema标准的类型说明。
```javascript
@Reflectable()
export class User extends Document {
    /** 用户ID */
    uid: number;

    /** 用户名 */
    username: string;
}
```
比如以上代码，通过编译器将变为:
```javascript
export class User extends Document {
    $easy.IsObject({
        $type: 1,
        $properties: {
            uid: {
                $type: 2,
                $description: "\u7528\u6237ID",
                $ref: Number
            },
            username: {
                $type: 2,
                $description: "\u7528\u6237\u540D",
                $ref: String
            },
        },
        $target: User,
        $id: "User",
        $extends: mongoose_1.Document
    })
    private $metadata: any;
}
```
通过在运行时调用 Schema.getMetadata(User), 即可得到User的类型声明(json-schema):
```javascript
{
    "type": "object",
    "properties": {
        "_id": {
            "type": "string",
            "format": "OBJECT_ID",
            "description": "ID"
        },
        "uid": {
            "type": "number",
            "description": "用户ID",
        },
        "username": {
            "type": "string",
            "description": "用户名",
        }
    },
    "required": [
        "_id",
        "uid",
        "username"
    ],
    "$id": "User",
    "$x": "Document"
}
```
### 更强大的ENUM
在typescript中enum的存在更像是为了描述类型（你在运行时很难分清哪个是key,哪个是value），这也就不能与JAVA一样提供一些操作, 因此EasyType在编译阶段增加一些方法，使之变得更加灵活和强大，借助这些特性我们就能够实现无缝输出ENUM信息到API文档，而无需再书写任何的注释或者代码。

```javascript
export interface EnumInterface<T> {
    readonly keys: string[];

    readonly values: number[] | string[];

    getValue(key: string): Undefinable<T>;

    hasValue(value: any): boolean;

    getKeys(value: any): string[];

    getKey(value: any): Undefinable<string>;

    hasKey(key: string): boolean;

    getDescription(key: string): Undefinable<string>;
}

export type Enum<T = any, V = number | string> =
    { readonly [P in keyof T]: T[P]; }
    & Readonly<EnumInfo>
    & EnumInterface<V>
    ;

```
现在你可以通过 Enum&lt;Foo&gt;.Keys 和 Enum&lt;Bar&gt;.values 获得键值，也可以拿到对应的像这样的类型申明：
```javascript
    {
        "name": "AssetType",
        "description": "用户资产类型",
        "fields": [
            {
                "key": "BALANCE",
                "value": 1,
                "description": "账户余额"
            },
            {
                "key": "POINTS",
                "value": 3,
                "description": "账户积分"
            }
        ]
    },
```

### 部分继承
使用关键词extends会继承基类所有的属性，有时候如果你想部分继承基类属性，可以使用Inherits语法糖：
```javascript
@Reflectable()
export class UserLoginDto implements Inherits<User> {
    username: string;
    password: string;
}

```
### 方法反射
方法的注释、修饰符、参数、返回值等信息会被标注到Metadata中，可以通过 Reflect.getMetadata('easy:metadata', target, propertyKey) 获取。

### 还有哪些问题？
- 还没来得及做完整的单元测试，所以暂时不能用于商业项目
- 泛型目前编译器这块已完成，但是运行时由于时间关系还未能提供支持
- 由于设计原因，只能支持类的输出，不支持interface和type的输出，因为前者在js运行时以function存在，后者不存在于运行时，或许后面会想办法支持。
- 低版本的TypeScript（3.7以下）会有一些问题，所以用最新的TSC编译吧。

### 插播一条广告
即将推出基于EasyType+nest.js的全家桶开发包，基本上把EasyType的使用场景都实现了，尽情期待。


