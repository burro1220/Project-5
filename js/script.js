//create a function that generates an API call that will generate 12 random, American users
function getEmployees(){
    // fetch GET
    fetch('https://randomuser.me/api/?results=12&&nat=us')
    .then(response => {
    if (response.ok) {
       return response.json();
    } 

    throw new Error('Request failed!');
    }, networkError => console.error(networkError.message)
    //once data is received
    ).then(json => {
        
        makeEmployeeCards(json);
        makeSearch(json);
        let cards = document.querySelectorAll('.card')
        cards.forEach((card, i) => {
            card.addEventListener('click', function(evt) {
            makeModal(json);
        });
        
    })
    
});



//create Employee Directory
function makeEmployeeCards(json) {
    //loop through 12 employees
    for (i=0; i < json.results.length; i++) {
        // generate card for each employee
        let employeeCard = `<div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${json.results[i].picture.large}" alt="${json.results[i].name.first} profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${json.results[i].name.first} ${json.results[i].name.last}</h3>
                <p class="card-text">${json.results[i].email}</p>
                <p class="card-text cap">${json.results[i].location.city}, ${json.results[i].location.state}</p>
                </div>
        </div>`
        //append each card's HTML to gallery div
        document.querySelector('#gallery').innerHTML += employeeCard;
    }
};
    
function makeModal(json) { 
    let modalWindow = document.createElement('div');
                modalWindow.classList.add('modal-container');
                modalWindow.innerHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${json.results[i].picture.large}" alt="${json.results[i].name.first} profile picture">
                        <h3 id="name" class="modal-name cap">${json.results[i].name.first} ${json.results[i].name.last}</h3>
                        <p class="modal-text">${json.results[i].email}</p>
                        <p class="modal-text cap">${json.results[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${json.results[i].cell}</p>
                        <p class="modal-text">${json.results[i].location.street}, ${json.results[i].location.city}, ${json.results[i].location.state} ${json.results[i].location.postcode}</p>
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
                //
                //next button
                document.querySelector('#modal-next').addEventListener('click', function () {
                    if (i === cards.length - 1) {
                        i = 0;
                    } else {
                        i = i+1;
                    }
                    document.querySelector('.modal-info-container').innerHTML = `
                        <img class="modal-img" src="${json.results[i].picture.large}" alt="${json.results[i].name.first} profile picture">
                        <h3 id="name" class="modal-name cap">${json.results[i].name.first} ${json.results[i].name.last}</h3>
                        <p class="modal-text">${json.results[i].email}</p>
                        <p class="modal-text cap">${json.results[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${json.results[i].cell}</p>
                        <p class="modal-text">${json.results[i].location.street}, ${json.results[i].location.city}, ${json.results[i].location.state} ${json.results[i].location.postcode}</p>
                   `;
                
                    
                });
                //prev button
                document.querySelector('#modal-prev').addEventListener('click', function () {
                    if (i === 0) {
                        i = cards.length - 1;
                    }else {
                        i = i-1;
                    }
                    document.querySelector('.modal-info-container').innerHTML = `
                        <img class="modal-img" src="${json.results[i].picture.large}" alt="${json.results[i].name.first} profile picture">
                        <h3 id="name" class="modal-name cap">${json.results[i].name.first} ${json.results[i].name.last}</h3>
                        <p class="modal-text">${json.results[i].email}</p>
                        <p class="modal-text cap">${json.results[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${json.results[i].cell}</p>
                        <p class="modal-text">${json.results[i].location.street}, ${json.results[i].location.city}, ${json.results[i].location.state} ${json.results[i].location.postcode}</p>
                   `;
                
                    
                });
                     
};
    
    
  
    


 //create search input
let searchForm = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
document.querySelector('.search-container').innerHTML = searchForm;       
       
       
 //search functionality
 function makeSearch (json) {
    //Search event listener
    document.querySelector('#search-input').addEventListener('keyup', function(e) {
        let query = (e.target.value).toLowerCase();
        for (i=0; i < json.results.length; i++) {
            //grab name and show employee card if name matches query
            let card = json.results[i];
            let name = card.name.first + card.name.last;
            if(name.includes(query)){
                console.log(`includes ${card}`);
            } else {
                console.log(`query does not include ${name}`);
            }
            
        }
    })
};      
   
        
};
getEmployees();
