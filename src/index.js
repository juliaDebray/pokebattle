import './styles/index.scss';
import Pokemon from './javascripts/Pokemon';

const pkmModal = document.getElementById('pokemon-modal');

pkmModal.addEventListener('click', (event) => {
    if(event.target === event.currentTarget) {
        event.target.open = false;
        event.target.lastElementChild.remove();
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


const pokeballs = document.getElementsByClassName('pokeball');

// fonction de définition de l'ID du pokémon :
for(const pokeball of pokeballs) {
    pokeball.addEventListener('click', (event) => {

        const image = document.createElement('img');
        const pokemonId = event.currentTarget.dataset.id;
        image.src = `./src/images/pokemon-${pokemonId}.png`;
        pkmModal.append(image);
        pkmModal.open = true;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            else {
                return {};
            }
        })
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
