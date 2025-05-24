/*course.js*/
const courses = [
  { code: "CSE 110", credits: 3, completed: true },
  { code: "WDD 130", credits: 3, completed: true },
  { code: "CSE 111", credits: 3, completed: true },
  { code: "CSE 210", credits: 3, completed: true },
  { code: "WDD 131", credits: 3, completed: true},
  { code: "WDD 231", credits: 3, completed: false },
];

const container = document.getElementById("course-container");
const totalCreditsEl = document.getElementById("total-credits");
const courseworkList = document.getElementById("coursework-list");

function renderCourses(filter = "all") {
  container.innerHTML = "";
  let totalCredits = 0;

  courses.forEach(course => {
    const category = course.code.split(" ")[0];
    if (filter === "all" || filter === category) {
      const btn = document.createElement("button");
      btn.textContent = course.code;
      btn.classList.add(course.completed ? "completed" : "incomplete");
      container.appendChild(btn);
      totalCredits += course.credits;
    }
  });

  totalCreditsEl.textContent = totalCredits;
}

function renderCourseworkList() {
  courseworkList.innerHTML = "";
  courses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.code} (${course.credits} credits)`;
    li.classList.add(course.completed ? "completed" : "incomplete");
    courseworkList.appendChild(li);
  });
}

document.querySelectorAll("section button[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderCourses(filter);
  });
});

renderCourses();
renderCourseworkList();
