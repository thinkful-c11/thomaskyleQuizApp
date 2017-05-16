// appState
const appState = {
  curPos: 0,
  curCrct:0 ,
  crntIncrct: 0,
  userAns: {},
  question:[],
};
////////////////////////////////////////////////////////////////////
//////////         State manipulation functions       //////////////
/////////////////////////////////////////////////////////////////////
//increment Question position
function incQuestionPos(state){
  return state.curPos++;
}


//increment Correct Answer Counter
function incIncorrectAns(state){
  return state.crntIncrct++;
}
// Reset the quiz back to beginning.
function setToZero(state) {
  state.curPos = 0;
  state.userAns = {};
  state.question = [];
  state.curCrct = 0;
  state.crntIncrct = 0;
}
//calculates the number of Correct answers
function calculateCorrectAns(state){
  return state.curPos - state.crntIncrct;
}
//keep tracks of user input for a specific question
function addUserAns(state, qID, val) {
  state.userAns[qID] = val;
  return state.userAns;
}

//gives a random id in questions arr
function randQuestion(state){
  return Math.floor(Math.random()*questions.length + 1);
}

//no dupicate question
function noDup(state, randID){
  if(!(state.question.find(el=>el.qstnID===randID))){
    return true;
  }
  return false;
}

// add to question array
function addRandQuestion(state){
  let randID;
  while(state.question.length<5){
      randID = randQuestion(state);
      if(noDup(state,randID)){
        state.question.push(questions.find(el => el.qstnID === randID));

     }

 }
  return state.question;
}

////////////////////////////////////////////////////////////////////
//////////////         Render Functions             //////////////
/////////////////////////////////////////////////////////////////////


//render how the DOM will look like
function render(state , element) {
  const renderStart =
  `<div class="content" action="index.html" method="post">
    <h2>Are you ready?</h2>
    <button class="btn-content js-start" type="button" name="btn-ready">I'm Ready</button>
  </div>`;
  const renderQuest = function() {
    const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
    return `<form questID="${quest.qstnID}" class="content" action="index.html" method="post" required>
              <h3>${quest.question}</h3>
              <ul class="list-block">
                <li class="liQuest">
                  <input type="radio" name="answer" value="a" id="ansr-a"/>
                  <label for="ansr-a">${quest.answers.a}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="b" id="ansr-b"/>
                  <label for="ansr-b">${quest.answers.b}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="c" id="ansr-c"/>
                  <label for="ansr-c">${quest.answers.c}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="d" id="ansr-d"/>
                  <label for="ansr-d">${quest.answers.d}</label>
                </li>
              </ul>
              <button class="btn-content js-submit" type="submit" name="btn-answer">Submit</button>
              <button class="btn-content js-reset" type="reset" name="btn-reset-qstn">Restart Quiz</button>
              <button class="btn-content js-continue" type="button" name="btn-continue-qstn">Continue</button>
            </form>`
  };
  const renderEnd = `<div class="content">
                      <h1>These are your results!</h1>
                      <p>You answered ${state.curCrct} questions out of ${state.question.length} correctly.</p>
                      <button class="btn-content js-reset" type="reset" name="btn-reset-final">Restart Quiz</button>
                    </div>`
  renderHideScore(state,$('.js-side-content'));
  if (appState.curPos === 0) {
    return element.html(renderStart);
  } else if (appState.curPos > 0 && appState.curPos <= appState.question.length) {
    element.html(renderQuest);
  } else {
    return element.html(renderEnd);
  }
};

//show the green when correct and red when incorrect
function renderAnswer(state, element) {
  const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
  // const condition = (state.userAns[quest.qstnID] === quest.crctAnsr) ? 'right' :
  element.each(function(){
    if ($(this).find('input').attr('value') === quest.crctAnsr) {
      $(this).addClass('js-green');
    } else if (state.userAns[quest.qstnID] !== quest.crctAnsr && state.userAns[quest.qstnID]===$(this).find('input').attr('value')) {
      $(this).addClass('js-red');
      incIncorrectAns(state);
    }
    state.curCrct = calculateCorrectAns(state);
  });
};

//show continue button
function renderContinue(state,element){
  element.show();
}

function renderSubmit(state,element){
  element.hide();
}

//render how the score tracker and question position tracker
//will look like on DOM
function renderScoreTracker(state,element){
  const score =
      `<h2>Current Score</h2>
        <h3>Question ${state.curPos} out of ${state.question.length}</h3>
        <ul class="list-block">
          <li>
            <h4>${state.curCrct} Correct</h4>
          </li>
          <li>
            <h4>${state.crntIncrct} Incorrect</h4>
          </li>
        </ul>`
  element.html(score);
}

//show the Score tracker and question tracker when you are asked
//questions
function renderHideScore(state,element){
  if(state.curPos === 0 || state.curPos === state.question.length+1)
    element.hide();
  else
    element.show();
  // console.log(`curPos ${state.curPos}`);
  // console.log(`question length ${state.question.length}`);
}


////////////////////////////////////////////////////////////////////
//////////              Event Handlers                //////////////
/////////////////////////////////////////////////////////////////////

//START THE QUIZ BUTTOn
function startQuiz(state){
  $('.main-content').on('click', '.js-start', function(event){

    incQuestionPos(state);
    render(state,$('.main-content'));
    renderScoreTracker(state,$('.js-side-content'));
  });
}

//SUBMIT THE ANSWER BUTTON
function submitAnswer(state){
  $('.main-content').on('submit',function(event){
      event.preventDefault();
      addUserAns(state, $('.main-content form').attr('questID'), $('.main-content .liQuest input:checked').val());
      renderAnswer(state,$('.liQuest'));
      renderScoreTracker(state,$('.js-side-content'));
      renderSubmit(state,$('.main-content .js-submit'));
      renderContinue(state, $('.main-content .js-continue'));
  });
}
//RESET THE QUIZ BUTTON
function resetQuiz(state) {
  $('.main-content').on('click', '.js-reset', function(event) {
    setToZero(state);
    addRandQuestion(state);
    render(state, $('.main-content'));
  })
}
//CONTINUE THE QUIZ BUTTON
function continueQuiz(state){
  $('.main-content').on('click','.js-continue',function(event){
    incQuestionPos(state);
    render(state,$('.main-content'));
  })
}


////////////////////////////////////////////////////////////////////
//////////                 callback function           //////////////
/////////////////////////////////////////////////////////////////////
$(function() {
  addRandQuestion(appState);
  render(appState,$('.main-content'));
  startQuiz(appState);
  resetQuiz(appState);
  submitAnswer(appState);
  continueQuiz(appState);
});
