const FRIENDS_API_URL = "https://randomuser.me/api/?results=40";
const getFriendsData = fetch(FRIENDS_API_URL);
const appData={
   friendsContainer:document.querySelector('.friends'),
   openButton: document.querySelector('.open'),
   navigation: document.querySelector('.navigation'),
   navBar:document.querySelector('.nav-bar')
 }
 let Users = [];
 let arrayOfAddFriends = [];
 let resetArray;

getFriendsData.then(response => response.json())
  .then(data => {
    fillUsers(data.results);
    resetArray = Users.slice();
  });

function createCard(element, className, parrent) {
  let card = document.createElement(element);
  if (className != '') card.classList.add(className);
  parrent.appendChild(card);
  return card;
};

function makeProfileCard(person) {
  let flipBox = createCard('div', 'flip-box', appData.friendsContainer);
  let flipBoxInner = createCard('div', 'flip-box-inner', flipBox);
  let flipBoxFront = createCard('div', 'flip-box-front', flipBoxInner);
  let flipBoxBack = createCard('div', 'flip-box-back', flipBoxInner);
  let picture = createCard('img', '', flipBoxFront);
  let nameFront = createCard('p', 'name', flipBoxFront);
  let addFriend = createCard('p', 'add-friend', flipBoxFront);
  let nameBack = createCard('p', '', flipBoxBack);
  let age = createCard('p', '', flipBoxBack);
  let email = createCard('p', '', flipBoxBack);
  addFriend.textContent = 'connect';
  picture.src = person.picture.large;
  flipBox.personName = `${person.name.first}${person.name.last}`;
  flipBox.personAge = +`${person.dob.age}`;
  nameFront.textContent = `${person.name.first} ${person.name.last}`;
  nameBack.textContent = `Name: ${person.name.first} ${person.name.last}`;
  age.textContent = `Age: ${person.dob.age}`;
  email.textContent = `Email: ${person.email}`;
  flipBox.gender = person.gender;
  return flipBox;
};

function fillUsers(userData) {
    userData.forEach((num, i) => {
    Users.push(makeProfileCard(num));
    Users[i].dataset.order = i;
    ['.flip-box-inner', '.flip-box-front', '.flip-box-back', 'img'].forEach(num => Users[i].querySelector(num).dataset.order = i);
    Users[i].querySelectorAll('p').forEach(num => num.dataset.order = i);
  })
};

function flipCard({target}) {
  let innerCard = appData.friendsContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`);
  let boxCard = appData.friendsContainer.querySelector(`.flip-box[data-order='${target.dataset.order}']`);
  if (target.className != 'friends' && target.className != 'add-friend') {
    innerCard.classList.toggle('clicked');
  }
  if (target.className == 'add-friend' && target.textContent != 'sent') {
    ('sent');
    arrayOfAddFriends.push(boxCard);
    target.textContent = 'sent';
  }
};

function inputSearch({target}) {
  if (target.className == 'myInput') {
    let value = target.value.toUpperCase();
    let names = appData.friendsContainer.querySelectorAll('.name');
    names.forEach(num => {
      if (num.textContent.toUpperCase().indexOf(value) > -1) {
        appData.friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.remove('remove-card');
      } else {
        appData.friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.add('remove-card');
      }
    })
  }
};

function sortListDir(target) {
  (target.className == 'a-z') ? Users.sort((a, b) => (a.personName > b.personName) ? 1 : -1):
    Users.sort((a, b) => (a.personName > b.personName) ? 1 : -1).reverse();
  renderNewFlist(Users);
};

function ageSortMG(a, b) {
  return a.personAge - b.personAge;
};

function ageSortGM(a, b) {
  return b.personAge - a.personAge;
};

function renderNewFlist(pushArray) {
  while (appData.friendsContainer.firstChild) {
    appData.friendsContainer.removeChild(appData.friendsContainer.firstChild);
  }
  if (pushArray != undefined) pushArray.forEach(num => appData.friendsContainer.appendChild(num));
};

appData.friendsContainer.addEventListener('click', flipCard);

appData.navigation.addEventListener('click', ({target}) => {
  if (target.className == 'a-z' || target.className == 'z-a') sortListDir(target);
  if (target.className == 'full-age' || target.className == 'not-full') {
    (target.className == 'full-age') ? Users.sort(ageSortMG): Users.sort(ageSortGM);
    renderNewFlist(Users);
  };
  if (target.className == 'male' || target.className == 'female') {
    let sortedArray;
    (target.className == 'male') ? Users = resetArray.filter(num => num.gender == 'male'):
      Users = resetArray.filter(num => num.gender == 'female');
    renderNewFlist(Users);
  }
  if (target.className == 'reset') renderNewFlist(resetArray);
  if (target.className == 'hide') {
    appData.openButton.classList.remove('remove-card');
    appData.navigation.classList.add('remove-card');
    appData.openButton.classList.add('forOpen');
  }
});

appData.navigation.addEventListener('keyup', inputSearch);
appData.openButton.addEventListener('click', ({target}) => {
  appData.openButton.classList.add('remove-card');
  appData.navigation.classList.remove('remove-card');
  appData.openButton.classList.remove('forOpen');
});

appData.navBar.addEventListener('click', ({target}) => {
  function classChanger(friends) {
    if (friends == 'home') document.querySelectorAll('.navigation,.open').forEach(num => num.classList.remove('remove-card'));
    else document.querySelectorAll('.navigation,.open').forEach(num => num.classList.add('remove-card'));
  }
  if (target.className == 'request') {
    renderNewFlist(arrayOfAddFriends);
    classChanger();
  }
  if (target.className == 'people') {
    renderNewFlist(resetArray);
    classChanger('home');
  }
});
