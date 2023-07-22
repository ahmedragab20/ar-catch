import useCatch from "./lib";

useCatch.useCache("NO-CACHE").get("test");
console.log(
  `%cHere's the main.ts file!`,
  "color: #abf; font-size: 2rem; font-weight: bold;"
);
