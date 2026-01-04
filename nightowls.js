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

   const subjectTitle = document.getElementById("subject-title");

   if (subjectTitle) {
     const params = new URLSearchParams(window.location.search);
     const subject = params.get("subject");
   
     const subjectNames = {
       manufacturing: "Manufacturing Processes - I",
       tom: "Theory of Machines - II",
       energy: "Energy Conversion - I"
     };
   
     subjectTitle.textContent = subjectNames[subject] || "Subject";
   }
   
   

   const chapters = document.querySelectorAll(".chapter");
   const topicsList = document.getElementById("topics-list");
   
   if (chapters.length && topicsList) {
   
     // DATA (temporary MVP data)
     const topicsData = {
       1: ["Topic 1.1", "Topic 1.2", "Topic 1.3"],
       2: ["Topic 2.1", "Topic 2.2"],
       3: ["Topic 3.1", "Topic 3.2", "Topic 3.3"],
       4: ["Topic 4.1"]
     };
   
     chapters.forEach(chapter => {
       chapter.addEventListener("click", () => {
   
         const chapterId = chapter.dataset.chapter;
         const topics = topicsData[chapterId] || [];
   
         // Clear topics
         topicsList.innerHTML = "";
   
         // Populate topics
         topics.forEach(topic => {
           const li = document.createElement("li");
           li.textContent = topic;
           li.style.cursor = "pointer";
   
           // Topic → Questions page
           li.addEventListener("click", () => {
             window.location.href = `questions.html?chapter=${chapterId}&topic=${encodeURIComponent(topic)}`;
           });
   
           topicsList.appendChild(li);
         });
   
         // Active chapter styling
         chapters.forEach(c => c.classList.remove("active"));
         chapter.classList.add("active");
       });
     });
   }
   
   
   /* =========================
      QUESTIONS PAGE: Load Questions
      ========================= */
   
   const questionsContainer = document.getElementById("questions-list");
   const subjectNameEl = document.getElementById("subject-name");
   const topicNameEl = document.getElementById("topic-name");
   
   if (questionsContainer && topicNameEl && subjectNameEl) {
   
     const params = new URLSearchParams(window.location.search);
     const topic = params.get("topic");
   
     // TEMPORARY MVP QUESTION DATA
     const questionsData = {
       "Topic 1.1": [
         "Define the first law of thermodynamics.",
         "Explain energy conservation.",
         "List applications of the first law."
       ],
       "Topic 1.2": [
         "What is a closed system?",
         "Differentiate open and closed systems."
       ],
       "Topic 2.1": [
         "Explain entropy.",
         "State the second law of thermodynamics."
       ]
     };
   
     subjectNameEl.textContent = "Subject Name";
     topicNameEl.textContent = topic || "Topic";
   
     questionsContainer.innerHTML = "";
   
     if (topic && questionsData[topic]) {
       questionsData[topic].forEach((question, index) => {
         const card = document.createElement("div");
         card.className = "question-card";
         card.textContent = `${index + 1}. ${question}`;
         questionsContainer.appendChild(card);
       });
     } else {
       questionsContainer.innerHTML =
         "<p style='color:#b8b8c6'>No questions available yet.</p>";
     }
   }
   