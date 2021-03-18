import './styles/index.scss';
import Pokemon from './javascripts/Pokemon';

(async () => {
    const pokeballs = document.getElementsByClassName('pokeball');

    // recherche de l'id des pokémons
    const searchPokemonId = () => {

        const pokemonIds = [...pokeballs].map((pokeball) => {
            return pokeball.dataset.id;
        });

        return pokemonIds;
    };

    // recherche des données des pokémons
    const searchPokemonData = (pokemonIds) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIds}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return {};
                }
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // placement des pokémons dans les pokéballs
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonType = document.getElementById('pokemon-type');
    const pokemonLevel = document.getElementById('pokemon-level');
    const pokemonLifePoint = document.getElementById('pokemon-hp');
    const pokemonAttack = document.getElementById('pokemon-attack');
    const pokemonDefense = document.getElementById('pokemon-defense');
    const pokemonSpecialAttack = document.getElementById('pokemon-attack-special');
    const pokemonSpecialDefense = document.getElementById('pokemon-defense-special');
    const modalContent = document.querySelector('.modal-content');

    // Récupère le pokémon de la pokéball par rapport à son ID
    const getCurrentPokemon = (pokemons, pokeballId) => {
        const currentPokemon = pokemons.find((pokemon) => {
            return pokemon.id === parseInt(pokeballId);
        });

        return currentPokemon;
    };

    // injection des informations du pokemon selectionné dans la pokeball
    const insertPokemonInPokeball = (event, currentPokemon) => {
        pokemonName.textContent = currentPokemon.name;
        pokemonLevel.textContent = currentPokemon.level;
        pokemonLifePoint.textContent = currentPokemon.lifePoint;
        pokemonAttack.textContent = currentPokemon.attack;
        pokemonDefense.textContent = currentPokemon.defense;
        pokemonSpecialAttack.textContent = currentPokemon.specialAttack;
        pokemonSpecialDefense.textContent = currentPokemon.specialDefense;
        pokemonType.textContent = currentPokemon.types.join(' / ');

        // ajout de l'image du pokemon dans la pokeball
        const pokemonImage = document.createElement('img');
        pokemonImage.src = `./images/pokemon-${currentPokemon.id}.png`;
        modalContent.appendChild(pokemonImage);
    };

    // fonction d'ouverture de la pokéball
    const pokemonModal = document.getElementById('pokemon-modal');
    const openPokeball = (pokemon) => {
        pokemonModal.dataset.id = pokemon.id;
        pokemonModal.open = true;
    };

    // tableau des pokémons
    const pokemons = [];
    const pokemonIds = searchPokemonId();

    // création des pokémon
    for (const id of pokemonIds) {
        const pokemonData = await searchPokemonData(id);

        const pokemon = new Pokemon(pokemonData);
        pokemons.push(pokemon);
    }

    // Ouverture de la pokéball
    for (const pokeball of pokeballs) {
        pokeball.addEventListener('click', (event) => {
            // recherche du pokemon à mettre dans la pokeball
            const pokeballId = event.currentTarget.dataset.id;

            const currentPokemon = getCurrentPokemon(pokemons, pokeballId);
            insertPokemonInPokeball(event, currentPokemon);
            openPokeball(currentPokemon);
        });
    }

    // fermeture de la pokéball
    const closePokeball = () => {
        pokemonModal.open = false;
        modalContent.lastElementChild.remove();
    };

    // ferme la pokéball en cliquant sur le bouton annuler
    const buttonResetPokemon = document.getElementById('reset');
    buttonResetPokemon.addEventListener('click', () => {
        closePokeball();
    });

    // ferme la pokéball en cliquant en dehors de la modale
    pokemonModal.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closePokeball();
        }
    });

    // ferme la pokéball en choisissant un pokemon
    const buttonChoosePokemon = document.getElementById('submit');
    buttonChoosePokemon.addEventListener('click', () => {
        // ferme la pokéball
        closePokeball();

        // retourne le pokémon choisi
        const pokeballId = pokemonModal.dataset.id;
        const currentPokemon = getCurrentPokemon(pokemons, pokeballId);
        pokemons.current = currentPokemon;

        // lance le combat
        battleStart();
    });

    // animation de début du combat
    const body = document.body;
    const pokeballGroup = document.getElementById('app');
    const pokemonBattle = document.getElementById('pokemon-battle');



    const battleStart = () => {
        body.classList.add('battle');
        body.addEventListener('animationend', () => {
            body.classList.remove('battle');
            while (pokeballGroup.firstChild) {
                pokeballGroup.removeChild(pokeballGroup.firstChild);
            }
            pokeballGroup.appendChild(pokemonBattle);

            // ajout de l'image du pokemon dans la modale
            const pokemonImage = pokemons.current.id;
            const battlePokemonImage = pokemonBattle.querySelector('img');
            battlePokemonImage.src = `./images/pokemon-${pokemonImage}.png`;

            // définission de l'adversaire
            const getRandomPokemonPosition = (min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            };
            const randomPokemonPosition = getRandomPokemonPosition(0, pokemons.length - 1);

            const adversaryPokemon = pokemons[randomPokemonPosition];

            // points de vie de l'adversaire
            let adversaryLifePoint = adversaryPokemon.lifePoint;

            // attaque sur les points de vie de l'adversaire et affichage des données d'attaques dans l'aside
            const powerAttack = 10;
            const attackButton = document.querySelector('.cta-attack');
            const battleDetails = document.getElementById('pokemon-details');

            attackButton.addEventListener('click', () => {
                // Date en cours
                const currentDate = new Date();

                // Format de la date qu'on voudra afficher
                const dateOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                };

                // Date formatté
                const dateFormatted = new Intl.DateTimeFormat('fr-FR', dateOptions).format(currentDate);

                if (adversaryLifePoint > 0) {
                    adversaryLifePoint -= powerAttack;
                    const battleElement = document.createElement('p');
                    battleElement.textContent = `${dateFormatted} - ${pokemons.current.name} tabasse ${adversaryPokemon.name} et lui met ${powerAttack} points de dégâts dans sa face !`;
                    battleDetails.prepend(battleElement);

                    if (adversaryLifePoint < 0) {
                        battleElement.textContent = `${adversaryPokemon.name} est dead !`;
                        battleDetails.prepend(battleElement);
                        attackButton.disabled = true;
                    }
                }
            });
        });
    };

})();
