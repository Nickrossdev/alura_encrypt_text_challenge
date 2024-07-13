let systemColorScheme;
let theme;

const checkboxTheme = document.getElementById('checkbox');
const root = document.getElementById('root');


function changeAppTheme(){
    
    if(theme === 'dark'){
        root.classList.remove('dark');
        root.classList.add('light');
        theme = 'light';
    } else {
        root.classList.remove('light');
        root.classList.add('dark');
        theme = 'dark';
    }
}

function addClassThemeUser(){
    if (systemColorScheme === 'dark'){
        root.classList.add('dark');
    } else {
        root.classList.add('light');
    }
}

// Función para obtener y guardar la preferencia de tema del sistema
function detectSystemColorSchemeUser() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        systemColorScheme = 'dark';
    } else {
        systemColorScheme = 'light';
    }
    theme = systemColorScheme;
}

checkboxTheme.addEventListener('click', changeAppTheme);

// Llama a la función al cargar la página
window.addEventListener('load', () => {
    detectSystemColorSchemeUser();
    addClassThemeUser();
});
