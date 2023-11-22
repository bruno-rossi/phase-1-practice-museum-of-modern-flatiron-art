// console.log('Write your code here');

// ## Deliverable One

// Make a fetch to `http://localhost:3000/current-exhibits` and get the first exhibit fetched from the array. Add that exhibit's details to the areas that make sense on the page, for example the title should go in the element with the `exhibit-title` id.
// For each comment attached to the exhibit, add it to the `comments-section` with a `p` element.
// Steps:
// 1. When the page loads, we will fetch data, convert it from JSON to JS.
// 2. Write a function to insert data from the db into the page:
//  a. Enter the title property as textContent of <h2 id="exhibit-title">Current Exhibit Title Goes Here</h2>
//  b. Enter the image property as the src value of <img id="exhibit-image" src="#" alt="current exhibit image" />
//  c. Enter the description property as textContent of <p id="exhibit-description">
//  d. For each comment inside the comments property array, create and appended a new p tag inside <div id="comments-section">. The textContent of that p tag should be the comment. 

// ## Deliverable Two
// When someone submits the form for a new comment, that comment gets added to the `comments-section` as a `p` tag.
// Steps:
// 1. Add "Submit" event listener to the <form id="comment-form">. Prevent default behavior.
// 2. On the submit event, call a post request that adds the value from             <input type="text" name="comment-input" placeholder="Your Comment Here"> to the database under "comments".
// 3. Call the addComment function with the result of the fetch as its parameter.

// //## Deliverable Three
// When someone clicks the `buy-tickets-button` it updates the `tickets-bought` element so that it increments the number of tickets. Make sure to retain the text, it shouldn't just say `1` but instead say `1 Tickets Bought`.
// Steps:
// 1. Add an event listener on  <button id="buy-tickets-button">Buy Tickets</button>
// 2. Inside the event listener, create a totalTicketsBought counter variable.
// 3. When the button is clicked, add 1 to the counter.
// 4. Display the counter total in <p id="tickets-bought">0 Tickets Bought</p>.

// ## BONUS One

// When someone buys a ticket, PATCH the exhibit so it has the correct number of `tickets_bought`.
// Steps:
// 1. Inside of the button's click eventListener, write a fetch request with PATCH method.
// 2. The patch request will take the number from the counter and patch it in "tickets_bought" inside the db.
// 3. Update the <p id="tickets-bought">0 Tickets Bought</p> to display the number from the db.

let storeCurrentExhibits;

fetch("http://localhost:3000/current-exhibits")
.then(response => response.json())
.then(currentExhibits => {

    storeCurrentExhibits = currentExhibits;
    // const currentExhibit = Object.values(currentExhibits[0]);
    console.log(currentExhibits);
    displayExhibitInfo(currentExhibits[0]);
    buyTicket(currentExhibits[0].tickets_bought);
})

function displayExhibitInfo(exhibit) {
    document.querySelector("#exhibit-title").textContent = exhibit.title;
    document.querySelector("#exhibit-image").src = exhibit.image;
    document.querySelector("#exhibit-description").textContent = exhibit.description;

    // console.log(exhibit.comments);
    exhibit.comments.forEach(comment => addComment(comment));
}

function addComment(comment) {
        const commentPTag = document.createElement("p");
        commentPTag.textContent = comment;
        document.querySelector("#comments-section").append(commentPTag);
}

document.querySelector("#comment-form").addEventListener("submit", event => {
    event.preventDefault();
    
    let newComment = document.querySelector(['input[name="comment-input"]']).value;

    addComment(newComment);

    storeCurrentExhibits[0].comments.push(newComment);
    const updatedComments = storeCurrentExhibits[0].comments;

    fetch("http://localhost:3000/current-exhibits/1", {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json" },
        body: JSON.stringify({
            comments: updatedComments
        })
        })

        document.querySelector("#comment-form").reset();
})

function buyTicket(ticketsBought) {
    document.querySelector("#buy-tickets-button").addEventListener("click", function() {
        let totalTicketsBought = ++ticketsBought;
        // console.log(totalTicketsBought);
        
        fetch("http://localhost:3000/current-exhibits/1", {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json" },
        body: JSON.stringify({
            tickets_bought: totalTicketsBought
            })
        })

        document.querySelector("#tickets-bought").textContent = `${totalTicketsBought} Tickets Bought`;

        // console.log(`${totalTicketsBought} tickets have been bought.`)

    })

}