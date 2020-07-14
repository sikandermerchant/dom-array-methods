///Get DOM elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = []; //This is an empty array, where we will have all the people from the random user api
getRadomUser();
getRadomUser();
getRadomUser();
//Fetch Random users and add money
async function getRadomUser() {
  ///await response of the fetch call
  const response = await fetch('https://randomuser.me/api');
  //Only proceed once the fetch is resolved
  const resData = await response.json();
  const user = resData.results[0];

  ///Construct a new user
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000) ///Generate random money in millions
  };
  console.log(newUser);
  addData(newUser);

}

///Add new object to data array that was declared earlier
function addData(obj) {
  data.push(obj);
  updateDOM()
}
///Update DOM function
function updateDOM(providedData = data) { //here we have added a default in case nothing is passed into the function - ES6(ES2015) feature
  //Clear the main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  //Loop through providedData = data
  providedData.forEach(person => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
    main.appendChild(element);
  });
}

//Function number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '£' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click', getRadomUser);