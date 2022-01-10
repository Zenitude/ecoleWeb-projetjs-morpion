// Variables du jeu
let elActuel = 'X';
let tabCase = [];
let partieEnCours = ["","","","","","","","",""];

const alignementGagnant = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Sélection du body
const body = document.body;

// Création du container principal
const container = document.createElement('div');
container.setAttribute('class', 'container');
body.appendChild(container);

// Création du titre
const titre = document.createElement('h1');
titre.innerHTML = 'Jeu du Morpion';
container.appendChild(titre);

// Création de la grille
const grille = document.createElement('div');
grille.setAttribute('class', 'grille');
container.appendChild(grille);

// Création des 9 cases

for(let c = 0 ; c < 9 ; c++)
{
    const cases = document.createElement('div');
    cases.setAttribute('class', 'cases');
    cases.classList.add(`case${c+1}`);
    cases.setAttribute('data-index', c);
    cases.addEventListener('click', ajouteElement);
    grille.appendChild(cases);
    tabCase.push(cases);
}

// Création du tour
const tour = document.createElement('h2');
tour.innerHTML = `Au tour de ${elActuel}.`;
container.appendChild(tour)

// Fonctions

function ajouteElement(e)
{
    // A chaque click dans une case on ajoute l'élément actuel
    e.target.innerHTML = elActuel;

    // A chaque click dans une case on ajoute l'élément au tableau de la partie en cours
    partieEnCours[e.target.getAttribute('data-index')] = e.target.innerHTML;
    
    // Pour chaque case
    tabCase.forEach(cases => 
    {
        // Si la case n'est pas vide on supprime l'élément click
        if(cases.innerHTML !== '')
        {
            cases.removeEventListener('click', ajouteElement);
        }
    });    

    // A chaque click on change d'élément
    elements();

    // A chaque click on regarde où en est le jeu
    verifResult();
}

function elements()
{
    elActuel = elActuel === 'X' ? 'O' : 'X';
    tour.innerHTML = `Au tour de ${elActuel}.`;
}

function verifResult()
{
    let finPartie = false;

    for(let i = 0 ; i < alignementGagnant.length ; i++)
    {
        const checkWin = alignementGagnant[i];
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];

        // Si toutes les cases sont vides
        if(a === '' || b === '' || c === '')
        {
            continue;
        }

        // Si les 3 cases ont la même valeur
        if(a === b && b === c)
        {
            finPartie = true;
            break;
        }
    }

    // Si la partie est finie
    if(finPartie)
    {
        // Indiquer quel joueur a gagné
        elements();
        tour.innerHTML = `Le joueur ${elActuel} a gagné !`

        // Supprimer les événements click
        tabCase.forEach(cases => 
        {
            cases.removeEventListener('click', ajouteElement);
        });  
        return;

    }

    // Vérification match nul
    let matchNul = !partieEnCours.includes('');

    // Si il y a un match nul
    if(matchNul)
    {
        // Indiquer l'état du jeu
        tour.innerHTML = `Match nul !`

        // Supprimer les événements click
        tabCase.forEach(cases => 
        {
            cases.removeEventListener('click', ajouteElement);
        });  
        return;
    }

}

