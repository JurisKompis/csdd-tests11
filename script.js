const questions = [
  {
    question: "Ko nozīmē šī ceļa zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Latvia_road_sign_201.svg/250px-Latvia_road_sign_201.svg.png",
    answers: ["Galvenais ceļš", "Aizliegts braukt", "Vienvirziena ceļš"],
    correct: 0
  },
  {
    question: "Ko norāda šī zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Latvia_road_sign_206.svg/250px-Latvia_road_sign_206.svg.png",
    answers: ["Dodiet ceļu", "Stop", "Galvenais ceļš beidzas"],
    correct: 0
  },
  {
    question: "Ko nozīmē šī zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Latvia_road_sign_301.svg/250px-Latvia_road_sign_301.svg.png",
    answers: ["Vienvirziena ceļš", "Iebraukt aizliegts", "Ātruma ierobežojums"],
    correct: 1
  },
  {
    question: "Kāda nozīme šai zīmei?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Latvia_road_sign_326.svg/250px-Latvia_road_sign_326.svg.png",
    answers: ["Apstāties aizliegts", "Apdzīvota vieta", "Aizliegts braukt ar velosipēdiem"],
    correct: 0
  },
  {
    question: "Ko norāda šī zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Latvia_road_sign_316.svg/250px-Latvia_road_sign_316.svg.png",
    answers: ["Bīstams pagrieziens pa kreisi", "Nogriezties pa kreisi aizliegts", "Vienvirziena ceļš"],
    correct: 1
  },
  {
    question: "Ko nozīmē šī zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Latvia_road_sign_306.svg/250px-Latvia_road_sign_306.svg.png",
    answers: ["Gājēju pāreja", "Kravas automobiļiem braukt aizliegts", "Kravas auto ceļš"],
    correct: 1
  },
  {
    question: "Ko norāda šī brīdinājuma zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Latvia_road_sign_114.svg/250px-Latvia_road_sign_114.svg.png",
    answers: ["Ceļa seguma maiņa", "Ceļš ar granti", "Bīstams ceļa posms"],
    correct: 0
  },
  {
    question: "Ko nozīmē šī ceļa zīme ar simbolu '30'?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Latvia_road_sign_323.svg/250px-Latvia_road_sign_323.svg.png",
    answers: ["Maksimālā ātruma ierobežojums", "Minimālais ātrums 50 km/h", "Ieteicamais ātrums 50 km/h"],
    correct: 0
  },
  {
    question: "Ko nozīmē šī zīme ar 'STOP'?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Latvia_road_sign_207.svg/250px-Latvia_road_sign_207.svg.png",
    answers: ["Neapstājoties tālāk braukt aizliegts", "Apdzīvota zona sākas", "Bīstams posms"],
    correct: 0
  },
  {
    question: "Ko norāda šī zīme?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Latvia_road_sign_537.svg/250px-Latvia_road_sign_537.svg.png",
    answers: ["Apdzīvota vieta sākas", "Ceļa darbi", "Stāvvieta"],
    correct: 2
  }
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 600;
let interval;
let totalTime = 0;

function startTest() {
  document.getElementById('startPage').style.display = 'none';
  document.getElementById('testPage').style.display = 'block';
  renderQuestion();
  totalTime = 0;
  timeLeft = 600;

  interval = setInterval(() => {
    const min = Math.floor(timeLeft / 60);
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById("timer").textContent = `Laiks atlicis: ${min}:${sec}`;
    timeLeft--;
    totalTime++;
    if (timeLeft < 0) {
      clearInterval(interval);
      showResult();
    }
  }, 1000);

  updateProgress();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById('question-container');

  let html = `
    <h2>Jautājums ${currentQuestion + 1} no ${questions.length}</h2>
    <img class="question-img" src="${q.img}" alt="Ceļa zīme" />
    <p>${q.question}</p>
    <div class="answers">
  `;

  q.answers.forEach((ans, i) => {
    const checked = answers[currentQuestion] === i ? "checked" : "";
    html += `
      <label>
        <input type="radio" name="answer" value="${i}" ${checked} onchange="selectAnswer(${i})" />
        ${ans}
      </label>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  document.getElementById('nextBtn').textContent = (currentQuestion === questions.length - 1) ? 'Pabeigt testu' : 'Tālāk';
}

function selectAnswer(i) {
  answers[currentQuestion] = i;
}

function nextQuestion() {
  if (answers[currentQuestion] === null) {
    alert('Lūdzu, izvēlies atbildi pirms turpināt.');
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgress();
  } else {
    clearInterval(interval);
    showResult();
  }
}

function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function showResult() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("progressWrapper").style.display = "none";

  let correctCount = answers.filter((ans, i) => ans === questions[i].correct).length;
  const percentage = Math.round((correctCount / questions.length) * 100);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  document.getElementById("result").innerHTML = `
    Tu atbildēji pareizi uz <strong>${correctCount}</strong> no ${questions.length} jautājumiem. (<strong>${percentage}%</strong>)<br/>
    Tests pabeigts <strong>${minutes} minūšu ${seconds} sekunžu</strong> laikā.
  `;

  document.getElementById("feedback").innerHTML = `<div class="results-box">
    <h4>Pārskats:</h4>
    <ul>
      ${questions.map((q, i) => `
        <li>
          <strong>Jautājums ${i + 1}:</strong> ${q.question}<br />
          Tava atbilde: <span style="color: ${answers[i] === q.correct ? "#22c55e" : "#f87171"}">
            ${answers[i] !== null ? q.answers[answers[i]] : "Nav atbildes"}
          </span><br />
          Pareizā atbilde: <span style="color:#22c55e">${q.answers[q.correct]}</span>
        </li>
      `).join("")}
    </ul>
  </div>`;
}
