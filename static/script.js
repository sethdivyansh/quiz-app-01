let ques_num = 0; // ques no. 1 -> 0
let next_btn = document.querySelector(".next_btn");
const option_btn = document.querySelectorAll(".option");
let ques_data = "";
let selected_opt = null;
let correct_option;
let score = 0;
let noOfQues = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("/quizAPI")
    .then((response) => response.json())
    .then((data) => renderQuiz(data));
});

const renderQuiz = (question) => {
  ques_data = question;
  let ques = document.querySelector(".question");
  ques.innerText = question[ques_num][1];
  let opt = document.querySelector(".options");

  let j = 1;
  for (let i = 2; i < 6; i++) {
    let option = opt.querySelector(`.opt${j}`);
    option.innerText = question[ques_num][i];
    j++;

    if (option.innerText === question[ques_num][6]) correct_option = option;
  }
  noOfQues = ques_data.length;
  document.querySelector(".score").innerText = `Score: ${score}/${noOfQues}`;
  document.querySelector(".ques_no").innerText = `${
    ques_num + 1
  } of ${noOfQues} Questions`;
};

option_btn.forEach((button) => {
  button.addEventListener("click", () => {
    selected_opt = button;
    option_btn.forEach((btn) => {
      if (btn != selected_opt) {
        btn.style.backgroundColor = "#eff8ff";
        btn.style.color = "#525252";
      } else {
        btn.style.backgroundColor = "#c4dfff";
      }
    });
  });
});

const checkAns = () => {
  correct_option.style.backgroundColor = "#d4edda";
  correct_option.style.border = "none";
  correct_option.style.color = "#539083";
  if (selected_opt.innerText !== ques_data[ques_num][6]) {
    selected_opt.style.backgroundColor = "#f9d7da";
    selected_opt.style.border = "none";
    selected_opt.style.color = "#94536b";
  } else {
    score++;
  }
};
const updateScore = () => {
  document.querySelector(".score").innerText = `Score: ${score}/${noOfQues}`;
  document.querySelector(".ques_no").innerText = `${
    ques_num + 1
  } of ${noOfQues} Questions`;
};

const updateQuesNo = () => {
  document.querySelector(".ques_no").innerText = `${
    ques_num + 1
  } of ${noOfQues} Questions`;
};

const backToStartStyle = () => {
  let opt = document.querySelector(".options");
  selected_opt = null;
  for (let i = 1; i < 5; i++) {
    let option = opt.querySelector(`.opt${i}`);
    option.style.backgroundColor = "#eff8ff";
    option.style.color = "#525252";
    option.style.border = "1px solid #60A5FA";
  }
};

const quizOver = () => {
  updateScore();
  document.querySelector(".next_btn").innerText = "Quiz Over";
  document.querySelector(".next_btn").style.backgroundColor = "blue";
  main_body = document.querySelector(".main");
  main_body.innerHTML = "";
  main_body.innerText = `Your Score: ${score}`;
  ques_num++;
};

next_btn.addEventListener("click", () => {
  if (ques_num === noOfQues - 1) {
    checkAns();
    setTimeout(() => {
      quizOver();
    }, 1500);
  } else if (selected_opt && ques_num < noOfQues - 1) {
    checkAns();
    setTimeout(() => {
      ques_num++;
      backToStartStyle();
      updateScore();
      updateQuesNo();

      renderQuiz(ques_data);
    }, 1500);
  }
});
