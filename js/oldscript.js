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
        //now that modals and cards are built grab them for later use
        const cards = document.querySelectorAll('.card');
        const modals = document.querySelectorAll('.modal-container');
        //set variable for FXs getNextModal & getPrevModal
        let currentIndex = 0;
        //FX gets next modal and accounts for end of list
        function getNextModal() {
            //hide current modal
            modals[currentIndex].classList.remove('show');
            modals[currentIndex].classList.add('hidden');
            //handle index out of range
            if (currentIndex === modals.length - 1) {
                currentIndex = 0;
            }
            else {
                currentIndex ++;
            }
            //show next modal
            modals[currentIndex].classList.remove('hidden');
            modals[currentIndex].classList.add('show');
        }
        //FX gets prev modal and accounts for end of list
        function getPrevModal() {
            //hide current modal
            modals[currentIndex].classList.remove('show');
            modals[currentIndex].classList.add('hidden');
            //handle index out of range
            if (currentIndex === 0) {
                currentIndex = modals.length - 1;
            }
            else {
                currentIndex --;
            }
            //show previous modal
            modals[currentIndex].classList.remove('hidden');
            modals[currentIndex].classList.add('show');

        }
        //loop through and create event listeners
        cards.forEach(card => {
            //set variables for code clarity
            const modal = card.nextElementSibling;
            const buttonContainer = card.nextElementSibling.lastElementChild;
            const prevButton = buttonContainer.firstElementChild;
            const nextButton = buttonContainer.lastElementChild;
            const closeButton = modal.firstElementChild.firstElementChild;
            //event listener on card
            card.addEventListener('click', function(e) {
                //grab the card's modal and show it
                modal.classList.replace('hidden', 'show');
            })
            //event listener on close button to hide modal when clicked
            closeButton.addEventListener('click', function() {
                modal.classList.replace('show', 'hidden');
            })
            //event listener on prev button to show prev modal
            prevButton.addEventListener('click', getPrevModal);
            //event listener on next button to show next modal
            nextButton.addEventListener('click', getNextModal);
           
        })
        
    })


























