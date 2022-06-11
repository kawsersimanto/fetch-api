document.querySelector("#getText").addEventListener("click", getText);
document.querySelector("#getUsers").addEventListener("click", getUsers);
document.querySelector("#getPosts").addEventListener("click", getPosts);
document.querySelector("#addPost").addEventListener("submit", addPost);

// fetching text file locally

function getText() {
  fetch("../json/sample.txt")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#output").innerHTML = data;
    })
    .catch((err) => console.log(err));
}

// fetching json file locally

function getUsers() {
  fetch("../json/users.json")
    .then((response) => response.json())
    .then((users) => {
      let output = "<h2 class='my-4'>Users</h2>";
      users.forEach((user) => {
        output += `
        <div>
          <ul class="list-group my-4">
            <li class="list-group-item bg-light">ID : ${user.id}</li>
            <li class="list-group-item">Name : ${user.name}</li>
            <li class="list-group-item">Email : ${user.email}</li>
          </ul>
        </div>
        `;
      });
      document.querySelector("#output").innerHTML = output;
    });
}

// fetching json from an API

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      let output = "<h2 class='my-4'>Posts</h2>";
      posts.forEach((post) => {
        output += `
          <div class="card card-body mb-4">
            <h3 class="text-capitalize mb-3">${post.title}</h3>
            <p>${post.body}</p>
          </div>
        `;
      });
      document.querySelector("#output").innerHTML = output;
    });
}

// POST methdo using fetch

function addPost(e) {
  e.preventDefault();
  let postTitle = document.querySelector("#postTitle").value;
  let postBody = document.querySelector("#postBody").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      postTitle: postTitle,
      postBody: postBody,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
