// setTimeout/setInterval

/* setTimeout(function () {
  console.log(`Minimum 5 soniya o'tdi`);
}, 5000);

setInterval(function () {
  console.log(`Bahodir, uy ishingizni qiling`);
}, 2000);
*/

/* var elAlert = document.querySelector('.alert');

// 3 soniyadan so'ng fade qo'shiladi
var qaytar = () => {
  elAlert.classList.remove('d-none', 'fade');
};
var berkit = () => {
  elAlert.classList.add('d-none');
  setTimeout(qaytar, 500);
};
var fadeQil = () => {
  elAlert.classList.add('fade');
  setTimeout(berkit, 150);
};
setTimeout(fadeQil, 3000); */



// FUNCTION AS ARGUMENT

/* var elButton = document.querySelector('button');

var sayHi = () => {
  console.log('Hi');
};
elButton.addEventListener('click', sayHi); */



/* var salomlash = () => {
  console.log(`Assalomu alaykum, boyota`);
};
var xayrlash = () => {
  console.log(`Poka-poka, brat`);
};
var funksiyalarniIshlat = (funksiya1, funksiya2) => {
  funksiya1();
  funksiya2();
};
funksiyalarniIshlat(salomlash, xayrlash); */



// PROMISE

// promise - va'da
// pending - kutyapmiz
// fulfilled (resolve) - bajarildi
// rejected - bajarilmadi
// .finally - holat aniq bo'lganda
/* var baho = Number(prompt('Necha baho oldingiz?'));
var vada = new Promise((resolve, reject) => {
  if (baho >= 4) {
    resolve('Shokolad 🍫');
  } else {
    reject('Sh vitamini 😡');
  }
});
vada
.then(() => {
  console.log('🍫');
})
.catch((err) => {
  console.error(err);
}); */
/* var elButton = document.querySelector('button');
elButton.addEventListener('click', () => {
  fetch('http://www.omdbapi.com/?apikey=249e8962&s=hulk')
  .then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.json();
    }
  })
  .then(data => {
    console.log(data);
  });
}); */

/* console.log('hello');
setTimeout(() => {
  console.log(`Men o'rtadaman, bratlar :)`);
}, 0);
console.log('moto');
*/

var CURRENT_PAGE;

var elGo = document.querySelector('.go');
var elResultList = document.querySelector('.movies-list');
var elResults = document.querySelector('.result-pages');
var elResultTemplate = document.querySelector('.template-list-item').content;
var elSearchForm = document.querySelector('.js-search-form');
var elSearchInput = elSearchForm.querySelector('.title-input');
var elMoreInfo = document.querySelector(`.more-info-btn`);
var elPaginationNav = document.querySelector(`.pagination-nav`);
var elPrevBtn = document.querySelector(`.previous-btn`);
var elNextBtn = document.querySelector(`.next-btn`);

var currentPage = 1;

elSearchForm.addEventListener(`submit`, function(evt){
  evt.preventDefault();

  document.querySelector(`.pagination`).innerHTML = ``;
  elResults.textContent = `0`;

  elResultList.innerHTML = ``;

  fetch(`https://omdbapi.com?apiKey=b9441417&s=${elSearchInput.value}`)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then(natija => {
    if (natija.Response === 'True') {
      console.log(natija);
    }

    var elFragment = document.createDocumentFragment();

    natija.Search.forEach(element => {
      var elMovieItem = elResultTemplate.cloneNode(true);
      elMovieItem.querySelector(`.title-movie`).textContent = element.Title;
      elMovieItem.querySelector(`.img-movies`).src = element.Poster;
      elMovieItem.querySelector(`.year-movies`).textContent = element.Year;
      elMovieItem.querySelector(`.more-info-btn`).dataset.id = element.imdbID;

      elFragment.appendChild(elMovieItem);
    });

    elResultList.appendChild(elFragment);

    elResults.textContent = natija.totalResults;

    var elPaginationTemplate = document.querySelector(`.pagination-template`).content;

    var elPagiantionFragment = document.createDocumentFragment();
    for(var i = 1; i <= Math.ceil(Number(natija.totalResults) / 10) ; i++) {

      var paaginationItem = elPaginationTemplate.cloneNode(true);
      paaginationItem.querySelector(`.page-active-link`).textContent = i;
      paaginationItem.querySelector(`.page-active-link`).dataset.id = i;


      elPagiantionFragment.appendChild(paaginationItem);
    }

    document.querySelector(`.pagination`).appendChild(elPagiantionFragment);
    document.querySelector('.page-active-link').classList.add('bg-info');

  });

})



elResultList.addEventListener('click', evt => {
  if (evt.target.matches('.more-info-btn')) {
    fetch(`https://omdbapi.com?apiKey=b9441417&i=${evt.target.dataset.id}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(natija => {
      if (natija.Response === 'True') {
        console.log(natija);
        document.querySelector(`.modal-title`).textContent = natija.Title;
        document.querySelector(`.modal-movie-img`).src = natija.Poster;
        document.querySelector(`.modal-movie-rating`).textContent = natija.imdbRating;
        document.querySelector(`.modal-movie-salary`).textContent = natija.BoxOffice;
        document.querySelector(`.modal-movie-director`).textContent = natija.Director;
      }
    });
  }
});




elPaginationNav.addEventListener(`click`, evt => {
  var pagLink = document.querySelectorAll(`.page-active-link`);

  if (evt.target.matches(`.page-active-link`)){

    pagLink.forEach(item => {
      item.classList.remove('bg-info');
    })

    evt.target.classList.add('bg-info');
    // console.log(evt.target.dataset.id);
    elResultList.innerHTML = ``;

    fetch(`https://omdbapi.com?apiKey=b9441417&s=${elSearchInput.value}&page=${evt.target.dataset.id}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(natija => {
      if (natija.Response === 'True') {
        console.log(natija);
      }

      var elFragment = document.createDocumentFragment();

      natija.Search.forEach(element => {
        var elMovieItem = elResultTemplate.cloneNode(true);
        elMovieItem.querySelector(`.title-movie`).textContent = element.Title;
        elMovieItem.querySelector(`.img-movies`).src = element.Poster;
        elMovieItem.querySelector(`.year-movies`).textContent = element.Year;
        elMovieItem.querySelector(`.more-info-btn`).dataset.id = element.imdbID;

        elFragment.appendChild(elMovieItem);
      });

      elResultList.appendChild(elFragment);


    });



    currentPage = Number(evt.target.dataset.id);
  }
  console.log(currentPage);

  elNextBtn.addEventListener(`click`, ()=> {
    console.log(currentPage+1);
  })

  elPrevBtn.addEventListener(`click`, ()=> {
    console.log(currentPage-1);
  })


})
console.log(currentPage);
