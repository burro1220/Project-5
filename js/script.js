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
        //create search input
        let searchForm = `
            <form action="#" method="get">
                <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>`;
        document.querySelector('.search-container').innerHTML = searchForm;
        //Search event listener
        document.querySelector('#search-input').addEventListener('keyup', function(e) {
            let query = (e.target.value).toLowerCase();
            for (i=0; i < cardsArray.length; i++) {
                //grab name and show employee card if name matches query
                const card = cardsArray[i];
                const infoContainer = card.lastElementChild;
                const name = infoContainer.firstElementChild.textContent;
                if (!name.includes(query)){
                    card.style.display = 'none';
                    
                } 
                //otherwise hide the card
                else card.style.display = '';
            }
                      
        })
        //create a variable to store the string of HTML to render and the hidden modal for each user
        let stringOfUsers = '';
        //loop through and add each user to HTML string
        for(user of users){
            const birth = `${user.dob.date}`;
            const birthyear = birth.slice(0, 4);
            const birthmonth = birth.slice(5, 7);
            const birthday = birth.slice(8, 10);
            //console.log(birthday birthmonth birthyear) ;
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
            <div class="modal-container hidden">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="${user.name.first} profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${birthmonth}-${birthday}-${birthyear}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `
            
        }
       
        //set HTML of #gallery to stringOfUsers
        document.getElementById('gallery').innerHTML = stringOfUsers;
        //event listener on each card
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const modal = card.nextElementSibling;
            card.addEventListener('click', function(e) {
                //grab the card that is clicked
                const card = e.target.closest(".card");
                //grab the card's modal and show it
                modal.classList.replace('hidden', 'show');
               
            })
            //grab previous and next buttons
            const btnContainer = card.nextElementSibling.lastElementChild;
            const prev = btnContainer.firstElementChild;
            const next = btnContainer.lastElementChild;
            //event listener for next to show next card
            next.addEventListener('click', function(e) {
                console.log(modal);
                modal.classList.replace('show', 'hidden');
                card.nextElementSibling.classList.replace('hidden', 'show');
                console.log(modal.nextElementSibling.nextElementSibling)
            })
            
        })
        //event listener for each close button
        const closeButtons = document.querySelectorAll('.modal-close-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                //close modal on 'click'
                e.target.closest('.modal-container').classList.replace('show', 'hidden');
            })
        })
    })


























