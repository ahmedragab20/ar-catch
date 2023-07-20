<h1 align="center">
   <b style="font-family: monospace, monospace;">
        AR-CATCH
    </b>
</h1>

<p align="center">
    Supercharge your native fetch() method with enhanced flexibility and an integrated caching system, which can be seamlessly used within requests or as a standalone feature.
</p>

<div align="center">

[![npm version](https://img.shields.io/badge/NPM-v0.0.11-red)](https://www.npmjs.com/package/ar-catch)
[![install size](https://img.shields.io/badge/Download_size-47.5kB-blue)](https://packagephobia.com/result?p=ar-catch)
[![minzipped](https://img.shields.io/badge/Minzipped_size-3.3%20kB-orange)](https://bundlephobia.com/package/ar-catch@0.0.11)

</div>

<div align="center">

[![NPM](https://nodei.co/npm/ar-catch.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ar-catch/)

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Package manager](#package-manager)
- [Features](#features)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Object Oriented Usage](#object-oriented-usage)
  - [Direct URL Usage](#direct-url-usage)
- [API](#api)
  - [$catch()](#catch)
  - [useCache()](#usecache)
    - [example](#example)
  - [$catch() options table](#catch-options-table)
  - [$catch() options object table](#catch-options-object-table)
    - [Object Oriented Usage](#object-oriented-usage-1)
    - [Direct URL Usage](#direct-url-usage-1)
  - [issues you might encounter](#issues-you-might-encounter)
- [Final Words](#final-words)
- [License](#license)
- [Support](#support)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)

## Installation

### Package manager

Using npm:

```bash
npm install ar-catch
```

Using yarn:

```bash
yarn add ar-catch
```

Using pnpm:

```bash
pnpm add ar-catch
```

Using bower:

```bash
$ bower install ar-catch
```

## Features

- **super powered fetch()🚀** - The goal behind the library is to provide a supercharged fetch() method, with flexible syntax and some other cool features such as caching, which can be used within requests or as a standalone feature and interceptors, interceptors are functions that are called before and after a request is made, they can be used to modify the request or response objects, or to handle errors, and state management, which is a feature that allows you to store data in a global state and access it from anywhere in your application, etc.
- **caching system📮** - The library provides a simple caching system, which can be used within requests or as a standalone feature, it allows you to cache responses and retrieve them later. will talk about it in more details later but it's good to know that it will more advanced in the future.
- **interceptors 👨🏻‍✈️** - Interceptors are functions that are called before and after a request is made, they can be used to modify the request or response objects, or to handle errors.
- **state management 🏬** - State management is a feature that allows you to store data in a global state and access it from anywhere in your application. just to mention, it sill experimental and not fully supported yet but it will be in the future.
- **flexible syntax 🤝🏻** - The library provides a flexible syntax, which allows you to use it in different ways
- **lightweight 🏋🏻‍♂️** - The library is very lightweight, it's only 3.3 kB minified and gzipped.
- **no dependencies 🖖🏻** - The library has no dependencies, it's completely standalone.
- **typescript support 💙** - The library is written fully in typescript, so it has a built-in typescript support.
- **developer friendly ❤️** - The library is developer friendly, it has a very clean and well documented codebase, and it's open source, so you can contribute to it if you want.

## Usage

### Basic usage

```js
import arCatch from 'ar-catch';

const { useCache, $catch } = arCatch; // note that it's not a function, you don't need to call it

// you don't have to name it $useCache, you can name it whatever you want
const $useCatch = $catch({
    // base url
    baseURL: 'https://jsonplaceholder.typicode.com',
    // you can use this alias anywhere in your application to access the library
    alias: 'anything',
    // default options
    defaultOptions: {
        // think of it as the default options for the fetch() method that you wanna send with every request,
        // such as headers, etc.
        // NOTE: the naming is exactly the same as the fetch() method
        // and that because you're literally sending these options to the fetch() method in the background
        headers: {
            'Content-Type': 'application/json',
        },
    }
    // interceptors
    // 1. onReq:
    onReq: (config) => {
        // do something with the config object
        return config;
    },
    // 2. onRes:
    onRes: (response) => {
        // do something with the response object
        return response;
    },
    // 3. onErr:
    onErr: (error) => {
        // do something with the error object
        return error;
    },
})

const url = 'https://jsonplaceholder.typicode.com/todos/1';

const getTodo = async () => {
    // there's more advanced ways to use the library,
    // but this is the basic usage
    // it simply will send a GET request to the url (with the default options, don't worry👀)
    const response = await $useCatch(url);
    console.log(response);


    `🎉 congratulations, you just made your first request 🎉`
};
```

<!-- Tip -->

`Look: that was the basic usage, we have three ways to use the library, the basic usage, and two other ones,`

`the first will name it "Object Oriented" Usage (I'm sorry about the name, i know you have bad experiences with it😂),`

`and the second will name it "Direct URL" Usage, and you've already seen one of it's examples, which is the basic usage.`

`yes, the basic usage is simply the "Direct URL" Usage, but without the options object. you'll see what i mean later.`

`so, let's start with the "Object Oriented" Usage.`

### Object Oriented Usage

```js
// you'll know why i chose this name from the syntax

const getTodo = async () => {
    const response = await $useCatch({
      // this is the default method, so you don't have to specify it
      method: "GET",
      /**
       * here you have two options
       * 1. you can use the "ep" property, which stands for "endpoint"
       * 2. you can use the "fullPath" property, which stands for "full path"
       * it's important to know that you can't use both of them at the same time
       *
       * will discuss the difference between them later in the options table section.
       */
      fullPath: URL,
      // this options object will be combined with the default options object
      // but it will override the default options object if there's a conflict
      // ex: if you have a "headers" property in the default options object with a value of "content-type: "something not similar to this one", and you have a "headers" property in this object with a value of "content-type: "application/json", the value of the "headers" property in the default options object will be overridden with the value of the "headers" property in this object
      options: {
        headers: { "Content-Type": "application/json" },
        // the GET method doesn't support a body,
        // but you can still use it and it'll be handled in the background
        // to fit the fetch() method syntax
        body: {
          products: [
            {
              id: 1,
              quantity: 1,
            },
          ],
        },

        `📑 NOTE:: you still can send any other options that available in the fetch() method`
      },
    });
}
```

### Direct URL Usage

```js
const response = await fetch("carts", {
  // the difference that i should mention here is that
  // the custom options object will include the options that will defined how your request will be handled
  // and anything outside of it will be sent to the fetch() method directly

  customOptions: {
    cache: "PER-SESSION", // the caching strategy, and this will be discussed in a whole section later
    useWithBaseURL: true, // will treat the "carts" as the endpoint not the full path
  },
});
```

## API

### $catch()

`$catch()` is the main function of the library, it's the function that you'll use to send requests, and it has two ways to use it, the first one is the "Object Oriented" Usage, and the second one is the "Direct Link" Usage, and you've already seen both of them.

### useCache()

`useCache()` is a function that you can use to cache your something based on key and value, and it has three caching strategies, which are:

- **PER-SESSION** - The cache will be cleared when the user closes the tab or the browser.
- **RELOAD** - The cache will be cleared when the user reloads the page.
- **NO-CACHE** - Until this moment it's used as the default value, and it's basically just Doesn't do anything. but later on it'll be used to analyze the request and decide whether to cache it or not. or to track the request and cache it if it's repeated. or to help with things like performance, etc. but for now, it's just a placeholder.

#### example

```js
const cache = useCache("RELOAD"); // with that being done, any cache that will be set by the {cache} instant will be cleared when the user reloads the page.

`📑 NOTE:: You can use more that one instance to have all the power possible, or you can create set the cache strategy dynamic as well and it'll work perfectly as well`;

cache.set("key", "value");
cache.isCached("key"); // true/false

console.log(cache.getCachedKeys());
console.log(cache.get("key"));
cache.clearAllCaches();

console.log(cache.getCachedKeys());
console.log(cache.get("key"));
```

### $catch() options table

| Property         | Type       | Description                                                                     |
| ---------------- | ---------- | ------------------------------------------------------------------------------- |
| `baseURL`        | `string`   | The base url that will be used with every request.                              |
| `alias`          | `string`   | The alias that will be used to access the library anywhere in your application. |
| `defaultOptions` | `object`   | The default options that will be used with every request.                       |
| `onReq`          | `function` | The function that will be called when the request is sent.                      |
| `onRes`          | `function` | The function that will be called when the response is received.                 |
| `onErr`          | `function` | The function that will be called when the error is received.                    |

### $catch() options object table

#### Object Oriented Usage

| Property   | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `method`   | `string` | The method that will be used with the request.    |
| `ep`       | `string` | The endpoint that will be used with the request.  |
| `fullPath` | `string` | The full path that will be used with the request. |
| `options`  | `object` | The options that will be used with the request.   |

#### Direct URL Usage

| Property        | Type     | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `customOptions` | `object` | The options that will be used with the request. |

### issues you might encounter

1- `if you're using the alias feature inside a typescript file, and you got an error that says "type is not defined", you can fix it by adding this line to the top of your file, or on the main file of your application (more recommended)`

`hopefully this gonna be fixed soon💚`

```ts
declare global {
  interface Window {
    [your choosen alias]: any;
  }
}
```

## Final Words

`The documentation should give you an over view on how to get started with the library, but in the code you'll find more hints and messages that will help you to understand what each piece of code does`

`if you stuck somewhere, or got confused, just hover of the name of the function or the variable and you'll find a message that will help you to understand what it does`

## License

MIT © [Ahmed Ragab]([https://github.com/ahmedragab20])

## Support

If you like this project, you can support me by giving it a star and sharing it with your friends ⭐🤝🏻

## Contributing

If you have any idea, you can open an issue and let me know about it, or you can open a pull request and contribute.

## Special Thanks

`Alhamdulillah for everything 💚`

`profit Mohamed (peace be upon him) said: "You will not be a true believer until you love for your brother what you love for yourself." [Sahih Al-Bukhari]`

`May Allah bless you all, and thanks for reaching to this point 💚`
