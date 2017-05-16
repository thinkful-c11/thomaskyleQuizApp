// appState
const appState = {
  curPos: 0,
  curCrct:0 ,
  crntIncrct: 0,
  userAns: {},
  question:[],
};

////////////////////////////////////////////////////////////////////
//////////              Event Handlers                //////////////
/////////////////////////////////////////////////////////////////////

//START THE QUIZ BUTTOn
function startQuiz(state){
  $('.main-content').on('click', '.js-start', function(event){
    if($('#question-count').val()<5 || $('#question-count').val()>10){
      alert("Enter Number between 5 and 10 (inclusive)");
    }else{
      addRandQuestion(state, $('#question-count').val(), questions);
      incQuestionPos(state);
      render(state,$('.main-content'));
      renderHideScore(state,$('.js-side-content'));
      renderScoreTracker(state,$('.js-side-content'));
    }
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
    renderHideScore(state,$('.js-side-content'));
    render(state, $('.main-content'));
  })
}
//CONTINUE THE QUIZ BUTTON
function continueQuiz(state){
  $('.main-content').on('click','.js-continue',function(event){
    incQuestionPos(state);
    renderHideScore(state,$('.js-side-content'));
    render(state,$('.main-content'));
  })
}


////////////////////////////////////////////////////////////////////
//////////                 callback function           //////////////
/////////////////////////////////////////////////////////////////////
$(function() {
  renderHideScore(appState,$('.js-side-content'));
  render(appState,$('.main-content'));
  startQuiz(appState);
  resetQuiz(appState);
  submitAnswer(appState);
  continueQuiz(appState);
});

// Refactor the renderHideScore(s)
// Refactor each section.
