//RESET BUTON

//SET TIME OUT
//let timer= setTimeout(function(){},2000);

//LOGICA DEL JUEGO
let turno = 1; //A quien le toca tirar, 1(usiario),-1(pc
const fichas = ["O", "X"]; //Array fichas, cruz va a ser el usuario
let puestas = 0;//Cuantas fichas hay puestas, cuando haya 9 la partida ha terminado o cuando alguien gana
let partidaAcabada = false;//Boleano que indica si la partida ha terminado
let textoVictoria = document.getElementById("textoVictoria");//Elemento del DOM en el cual se está el texto de victoria
let botones = Array.from(document.getElementsByTagName("button"));



const reset = () => {
	 //turno = 1; //A quien le toca tirar, 1(usiario),-1(pc
	 //puestas = 0;//Cuantas fichas hay puestas, cuando haya 9 la partida ha terminado o cuando alguien gana
	 //partidaAcabada = false;//Boleano que indica si la partida ha terminado
     //textoVictoria.innerHTML = null;
	 //botones.forEach(ele => ele.innerHTML = "");
     //args.forEach(x => x.classList.remove('boton-victoria'));
     window.location.reload();

     

}

document.querySelector('#reset').addEventListener('click',reset);

const aleatorio = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ponerFicha = event => {
	
	let botonPulsado = event.target;//Event es el click

	if (!partidaAcabada && botonPulsado.innerHTML == "") {
		botonPulsado.innerHTML = fichas[turno];
		puestas += 1;

		let estadoPartida = estado();
		if (estadoPartida == 0) {
			cambiarTurno();
			if (puestas < 9) {

				ia();
				estadoPartida = estado();
				puestas += 1;
				cambiarTurno();
			}
			else if (puestas == 9) {
				textoVictoria.innerHTML = "TIE... try it again "
				partidaAcabada = true;
				textoVictoria.style.visibility = "visible";

			}
		}

		if (estadoPartida == 1) {
			textoVictoria.style.visibility = "visible";
			partidaAcabada = true;
			//reset();
		}
		else if (estadoPartida == -1) {
			textoVictoria.innerHTML = "Oh no, you lost ;( Try again!"
			partidaAcabada = true;
			textoVictoria.style.visibility = "visible";
		}

	}
};

//En todos los botones  del tres en raya, se ejecutara la función poner ficha
botones.forEach(x => x.addEventListener("click", ponerFicha));

const cambiarTurno = () => (turno == 1) ? turno = 0 : turno = 1;

const estado = () => {
	posicionVictoria = 0;
	nEstado = 0;

	//cuidado con anidar funciones dentro de funciones
	const sonIguales = (...args) => {
		valores = args.map(x => x.innerHTML);
		if (valores[0] && valores.every((x, _, arr) => x === arr[0])) {
			args.forEach(x => x.classList.add('boton-victoria'));
			return true;
		}
		return false;
	}

	//Comprobamos si hay alguna linea
	//Posible algoritmo
	//Lineas horizontales
	if (sonIguales(botones[0], botones[1], botones[2])) {
		posicionVictoria = 1;
	}

	else if (sonIguales(botones[3], botones[4], botones[5])) {
		posicionVictoria = 2;
	}

	else if (sonIguales(botones[6], botones[7], botones[8])) {
		posicionVictoria = 3;
	}

	//Lineas verticales
	else if (sonIguales(botones[0], botones[3], botones[6])) {
		posicionVictoria = 4;
	}

	else if (sonIguales(botones[1], botones[4], botones[7])) {
		posicionVictoria = 5;
	}

	else if (sonIguales(botones[2], botones[5], botones[8])) {
		posicionVictoria = 6;
	}

	//Lineas diagonales
	else if (sonIguales(botones[0], botones[4], botones[8])) {
		posicionVictoria = 7;
	}

	else if (sonIguales(botones[2], botones[4], botones[6])) {
		posicionVictoria = 8;
	}

	//Comprobamos quien ha ganado
	if (posicionVictoria > 0) (turno == 1) ? nEstado = 1 : nEstado = -1;

	return nEstado;
}

const ia = () => {

	let valores = botones.map(x => x.innerHTML);
	let pos = -1;

	if (valores[4] == "") {
		pos = 4;
	} else {
		let n = aleatorio(0, botones.length - 1);
		//Peligro los bucles while no los usa ni Peter
		while (valores[n] != "") {
			n = aleatorio(0, botones.length - 1);
		}
		pos = n;
	}
	botones[pos].innerHTML = "O";
	return pos;
}


