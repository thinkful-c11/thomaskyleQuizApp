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
function randQuestion(dataArray){
  return Math.floor(Math.random()*dataArray.length + 1);
}

//no dupicate question
function noDup(state, randID){
  if(!(state.question.find(el=>el.qstnID===randID))){
    return true;
  }
  return false;
}

// add to question array
function addRandQuestion(state, qNum, dataArray){
  let randID;
  while(state.question.length<qNum){
      randID = randQuestion(dataArray);
      if(noDup(state,randID)){
        state.question.push(questions.find(el => el.qstnID === randID));
     }
 }
  return state.question;
}
//displayAnswer
function isAnswerShown(state){
  if(state.curPos === Object.keys(state.userAns).length){
    state.displayAnswer = true;
  }else{
    state.displayAnswer = false;
  }
}
