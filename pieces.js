// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();



for (let i = 0; i < pieces.length; i++) {
    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d'une balise dédiée à un pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l'élément img.
    const imageElement = document.createElement('img');
    // On accède à l'indice i de la liste pieces pour configurer la source de l'image.
    imageElement.src = article.image;
    // On rattache la balie article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l'image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie
    const nomElement = document.createElement('h2');
    nomElement.innerText = article.nom;
    const prixElement = document.createElement('p');
    prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement('p');
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const disponibiliteElement = document.createElement('p');
    disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);

};

// Création d'un bouton pour trier les pièces en ordre croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

// Création d'un bouton pour filtrer les pièces qui sont inférieur ou = à 35euros
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees)
});

// Création d'un bouton pour trier les pièces en ordre décroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

// Création d'un bouton pour les pièces qui n'ont pas de description
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesFiltrees);
});


// Récupérer sous forme de liste que les noms des pièces
const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length -1 ; i >=0; i--) {
    if(pieces[i].prix > 35) {
        noms.splice(i,1)
    };
};
console.log(noms);

// Création de la liste
const abordablesElements = document.createElement('ul');
// Ajout de chaque nom à la liste
for (let i=0; i < noms.length ; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
};

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables")
    .appendChild(abordablesElements);

// Mon exo
/*const disponibilite = pieces.map(piece => piece.disponibilite);
for (let i = pieces.length -1 ; i >=0; i--) {
    if(pieces[i].disponibilite === true);
        disponibilite.splice(i,1);
};

const disponibleElement = document.createElement('ul');
for (let i=0; i < disponibilite.length; i++) {
    const disponibiliteElement = document.createElement('li');
    disponibiliteElement.innerText = disponibilite[i];
    disponibleElement.appendChild(disponibiliteElement)
};

document.querySelector(".disponibles")
    .appendChild(disponibleElement);
*/


// Récupérer sous forme de liste que les noms et les prix des pièces
const nomDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

// Pour récupérer que les pièces disponibles + leurs prix
for (let i = pieces.length -1 ; i >=0; i--) {
    if(pieces[i].disponibilite === false) {
        nomDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    };
};

// Récupérer sous forme de liste que les noms + prix des pièces disponibles
const disponiblesElement = document.createElement('ul');

for (let i=0; i < nomDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement)
};

document.querySelector(".disponibles")
    .appendChild(disponiblesElement);

console.log(nomDisponibles)