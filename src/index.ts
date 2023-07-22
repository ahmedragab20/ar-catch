import useCatch from "./lib/index";
const fetchConfig = useCatch.config({
  baseURL: "https://randomuser.me/api",
});

const callRandomApi = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await useCatch.$catch(url, {
    customOptions: {
      method: "POST",
      cache: "PER-SESSION",
      clearCache: true,
    },
    body: {
      name: "John Doe",
    },
    headers: {
      "Content-Type": "ADSASDSAF",
      Authorization: "B 123",
    },
  });

  console.log("response", response);
};

callRandomApi();

const { get, set, clearAllCaches } = useCatch.useCache("RELOAD");
set("name", "John Doe");
console.log(get("name"));
console.log(
  `%cHere's the main.ts file!`,
  "color: #0bf; font-size: 2rem; font-weight: bold;"
);
