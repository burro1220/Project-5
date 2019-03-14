//create search input
let searchForm = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    document.querySelector('.search-container').innerHTML = searchForm;
    

function makeModal () {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-container');
    modalWindow.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="{picture.large}" alt="{user.name.first} profile picture">
            <h3 id="name" class="modal-name cap">{user.name.first} {user.name.last}</h3>
            <p class="modal-text">{user.email}</p>
            <p class="modal-text cap">{user.location.city}</p>
            <hr>
            <p class="modal-text">{user.cell}</p>
            <p class="modal-text">{user.location.street}, {user.location.city}, {user.location.state} {user.location.postcode}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
    //append modal to DOM
    document.querySelector('body').appendChild(modalWindow);
    //listens for click and then removes modal from DOM
    document.querySelector('#modal-close-btn').addEventListener('click', function() {
        document.querySelector('body').removeChild(modalWindow);
    });
    
}
// fetch GET
fetch('https://randomuser.me/api/?results=12&&nat=us')
    .then(response => {
       if (response.ok) {
           return response.json();
       } 

       throw new Error('Request failed!');
    }, networkError => console.error(networkError.message)
    //once data is received
    ).then(jsonResponse => {
        //grab the info
        const users = jsonResponse.results;
        //create a variable to store the string of HTML to render for each user
        let stringOfUsers = '';
        //loop through and add each user to HTML string
        for(user of users){
            stringOfUsers += `
            <div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="${user.name.first} profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>           
            `
        }
       
        //set HTML of #gallery to stringOfUsers
        document.getElementById('gallery').innerHTML = stringOfUsers;
        //now that cards are built grab them for later use
        const cards = document.querySelectorAll('.card');
        //loop through and create event listeners
        cards.forEach(card => {
            //event listener on card
            card.addEventListener('click', function(e) {
                //create modal when clicked
                makeModal();
                console.log(this)
           
        })
        //Search event listener
        document.querySelector('#search-input').addEventListener('keyup', function(e) {
        let query = (e.target.value).toLowerCase();
        for (i=0; i < cards.length; i++) {
            //grab name and show employee card if name matches query
            const card = cards[i];
            const infoContainer = card.lastElementChild;
            const name = infoContainer.firstElementChild.textContent;
            if (!name.includes(query)){
                card.style.display = 'none';
                
            } 
            //otherwise hide the card
            else card.style.display = '';
        }          
    })
        
    })
})