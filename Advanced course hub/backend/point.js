let totalPoints = 0;
function updatePointsDisplay() {
  document.getElementById("totalPoints").textContent = totalPoints;
}
function unlockCourse(courseId) {
  const courseCard = document.getElementById(courseId);
  if (!courseCard.classList.contains("unlocked") && totalPoints >= 1000) {
    courseCard.classList.remove("locked");
    courseCard.classList.add("unlocked");
    const status = courseCard.querySelector(".status");
    status.textContent = "Unlocked!";
    status.classList.add("unlocked-status");
  }
}

function openExam(courseId) {
  window.open(`exam_${courseId}.html`, "_blank");
}

window.addEventListener("message", (event) => {
  if (event.data === "examCompleted") {
    totalPoints += 100;
    updatePointsDisplay();
    unlockCourse("course2");
    unlockCourse("course3");
    unlockCourse("course4");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updatePointsDisplay();

  const examButtons = document.querySelectorAll(".exam-btn");
  examButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = button.dataset.course;
      openExam(courseId);
    });
  });
});
