window.onload = function () {
  updatePost();
};

const id = new URLSearchParams(window.location.search).get("id");
const form = document.querySelector("#update-post");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const content = document.querySelector("#content");
const tags = document.querySelector("#tags");

//
//update post fields
async function getFieldsData() {
  try {
    const res = await fetch(`http://localhost:5000/posts/${id}`);
    const post = await res.json();

    title.value = post.title;
    author.value = post.author;
    content.value = post.content;
  } catch (err) {
    console.log(err);
  }
}
getFieldsData();

//
//Update Post
function updatePost() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: serializeData(e.target),
      });

      window.location.replace("index.html");
    } catch (error) {
      console.log(error);
    }
  });
}

//
//Serialize Form data
function serializeData(form) {
  const formData = new FormData(form);
  const dataObject = {};
  for (let key of formData.keys()) {
    let inputData = formData.getAll(key);
    console.log(key);

    inputData.length > 1
      ? (dataObject[key] = inputData)
      : (dataObject[key] = inputData[0]);
  }
  return JSON.stringify(dataObject);
}
