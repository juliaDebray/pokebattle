import './styles/index.scss';

const pokeballs = document.getElementsByClassName('pokeball');
// const pkmModal = document.getElementById('pokemon-modal');

// // TODO : Attention : revoir la fermeture de la modale plus tard.
// pkmModal.addEventListener('click', () => {
//     pkmModal.open = false;
// })

//fonction de définition de l'ID du pokémon:
const openPokeball = () => {
    for(const pokeball of pokeballs) {
        pokeball.addEventListener('click', (event) => {
            const pokemonId = event.currentTarget.dataset.id;
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



