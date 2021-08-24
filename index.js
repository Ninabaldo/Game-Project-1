


// Make a 3x3 grid table




function makeBlocks() {
   
    let button = document.getElementById("button") 
    if(button.value === "RESET"){
      
      let boxParent = document.getElementById('boxParent') 
       console.log('entra')
       boxParent.innerHTML = null
       console.log (boxParent)
    }
      
    for (let rowNumber = 0; rowNumber < 3; rowNumber++) { //recorro tres filas 
        let row = document.createElement('div'); //creo la row
        row.className = "row"; // le asigno la clase row
        
        for (let cellNumberInThisRow = 0; cellNumberInThisRow < 3; cellNumberInThisRow++) { //recorro tres celdas 
            let box = document.createElement('div');// creas la celda (box) con un div
            box.className = "box"; // le ponemos box a la clase 
            box.id = 'cell' + rowNumber + cellNumberInThisRow //ejemplo: box en row 1, celda 0 => id = cell10 (para identificarla)
            box.addEventListener("click", (e)=> {
                //turn ++; 
                  (e.target);  //al clicar añades 1 a las fichas que clicas 
                
                //const color=  turn % 2? "blue" : "pink";  // si clicas en impares son azules y sino color rosa
                //box.style.backgroundImage = turn % 2 ''  : ''
            
            })  
            row.appendChild(box); // añade las celdas a la fila en el HTML 
            document.getElementById('boxParent').appendChild(row); // //añade las filas
        }
            
    }
            
    if(button.value === "START"){ //si en el boton pone start
            
        button.value = "RESET" //cambia el valor del boton a RESET 
    }

}



//**LOGICA DEL JURGO**
//creamos unas variables que utilizaremos previamente
let turn =1 // A quien le toca tirar (1(usuario), -1(pc))
let fichas =["O", "X"]; //array fichas/ cruz va a ser el usuario
let fichasPuestas = 0 //cuantas fichas he puesto / cuando hay 9 la partida ha terminado
let particaAcabada = false //boleano indica si la partida ha terminado
let victoria = document.getElementById("vicroty"); //mensaje de html de You Win!!!
let boxParent = Array.from(document.getElementsById("boxParent")) 

boxParent.forEach(x =>addEventListener("click, ponerFicha")); //todos los botones del 3en raya se ejecutará la funcion poner ficha

function ponerFicha(event){ //event es el click
    let botonPulsado=event.target; //target es el elemento pulsado
    if(partidaAcabada && botonPulsado.innerHTML == ""){ //comprovamos con un if que la partida no ha terminado y que el boton no ha sido pulsado previamente
        botonPulsado.innerHTML = fichas[turn]; //*** 
        fichasPuestas += 1;
//consultamos el estado de la partida
       let estadoPartida = estado(); 
       if(estadoPartida ==0){ //nadie ha ganado
           cambiarTurn();
        if(fichasPuestas < 9){
            ia();
            estadoPartida = estado();
            fichasPuestas += 1;
            cambiarTurn();  
        }}}
}

function cambiarTurn(){
    if(turn==1){
        turn = 0;
    }
    else{turn = 1;}
}

function estado(){  //nos dice no solo si ha habido una victoria sino dónde ha sido la victoria (para poder marcar la linea ganadora)
   victoria =0; //de momento nadia ha ganado 
   nEstado =0; // 0 si la partida continual. 1 si gana el usuario y -1 gana el pc
}

function sonIguales(...args){ //comprueba que elementos son iguales  
    valores = args.map(x => x,innerHTML); //*****
    if (valores[0] != "" && valores.every((x, i, arr) => x===arr[0])){ //every (metodo que aplicamos a los array), determina que elementos son iguales al primer y que no sean el valor vacío
        args.forEach(x => x.style.backgroundColor = "pink") //si se da la condicion de arriva, iteramos con un forEach i ponemos el boton en rosa-
        return true;
    }
    else{
        return false; 
    }

}

//COMPROBAMOS SI HAY ALGUNA LINEA 8 COMBINACIONES de victoria POSIBLES
// cell00 o 00?? boxparent???

if(sonIguales(boxParent[00], boxParent[01], boxParent[02])){
    victoria = 1;
}
else if(sonIguales(boxParent[10], boxParent[11], boxParent[12])) {
    victoria = 2;
}

else if(sonIguales(boxParent[20], boxParent[21], boxParent[22])) {
    victoria = 3;
}

else if(sonIguales(boxParent[00], boxParent[10], boxParent[20])) {
    victoria = 4;
}

else if(sonIguales(boxParent[01], boxParent[11], boxParent[21])) {
    victoria = 5;
}

else if(sonIguales(boxParent[02], boxParent[12], boxParent[22])) {
    victoria = 6;
}

else if(sonIguales(boxParent[00], boxParent[11], boxParent[22])) {
    victoria = 7;
}

else if(sonIguales(boxParent[02], boxParent[11], boxParent[20])) {
    victoria = 8;
}

if(victoria > 0){ //si es mayor que 0 alguien ha ganado
    if (turn ==1){ //el ganador es el usuario
        nEstado = 1;
    }
    else{
        nEstado =-1 //el ganador es el pc
    }
    
}

       return nEstado; // en consola sale ERROR ILEGAL RETURN STATMENT
  

function ia(){ // nos selecciona una funcion aleatoria

    function aleatorio (min,max) { // entre el minimo y el maximo
        
        return Math.floor(Math.random() * (max - min + 1)) + min; //nos devuelve un nu,ero entre 0 y 1 math. floor nos devuelve a decimales

    }
    let valores = boxParent.map(x=> x.innerHTML);
    let pos =-1;

     if (valores[11] ==""){ //esta el centro libre? para que el pc ponga ficha
     pos = 11;
    }
      else{// si no esta libre creamos un aleatorio
      let n = aleatorio(0,boxParent.length-1)
      while(valores[n]!=""){
         n = aleatorio(0,boxParent.length-1);
     }
     pos = n;
 }
      boxParent[pos].innerHTML = "O";
  
      return pos;


}


