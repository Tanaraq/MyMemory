// definities:
const section = document.getElementById("section");
const playerMoves = document.querySelector("span");
const youWin = document.getElementById("youWin");
const sets = 8;
let movesMade = 0;
let matchedCards = '';

// tekst in header
playerMoves.textContent = movesMade;


// == get data ==
const getData = () => [
  {imgSrc : "photo-1.png ", name:"1"},
  {imgSrc : "photo-2.png ", name:"2"},
  {imgSrc : "photo-3.png ", name:"3"},
  {imgSrc : "photo-4.png ", name:"4"},
  {imgSrc : "photo-5.png ", name:"5"},
  {imgSrc : "photo-6.png ", name:"6"},
  {imgSrc : "photo-7.png ", name:"7"},
  {imgSrc : "photo-8.png ", name:"8"},
  {imgSrc : "photo-1.png ", name:"1"},
  {imgSrc : "photo-2.png ", name:"2"},
  {imgSrc : "photo-3.png ", name:"3"},
  {imgSrc : "photo-4.png ", name:"4"},
  {imgSrc : "photo-5.png ", name:"5"},
  {imgSrc : "photo-6.png ", name:"6"},
  {imgSrc : "photo-7.png", name:"7"},
  {imgSrc : "photo-8.png", name:"8"},
];
//console.log(getData); //works!

//== shuffle data ==
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random()- 0.5);
  return cardData;
};

//== create cards 
const cardGenerator = () => {
  const cardData = randomize();
  //in html
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    face.src = item.imgSrc; //img aan card toevoegen
    card.setAttribute ("name", item.name);
    //console.log(item.imgSrc);
    section.appendChild(card); //voegt de card toe aan de section
    card.appendChild(face);
    card.appendChild(back); //OMG DIT WERKT !!!!!!!
    //flip-functie en animatie 
    card.addEventListener("click",(e) => {
      card.classList.toggle("flipCard");
      checkCards(e);
    })
  });
};

const checkCards = (e) => {
  //target a  flipped-card and put it in an array
  const clickedCard = e.target;
  console.log(clickedCard);
  clickedCard.classList.add("flipped");
  let flippedCards = document.querySelectorAll(".flipped");
  //console.log(flippedCards); Works!
  //flip 2 cards and compare them:
  if (flippedCards.length === 2){
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute("name")) {
      console.log('match'); //works!
      matchedCards ++; //console.log(matchedCards); Works!
      movesMade ++;
      flippedCards.forEach((card) => {
        card.style.pointerEvents = "none"; //prevent matched cards being clicked. Works! 
        card.classList.remove("flipped")});  
             
    } else {
      console.log('wrong');
      movesMade ++; 
      flippedCards.forEach((card) => {
        card.classList.remove("flipped")});
      setTimeout(() => {
        //flip the cards back: works!
        flippedCards[0].classList.toggle("flipCard");
        flippedCards[1].classList.toggle("flipCard");
        }, 1000);
    }
  playerMoves.textContent = movesMade;
  };
  youWon();
};  
cardGenerator();

// WIN :
const youWon = () => {
  if (matchedCards === sets){
    console.log('you won'); //werkt
    youWin.style.zIndex = 10; //werkt!
    youWin.style.pointerEvents = "all";
    // een haze over de images leggen?
  }; 
};

//RESET: gaan toewijzen aan reset-button
youWin.addEventListener("click",() => {
  location.reload();
});





