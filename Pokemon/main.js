const CARDS = 3;

//Que es una promesa y como la hacemos:
// Algo que puede darse o no, pero que la API yo te digo que te voy a dar lo que vos me pedis
// Con then le pregunto que pasa con lo que me prometiste 
// JSON me transforma la informacion que le solicito en un objeto que lo puedo utilizar 
//------------API----------------
//EL PRIMER FETCH TOMO LOS VALORES QUE LE PIDO A LA API.
//LUEGO ME PASA UNA PROMESA, ESA PROMESA LA TRABAJO CON THEN QUE BASICAMENTE LE PREGUNTO QUE ES LO QUE PASA CON LO QUE ME PROMETIO
//LUEGO A ESA RESPUESTA LE APLICO UN JSON PARA TRANSFORMAR ESA INFORMACION EN ALGO UTILIZABLE 
//ME PASA OTRA PROMESA Y LA VUELVO A TRABAJAR CON EL METODO THEN
// LUEGO GRACIAS A ESO ME PASA LOS VALORES Y LOS DATOS QUE NECESITO PARA PODER TRABAJAR COMO EL ID, EL NOMBRE Y MÁS 
//ME PASA UN OBJETO DIGAMOS. 

for(let i = 1; i <= CARDS; i++){
    let id = getRandomId(210);
    //console.log(`Este es el ID ${id}`);
    searchPokemonById(id);
}


function getRandomId(max){
    //Valor random para luego sacar el valor random de un pokemon
    return Math.floor(Math.random()*max)+1 
}

let pokemonNames = []; //Array de nombres de pokemones
let pokemonSearched = []; //Array de pokemones 
let draggableElements = document.querySelector('.draggable-elements'); //Donde alojo los pokemones que voy a crear
let droppableElements = document.querySelector('.droppable-elements'); //Donde voy a alojar el nombre de cada pokemon


async function searchPokemonById(id) {
    /* PETICION DE POKEMON A LA API */
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) //Promesa de la api, la guarda en res
    const data = await res.json(); //Promesa de JSON lo guarda en data(Json me daba informacion que puedo utilizar)
    
    //Arreglo con los pokemones 
    pokemonSearched.push(data);
    //Arreglo con los nombres de los pokemones
    pokemonNames.push(data.name);
    //Randiamos la posicion de nuestrov nombre del pokemon
    pokemonNames = pokemonNames.sort(()=>Math.random()-0.5)

    //Dibujamos el elemento y el pokemon con una imagen 
    draggableElements.innerHTML = ''
    pokemonSearched.forEach(pokemon => {
        //sprites y backdefault busca la imagen y la imprime y la pega donde esta la ruta de la imagen 
        //console.log(pokemon.sprites.back_default);
        draggableElements.innerHTML += `
        <div class="pokemon">
            <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
        </div>` //Crea un div por cada pokemon que voy a crear y cada id nuevo que encuentra
    })

    //Creamos el elemento y les pasamos los nombres de los pokemones
    droppableElements.innerHTML = ''
    pokemonNames.forEach(name => {
        //nombrePokemon = nombrePokemon.sort(()=>Math.random()-0.5)
        droppableElements.innerHTML += `
        <div class="names">
            <p>${name}</p>
        </div>`
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    console.log(pokemons);
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart' , event=>{
            console.log(event);
        })
    })
}

