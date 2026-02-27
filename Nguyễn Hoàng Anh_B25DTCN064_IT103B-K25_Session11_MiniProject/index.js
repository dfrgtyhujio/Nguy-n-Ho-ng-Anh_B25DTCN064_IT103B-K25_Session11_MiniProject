let students = [];

let choice;

while (choice !== 0) {

    choice = +prompt(`
===== STUDENT MANAGEMENT =====
1. Create Student
2. Read All Students
3. Filter Scholarship Candidates (GPA > 8)
4. Update Student Profile
5. Delete Student
6. Compliance Verification
7. Academic Statistics
8. Data Normalization
0. Exit
=========================================
Enter your choice:
`);

    switch (choice) {

        case 1:
            createStudent();
            break;

        case 2:
            readStudents();
            break;

        case 3:
            filterScholarship();
            break;

        case 4:
            updateStudent();
            break;

        case 5:
            deleteStudent();
            break;

        case 6:
            complianceVerification();
            break;

        case 7:
            academicStatistics();
            break;


        case 8:
            normalizeData();
            break;

        case 0:
            alert("Goodbye! Thank you for using Student Management System.");
            break;

        default:
            alert("Invalid choice! Please enter a number from 0 to 8.");
            break;
    }
}

function createStudent() {
    let id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    let name = prompt("Enter student name:");
    if (name.trim() === "") {
        alert("Name cannot be empty!");
        return;
    }

    let age = +prompt("Enter age:");
    if (age.trim() === "" || isNaN(age) || age < 0) {
        alert("Invalid age!");
        return;
    }

    let gpa = +prompt("Enter GPA (0.0 - 10.0):");
    if (gpa.trim() === "" || isNaN(gpa) || gpa < 0 || gpa > 10) {
        alert("Invalid GPA!");
        return;
    }

    let status = prompt("Enter status (active/inactive):");
    if (status !== "active" && status !== "inactive") {
        alert("Status must be 'active' or 'inactive'!");
        return;
    }

    let student = {
        id: id,
        name: name,
        age: age,
        gpa: gpa,
        status: status
    };

    students.push(student);

    alert(`Student added successfully!\nID: ${id} | Name: ${name} | Age: ${age} | GPA: ${gpa} |Status: ${status}`);
}

function readStudents() {
    if (students.length === 0) {
        alert("No students");
    } else {
        let message = "===== ALL STUDENTS =====\n";
        message += "------------------------------------\n";

        students.forEach(function (value) {
            message +=
                "ID: " + value.id +
                " | Name: " + value.name +
                " | Age: " + value.age +
                " | GPA: " + value.gpa +
                " | Status: " + value.status +
                "\n";
        });

        message += "------------------------------------\n";
        message += "Total: " + students.length + " student(s)";

        alert(message);
    }
}

function filterScholarship() {
    if (students.length === 0) {
        alert("No students");

    } else {
        let scholarship = students.filter(value => value.gpa > 8);

        if (scholarship.length === 0) {

            alert("No scholarship candidates found");

        } else {

            let message = "===== SCHOLARSHIP CANDIDATES (GPA > 8.0) =====\n";
            message += "---------------------------------------------\n";

            scholarship.forEach(function (value) {
                message +=
                    "ID: " + value.id +
                    " | Name: " + value.name +
                    " | Age: " + value.age +
                    " | GPA: " + value.gpa +
                    " | Status: " + value.status +
                    "\n";
            });

            message += "---------------------------------------------\n";
            message += "Total: " + scholarship.length + " student(s)";

            alert(message);
        }
    }
}

function updateStudent() {
    if (students.length === 0) {
        alert("No students");

    } else {
        let updateId = prompt("Enter student ID to update:");

        if (updateId.trim() === "" || isNaN(updateId)) {
            alert("No student ID with ID: NaN");
        }

        let found = students.find(value => value.id === updateId);

        if (!found) {
            alert("No student ID with ID: " + updateId);
        } else {
            let message = "Found:\n";
            message +=
                "ID: " + found.id +
                " | Name: " + found.name +
                " | Age: " + found.age +
                " | GPA: " + found.gpa +
                " | Status: " + found.status +
                "\n\nLeave blank to keep current value.";
            alert(message);

            let newName = prompt(`New name (current: ${found.name})`);
            let newGpa = prompt(`New GPA (current: ${found.gpa})`);

            if (newName.trim() !== "") {
                found.name = newName;
            }

            if (newGpa.trim() !== "") {
                found.gpa = +newGpa;
            }

            let success = "Student updated successfully!\n";
            success +=
                "ID: " + found.id +
                " | Name: " + found.name +
                " | Age: " + found.age +
                " | GPA: " + found.gpa +
                " | Status: " + found.status;
            alert(success);
        }
    }
}

function deleteStudent() {
    if (students.length === 0) {
        alert("No students");

    } else {
        let deleteId = prompt("Enter student ID to delete:");

        let index = students.findIndex(value => value.id == deleteId);

        if (index === -1) {
            alert("No student ID with ID: " + deleteId);
        } else {
            let s = students[index];

            let message = "Are you sure you want to delete?\n\n";
            message +=
                "ID: " + s.id +
                " | Name: " + s.name +
                " | Age: " + s.age +
                " | GPA: " + s.gpa +
                " | Status: " + s.status +
                "\n\nType \"yes\" to confirm:";

            let confirmDelete = prompt(message);

            if (confirmDelete === "yes") {
                students.splice(index, 1);
                alert(`Student \"${s.name}\" has been deleted!`);
            } else {
                alert("Delete cancelled.");
            }
        }
    }
}

function complianceVerification() {
    if (students.length === 0) {
        alert("No students");

    } else {
        let message = "===== COMPLIANCE VERIFICATION =====\n\n";

        let minors = students.filter(value => value.age < 18);

        if (minors.length > 0) {

            message += "Has at least one student under 18: YES\n";
            message += "Minors found:\n";

            minors.forEach(value => message += "→ " + value.name + " (Age: " + value.age + ")\n");

        } else {
            message += "Has at least one student under 18: NO\n";
        }

        message += "\n";

        let inactiveStudents = students.filter(value => value.status === "inactive");

        if (inactiveStudents.length === 0) {
            message += "All students have \"active\" status: YES\n";

        } else {
            message += "All students have \"active\" status: NO\n";
            message += "Inactive students:\n";

            inactiveStudents.forEach(value => message += "→ " + value.name + " (Status: inactive)\n");
        }

        alert(message);
    }
}

function academicStatistics() {
    if (students.length === 0) {
        alert("No students");

    } else {

        let totalStudents = students.length;

        let totalGpa = students.reduce((sum, value) => {
            return sum + value.gpa;
        }, 0);

        let avgGpa = totalGpa / totalStudents;

        let highest = students[0];
        let lowest = students[0];

        for (let i = 1; i < students.length; i++) {
            if (students[i].gpa > highest.gpa) {
                highest = students[i];
            }
            if (students[i].gpa < lowest.gpa) {
                lowest = students[i];
            }
        }

        let message = "===== ACADEMIC STATISTICS =====\n\n";

        message += "Total students   : " + totalStudents + "\n";
        message += "Total GPA sum   : " + totalGpa.toFixed(2) + "\n";
        message += "Average GPA     : " + avgGpa.toFixed(2) + "\n\n";

        message += "Highest GPA: " + highest.name + " (" + highest.gpa + ")\n";
        message += "Lowest GPA: " + lowest.name + " (" + lowest.gpa + ")";

        alert(message);
    }
}

function normalizeData() {
    if (students.length === 0) {
        alert("No students");

    } else {

        let normalized = students.map((value) => {
            return {
                id: value.id,
                name: value.name.toUpperCase(),
                age: value.age,
                gpa: value.gpa,
                status: value.status
            };
        });

        let message = "===== NORMALIZED DATA (UPPERCASE NAMES) =====\n";
        message += "--------------------------------------------------\n";

        normalized.forEach((value) => {
            message +=
                "ID: " + value.id +
                " | Name: " + value.name +
                " | Age: " + value.age +
                " | GPA: " + value.gpa +
                " | Status: " + value.status +
                "\n";
        });

        message += "--------------------------------------------------\n";
        message += "Total: " + normalized.length + " student(s)";

        alert(message);
    }
}

