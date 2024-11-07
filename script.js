function getPosts() {
    return JSON.parse(localStorage.getItem('posts') || '[]');
}

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    const posts = getPosts();

    posts.forEach((post, index) => {
        postList.innerHTML += `
            <div>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" style="max-width: 100%;">` : ''}
                <a href="post.html?id=${index}">View/Edit</a>
            </div>
        `;
    });
}

function savePost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];

    if (title && content) {
        const posts = getPosts();
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
                posts.push({ title, content, image: reader.result });
                savePosts(posts);
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(imageFile);
        } else {
            posts.push({ title, content });
            savePosts(posts);
            window.location.href = 'index.html';
        }
    } else {
        alert('Title and content are required');
    }
}

function loadPost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const post = getPosts()[postId];
    if (post) {
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-content').value = post.content;
        if (post.image) document.getElementById('post-image').src = post.image;
        document.getElementById('post-content').dataset.id = postId;
    }
}

function updatePost() {
    const postId = document.getElementById('post-content').dataset.id;
    const posts = getPosts();
    posts[postId].title = document.getElementById('edit-title').value;
    posts[postId].content = document.getElementById('edit-content').value;
    savePosts(posts);
    window.location.href = 'index.html';
}

function deletePost() {
    const postId = document.getElementById('post-content').dataset.id;
    const posts = getPosts();
    posts.splice(postId, 1);
    savePosts(posts);
    window.location.href = 'index.html';
}
