const user1Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())

const user2Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())

const user3Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(Response => Response.json())

const userList = document.querySelector('#userContainer');
const numList = document.querySelector('#userNumbers');
const title = document.querySelector('#title');


// console.log(user1Promise, user2Promise, user3Promise)

const p = Promise.all([user1Promise, user2Promise, user3Promise])
    .then(response => {
        const [user1, user2, user3] = response;
        return response;
    })

    console.log(p)


p.then(data => {
    const html = data.map((user) => {
        return `
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
})

const renderNums = () => {
    let html = [];
    for (let i = 1; i <= 3; i++) {
       html.push( 
        `<li><a href = '#${i}'>
            ${i}
        </a></li>`);
    }
    numList.innerHTML = html.join('');
}
renderNums()
//using hash, 0 is the home page all users are displayed
//0 displays all users, and can be seen by clicking on h1
//1 is user 1
//2 is user 2
//3 is user 3
//when the current user is selected the number's background
//changes to green


window.addEventListener('hashchange', () => {
    const userSelect = window.location;
    console.log(userSelect)
})

// const selectUser = window.location.hash.slice(1);