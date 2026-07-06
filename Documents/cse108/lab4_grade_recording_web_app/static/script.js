async function getAllGrades() {
    let response = await fetch("/grades");
    let grades = await response.json();

    let table = document.getElementById("gradesTable");
    table.innerHTML = "";

    for (let name in grades) {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = name;

        let gradeCell = document.createElement("td");
        gradeCell.innerText = grades[name];

        row.appendChild(nameCell);
        row.appendChild(gradeCell);

        table.appendChild(row);
    }
}

async function getStudentGrade() {
    let name = document.getElementById("searchName").value;

    let response = await fetch("/grades/" + encodeURIComponent(name));
    let data = await response.json();

    let result = document.getElementById("searchResult");

    if (data.error) {
        result.innerText = data.error;
    } else {
        result.innerText = name + "'s grade is " + data[name];
    }
}

async function addStudent() {
    let name = document.getElementById("addName").value;
    let grade = parseFloat(document.getElementById("addGrade").value);

    let response = await fetch("/grades", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            grade: grade
        })
    });

    let grades = await response.json();

    displayTable(grades);
}

async function editGrade() {
    let name = document.getElementById("editName").value;
    let grade = parseFloat(document.getElementById("editGrade").value);

    let response = await fetch("/grades/" + encodeURIComponent(name), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grade: grade
        })
    });

    let grades = await response.json();

    displayTable(grades);
}


async function deleteStudent() {
    let name = document.getElementById("deleteName").value;

    let response = await fetch("/grades/" + encodeURIComponent(name), {
        method: "DELETE"
    });

    let grades = await response.json();
    displayTable(grades);
}

function displayTable(grades) {
    let table = document.getElementById("gradesTable");
    table.innerHTML = "";

    for (let name in grades) {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = name;

        let gradeCell = document.createElement("td");
        gradeCell.innerText = grades[name];

        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        table.appendChild(row);
    }
}