// appState
const appState = {
  curPos: 0,
  displayAnswer: false,
  curCrct:0 ,
  crntIncrct: 0,
  userAns: {},
  question:[],
};

////////////////////////////////////////////////////////////////////
//////////              Event Handlers                //////////////
/////////////////////////////////////////////////////////////////////
// "add..Listener functions"
//START THE QUIZ BUTTOn
function addStartQuiz(state){
  $('.main-content').on('click', '.js-start', function(event){
    if($('#question-count').val()<5 || $('#question-count').val()>10){
      alert("Enter Number between 5 and 10 (inclusive)");
    }else{
      addRandQuestion(state, $('#question-count').val(), questions);
      incQuestionPos(state);
      render(state,$('.main-content'),$('.js-side-content'));
    }
  });
}

//SUBMIT THE ANSWER BUTTON
function addSubmitAnswer(state){
  $('.main-content').on('submit',function(event){
      event.preventDefault();
      addUserAns(state, $('.main-content form').attr('questID'), $('.main-content .liQuest input:checked').val());
      render(state,$('.main-content'),$('.js-side-content'));
  });
}
//RESET THE QUIZ BUTTON
function addResetQuiz(state) {
  $('.main-content').on('click', '.js-reset', function(event) {
    setToZero(state);
    render(state,$('.main-content'),$('.js-side-content'));
  })
}
//CONTINUE THE QUIZ BUTTON
function addContinueQuiz(state){
  $('.main-content').on('click','.js-continue',function(event){
    incQuestionPos(state);
    render(state,$('.main-content'),$('.js-side-content'));
  })
}

function addListeners(state) {
  //addStartQuiz
  $('.main-content').on('click', '.js-start', function(event){
    if($('#question-count').val()<5 || $('#question-count').val()>10){
      alert("Enter Number between 5 and 10 (inclusive)");
    }else{
      addRandQuestion(state, $('#question-count').val(), questions);
      incQuestionPos(state);
      render(state,$('.main-content'),$('.js-side-content'));
    }
  });
//addSubmit
  $('.main-content').on('submit',function(event){
      event.preventDefault();
      addUserAns(state, $('.main-content form').attr('questID'), $('.main-content .liQuest input:checked').val());
      render(state,$('.main-content'),$('.js-side-content'));

  });
  //addReset
  $('.main-content').on('click', '.js-reset', function(event) {
    setToZero(state);
    render(state,$('.main-content'),$('.js-side-content'));
  });
  //addContinue
  $('.main-content').on('click','.js-continue',function(event){
    incQuestionPos(state);
    render(state,$('.main-content'),$('.js-side-content'));
  });
  
  
  //addStartQuiz(state);
  //addSubmitAnswer(state);
  //addResetQuiz(state);
  //addContinueQuiz(state);
}

////////////////////////////////////////////////////////////////////
//////////                 callback function           //////////////
/////////////////////////////////////////////////////////////////////
$(function() {
  //renderHideScore(appState,$('.js-side-content'));
  render(appState,$('.main-content'),$('.js-side-content'));
  addListeners(appState);
});

// Refactor the renderHideScore(s)
// Refactor each section.
