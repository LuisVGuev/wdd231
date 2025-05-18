/*course*/
const courses = [
  { code: "CSE 110", credits: 3 },
  { code: "WDD 130", credits: 3 },
  { code: "CSE 111", credits: 3 },
  { code: "CSE 210", credits: 3 },
  { code: "WDD 131", credits: 3 },
  { code: "WDD 231", credits: 3 },
];

const container = document.getElementById("course-container");
const totalCreditsEl = document.getElementById("total-credits");

function renderCourses(filter = "all") {
  container.innerHTML = "";
  let totalCredits = 0;

  courses.forEach(course => {
    const category = course.code.split(" ")[0];
    if (filter === "all" || filter === category) {
      const btn = document.createElement("button");
      btn.textContent = course.code;
      container.appendChild(btn);
      totalCredits += course.credits;
    }
  });

  totalCreditsEl.textContent = totalCredits;
}

document.querySelectorAll("section button[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderCourses(filter);
  });
});

renderCourses(); // initial load
