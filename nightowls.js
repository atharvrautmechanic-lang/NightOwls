/* =========================
   HOME PAGE JS (if any)
   ========================= */


/* =========================
   HOME PAGE: Subject → Subject Page
   ========================= */

document.querySelectorAll(".box").forEach(box => {
  box.addEventListener("click", () => {
    const subject = box.dataset.subject;
    window.location.href = `subject.html?subject=${subject}`;
  });
});





/* =========================
   SUBJECT PAGE: Chapters → Topics
   ========================= */
// SUBJECT PAGE: Load chapters based on subject
const topicsData = {
  manufacturing: {
    1: ["Casting Process", "Types of Casting", "Casting Defects"],
    2: ["Welding Principles", "Arc Welding", "Gas Welding"],
    3: ["Forging Operations", "Hot vs Cold Forging"],
    4: ["Machining Basics", "Lathe Operations"]
  },
  tom: {
    1: ["Kinematics of Machines", "Mechanisms"],
    2: ["Dynamic Forces", "Balancing"],
    3: ["Gyroscopic Effects", "Applications"]
  },
  energy: {
    1: ["Steam Boilers", "Boiler Mountings"],
    2: ["Steam Turbines", "Impulse Turbines"],
    3: ["Gas Turbines", "Brayton Cycle"],
    4: ["Power Cycles", "Rankine Cycle"]
  },
  fluid: {
    1: ["Steam Boilers", "Boiler Mountings"],
    2: ["Steam Turbines", "Impulse Turbines"],
    3: ["Gas Turbines", "Brayton Cycle"],
    4: ["Power Cycles", "Rankine Cycle"]
  },
  design: {
    1: ["Steam Boilers", "Boiler Mountings"],
    2: ["Steam Turbines", "Impulse Turbines"],
    3: ["Gas Turbines", "Brayton Cycle"],
    4: ["Power Cycles", "Rankine Cycle"]
  }

};

const subjectTitle = document.getElementById("subject-title");
const chaptersContainer = document.querySelector(".chapters");

if (subjectTitle && chaptersContainer) {

  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  const subjects = {
    manufacturing: {
      name: "Manufacturing Processes - I",
      chapters: [
        "Casting",
        "Welding",
        "Forging",
        "Machining"
      ]
    },
    tom: {
      name: "Theory of Machines - II",
      chapters: [
        "Kinematics",
        "Dynamics of Machinery",
        "Gyroscope"
      ]
    },
    energy: {
      name: "Energy Conversion - I",
      chapters: [
        "Steam Boilers",
        "Steam Turbines",
        "Gas Turbines",
        "Power Cycles"
      ]
    }
  };


  if (subjects[subject]) {

    subjectTitle.textContent = subjects[subject].name;
    chaptersContainer.innerHTML = "";

    subjects[subject].chapters.forEach((chapter, index) => {
      const div = document.createElement("div");
      div.className = "chapter";
      div.textContent = `Chapter ${index + 1}: ${chapter}`;
      div.dataset.chapter = index + 1;
      chaptersContainer.appendChild(div);
    });


  } else {
    subjectTitle.textContent = "Subject";
  }
}



// SUBJECT PAGE: Load topics based on chapter click
const topicsList = document.getElementById("topics-list");
function loadTopics(subject, chapterNumber) {
  const topics = topicsData[subject]?.[chapterNumber] || [];

  topicsList.innerHTML = "";

  topics.forEach(topic => {
    const li = document.createElement("li");
    li.textContent = topic;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      window.location.href =
        `questions.html?subject=${subject}&chapter=${chapterNumber}&topic=${encodeURIComponent(topic)}`;
    });

    topicsList.appendChild(li);
  });
}


if (topicsList) {

  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");



  // Listen for chapter clicks (event delegation)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("chapter")) {

      const chapterNumber = e.target.dataset.chapter;

      document.querySelectorAll(".chapter").forEach(ch =>
        ch.classList.remove("active")
      );
      e.target.classList.add("active");

      loadTopics(subject, chapterNumber);
    }
  });

  const firstChapter = document.querySelector(".chapter");
  if (firstChapter) {
    firstChapter.classList.add("active");
    loadTopics(subject, firstChapter.dataset.chapter);
  }


}

// QUESTIONS PAGE LOGIC
const questionsContainer = document.getElementById("questions-container");
const questionSubject = document.getElementById("question-subject");
const questionMeta = document.getElementById("question-meta");

if (questionsContainer && questionSubject && questionMeta) {

  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");
  const chapter = params.get("chapter");
  const topic = params.get("topic");

  // Subject display names
  const subjectNames = {
    manufacturing: "Manufacturing Processes - I",
    tom: "Theory of Machines - II",
    energy: "Energy Conversion - I",
    fluid: "Fluid Mechanics",
    design:"Machine Design - I"
  };

  // QUESTIONS DATA (MVP FORMAT)
  const questionsData = {
    manufacturing: {
      1: {
        "Casting Process": [
          {
            question: "Explain the casting process.",
            answer:
              "Casting is a manufacturing process in which molten metal is poured into a mould cavity of desired shape and allowed to solidify."
          },
          {
            question: "List common casting defects.",
            answer:
              "Common casting defects include blow holes, shrinkage cavities, misruns, cold shuts, and hot tears."
          }
        ],
        "Types of Casting": [
          {
            question: "What is sand casting?",
            answer:
              "Sand casting is a process in which molten metal is poured into a sand mould and allowed to solidify."
          }
        ]
      }
    }
  };

  // Set headings
  questionSubject.textContent = subjectNames[subject] || "Subject";
  questionMeta.textContent = `Chapter ${chapter} • ${topic}`;

  questionsContainer.innerHTML = "";

  const questions =
    questionsData?.[subject]?.[chapter]?.[topic] || [];

  if (questions.length === 0) {
    questionsContainer.innerHTML =
      "<p class='no-data'>No questions available yet.</p>";
  } else {

    questions.forEach((item, index) => {

      const card = document.createElement("div");
      card.className = "question-card";

      const qText = document.createElement("p");
      qText.className = "question-text";
      qText.textContent = `${index + 1}. ${item.question}`;

      const toggleBtn = document.createElement("button");
      toggleBtn.className = "toggle-answer-btn";
      toggleBtn.textContent = "Show Answer";

      const aText = document.createElement("p");
      aText.className = "answer-text";
      aText.textContent = item.answer;
      aText.style.display = "none";

      toggleBtn.addEventListener("click", () => {
        const hidden = aText.style.display === "none";
        aText.style.display = hidden ? "block" : "none";
        toggleBtn.textContent = hidden ? "Hide Answer" : "Show Answer";
      });

      card.appendChild(qText);
      card.appendChild(toggleBtn);
      card.appendChild(aText);

      questionsContainer.appendChild(card);
    });
  }
}
