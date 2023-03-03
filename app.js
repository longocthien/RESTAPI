var apiCourse = "http://localhost:3000/courses";

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}
var createBtn = document.querySelector("#create");

createBtn.onlick = function () {};

start();

function getCourses(callback) {
    fetch(apiCourse)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function domDelete(id) {
    var option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(apiCourse + "/" + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var removeDom = document.querySelector(".list-item-" + id);
            if (removeDom) {
                removeDom.remove();
            }
        });
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector("#list-courses");

    var htmls = courses.map(function (course) {
        return `
            <li class = "list-item-${course.id}">
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                <button onclick = "domDelete(${course.id})">Delete</button>
                <button onclick="handleEdit(${course.id}, '${course.name}', '${course.description}')">Edit</button>;
            </li>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join("");
}

function handleEdit(id, name, description) {
    var nameInput = document.querySelector('input[name="name"]');
    var descriptionInput = document.querySelector('input[name="description"]');

    nameInput.value = name;
    descriptionInput.value = description;

    var createBtn = document.querySelector("#create");
    createBtn.innerText = "Save";

    createBtn.onclick = function () {
        var formData = {
            name: nameInput.value,
            description: descriptionInput.value,
        };
        updateCourse(id, formData, function () {
            getCourses(renderCourses);
            nameInput.value = "";
            descriptionInput.value = "";
            createBtn.innerText = "Create";
            handleCreateForm();
        });
    };
}

function updateCourse(id, data, callback) {
    var option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(apiCourse + "/" + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function createCourse(data, callback) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(apiCourse, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    var createBtn = document.querySelector("#create");

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector(
            'input[name="description"]'
        ).value;

        var formData = {
            name: name,
            description: description,
        };
        createCourse(formData, function () {
            getCourses(renderCourses);
            document.querySelector('input[name="name"]').value = "";
            document.querySelector('input[name="description"]').value = "";
        });
    };
}
