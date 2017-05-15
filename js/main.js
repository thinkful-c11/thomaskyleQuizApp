// appState
const questions = [
  {
    qstnID: 1,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 2,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 3,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 4,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 5,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 6,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 7,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 8,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 9,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
    {
    qstnID: 10,
    question: `Question as a string. ${this.qstnID}`,
    answers: {
      a: 'String of answer A',
      b: 'String of answer B',
      c: 'String of answer C',
      d: 'String of answer D',
      e: 'String of answer E'
    },
    crctAnsr: 'a'
  },
];
const appState = {
  curPos: 0,
  curCrct: 0,
  crntIncrct: () => curPos - curCrct,
  userAns: {},
  question:[],
};

// State manipulation functions
//increment Question position
function incQuestionPos(state){
  return state.curPos++;
}

//increment Correct Answer Counter
function incCorrectAns(state){
  return state.curCrct++;
}

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
// function addRandQuestion(state){
//   let randID;
//   while(true){
//     if(state.question.length === 5){
//       break;
//     }else{
//       randID = randQuestion(state);
//       if(noDup(state,randID)){
//         state.question.push(questions.find(el => el.qstnID === randID));
//
//       }
//     }
//   }
//   return state.question;
// }
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

// Render function(s)
function render(state , element) {
  const renderStart =
  `<div class="content" action="index.html" method="post">
    <h2>Are you ready?</h2>
    <button class="btn-content" type="submit" name="btn-ready">I'm Ready</button>
  </div>`;
  const renderQuest = function() {
    const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
    return `<form questID="${quest.qstnID}" class="content" action="index.html" method="post" required>
              <h3>${quest.question}</h3>
              <ul class="list-block">
                <li class="li-a">
                  <label for="ansr-a">A.</label>
                  <input type="radio" name="answer" value="a" id="ansr-a"/>
                  <span>${quest.answers.a}</span>
                </li>
                <li class="li-b">
                  <label for="ansr-b">B.</label>
                  <input type="radio" name="answer" value="b" id="ansr-b"/>
                  <span>${quest.answers.b}</span>
                </li>
                <li class="li-c">
                  <label for="ansr-c">C.</label>
                  <input type="radio" name="answer" value="c" id="ansr-c"/>
                  <span>${quest.answers.c}</span>
                </li>
                <li class="li-d">
                  <label for="ansr-d">D.</label>
                  <input type="radio" name="answer" value="d" id="ansr-d"/>
                  <span>${quest.answers.d}</span>
                </li>
                <li class="li-e">
                  <label for="ansr-e">E.</label>
                  <input type="radio" name="answer" value="e" id="ansr-e"/>
                  <span>${quest.answers.e}</span>
                </li>
              </ul>
              <button class="btn-content" type="submit" name="btn-answer">Submit</button>
              <button class="btn-content" type="reset" name="btn-reset-qstn">Reset</button>
            </form>`
  };
  const renderEnd = `<div class="content">
                      <h1>These are your results!</h1>
                      <p>You answered ${state.curCrct} questions out of ${state.question.length} correctly.</p>
                      <button class="btn-content" type="reset" name="btn-reset-final">Reset</button>
                    </div>`

  if (appState.curPos === 0) {
    return element.html(renderStart);
  } else if (appState.curPos > 0 && appState.curPos <= appState.question.length) {
    return element.html(renderQuest);
  } else {
    return element.html(renderEnd);
  }
};
function renderAnswer(state, element) {
  const quest = state.question.find(obj => state.question.indexOf(obj) === (state.curPos - 1));
  // const condition = (state.userAns[quest.qstnID] === quest.crctAnsr) ? 'right' :
  element.each(function(){
    if ($(this).find('input').attr('value') === quest.crctAnsr) {
      $(this).addClass('js-green');
    } else if (state.userAns[quest.qstnID] !== quest.crctAnsr && state.userAns[quest.qstnID]===$(this).find('input').attr('value')) {
      $(this).addClass('js-red');
    }
  });
};

$(function() {
  addRandQuestion(appState);
  render(appState, $('.main-content'));
});
// Event handlers
