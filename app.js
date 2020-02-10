const user1Promise = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(Response => Response.json())
const user2Promise = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(Response => Response.json())
const user3Promise = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(Response => Response.json())

//you could save yourself some ink here ^ by doing the .json() conversion inside the Promise.all!

const userList = document.querySelector("#userContainer")
const numList = document.querySelector("#userNumbers")

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////// U N D E L E T E D   C O M M E N T///////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// console.log(user1Promise, user2Promise, user3Promise)
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const p = Promise.all([user1Promise, user2Promise, user3Promise]).then(
	response => {
		const [user1, user2, user3] = response
		return response
	}
)
//this whole .then just takes then response and... then returns it??
const renderUser = data => {
	const html = data
		.map(user => {
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
		})
		.join("")
	//oof, all those <br>s -- that's what CSS is for!
	userList.innerHTML = html
}
let users = []
//i had to go hunting for this to figure out what you did with "p"!! why did you hide it all the way down here?
//no penalty this time but in the future we will deduct points for this sort of thing
p.then(data => {
	renderUser(data)
	users = data
})

//good!
const renderNums = () => {
	let numlist = []
	for (let i = 1; i <= 3; i++) {
		numlist.push(
			`<li><a href = '#${i}'>
            ${i}
        </a></li>`
		)
	}
	const html = numlist.join("")
	numList.innerHTML = html
}
renderNums()

//good!
//one complaint though: instead of actually re-rendering everything on every hash change,
//you should just manipulate class names and hide with CSS.
window.addEventListener("hashchange", () => {
	const userSelect = window.location.hash.slice(1)
	if (userSelect !== "") {
		renderUser([users[userSelect - 1]])
	} else {
		renderUser(users)
	}
})

//lots of ticky-tacky complaints but the app works so full marks!
