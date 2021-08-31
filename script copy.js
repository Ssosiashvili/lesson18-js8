
getRequest();

let add = document.querySelector('.getData') 
let table = document.querySelectorAll('#table') 

add.addEventListener('click', function(){
  sendRequest();
  document.getElementById("addInput").value="";
});

//
function renderData(data) {
  let table = document.querySelector('#table')
  table.innerHTML = '';
  for(let i = 0; i < data.length; i++) {
    let list = document.createElement('list');
    list.innerHTML = `
      <input id='${data[i].id}' value = '${data[i].text}'>
      <button class="delete" id='${data[i].id}'>წაშლა</button>
      <input type="checkbox" id='${data[i].id}' class="chekbox" name="chekbox">
      <span class="doneStatus"id='${data[i].id}'>${data[i].done} </span>
    `;
     table.appendChild(list);
    let chekedbox = document.querySelectorAll('.chekbox');
    let donestatus = document.querySelectorAll('.doneStatus');
    chekedbox[i].addEventListener('click', function(){
      chekStatus (donestatus[i]);
      this.checked = true;
    })
  };
};
let chekedbox = document.querySelectorAll('.chekbox');

//
function getRequest() {
  fetch('https://ucha.ge/todo/server.php').then(function(r) {
    return r.json();
  }).then(function(r) {
    console.log(r);
    renderData(r);
  })
};
//
function sendRequest() {
  fetch('https://ucha.ge/todo/server.php', {
    method: 'POST',
    headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=add&text=${document.getElementById("addInput").value}`
  }).then(function(r) {
    return r.json();
  }).then(function(r) {
    console.log(r);
  })
  getRequest();
}
//
function chekStatus (status) { 
  fetch('https://ucha.ge/todo/server.php', {
    method: 'POST',
    headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=update&id=${status.id}&done=true`
  }).then(function(r) {
    return r.json();
  }).then(function(r) {
    console.log(r);
  })
  getRequest();
};
