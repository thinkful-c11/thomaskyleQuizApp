////////////////////////////////////////////////////////////////////
//////////////         Render Functions             //////////////
/////////////////////////////////////////////////////////////////////




//show the green when correct and red when incorrect
function renderAnswer(state, articleElement) {
  const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
  articleElement.each(function(){
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
  element.removeClass('hidden');
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

//render how the DOM will look like
function render(state , articleElement,asideElement) {
  isAnswerShown(state);
  const renderStart =
  `<div class="content" action="index.html" method="post">
    <h2>Are you ready to take this VERY VERY RANDOM QUIZ?</h2>
    <label for="question-count">How many questions would you like to answer?</label><br>
    <input type="number" name="how-many-questions" id="question-count" min="5" max="${questions.length}" placeholder="Chooose at least 5" /><br>
    <button class="btn-content js-start" type="button" name="btn-ready">I'm Ready</button>
  </div>`;
  const renderQuest = function() {
    const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
    return `<form questID="${quest.qstnID}" class="content" action="index.html" method="post" >
              <h3>${quest.question}</h3>
              <ul class="list-block">
                <li class="liQuest">
                  <input type="radio" name="answer" value="a" id="ansr-a" required/>
                  <label for="ansr-a">${quest.answers.a}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="b" id="ansr-b" required/>
                  <label for="ansr-b">${quest.answers.b}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="c" id="ansr-c" required/>
                  <label for="ansr-c">${quest.answers.c}</label>
                </li>
                <li class="liQuest">
                  <input type="radio" name="answer" value="d" id="ansr-d" required/>
                  <label for="ansr-d">${quest.answers.d}</label>
                </li>
              </ul>
              <button class="btn-content js-submit" type="submit" name="btn-answer">Submit</button>
              <button class="btn-content hidden js-continue" type="button" name="btn-continue-qstn">Continue</button>
              <button class="btn-content js-reset" type="reset" name="btn-reset-qstn">Restart Quiz</button>
            </form>`
  };
  //how the end will look like
  const renderEnd = `<div class="content">
                      <h1>These are your results!</h1>
                      <p>You answered ${state.curCrct} questions out of ${state.question.length} correctly.</p>
                      <button class="btn-content js-reset" type="reset" name="btn-reset-final">Restart Quiz</button>
                    </div>`;
  if (state.curPos === 0) {
    articleElement.html(renderStart);
    asideElement.hide();
  } else if (state.curPos > 0 && state.curPos <= state.question.length ) {
      //submit screen
      if( state.displayAnswer===false){
        articleElement.html(renderQuest);
      }
      else    ///continue screen
      {
        renderSubmit(state, articleElement.find('.js-submit'));
        renderContinue(state, articleElement.find('.js-continue'));
        renderAnswer(state,articleElement.find('.liQuest'));
      }
      renderScoreTracker(state,asideElement);
      asideElement.show();
  } else {
    articleElement.html(renderEnd);
    asideElement.hide();
  }
};