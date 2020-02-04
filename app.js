const user1Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())
const user2Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())
const user3Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())
const userList = document.querySelector('#userContainer');
const numList = document.querySelector('#userNumbers');
// console.log(user1Promise, user2Promise, user3Promise)
const p = Promise.all([user1Promise, user2Promise, user3Promise])
    .then(response => {
        const [user1, user2, user3] = response;
        return response;
    })
const renderUser = (data) => {
      const html = data.map((user) => {
        return`
            <div>
                ${user.fullName}
                <br>
                <br>
                <br>
                ${user.email}
                <div id = "image">
                    <img src="${user.avatar}">
                </div>
            </div>
        `
    }).join('');
    userList.innerHTML = html;
}
let users = [];
p.then(data => {
  renderUser(data);
  users = data;
});
const renderNums = () => {
    let numlist = [];
    for (let i = 1; i <= 3; i++) {
        numlist.push( 
        `<li><a href = '#${i}'>
            ${i}
        </a></li>`);
    }
    const html = numlist.join('');
    numList.innerHTML = html
}
renderNums()
window.addEventListener('hashchange', () => {
    const userSelect = window.location.hash.slice(1);
    if (userSelect !== '') {
      renderUser([users[userSelect - 1]]);
    } else {
      renderUser(users);
    }
})