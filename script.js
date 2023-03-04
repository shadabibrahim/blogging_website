

let addBlogContainer = document.getElementById('addBlogContainer')

//  for showing data 
function showAllBlogs() {
    addBlogContainer.style.display = 'none';
    let allblogs;
    let blogs = localStorage.getItem("blogs")
    if (blogs === null) {
        allblogs = []
    } else {
        allblogs = JSON.parse(blogs);
    }

    let blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = '';
    allblogs.forEach((blog, index) => {
        blogsToBeShown = `<div class="card" style="width: 98rem;">
                            <div class="card-body">
                                <h5 class="card-title">${blog.title}</h5>
                                <p class="card-text">${blog.descp}</p>
                                <button class="btn btn-danger " onclick="deleteblog(${index})">Delete</button>
                                <button class="btn btn-warning" onclick="editblog(${index})">Edit</button>
                                <div class="text-right text-end" > <span>${blog.date}</span> </div>
                            </div>
                        </div>`

        blogsContainer.innerHTML = blogsContainer.innerHTML + blogsToBeShown
    });
}

showAllBlogs() /* function call */

let addblogBtn = document.getElementById('addblog')
addblogBtn.addEventListener('click', () => {
    let allblogs;
    let blogs = localStorage.getItem("blogs")
    if (blogs === null) {
        allblogs = []
    } else {
        allblogs = JSON.parse(blogs);
    }
    let title = document.getElementById('title')
    let descp = document.getElementById('descp');

    // object
    let newblogObj = {
        title: title.value,
        descp: descp.value,
        date: new Date()

    }

    if (addblogBtn.innerText === "Update blog") {
        let editCard = document.querySelector('.card')
        let editIndex = editCard.getAttribute('editIndex')
        allblogs[editIndex] = newblogObj
    } else {
        allblogs.push(newblogObj);
    }
    localStorage.setItem("blogs", JSON.stringify(allblogs))
    title.value = ''
    descp.value = ''
    showAllBlogs()

})

let navAddblogBtn = document.getElementById('navAddblog')
navAddblogBtn.addEventListener('click', function () {
    addBlogContainer.style.display = 'block';
    addblogBtn.innerText = 'Save'
})

// function for Delete button
function deleteblog(blogIndex) {
    let allblogs = JSON.parse(localStorage.getItem('blogs'));
    allblogs.splice(blogIndex, 1)
    localStorage.setItem("blogs", JSON.stringify(allblogs))
    showAllBlogs()
}

// function for add button
function editblog(blogIndex) {
    let allblogs = JSON.parse(localStorage.getItem('blogs'));
    addBlogContainer.style.display = 'block';
    addblogBtn.innerText = 'Update blog'

    let title = document.getElementById('title')
    let descp = document.getElementById('descp');

    title.value = allblogs[blogIndex].title
    descp.value = allblogs[blogIndex].descp

    let editCard = document.querySelector('.card')
    editCard.setAttribute('editIndex', `${blogIndex}`)
    console.log(editCard);
}
