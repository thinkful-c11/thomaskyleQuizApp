// appState
const questions = [
  {
    qstnID: 1,
    question: 'Question as a string.' + this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
    question: 'Question as a string.' +this.qstnID,
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
  userAns: {
    // 1: null,
  },
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

//add to question array
function addRandQuestion(state){
  let randID;
  while(true){
    if(state.question.length === 5){
      break;
    }else{
      randID = randQuestion(state);
      if(noDup(state,randID)){
        state.question.push(questions.find(el => el.qstnID === randID));

      }
    }
  }
  return state.question;
}
console.log(addRandQuestion(appState));
console.log(`state question array: ${appState.question[0].question} hii` );

// Render function(s)
function renderNewQuestion(){

}
// Event handlers
