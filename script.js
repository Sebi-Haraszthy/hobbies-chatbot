let inputField = document.getElementById("input")
let messagesContainer = document.getElementById("messages");
inputField.addEventListener("keypress", getInputValue)

let scanner;
let hobbyNumber = 0
let hobbies = []

addBotEntry(getMenuString())

function getInputValue(event) {
  if (event.key === "Enter") {
    let inputValue = inputField.value;
    inputField.value = ""
    
    addUserEntry(inputValue)
    
    performSelectedAction(inputValue)
    
    let menu = getMenuString()
    addBotEntry(menu)
  }
}

function addUserEntry(input) {
  let userMessageDiv = document.createElement("div");
  userMessageDiv.className = "user-message"
  // userMessageDiv.id = "user-message"
  userMessageDiv.innerText = input;
  messagesContainer.appendChild(userMessageDiv);
}

function addBotEntry(input) {
  let botMessageDiv = document.createElement("div")
  botMessageDiv.className = "bot-message";
  botMessageDiv.innerText = input;
  messagesContainer.appendChild(botMessageDiv);
}

function talkAboutHobbies() {
  let option
  do {
    printMenu()
    console.log('Alege optiunea: ')
    option = scanner.questionInt()
    performSelectedAction(option)
  } while (option != 5)
}

function getMenuString() {
  let menu='Salutare, eu sunt asistentul tau. Cu ce te pot ajuta?'+
  '\n1. Adauga hobby'+
  '\n2. Cat costa un hobby'+
  '\n3. Care este cel mai ieftin hobby'+
  '\n4. Stergere hobby'+
  '\n5. Recomanda un hobby pt azi'+
  '\n6. Gata cu hobby-urile';
  return menu;
}

function handleOption1(input) {
  let hobbyDetails = input.split(",") //["tenis", "44"]
  let hobbyName = hobbyDetails[0]
  let hobbyPrice = hobbyDetails[1]
  let hobby = {
    name: hobbyName,
    price: hobbyPrice
  }
  addHobby(hobby)
  addBotEntry("Hobby-urile tale sunt: "+JSON.stringify(hobbies))
}

function addHobby(hobby) {
  hobbies[hobbyNumber] = hobby
  hobbyNumber++
}

function handleOption2(hobbyName) {
  // console.log('Introdu numele hobby-ului:')
  // let hobbyName = scanner.question();
  let price = getHobbyPrice(hobbyName);
  addBotEntry('Pretul este: ' + price);
}

function getHobbyPrice(hobbyName) {
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbies[i].name == hobbyName) {
      return hobbies[i].price;
    }
  }
}

function handleOption3() {
  let min = hobbies[0].price;
  let index = 0;
  for (let i = 1; i < hobbies.length; i++) {
    if (min > hobbies[i].price) {
      min = hobbies[i].price;
      index = i;
    }
  }
  console.log('Cel mai ieftin hobby este:', hobbies[index].name);
}

function handleOption4() {
  console.log('Introdu numele:');
  let hobbyName = scanner.question();
  let index;
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbyName == hobbies[i].name) {
      index = i;
    }
  }
  for (let i = index; i < hobbies.length; i++) {
    hobbies[i] = hobbies[i + 1];
  }
  hobbyNumber--;
  console.log(hobbies);
}

function handleOption5() {
  let index = Math.floor(Math.random() * hobbies.length);
  console.log('Poti sa exersezi hobby-ul ' + hobbies[index].name);
}

function performSelectedAction(input) {
  //option = "1:tenis,44"
  let optionDetails = input.split(":")
  let option = optionDetails[0] //1
  // optionDetails[1] = "tenis,44"
  let hobbyDetails = optionDetails[1]
  switch (Number(option)) {
    case 1:
      handleOption1(hobbyDetails)
      break
    case 2:
      handleOption2(hobbyDetails)
      break
    case 3:
      handleOption3()
      break
    case 4:
      handleOption4()
      break
    case 5:
      handleOption5()
      break
    case 6:
      console.log('Multumesc pt intrebari. Pe data viitoare')
      break
    default:
      console.log('Alege optiunea intre 1-5')
  }
}