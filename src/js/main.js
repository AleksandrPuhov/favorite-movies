const addMovieModal = document.getElementById('add-modal');
const cancelButtonAddModal = document.getElementById('cancel-btn-add-modal');
const addButtonAddModal = document.getElementById('add-btn-add-modal');
const userInputs = addMovieModal.querySelectorAll('.modal__content-input');

const deleteMovieModal = document.getElementById('delete-modal');
const noButtonDeleteModal = document.getElementById('no-btn-delete-modal');
const yesButtonDeleteModal = document.getElementById('yes-btn-delete-modal');

const startAddMovieButton = document.getElementById('start-add-movie-button');
const backdrop = document.getElementById('backdrop');

const entryText = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');

const filter = document.getElementById('filter');
const searchButton = document.getElementById('search-btn');
const filterInput = document.getElementById('filter-title');

const movies = [];
let needDeleteMovieId = 0;

const updateUI = () => {
    entryText.style.display = movies.length > 0 ? 'none' : 'block';
    filter.style.display = movies.length > 0 ? 'block' : 'none';
};

const deleteMovie = (movieId) => {
    const movieIndex = movies.findIndex((movie) => {
        return movie.id === movieId;
    });

    movies.splice(movieIndex, 1);

    listRoot.children[movieIndex].remove();
};

const deleteMovieHandler = (movieId) => {
    showDeleteModal();
    needDeleteMovieId = movieId;
};

const renderMovies = (filterText = '') => {
    listRoot.innerHTML = '';

    const filterMovies = !filterText
        ? movies
        : movies.filter((movie) => {
              return movie.info.title.includes(filterText);
          });

    filterMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        movieEl.className = 'movie-element';

        let text = '';
        for (key in movie.info) {
            if (key !== 'title' && key !== 'raiting') {
                text = `${key} : ${movie.info[key]}`;
            }
        }
        movieEl.innerHTML = `
        <div class="movie-element__info">
            <h2>${movie.info.title}</h2>
            <h3>${text}</h3>
            <p>${movie.info.raiting}/5 starts</p>
        </div>
        `;
        movieEl.addEventListener(
            'click',
            deleteMovieHandler.bind(null, movie.id)
        );
        listRoot.append(movieEl);
    });
};

const showBackdrop = () => {
    backdrop.classList.add('visible');
};

const closeBackdrop = () => {
    backdrop.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    showBackdrop();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    closeBackdrop();
};

const showDeleteModal = () => {
    deleteMovieModal.classList.add('visible');
    showBackdrop();
};

const closeDeleteModal = () => {
    deleteMovieModal.classList.remove('visible');
    closeBackdrop();
};

const clearMovieInputs = () => {
    userInputs.forEach((input) => (input.value = ''));
};

const addMovieHandler = () => {
    const title = userInputs[0].value;
    const extraName = userInputs[1].value;
    const extraValue = userInputs[2].value;
    const raiting = userInputs[3].value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === '' ||
        raiting.trim() === '' ||
        +raiting < 1 ||
        +raiting > 5
    ) {
        alert('Please enter valid value');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        info: {
            title: title,
            [extraName]: extraValue,
            raiting: raiting,
        },
    };

    movies.push(newMovie);

    clearMovieInputs();
    closeMovieModal();
    updateUI();
    renderMovies();
};

startAddMovieButton.addEventListener('click', () => {
    showMovieModal();
});

backdrop.addEventListener('click', () => {
    closeMovieModal();
    clearMovieInputs();
    closeDeleteModal();
});

cancelButtonAddModal.addEventListener('click', () => {
    closeMovieModal();
    clearMovieInputs();
});

addButtonAddModal.addEventListener('click', addMovieHandler);

noButtonDeleteModal.addEventListener('click', () => {
    closeDeleteModal();
});

yesButtonDeleteModal.addEventListener('click', () => {
    deleteMovie(needDeleteMovieId);
    closeDeleteModal();
    updateUI();
});

searchButton.addEventListener('click', () => {
    renderMovies(filterInput.value);
});
