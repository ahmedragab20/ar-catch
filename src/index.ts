import useCatchLib from "./lib/index";

const { $catch } = useCatchLib

const useCatch = $catch()

const fetch = useCatch('https://jsonplaceholder.typicode.com/todos/1')

console.log(
  `%cHere's the main.ts file!`,
  "color: #0bf; font-size: 2rem; font-weight: bold;"
);
