const friendsContainer=document.querySelector('.friends');
const FRIENDS_API_URL="https://randomuser.me/api/?results=40";
const getFriendsData=fetch(FRIENDS_API_URL);
function createElement(element,className,parrent){
  let newElement=document.createElement(element);
  newElement.classList.add(className);
  return newElement;
}
function createCard(element, className) {
  let card = document.createElement(element);
  card.classList.add(className);
  return card;
};
function makeProfileCard(person){
  let flipBox = createCard('div', 'flip-box');
  let flipBoxInner = createCard('div', 'flip-box-inner');
  let flipBoxFront = createCard('div', 'flip-box-front');
  let flipBoxBack = createCard('div', 'flip-box-back');
  let picture=document.createElement('img');
  let nameFront=document.createElement('p');
  let nameBack=document.createElement('p');
  let age=document.createElement('p');
  let image=document.createElement('p');
  let email=document.createElement('p');
  picture.src=person.picture.large;
  nameFront.textContent=`${person.name.first} ${person.name.last}`;
  nameBack.textContent=`Name: ${person.name.first} ${person.name.last}`;
  age.textContent=`Age: ${person.dob.age}`;
  email.textContent=`Email: ${person.email}`;
  flipBox.gender=person.gender;
  [picture,nameFront].forEach(num=>flipBoxFront.appendChild(num));
  [nameBack, age, email].forEach(num=>flipBoxBack.appendChild(num));
  [flipBoxFront, flipBoxBack].forEach(num => flipBoxInner.appendChild(num));
  flipBox.appendChild(flipBoxInner);
  friendsContainer.appendChild(flipBox);
  return flipBox;
};
const Users = Array(40).fill(0);
let dataContainer;

function fillUsers(userData) {
  Users.forEach((num, i) => {
    Users[i] = makeProfileCard(userData[i]);
    Users[i].querySelector('.flip-box-inner').dataset.order=i;
    Users[i].querySelector('.flip-box-front').dataset.order=i;
    Users[i].querySelector('.flip-box-back').dataset.order=i;
    Users[i].querySelector('img').dataset.order=i;
    Users[i].querySelectorAll('p').forEach(num=>num.dataset.order=i);
})

}

getFriendsData.then(response => response.json())
  .then(data => {
    dataContainer=data.results;
    fillUsers(data.results);
  });

  friendsContainer.addEventListener('click',flipCard);
  function flipCard({target}){
    if(target.className!='friends'){
    friendsContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`).classList.toggle('clicked');
    }
  }
