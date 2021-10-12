const elem = selector => document.querySelector(selector);
let movie;
let movieName;
let data2
let detailsAboutMovie = [];
let genre = [];
let writer = [];
let director = [];
let actor = [];;
let boxOffice = [];
let awards = [];
let ratings = [];
let ratings2 = [];
elem('.searchMovieBtn').addEventListener('click', () => {
    elem('.movieContainer').innerHTML = '';
    async function getMovie() {
        movieName = elem('.inputSearchMovie').value;
        try {
            const respnose = await fetch(`https://www.omdbapi.com/?i=tt3896199&s=${elem('.inputSearchMovie').value}&apikey=5abf6cc3&page=3`);
            const data = await respnose.json();
            movie = data.Search;
            for (let i = 0; i < movie.length; i++) {
                const response2 = await fetch(`https://www.omdbapi.com/?i=tt3896199&t=${movieName}&apikey=5abf6cc3&page=3&y=${movie[i].Year}&plot=full`);
                data2 = await response2.json();
                detailsAboutMovie.push(data2.Plot);
                genre.push(data2.Genre);
                writer.push(data2.Writer)
                director.push(data2.Director);
                actor.push(data2.Actors);
                boxOffice.push(data2.BoxOffice);
                awards.push(data2.Awards);
                ratings.push(data2.Ratings);
            }

        } catch {
            console.log(err => err);
        }
    }
    getMovie();

    function showAllMovies() {
        console.log(movie);
        setTimeout(() => {
            for (let i = 0; i < movie.length; i++) {
                elem('.movieContainer').innerHTML += `<div class="movie"><img class="img-movie" src="${movie[i].Poster}" alt=""> 
                <p class="title">${movie[i].Title}</p>
                 <p class="m-bottom m-up">${movie[i].Type}</p>
                  <p class="m-bottom">${movie[i].Year}</p> 
                  <button class="m-bottom btn-details" id="${i}">more details</button> </div>`;
            }
        }, 100)

    }
    showAllMovies();
});

window.addEventListener('click', (event) => {
    let id = event.target.id;
    if (id != '') {
        elem('.black-screen').style.display = 'block';
        elem('.more-deatails').style.display = 'flex';
        elem('.more-deatails').animate([{
            top: '40px',
            display: 'block',
            opacity: 1
        }], {
            duration: 300,
        })
        setTimeout(function () {
            elem('.more-deatails').style.top = '40px';
            elem('.more-deatails').style.opacity = 1
        }, 270)
        elem('.more-deatails').scrollIntoView({
            top: 0
        });
        elem('.more-deatails').innerHTML = `<div class="outline"> <div class="poster-container">
        <img src="${movie[id].Poster}" alt=""> 
        </div>
        <div class="text-container">
        <p class="movieName">${movie[id].Title}</p>
        <p>${genre[id]}</p> <p class="aboutMovie">${detailsAboutMovie[id]}</p>
        <p class="written-by"><b>Written by: </b>${writer[id]}</p>
        <p class="directed-by"><b>Directed by: </b> ${director[id]}</p>
        <p class="actor"><b>Starring: </b> ${actor[id]}</p>
        <p class="boxOffice"><b>BoxOffice: </b>${boxOffice[id]}</p>
        <p class="awards"><b>Awards: </b> ${awards[id]}</p>
        <p class="ratings"><b>Ratings: </b> </p>
        </div> </div>`;
        main: for (let i = 0; i < ratings.length; i++) {
            for (let j = 0; j < ratings[i].length; j++) {
               if (i === 1) {
                break main
               }
                elem('.ratings').innerHTML +=  `${ratings[id][j].Source}: ${ratings[id][j].Value} <br>`
            }
        }
        elem('.black-screen').style.display = 'block';
    }

    elem('.black-screen').addEventListener('click', () => {
        elem('.more-deatails').animate([{
            top: '0px',
            display: 'block',
            opacity: 0
        }], {
            duration: 400,
        })

        elem('.black-screen').animate([{
            opacity: 0
        }], {
            duration: 400,
        })
        setTimeout(function () {
            elem('.more-deatails').style.top = '0';
            elem('.more-deatails').style.opacity = 0
            elem('.more-deatails').style.display = 'none';
        elem('.black-screen').style.display = 'none';
        }, 370)
    })
})