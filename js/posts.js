displayPosts();
async function displayPosts() {
  try {
    const res = await fetch("http://localhost:5000/posts");
    const posts = await res.json();

    let postHTML = "";

    for (let post of posts) {
      postHTML += renderPostHTML(post);
    }

    document.querySelector(".post-list").innerHTML = postHTML;
  } catch (err) {
    document.querySelector(".post-list").innerHTML = `<h2>${err}</h2>`;
  }
}

//
//Render Posts HTMl
function renderPostHTML(post) {
  const postDate = new Date(post.date);

  return `
  <li class="post-group-item">
        <p class="post-title">${post.title}</p>
        <p class="post-date">-- ${formateDate(postDate)}</p>
        <p class="post-content"> ${postContent(post)} </p>
      </li>
  `;
}

//
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

//
//

//For Larger post content
function postContent(post) {
  if (post.content.length > 200) {
    const text = post.content.slice(0, 200);
    const link = ` <a id="read-more"  href="post.html?id=${post._id}">Read More</a>`;
    return text + " " + link;
  } else {
    return post.content;
  }
}
