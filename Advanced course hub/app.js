let student = { name: "", email: "" };
const courses = {
  js: { unlocked: false, points: 0 },
  css: { unlocked: false, points: 0 },
  react: { unlocked: false, points: 0 },
};
let currentCourse = null;
let currentExamPoints = 0;
  function signIn() {
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }
    student.name = name;
    student.email = email;
    document.getElementById("studentName").innerText = student.name;
    document.getElementById("studentEmail").innerText = student.email;
    document.getElementById("signinPage").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

   updateDashboard();
  }

function updateDashboard() {
  const unlockedCount = Object.values(courses).filter((c) => c.unlocked).length;
  document.getElementById("unlockedCount").innerText = unlockedCount;

  for (const courseId in courses) {
    const course = courses[courseId];
    const statusElem = document.getElementById(courseId + "Status");
    const unlockBtn = document.getElementById(courseId + "UnlockBtn");

    if (course.unlocked) {
      statusElem.textContent = "✅ Unlocked";
      unlockBtn.disabled = true;
      unlockBtn.textContent = "Course Unlocked";
      } else if (course.points >= 1000) {
      unlockBtn.disabled = false;
      statusElem.textContent = "🔓 Ready to Unlock";
      unlockBtn.textContent = "Unlock Course";
      } else {
      unlockBtn.disabled = true;
      statusElem.textContent = "🔒 Locked";
      unlockBtn.textContent = "Unlock Course";
      }
    }

    document.getElementById("currentExamPoints").innerText = currentExamPoints;
   }

    function startExam(courseId) {
      if (courses[courseId].unlocked) {
        alert("You have already unlocked this course.");
        return;
      }

      currentCourse = courseId;
      currentExamPoints = 0;

      const examForm = document.getElementById("examForm");
      examForm.innerHTML = "";

      const examTitle = document.getElementById("examTitle");
      examTitle.innerText = `${getCourseName(courseId)} Exam`;

      const questions = getQuestions(courseId);

      questions.forEach((q, idx) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `
          <h4>Q${idx + 1}: ${q.question}</h4>
          ${q.options
            .map(
              (opt, i) =>
                `<label><input type="radio" name="q${idx}" value="${String.fromCharCode(97 + i)}" required> ${opt}</label><br>`
            )
            .join("")}
        `;
        examForm.appendChild(div);
      });

      document.getElementById("examModal").style.display = "flex";

      updateDashboard();
    }

    function closeExamModal() {
      document.getElementById("examModal").style.display = "none";
      currentCourse = null;
      currentExamPoints = 0;
      updateDashboard();
    }

    function submitExam() {
      if (!currentCourse) return;

      const examForm = document.getElementById("examForm");
      const formData = new FormData(examForm);

      const questions = getQuestions(currentCourse);
      let score = 0;

      for (let i = 0; i < questions.length; i++) {
        const answer = formData.get("q" + i);
        if (answer === questions[i].answer) {
          score++;
        }
      }

      currentExamPoints = score * 200;

      if (currentExamPoints < 1000) {
        alert(
          `You scored ${currentExamPoints} points. You need 1000 points to unlock the course. Try again!`
        );
      } else {
        courses[currentCourse].points = currentExamPoints;
        alert(`Congratulations! You earned ${currentExamPoints} points.`);
        updateDashboard();
      }

      closeExamModal();
    }

    function unlockCourse(courseId) {
      if (courses[courseId].points >= 1000) {
        courses[courseId].unlocked = true;
        alert(`You unlocked the course: ${getCourseName(courseId)}!`);
        updateDashboard();
      } else {
        alert("You don't have enough points to unlock this course.");
      }
    }

    function getCourseName(courseId) {
      switch (courseId) {
        case "js":
          return "Advanced JavaScript";
        case "css":
          return "CSS Mastery";
        case "react":
          return "React Essentials";
        default:
          return "";
      }
    }

function getQuestions(courseId) {
  if (courseId === "js") {
    return [
          {
            question: "What keyword is used to declare a variable in JavaScript?",
            options: ["var", "let", "const", "All of the above"],
            answer: "d",
          },
          {
            question: "Which method converts JSON to a JavaScript object?",
            options: ["JSON.parse()", "JSON.stringify ()", "JSON.toObject()", "None"],
            answer: "a",
          },
          {
            question: "Which of these is a JavaScript framework?",
            options: ["Django", "React", "Laravel", "Rails"],
            answer: "b",
          },
          {
            question: "How do you write a comment in JavaScript?",
            options: ["// comment", "/* comment */", "# comment", "Both a and b"],
            answer: "d",
          },
          {
            question: "What will typeof null return?",
            options: ["null", "undefined", "object", "boolean"],
            answer: "c",
          },
        ];
      } else if (courseId === "css") {
        return [
          {
            question: "What does CSS stand for?",
            options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            ],
            answer: "c",
          },
          {
            question: "Which property is used to change the text color?",
            options: ["font-color", "color", "text-color", "foreground-color"],
            answer: "b",
          },
          {
            question: "How do you select an element with id 'header'?",
            options: ["#header", ".header", "header", "*header"],
            answer: "a",
          },
          {
            question: "Which CSS property controls layout?",
            options: ["margin", "padding", "display", "all of the above"],
            answer: "d",
          },
          {
            question: "Which unit is relative to the font-size of the root element?",
            options: ["em", "rem", "px", "%"],
            answer: "b",
          },
        ];
      } else if (courseId === "react") {
        return [
          {
            question: "What is JSX?",
            options: [
            "A templating language",
            "JavaScript XML",
            "A CSS framework",
            "None of the above",
            ],
            answer: "b",
          },
          {
            question: "React components must start with a ___ letter.",
            options: ["lowercase", "uppercase", "any", "special"],
            answer: "b",
          },
          {
            question: "How do you pass data to a React component?",
            options: ["props", "state", "setState", "render"],
            answer: "a",
          },
          {
            question: "Which hook is used for state in functional components?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            answer: "b",
          },
          {
            question: "How do you create a React app?",
            options: [
            "create-react-app",
            "npm react init",
            "react-create-app",
            "npm start react",
             ],
            answer: "a",
          },
        ];
     } else {
       return [];
     }
 }