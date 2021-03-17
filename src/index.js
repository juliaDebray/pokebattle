import './styles/index.scss';
import Pokemon from './javascripts/Pokemon';

const pkmModal = document.getElementById('pokemon-modal');
const modelContent = document.querySelector('.modal-content');

pkmModal.addEventListener('click', (event) => {
    if(event.target === event.currentTarget) {
        event.target.open = false;
        event.target.querySelector('img').remove();
    }
});

// Récupération des éléments de la modale :
const pokemonName = document.getElementById('pokemon-name');
const pokemonType = document.getElementById('pokemon-type');
const pokemonLevel = document.getElementById('pokemon-level');
const pokemonLifePoint = document.getElementById('pokemon-hp');
const pokemonAttack = document.getElementById('pokemon-attack');
const pokemonDefense = document.getElementById('pokemon-defense');
const pokemonSpecialAttack = document.getElementById('pokemon-attack-special');
const pokemonSpecialDefense = document.getElementById('pokemon-defense-special');
const buttonChoosePokemon = document.getElementById('submit');
const buttonResetPokemon = document.getElementById('reset');


const pokeballs = document.getElementsByClassName('pokeball');

// Appel à PokéAPI :
for (const pokeball of pokeballs) {
    pokeball.addEventListener('click', (event) => {

        //Définition de l'ID du pokémon :
        const pokemonId = event.currentTarget.dataset.id;

        // Ajout de l'image du pokémon dans la modale :
        const image = document.createElement('img');
        image.src = `./src/images/pokemon-${pokemonId}.png`;
        modelContent.insertBefore(image, modelContent.lastElementChild);

        // Ouverture de la modale :
        pkmModal.open = true;

        // Appel API :
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                return {};
            }
        })
        // Définition des statistiques des pokémon et injection dans la modale :
        .then((data) => {
            const pokemon = new Pokemon(data);

            pokemonName.textContent = pokemon.name;
            pokemonLevel.textContent = pokemon.level;
            pokemonLifePoint.textContent = pokemon.lifePoint;
            pokemonAttack.textContent = pokemon.attack;
            pokemonDefense.textContent = pokemon.defense;
            pokemonSpecialAttack.textContent = pokemon.specialAttack;
            pokemonSpecialDefense.textContent = pokemon.specialDefense;
            pokemonType.textContent = pokemon.types.join(' / ');

        })

        .catch((error) => {
            console.error(error)
        })

    });

}

// fermeture de la modale :
buttonResetPokemon.addEventListener('click', (event) => {
    pkmModal.open = false;
    event.target.parentNode.lastElementChild.previousSibling.remove();
})

// choisir le pokemon :
buttonChoosePokemon.addEventListener('click', () => {
    pkmModal.open = false;
    event.target.parentNode.lastElementChild.previousSibling.remove();
})


