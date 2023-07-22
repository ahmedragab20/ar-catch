import useCatch from "./lib/index";

const fetchConfig = useCatch.config({
  baseURL: "https://randomuser.me/api",
  defaultOptions: {
    headers: {
      Pragma: "application/json",
    },
  },
  onReq(request) {
    console.log("request", request);
    request.headers.set("ABC", "123");
  },
  onRes(response) {
    return response;
  },
});

const callRandomApi = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await useCatch.$catch(url, {
    customOptions: {
      method: "GET",
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

const caching = useCatch.useCache();

console.log(
  `%cHere's the main.ts file!`,
  "color: #0bf; font-size: 2rem; font-weight: bold;"
);
