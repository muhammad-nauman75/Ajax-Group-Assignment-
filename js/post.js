const id = new URLSearchParams(window.location.search).get("id");

async function getFieldsData() {
  try {
    const res = await fetch(`http://localhost:5000/posts/${id}`);
    const post = await res.json();

    const postDate = new Date(post.date);

    let postHTML = `
        <p class="post-title">${post.title}</p>
            <p class="post-date">-- ${formateDate(postDate)}</p>
            <p class="post-content">${post.content}
        </p>
    `;
    document.querySelector(".post").innerHTML = postHTML;
  } catch (err) {
    console.log(err);
  }
}
getFieldsData();

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
