/* Constantes y Variables Globales*/
const ACCENTS = ['á', 'é', 'í', 'ó', 'ú'];
const DICTIONARY = [['a', 'ai'], ['e', 'enter'], ['i', 'imes'], ['o', 'ober'], ['u', 'ufat']];

/* Obtener Areas de texto */
const textEntrada = document.getElementById('text_entrada');
const textSalida = document.getElementById('text_salida');

/* Obtener botones */
const buttonEncrypt = document.getElementById('button_encrypt');
const buttonDecrypt = document.getElementById('button_decrypt');
const buttonCopy = document.getElementById('button_copy');

/* Eventos de botones */
buttonEncrypt.addEventListener('click', () => processText('encrypt'));
buttonDecrypt.addEventListener('click', () => processText('decrypt'));
buttonCopy.addEventListener('click', copy);

/* Funciones de la app*/
function encrypt(text) {
  let words = text.split(' ');
  let wordsEncrypt = [];

  for (let word of words) {
    let wordEncrypt = '';
    for (let letter of word) {
      let found = false;
      for (let rule of DICTIONARY) {
        if (letter === rule[0]){
          wordEncrypt += rule[1];
          found = true;
          break;
        }
      }
      if(!found){
        wordEncrypt += letter
      }
    }
    wordsEncrypt.push(wordEncrypt);
  }
  console.log(wordsEncrypt.join(' '));
}

function decrypt(text) {
  let textDecrypt = text;
  for(let rule of DICTIONARY){
    let regex = new RegExp(rule[1], 'g');
    textDecrypt = textDecrypt.replace(regex, rule[0]);
  }
  console.log(textDecrypt);
}

function processText(accion) {
  let text = obtainText();
  text = validateText(text);
  if (text === null) return;
  switch (accion) {
    case 'encrypt':
      encrypt(text);
      break;
    case 'decrypt':
      decrypt(text);
      break;
  }
}

function obtainText() {
  const textEntrada = document.getElementById('text_entrada');
  return textEntrada.value;
}

function normalizeText(text) {
  return text.trim();
}

function validateText(text) {
  if (text === '') {
    let message = 'Por favor antes de empezar introduce un texto';
    errorTextEntrada(message);
    console.log(message);
    return null;
  } else if (detectMayusc(text) === true) {
    let message = 'Por favor introduzca solo letras minúsculas';
    errorTextEntrada(message);
    console.log(message);
    return null;
  } else if (detectAccent(text) === true) {
    let message = 'Por favor introduzca solo letras sin tildes';
    errorTextEntrada(message)
    console.log(message);
    return null;
  }
  return text;

}

function detectMayusc(text) {
  let isMayusc = false;
  let words = text.split(' ');
  for (let word of words) {
    if (isMayusc === true) break;
    for (let letter of word) {
      if (letter === letter.toUpperCase()) {
        isMayusc = true;
        break;
      }
    }
  }
  return isMayusc;
}

function detectAccent(text) {
  let isAccent = false;
  let words = text.split(' ');
  for (let word of words) {
    if (isAccent === true) break;
    for (let letter of word) {
      for (let element of ACCENTS) {
        if (letter === element) {
          isAccent = true;
          break;
        }
      }
    }
  }
  return isAccent;
}

function errorTextEntrada(message) {
  let infoText = document.getElementById('info_text');
  let infoIcon = document.getElementById('info_icon');
  const textEntrada = document.getElementById('text_entrada');
  infoText.textContent = message;
  infoText.classList.add('active');
  infoIcon.classList.add('active');
  textEntrada.classList.add('active');
  console.log(infoText)
  setTimeout(() => {
    console.log(infoText.textContent);
    infoText.classList.remove('active');
    infoIcon.classList.remove('active');
    textEntrada.classList.remove('active');
    infoText.textContent = 'Solo letras minúsculas y sin acentos.';
  }, 4000);
  return;
}

async function copy() {
  console.log('copiado');
  const textSalida = document.getElementById('text_salida').textContent;
  try {
    await navigator.clipboard.writeText(textSalida);
    console.log('copiado!')
    buttonCopy.textContent = 'Copiado!';
    setTimeout(() => {
      buttonCopy.textContent = 'Copiar'
    }, 1500);
  } catch (error) {
    console.log('Error al copiar', error)
  }

}

/* Funciones Auxiliares */

function limpiarTextEntrada() {
  const textEntrada = document.getElementById('text_entrada');
  textEntrada.value = '';
}