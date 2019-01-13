const friendsContainer=document.querySelector('.friends');
const letterSortBlock=document.querySelector('.abc');
const genderSortBlock=document.querySelector('.gender');
const ageSortBlock=document.querySelector('.age');
const reset=document.querySelector('.reset');
let reserArray;
const nameSearch=document.querySelector('.myInput');
const FRIENDS_API_URL="https://randomuser.me/api/?results=40";
const getFriendsData=fetch(FRIENDS_API_URL);
let allFriendsCards;
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
  nameFront.classList.add('name');
  let nameBack=document.createElement('p');
  let age=document.createElement('p');
  let image=document.createElement('p');
  let email=document.createElement('p');
  picture.src=person.picture.large;
  flipBox.personName=`${person.name.first}`;
  flipBox.personAge=+`${person.dob.age}`;
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
function setDataOrder(list,number){
  list.dataset.order=number;
  list.querySelector('.flip-box-inner').dataset.order=number;
  list.querySelector('.flip-box-front').dataset.order=number;
  list.querySelector('.flip-box-back').dataset.order=number;
  list.querySelector('img').dataset.order=number;
  list.querySelectorAll('p').forEach(num=>num.dataset.order=number);
}


function fillUsers(userData) {
  Users.forEach((num, i) => {

    Users[i] = makeProfileCard(userData[i]);
    setDataOrder(Users[i],i);
    allFriendsCards=document.querySelectorAll('.flip-box');

})

}

getFriendsData.then(response => response.json())
  .then(data => {
    dataContainer=data.results;
    fillUsers(data.results);
    reserArray=Users.slice();
  });

  friendsContainer.addEventListener('click',flipCard);
  function flipCard({target}){
    if(target.className!='friends'){
    friendsContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`).classList.toggle('clicked');
    }
  }
  nameSearch.addEventListener('keyup',inputSearch);
  function inputSearch({target}){
    console.log('hello');
    let value=target.value.toUpperCase();
    let names=friendsContainer.querySelectorAll('.name');
    names.forEach(num=>{
      if(num.textContent.toUpperCase().indexOf(value)>-1){
        friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.remove('remove-card');
      }else{
        friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.add('remove-card');
      }
    })
  }

  letterSortBlock.addEventListener('click',(ev)=>{
    console.log(ev.target.className);
    if(ev.target.className=='a-z')sortListDir();
    else sortListDirD();
      });
  function sortUsers({target}){
    if(target.className!=('abc')){

       Users.sort(compare);

       Users.forEach((num,i)=>{
         console.log(num.personName);
         allFriendsCards[i].personName=num.personName;
         console.log(allFriendsCards[i].personName);
       });
  }
  }
function compare(a,b){
  if(a.personName<b.personName)return -1;
  if(a.personName>b.personName)return 1;
}
function changeCard(filterArray,dataNum){
  setDataOrder(filterArray,dataNum);

}
function sortListDir() {
  var list, i, switching, b, shouldSwitch;
  list = friendsContainer;
  switching = true;

  // Set the sorting direction to ascending:
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = friendsContainer.getElementsByClassName("flip-box");

    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */

        if (b[i].personName.toLowerCase() > b[i + 1].personName.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    if (shouldSwitch) {
      console.log('hello');
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:

    }
  }
}
function sortListDirD() {
  var list, i, switching, b, shouldSwitch;
  list = friendsContainer;
  switching = true;

  // Set the sorting direction to ascending:
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = friendsContainer.getElementsByClassName("flip-box");

    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */

        if (b[i].personName.toLowerCase() <b[i + 1].personName.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    if (shouldSwitch) {
      console.log('hello');
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:

    }
  }
}
//agesorting
ageSortBlock.addEventListener('click',(el)=>{
    if(el.target.className=='full-age')Users.sort(ageSortMG);
    else {Users.sort(ageSortGM);
      console.log('hey');
    }
    while (friendsContainer.firstChild) {
      friendsContainer.removeChild(friendsContainer.firstChild);
    }
    Users.forEach(num=>{
      friendsContainer.appendChild(num)}
       );
  });
 function ageSortMG(a,b){
  return  a.personAge-b.personAge;
}
function ageSortGM(a,b){
  return b.personAge-a.personAge;
}
//genderSorting
genderSortBlock.addEventListener('click',({target})=>{
  let sortedArray
  if(target.className=='male')sortedArray=Users.filter(num=>num.gender=='male');
  else if(target.className=='female')sortedArray=Users.filter(num=>num.gender=='female');
  else sortedArray=Users;
      while (friendsContainer.firstChild) {
        friendsContainer.removeChild(friendsContainer.firstChild);}
      sortedArray.forEach(num=>{
        friendsContainer.appendChild(num)}
         );

})
//reset
reset.addEventListener('click',({target})=>{
  if(target.tagName!='div')
  while (friendsContainer.firstChild) {
    friendsContainer.removeChild(friendsContainer.firstChild);}
    reserArray.forEach(num=>friendsContainer.appendChild(num));

})
