const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const limit = 5
let offset = 0
const maxRecords = 151


function loadPokemonItems(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                        ${pokemon.types.map(((type) => `<li class="type ${type}">${type}</li>`)).join('')}
                        </ol>
                        <img src="${pokemon.image}"
                            alt="${pokemon.name}">
                    </div>
                </li>`
        ).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItems()

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItems(offset, limit)
    }
})