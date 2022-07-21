const accessToken = "2d1ddeaadc20462dba88c9beebbe0a21";
const baseUrl = "https://chatbot-py.azurewebsites.net/chatbot";
//const baseUrl = "http://127.0.0.1:5000/chatbot"
const qnaUrl = "https://centralindia.api.cognitive.microsoft.com/language/:query-knowledgebases?projectName=BMSDev&api-version=2021-10-01&deploymentName=production";
const sessionId = "1";
//const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
const errorMessage = "My apologies, I'm not available at the moment. =^.^=";
const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
const loadingDelay = 700;
const aiReplyDelay = 1800;
const $document = document;
const $chatbot = $document.querySelector(".chatbot");
const $chatbotMessageWindow = $document.querySelector(
  ".chatbot__message-window");

const $chatbotHeader = $document.querySelector(".close_btn");
const $chatbotLoginIndicator = $document.querySelector(".chatbot__header");
const $chatbotLoginIndicator1 = $document.querySelector(".chatbot__message-window");
const $chatbotLoginIndicator2 = $document.querySelector(".chatbot__entry");
const $chatbotMessages = $document.querySelector(".chatbot__messages");
const $chatbotInput = $document.querySelector(".chatbot__input");
const $chatbotInputBox = $document.querySelector(".chatbot__entry");
const $chatbotSubmit = $document.querySelector(".chatbot__submit");

// $chatbotInputBox.style.display = "none"
console.log($chatbotInputBox)
document.addEventListener(
  "keypress",
  event => {
    if (event.which == 13) {
      console.log("1");
      console.log("Key press event triggered");
      validateMessage();
    }
  },
  false);

const refresh = () => {
  $chatbotMessages.innerHTML = '';
  setupChatbot()
}

const startDictation=()=> {
  console.log('mic starting')
  document.getElementById('transcript').value=''
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
  var recognition = new webkitSpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.lang = "en-US";
  recognition.start();
  document.getElementById('transcript').value='Listening...'
  recognition.onresult = function(e) {
  document.getElementById('transcript').value
  = e.results[0][0].transcript;
  recognition.stop();
  //validateMessage();
  // document.getElementById('searchBox').submit();
  };
  
  recognition.onerror = function(e) {
  recognition.stop();
  }
  }
  }
const loader = () => {
  $chatbotMessages.innerHTML += `<li
  class='is-ai animation'
  id='loader-animation'>
<div class = "message_container">
<div class = "assigning_margin">
    <div class="is-ai__profile-picture circle">
    </div>
    <div class ="message_content">
    <div>
    <div class='chatbot__message1'>
    <span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>
      </div>
      </div>
      </div>
      </div>
      <!--Button body--!>
  </div>
  </li>`
}

$chatbotHeader.addEventListener(
  "click",
  () => {
    // toggle($chatbot, "chatbot--closed");
    // $chatbotInput.focus();
    var element = document.getElementsByClassName("chatbot");
    element[0].style.display = "none";
    document.getElementById("chat-circle").style.display = "block";
  },
  false);


$chatbotSubmit.addEventListener(
  "click",
  () => {
    console.log("7");
    validateMessage();
  },
  false);

document.getElementById("chat-circle").addEventListener(
  "click",
  () => {
    var element = document.getElementsByClassName("chatbot");
    element[0].classList.remove("chatbot--closed");
    element[0].style.display = "block";
    $chatbotInput.focus();
    console.log(this);
    document.getElementById("chat-circle").style.display = "none";

  });
function removeAnimation() {
  $("#content.animation_apply").css("animation-play-state", "paused");

}

const myTimeout = setTimeout(removeAnimation, 5000);

const dashboard ={
  "Access all Dashboards": "<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection8e735fb661e0c8db4028 target=_blank>here</a>",
  "Franchise Overview":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection27f1b439c93c875ce04a target=_blank>here</a>',
  "Revenue & Opex Insights":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSectionaceec396933055b39823 target=_blank>here</a>',
  "Launch Curves":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSectiona845aa2d709b4d4ec0d0 target=_blank>here</a>',
  "Tactical Spend Mix":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection6406d4cf28c61c2e9349 target=_blank>here</a>',
  "Vendor Spend":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection297f535017327037b436 target=_blank>here</a>',
  "USI FTE Mix":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection644154344a574697c040 target=_blank>here</a>',
  "X-Franchise FTE mix":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSectiondf3332ab86a6343408a4 target=_blank>here</a>',
  "X-Franchise Vacancy Rate":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSectionee0d77ed0d1000ca0860 target=_blank>here</a>',
  "OpEx Breakdown":'<a href=https://app.powerbi.com/groups/f13ec9b6-603b-4742-b774-56c780ec0b4d/reports/83287daa-46dc-428f-9083-6649291385bc/ReportSection4e05f0efea26fa890291?bookmarkGuid=Bookmark654aa40fc0d34b569a23 target=_blank>here</a>',
}
const toggle = (element, klass) => {
  const classes = element.className.match(/\S+/g) || [],
    index = classes.indexOf(klass);
  index >= 0 ? classes.splice(index, 1) : classes.push(klass);
  element.className = classes.join(" ");
};

const getAnswer = (question, qnaId) => {
  //How does total opex spend between segments
  let metadataFilter=[]
  //Check if previous followup filter is there
  if(sessionStorage.followup)
  {
    metadataFilter=[{
      "key": "followup",
      "value": sessionStorage.followup
    }]
    sessionStorage.removeItem('followup')
  }
  //Check condition for current year
  // if(question.toLowerCase().includes("this year")||question.toLowerCase().includes("this year")||question.toLowerCase().includes("this year"))
  // {}
  fetch(qnaUrl, {
    method: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": "fa4af3d9c4104e749aa51fd5ae6878da"
    },
    body: JSON.stringify({
      "question": question,
      "top": 1,
      "filters": {
        "metadataFilter": {
          "metadata": metadataFilter
        }
      }
    })
  })
    .then(response => response.json())
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        let error = new Error(res.statusText);
        throw error;
      }
      return res;
    })
    .then(res => {
      console.log("res: ", res);
      let response = {
        response: {
          message: res.answers[0].answer,
          payload: { message: "" }
        }
      }
      console.log('Answer', res.answers[0].answer)
      console.log('Answer', res.answers[0].answer.split())
      removeLoader();
      //Check if metadata is present.
      if(res.answers[0].metadata && res.answers[0].metadata.year)
      {
         //Save the metadata for subsequent call
      sessionStorage.year=res.answers[0].metadata.year;
          //Logic to check if year is present in question or not
      let years = res.answers[0].metadata.year.split(",")
      console.log('Years'+JSON.stringify(years));
      let isYearPresent=false
    
      let yearBtns=''
      years.forEach(element => {
        yearBtns+=`<button type="button" onclick="getAnswerWithYear('${element}')" >${element}</button>`
        console.log(element)
        if(question.includes(element))
        {
         isYearPresent=true
        }
      });
      console.log('Is Year Present'+isYearPresent)
      if(!isYearPresent)
      { 
        sessionStorage.question=res.answers[0].questions[0].replace('2021','').replace('2022','').replace('2023','').replace('2024','').replace('2025','').replace('2026','').replace('2036','').replace('2033','');
        //const mainMessage = res.answers[0].answer.trim();
        const mainMessage ='Please select the year ';
      
        $chatbotMessages.innerHTML += `<li
        class='is-ai animation'
        id='is-loading'>
      <div class = "message_container">
      <div class = "assigning_margin">
          <div class="is-ai__profile-picture circle">
          </div>
          <div class ="message_content">
          <div>
          <div class='chatbot__message1'>
          <p class = 'chatbot__message'> ${refineMessage(mainMessage)}   
            </div>
            </div>
            </div>
            </div>
            <!--Button body--!>
          <div class = "input-body">
          <div class = "button-area" style = "height:auto"> 
          <div class = "optionDiv"> <span class = "option"></span> </div>
        <div class= "chatbotBtn">
        ${yearBtns}
        </div>
        </div>
        </div>
        </div>
        </li>`;
      }
      }
      else if(res.answers[0].metadata && res.answers[0].metadata.followup) {
        sessionStorage.followup=res.answers[0].metadata.followup;
        setResponse(response, loadingDelay + aiReplyDelay);
      } else {
        setResponse(response, loadingDelay + aiReplyDelay);
      }
      //aiMessage(loader, true, loadingDelay);
    })
    .catch(error => {
      setResponse(errorMessage, loadingDelay + aiReplyDelay);
      resetInputField();
      console.log(error);
    });
};

const getAnswerWithYear=(question)=>{
  //Remove Session Varible
  userMessage(question);
  fetch(qnaUrl, {
    method: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": "fa4af3d9c4104e749aa51fd5ae6878da"
    },
    body: question.trim() !== '' ? JSON.stringify({
      "question": sessionStorage.question+question
    }) : JSON.stringify({
      "qnaId": qnaId
    }),
  })
    .then(response => response.json())
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        let error = new Error(res.statusText);
        throw error;
      }
      return res;
    })
    .then(res => {
      console.log("res: ", res);
      let response = {
        response: {
          message: res.answers[0].answer,
          payload: { message: "" }
        }
      }
      console.log('Answer', res.answers[0].answer)
      console.log('Answer', res.answers[0].answer.split())
      removeLoader();
      //Remove session storage
      sessionStorage.removeItem('year');
      sessionStorage.removeItem('question');
      //Check if metadata is present.
      if(res.answers[0].metadata && res.answers[0].metadata.followup)
      {
        //Save the metadata for subsequent call
        sessionStorage.followup=res.answers[0].metadata.followup;
      } 
      else {
        setResponse(response, loadingDelay + aiReplyDelay);
      }
      //aiMessage(loader, true, loadingDelay);
    })
    .catch(error => {
      setResponse(errorMessage, loadingDelay + aiReplyDelay);
      resetInputField();
      console.log(error);
    });
}

const refineMessage=(message)=>{
  let refinedMessage=message;
  if(refinedMessage.includes('http'))
  {
    refinedMessage=refinedMessage.substring(0,refinedMessage.search('https'))+`<br>For more details, access the relevant dashboard <a href=${refinedMessage.substring(refinedMessage.search('https'))} target=_blank>here</a>`
  }
  //Add new Line for bullet points
  refinedMessage=refinedMessage.replaceAll("•","<br>•")
  return refinedMessage
}

const showDashboard=(message)=>{
  if(message=='question'){
    userMessage('You can ask any question related to Smart Budgeting capability \n i.e What is revenue for USC ')
    removeLoader();
    return;
  } 
  else if(message=='Yes'||message=='No'){
  userMessage('Thanks for your feedback!')
  removeLoader();

  setupChatbot();
  return;
  }
  userMessage(message)
  removeLoader();''
  let btns=''
  const mainMessage = "Which dashboard do you want to view?"
  for (const [key, value] of Object.entries(dashboard)) {
    console.log(`${key}: ${value}`);
    btns+=`<button type="button" onclick="showAnswers('${key}','${value}')" >${key}</button>`
  }
   //btns = `<button type="button" onclick="login('dashboard')" >Access all Dashboards</button><button type="button" onclick="login('question')" >Franchise Overview</button><button type="button" onclick="login('datat')" >Revenue Opex Evolution</button>`+`<button type="button" onclick="login('dashboard')" >Access all Dashboards</button><button type="button" onclick="login('question')" >Franchise Overview</button><button type="button" onclick="login('datat')" >Revenue Opex Evolution</button>`+`<button type="button" onclick="login('dashboard')" >Access all Dashboards</button><button type="button" onclick="login('question')" >Franchise Overview</button><button type="button" onclick="login('datat')" >Revenue Opex Evolution</button>`;
  $chatbotMessages.innerHTML += `<li
  class='is-ai animation'
  id='is-loading'>
<div class = "message_container">
<div class = "assigning_margin">
    <div class="is-ai__profile-picture circle">
    </div>
    <div class ="message_content">
    <div>
    <div class='chatbot__message1'>
    <p class = 'chatbot__message'> ${refineMessage(mainMessage)}   
      </div>
      </div>
      </div>
      </div>
      <!--Button body--!>
    <div class = "input-body">
    <div class = "button-area" style = "height:auto"> 
    <div class = "optionDiv"> <span class = "option"></span> </div>
  <div class= "chatbotBtn">
  ${btns}
  </div>
  </div>
  </div>
  </div>
  </li>`;

}

const showAnswers=(key,value)=>{
  userMessage(key)
  removeLoader();
  const mainMessage = "Great! You can access the dashboard by clicking "+value
 $chatbotMessages.innerHTML += `<li
  class='is-ai animation'
  id='is-loading'>
<div class = "message_container">
<div class = "assigning_margin">
    <div class="is-ai__profile-picture circle">
    </div>
    <div class ="message_content">
    <div>
    <div class='chatbot__message1'>
    <p class = 'chatbot__message'> ${mainMessage}   
      </div>
      </div>
      </div>
      </div>
      <!--Button body--!>
    <div class = "input-body">
    <div class = "button-area" style = "height:auto"> 
    <div class = "optionDiv"> <span class = "option"></span> </div>
  </div>
  </div>
  </div>
  </li>`;
}
const initChatbot = (refresh) => {
  if (refresh == 'refresh') {
    $chatbotMessages.innerHTML = '';

  }
  fetch(baseUrl, {
    method: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      "source": '',
      "topic": '',
      "login": sessionStorage.login
    }),
  })
    .then(response => response.json())
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        let error = new Error(res.statusText);
        throw error;
      }
      return res;
    })
    .then(res => {
      console.log("res: ", res);
      setResponse(res, loadingDelay + aiReplyDelay);
      //aiMessage(loader, true, loadingDelay);
    })
    .catch(error => {
      setResponse(errorMessage, loadingDelay + aiReplyDelay);
      resetInputField();
      console.log(error);
    });
};

const setupChatbot = () => {
  sessionStorage.counter=0;
  const mainMessage = "Hello, I\u2019m AnalytX AI, your dedicated resource to finding the right solution about BMS Smart Budgeting capability.How can I help you today?"
  const btns = `<button type="button" onclick="showDashboard('Access a Dashboard')" >Access a Dashboard</button><button type="button" onclick="showDashboard('question')" >Ask a Question</button>`;
  $chatbotMessages.innerHTML += `<li
  class='is-ai animation'
  id='is-loading'>
<div class = "message_container">
<div class = "assigning_margin">
    <div class="is-ai__profile-picture circle">
    </div>
    <div class ="message_content">
    <div>
    <div class='chatbot__message1'>
    <p class = 'chatbot__message'> ${refineMessage(mainMessage)}   
      </div>
      </div>
      </div>
      </div>
      <!--Button body--!>
    <div class = "input-body">
    <div class = "button-area" style = "height:auto"> 
    <div class = "optionDiv"> <span class = "option"></span> </div>
  <div class= "chatbotBtn">
  ${btns}
  </div>
  </div>
  </div>
  </div>
  </li>`;
}

const showFeedback = () => {
  sessionStorage.counter=0;
  const mainMessage = "Does this help?"
  const btns = `<button type="button" onclick="showDashboard('Yes')" >Yes</button><button type="button" onclick="showDashboard('No')" >No</button>`;
  $chatbotMessages.innerHTML += `<li
  class='is-ai animation'
  id='is-loading'>
<div class = "message_container">
<div class = "assigning_margin">
    <div class="is-ai__profile-picture circle">
    </div>
    <div class ="message_content">
    <div>
    <div class='chatbot__message1'>
    <p class = 'chatbot__message'> ${refineMessage(mainMessage)}   
      </div>
      </div>
      </div>
      </div>
      <!--Button body--!>
    <div class = "input-body">
    <div class = "button-area" style = "height:auto"> 
    <div class = "optionDiv"> <span class = "option"></span> </div>
  <div class= "chatbotBtn">
  ${btns}
  </div>
  </div>
  </div>
  </div>
  </li>`;
}
const userMessage = content => {
  
  document.getElementsByClassName('chatbotBtn')[0].remove()
  console.log("4");
  console.log("setting up the chat message from user into window");
  $chatbotMessages.innerHTML += `<li class='is-user animation'>
      <p class='chatbot__message'>
        ${content}
      </p>
      <span class='chatbot__arrow chatbot__arrow--right'></span>
    </li>`;
  loader();
  scrollDown();
};
setupChatbot()
const aiMessage = (content, isLoading = false, delay = 0) => {
  console.log("content in ai: ", content);


  removeLoader();
  let botResponse = content.response;
  let mainMessage = botResponse.message
  let subMessage = ''
  let btns = "";
  console.log("mainMessage: ", mainMessage);

  $chatbotMessages.innerHTML += `<li
      class='is-ai animation'
      id='${isLoading ? "is-loading" : ""}'>
<div class = "message_container">
<div class = "assigning_margin">
        <div class="is-ai__profile-picture circle">
        </div>
        <div class ="message_content">
        <div>
        <div class='chatbot__message1'>
        <p class = 'chatbot__message'> ${refineMessage(mainMessage)}</br>
        ${subMessage || ''}</p>
         
          </div>
          </div>
          </div>
          </div>
          <!--Button body--!>
        <div class = "input-body">
        <div class = "button-area" style = "height:auto"> 
        <div class = "optionDiv"> <span class = "option"></span> </div>
      <div class= "chatbotBtn">
      ${btns}
      </div>
      </div>
      </div>
      </div>
      </li>`;

  scrollDown();
  sessionStorage.counter=parseInt(sessionStorage.counter)+1
  if(parseInt(sessionStorage.counter)>2)
  {
    showFeedback();
  }
  scrollDown();
};


const removeLoader = () => {
  console.log("7");
  console.log("removing loading icon");
  let loadingElem = document.getElementById("loader-animation");
  if (loadingElem) {
    $chatbotMessages.removeChild(loadingElem);
  }
};

const escapeScript = unsafe => {
  const safeString = unsafe.
    replace(/</g, " ").
    replace(/>/g, " ").
    replace(/&/g, " ").
    replace(/"/g, " ").
    replace(/\\/, " ").
    replace(/\s+/g, " ");
  return safeString.trim();
};

const linkify = inputText => {
  return inputText.replace(urlPattern, `'<a href='$1' target='_blank'>$1</a>`);
};

const validateMessage = () => {
  console.log("2");
  const text = $chatbotInput.value;
  const safeText = text ? escapeScript(text) : "";
  console.log("safetext is fetched: ", safeText);
  if (safeText.length && safeText !== " ") {
    resetInputField();
    userMessage(safeText);

    send(safeText);

  }
  scrollDown();
  return;
};

const multiChoiceAnswer = text => {
  const decodedText = text.replace(/zzz/g, "'");
  userMessage(decodedText);
  console.log("5");
  send(decodedText);
  scrollDown();
  return;
};

const setResponse = (val, delay = 0) => {
  console.log("6");
  console.log("Setting response function");
  setTimeout(() => {

    aiMessage(val, true);
  }, delay);
};

const resetInputField = () => {
  console.log("3");
  console.log("resetting the input value");
  $chatbotInput.value = "";
};

const scrollDown = () => {
  console.log("8");
  console.log("scrolling down");

  const distanceToScroll =
    $chatbotMessageWindow.scrollHeight - (
      $chatbotMessages.lastChild.offsetHeight + 60);

  $chatbotMessageWindow.scrollTop = distanceToScroll;
  return false;
};

const send = (text = "", target, topic) => {
  //userMessage(key);
  console.log("5");
  getAnswer(text)
};

const sendMsg = (text = "", target, topic, usrMsg) => {
  userMessage(usrMsg);
  send(text, target, topic);
}


function welcomeMessage() {
  $chatbotMessages.innerHTML +=
    `<div class="formLoginNew">
    <div>
      <h2 class="account_login">
        Account Login
      </h2>
    </div>
  <div>
  <label class="form_control__select">
    <div class="label_text_container">
      <p class="labelText_text">
        Account Type
      </p>
    </div>
    <div class="form_control_select__container">
      <select id="select-62f76fee-97d0-4cae-b82c-0069492f6a9d" name="" class="">
        <option value="1">Online banking</option>
        <option value="2">Online investing</option>
        <option value="3">Business banking</option>
        <option value="4">Corporate &amp; commercial</option>
        <option value="5">Institutional</option>
      </select>
      <div class="helper-text__container" id="helper-62f76fee-97d0-4cae-b82c-0069492f6a9d__container"></div>
    </div>
  </label>
  <div id="aw-personal-id" class="form-control__input">
    <label id="userNameLabel">Username</label>
    <input name="Username" type="text" inputmode="text" id="userInput">
  </div>
  <div id="aw-password" class="form-control__input    show-hide">
  <label id = "passInputLabel">Password</label>
  <input name="Password" type="password" inputmode="text" id="passInput" class="" maxlength="100" pattern=".*" placeholder="" autocomplete="off" aria-invalid="false" value="">
  <button class="usb-button button--text button--small usb-input__show-hide" name="Show" type="button" aria-label="Show Password">Show</button>
  </div>
  <div class="auth-continue-button-align">
  <button  class="usb-button button--primary button--default login-button-continue" name="" type="button" onclick="authentication()">Log in</button></div>
  </div>
  </div>`
  scrollDown();


  $("#userInput").focus(function () {
    // if($(this).id == "userInput"){
    $("#userNameLabel").addClass("is-focused")
    // }else if($(this).id == "passInput"){
    //   $("#passInputLabel").addClass("is-focused")
    // }

  });

  $("#passInput").focus(function () {
    // if($(this).id == "userInput"){
    $("#passInputLabel").addClass("is-focused")
  });


  $("#userInput").focusout(function () {
    // if($(this).id == "userInput"){
    if (!$("#userInput").val()) {
      $("#userNameLabel").removeClass("is-focused")
    }

  });

  $("#passInput").focusout(function () {
    // if($(this).id == "userInput"){
    if (!$("#passInput").val()) {
      $("#passInputLabel").removeClass("is-focused");
    }

  });
  return;

}