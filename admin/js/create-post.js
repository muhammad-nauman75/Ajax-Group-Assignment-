window.onload = function () {
  createPost();
};

//Query Selectors

const form = document.querySelector("#create-post");

//Create Post
function createPost() {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/posts", {
        method: "POST",
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

//Convert form data to JSON
function serializeData(f) {
  const formData = new FormData(form);
  let dataObj = {};
  for (let key of formData.keys()) {
    //console.log(key);
    let inputData = formData.getAll(key);

    inputData.length > 1
      ? (dataObj[key] = inputData)
      : (dataObj[key] = inputData[0]);
  }
  return JSON.stringify(dataObj);
}

