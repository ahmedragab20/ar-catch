import useCatch from "./lib";

// TODO:: allow not resolving the responses

const appHtml = document.getElementById("app")! as HTMLDivElement;

appHtml.innerHTML = `
  <button id="btn">load image</button>
  <button id="btn2">load text</button>
  <button id="btn3">load json</button>
`;

const btn = document.getElementById("btn")! as HTMLButtonElement;

btn.style.padding = "10px 20px";
btn.style.borderRadius = "10px";
btn.style.border = "none";
btn.style.backgroundColor = "#abf";
btn.style.color = "#fff";
btn.style.fontSize = "1rem";
btn.style.fontWeight = "bold";
btn.style.cursor = "pointer";
btn.style.outline = "none";

btn.addEventListener("click", async () => {
  useCatch
    .$catch({
      fullPath: "/img.jpeg",
      resType: "blob",
      cache: "PER-SESSION",
    })
    .then((res) => {
      console.log(res);
      const img = document.createElement("img");
      img.src = URL.createObjectURL(res);
      img.style.width = "300px";
      img.style.display = "block";
      img.style.margin = "10px 0";
      img.style.borderRadius = "10px";
      img.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

      appHtml.appendChild(img);
    })
    .catch((err) => {
      console.log(err);
    });
});

// test the text response
const btn2 = document.getElementById("btn2")! as HTMLButtonElement;

btn2.style.padding = "10px 20px";
btn2.style.borderRadius = "10px";
btn2.style.border = "none";
btn2.style.backgroundColor = "#ca0";
btn2.style.color = "#fff";
btn2.style.fontSize = "1rem";
btn2.style.fontWeight = "bold";
btn2.style.cursor = "pointer";
btn2.style.outline = "none";

btn2.addEventListener("click", async () => {
  console.log(
    `${useCatch.useCache("RELOAD").get("/text.txt")} -- cached` || "no cache"
  );
  useCatch
    .$catch({
      fullPath: "/text.txt",
      resType: "text",
      cache: "PER-SESSION",
    })
    .then((res) => {
      console.log(res);
      const p = document.createElement("p");
      p.innerText = res;
      p.style.margin = "10px 0";
      console.log(
        `${useCatch.useCache("RELOAD").get("/text.txt")} -- cached` ||
          "no cache"
      );
      appHtml.appendChild(p);
    })
    .catch((err) => {
      console.log(err);
    });
});

// test normal request

const btn3 = document.getElementById("btn3")! as HTMLButtonElement;

btn3.style.padding = "10px 20px";
btn3.style.borderRadius = "10px";
btn3.style.border = "none";
btn3.style.backgroundColor = "#a0c";
btn3.style.color = "#fff";
btn3.style.fontSize = "1rem";
btn3.style.fontWeight = "bold";
btn3.style.cursor = "pointer";
btn3.style.outline = "none";

btn3.addEventListener("click", async () => {
  useCatch
    .$catch({
      fullPath: "https://jsonplaceholder.typicode.com/todos/1",
      cache: "PER-SESSION",
    })
    .then((res) => {
      console.log(res);
      const p = document.createElement("pre");
      p.innerText = JSON.stringify(res, null, 2);
      p.style.margin = "10px 0";
      appHtml.appendChild(p);
    })
    .catch((err) => {
      console.log(err);
    });
});

console.log(
  `%cHere's the main.ts file!`,
  "color: #abf; font-size: 2rem; font-weight: bold;"
);
