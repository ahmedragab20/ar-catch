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

## Installation

### Package manager

Using npm:

```bash
$ npm install ar-catch
```

Using yarn:

```bash
$ yarn add ar-catch
```

Using pnpm:

```bash
$ pnpm add ar-catch
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
        //  such as headers, etc.
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


    🎉 congratulations, you just made your first request 🎉
};
```
