//definitions
const section = document.getElementById("section");
const playerMoves = document.getElementById("playerMoves");
const youWin = document.getElementById("youWin");
let sets = 8;
let movesMade = 0;
let matchedCards = '';

playerMoves.textContent = movesMade;

// GET DATA-ARRAY
let cardData = [];
const getData = ()=> {
      for (let i=1; i<=sets; i++){
        cardData.push(`./resources/defaultImages/photo-${i}.png`,`./resources/defaultImages/photo-${i}.png`);
    }
   //console.log(cardData); 
   cardData.sort(() => Math.random()- 0.5);
   return cardData;
}

//CREATE CARDS:
const cardGenerator = () =>{
    getData();
    console.log(cardData); 
    for(let j=0; j<cardData.length; j++){
      const face = document.createElement("img");
      face.classList = "face";
      face.src = cardData[j];
      const card = document.createElement("div");
      const back = document.createElement("div");
      card.setAttribute ("name", cardData[j]);
      card.classList = "card";
      back.classList = "back";
      section.appendChild(card); //ADD CARD TO GRID
      card.appendChild(face);
      card.appendChild(back); 
      //FLIP: 
      card.addEventListener("click",(e) => {
      card.classList.toggle("flipCard");
      checkCards(e);
    })
  }
}

const checkCards = (e) => {
    //target a  flipped-card and put it in an array
    const clickedCard = e.target;
    console.log(clickedCard);
    clickedCard.classList.add("flipped");
    let flippedCards = document.querySelectorAll(".flipped");
    //console.log(flippedCards); Works!
    //flip 2 cards and compare them:
    if (flippedCards.length === 2){
        console.log(flippedCards[0].getAttribute('source'));
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute("name")) {
        console.log('match'); //works!
        matchedCards ++; 
        movesMade ++;
        flippedCards.forEach((card) => {
          card.style.pointerEvents = "none"; //prevent matched cards being clicked.  
          card.classList.remove("flipped")});  
               
      } else {
        console.log('wrong');
        movesMade ++; 
        flippedCards.forEach((card) => {
          card.classList.remove("flipped")});
        setTimeout(() => {
          //flip the cards back: 
          flippedCards[0].classList.toggle("flipCard");
          flippedCards[1].classList.toggle("flipCard");
          }, 1000);
      }
    playerMoves.textContent = movesMade;
    };
    youWon();
  };  
    
  // WIN :
  const youWon = () => {
    if (matchedCards === sets){
      console.log('you won'); 
      setTimeout(() => {
      youWin.style.display='flex'; 
      youWin.style.pointerEvents = "all";
      }, 500);
      // een haze over de images leggen?
    }; 
  };
  
  //RESET: 
  youWin.addEventListener("click",() => {
    location.reload();
  });

  //SELECTING DIFFICULTY:
const diff = document.querySelectorAll(`input[type=radio][name="diff"]`);
diff.forEach(radio => 
    radio.addEventListener("change", () => displayRadioValue()));

function displayRadioValue() {
    const form = document.getElementsByName('diff');  
    for(i = 0; i < form.length; i++) {
        if(form[i].checked){
        console.log(form[i].value);
        sets= form[i].value /2;
        console.log(sets);
        cardData = [];
        //RESET FIRST< NEEDS WORK
        cardGenerator();
    }
  }
}

cardGenerator();