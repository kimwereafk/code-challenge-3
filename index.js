let URL = 'https://project-code-challenge-3.vercel.app/db.json' 
 const listHolder = document.getElementById('films') 
 document.addEventListener('DOMContentLoaded', ()=>{ 
     document.getElementsByClassName('film item')[0].remove() 
     fetchOne(URL); 
     fetchMovies(URL) 
 }) 
  
 /**fetch 1 movie */ 
 function fetchOne(URL){ 
     fetch(URL).then((response) => response.json()) 
     .then(data => { 
         setUpMovieDetails(data.films[0]); 
     }) 
 } 
  
  
 //Create fetch function to get the data from the db.json 
 function fetchMovies(URL){ 
     fetch(URL) 
     .then(resp => resp.json()) 
     .then(movies => { 
         movies.films.forEach(movie => { 
             displayMovie(movie) 
         }); 
     }) 
 } 
 //function to display the titles of the movies as a list 
 function displayMovie(movie){ 
     const list = document.createElement('li') 
     list.style.cursor = "pointer" 
     list.style.fontFamily = "Arial, sans-serif"
     list.textContent= (movie.title) 
     listHolder.appendChild(list) 
     addClickEvent() 
 } 
 //Adding the click event listener 
function addClickEvent(){ 
    let children = listHolder.children; 
    for(let i = 0; i < children.length; i++){ 
        let child = children[i]; 
        child.addEventListener('click', () => { 
            fetch(URL)
            .then(res => res.json())
            .then(movie => {
                const remainingTickets = parseInt(movie.films[i].capacity) - parseInt(movie.films[i].tickets_sold);
                const btn = document.getElementById('buy-ticket');
                
                document.getElementById('buy-ticket').textContent = 'Buy Ticket';

                setUpMovieDetails(movie.films[i]);

                if (remainingTickets === 0) {
                    btn.textContent = 'Sold Out'; // Change button text to "Sold Out"
                    btn.disabled = true; // Disable the button to prevent further clicks
                } else {
                    btn.textContent = 'Buy Ticket'; // Reset button text to "Buy Ticket"
                    btn.disabled = false; // Enable the button
                }
            });
        });
    }
}

 // poster to be dispalyed on the div with poster id 
 function setUpMovieDetails(funMovie){ 
     const preview = document.getElementById('poster') 
     preview.src = funMovie.poster; 
 //title 
     const movieTitle = document.querySelector('#title'); 
     movieTitle.textContent = funMovie.title; 
     //runtime 
     const movieTime = document.querySelector('#runtime'); 
     movieTime.textContent = `${funMovie.runtime} minutes`; 
     //description 
     const movieDescription = document.querySelector('#film-info'); 
     movieDescription.textContent = funMovie.description; 
     //Showtime 
     const showTime = document.querySelector('#showtime') 
     showTime.textContent = funMovie.showtime; 
     // available tickets =capacity - tickets sold 
     const tickets  = document.querySelector('#ticket-number') 
     tickets.textContent = funMovie.capacity -funMovie.tickets_sold; 
     tickets.style.fontFamily = "Arial, sans-serif";
 } 
 // //Sold out 
 const btn = document.getElementById('buy-ticket');
 btn.addEventListener('click', function(event) {
     let remainingTickets = parseInt(document.querySelector('#ticket-number').textContent);
     event.preventDefault();
     
     if (remainingTickets > 0) {
         document.querySelector('#ticket-number').textContent = remainingTickets - 1;
         if (remainingTickets - 1 === 0) { // Check if tickets are sold out after decrementing
             btn.textContent = 'Sold Out'; // Change button text to "Sold Out"
             btn.disabled = true; // Disable the button to prevent further clicks
         }
     }
 });
 