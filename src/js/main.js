const addMovieModal = document.getElementById('add-modal');
const cancelButtonAddModal = document.getElementById('cancel-btn-add-modal');
const addButtonAddModal = document.getElementById('add-btn-add-modal');
const userInputs = addMovieModal.querySelectorAll('.modal__content-input');

const startAddMovieButton = document.getElementById('start-add-movie-button');
const backdrop = document.getElementById('backdrop');

const entryText = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');

const movie = [];

const renderNewMovieElement = (title, imageUrl, raiting) => {
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
    listRoot.appendChild(newMovieElement);
};

const updateUI = () => {
    entryText.style.display = movie.length > 0 ? 'none' : 'block';
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
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
        title: titleValue,
        image: imageUrlValue,
        raiting: raitingValue,
    };

    movie.push(newMovie);
    console.log(movie);

    clearMovieInputs();
    toggleMovieModal();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.raiting);
    updateUI();
};

startAddMovieButton.addEventListener('click', () => {
    toggleMovieModal();
});

backdrop.addEventListener('click', () => {
    toggleMovieModal();
});

cancelButtonAddModal.addEventListener('click', () => {
    toggleMovieModal();
    clearMovieInputs();
});

addButtonAddModal.addEventListener('click', addMovieHandler);
