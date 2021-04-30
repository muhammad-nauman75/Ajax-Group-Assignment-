displayPosts();
async function displayPosts() {
  try {
    const res = await fetch("http://localhost:5000/posts");
    const posts = await res.json();

    document.querySelector("#records").textContent = posts.length;

    let postHTML = "";

    for (let post of posts) {
      postHTML += renderPostHTML(post);
    }

    document
      .querySelector(".post-table")
      .insertAdjacentHTML("beforeend", postHTML);
  } catch (err) {
    document.querySelector(".post-table").innerHTML =
      "<h3>Somethign Went wrong</h3>";
  }
  deletePost();
}
//Render Posts HTMl
function renderPostHTML(post) {
  const postDate = new Date(post.date);

  return `
  <tr>
            <td class="table-data">${post.title}</td>
            <td class="table-data">${post.author}</td>
            <td class="table-data">${post.tags}</td>
            <td class="table-data">${formateDate(postDate)}</td>
            <td class="table-data">
              <div class="table-links">
                <a class="link" href="update-post.html?id=${
                  post._id
                }">Update</a> |
                <a class="del-link" href="index.html" data-id="${
                  post._id
                }">Delete</a>
              </div>
            </td>
          </tr>
  `;
}

//Formate Date
function formateDate(postDate) {
  const year = postDate.getFullYear();
  const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
  const date = postDate.getDate().toString().padStart(2, "0");
  const hours = postDate.getHours().toString().padStart(2, "0");
  const minutes = postDate.getMinutes().toString().padStart(2, "0");
  const seconds = postDate.getSeconds().toString().padStart(2, "0");

  return `${year}/${month}/${date}  ${hours}:${minutes}:${seconds}`;
}

//Delete Post Method 1
function deletePost() {
  const deleteLinks = document.getElementsByClassName("del-link");

  for (let deleteLink of deleteLinks) {
    deleteLink.addEventListener("click", async function (e) {
      e.preventDefault();
      const id = e.target.dataset.id;
      const row = e.target.parentNode.parentNode.parentNode;

      try {
        await fetch(`http://localhost:5000/posts/${id}`, {
          method: "DELETE", // *GET, POST, PATCH, DELETE, etc.
        });
      } catch (err) {
        document.querySelector("#records").textContent =
          "Something went wrong unable to delete";
      }
      //row.remove();
      window.location.replace("index.html");
    });
  }
}

//
//Delete Post Method 2

/*
document.querySelector("#posts").addEventListener("click", async function (e) {
  //e.preventDefault();
  const id = e.target.dataset.id;
  if (id == undefined) {
    return;
  } else {
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE", // *GET, POST, PATCH, DELETE, etc.
      });
    } catch (err) {
      document.querySelector("#records").textContent =
        "<h3>Something went wrong unable to delete</h3>";
    }
    window.location.replace("index.html");
  }
});
*/
