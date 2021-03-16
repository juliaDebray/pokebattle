import './styles/index.scss';

const pokeballs = document.getElementsByClassName('pokeball');
const pkmModal = document.getElementById('pokemon-modal');

pkmModal.addEventListener('click', (event) => {
    if(event.target === event.currentTarget) {
        event.target.open = false;
        event.target.lastElementChild.remove();
    }
});

//fonction de définition de l'ID du pokémon:
const openPokeball = () => {
    for(const pokeball of pokeballs) {
        pokeball.addEventListener('click', (event) => {
            const image = document.createElement('img');
            const pokemonId = event.currentTarget.dataset.id;
            image.src = `./src/images/pokemon-${pokemonId}.png`;
            pkmModal.append(image);
            pkmModal.open = true;
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
            })
        });
    }
}

openPokeball();



