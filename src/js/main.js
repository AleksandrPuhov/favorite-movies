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

const movies = [];
let needDeleteMovieId = 0;

const updateUI = () => {
    entryText.style.display = movies.length > 0 ? 'none' : 'block';
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;

    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }

    movies.splice(movieIndex, 1);

    listRoot.children[movieIndex].remove();
};

const deleteMovieHandler = (movieId) => {
    showDeleteModal();
    needDeleteMovieId = movieId;
};

const renderNewMovieElement = (id, title, imageUrl, raiting) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${raiting}/5 starts</p>
        </div>
    `;
    newMovieElement.addEventListener(
        'click',
        deleteMovieHandler.bind(null, id)
    );
    listRoot.appendChild(newMovieElement);
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
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const raitingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        raitingValue.trim() === '' ||
        +raitingValue < 1 ||
        +raitingValue > 5
    ) {
        alert('Please enter valid value');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        raiting: raitingValue,
    };

    movies.push(newMovie);
    console.log(movies);

    clearMovieInputs();
    closeMovieModal();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.raiting
    );
    updateUI();
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
