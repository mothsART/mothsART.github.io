#TODO

## Version 1.0

* i18n (with vue.js)
* help example

## Version 2.0

* Undo/Redo (using a diff DOM) + historic
* Store a list of recent document
* Import verification on product and static (svg) file
* full vanilla js (delete jquery)

* refactoring
* Un vrai dialogue d'aide
* une zone de saisie pour le déplacement d'un indice

* activer le drag and drop pendant un zoom

# Nouvelles fonctionnalités

* Mise en place d'un mode débug et release :

- le mode débug utilise des exemples générés aléatoirement
- le mode release utilise des exemples avec des contenus pertinents provenant de fichiers générés à partir de l'éditeur (donc au format html).

- import de fichiers finaux : au format HTML => on peut de ce fait ré-éditer un fichier que l'on a précédement exporté.

# Bugs

[Résolu] * possibilité de déplier 2 indices à la fois
[Résolu] * le clic sur l'indice dans l'illustration devrait déclencher le zoom.
[Résolu] * bug au premier drag : centrage autours de l'indice ?!
[Résolu] * la création d'un indice le déplace automatiquement au centre de l'illustration : résoud un soucis de zoom par la même occasion.
[Résolu] * quand on effectue un zoom en mode edit et que l'on clique sur un indice, ça déclenche un évènement de zoom arrière.
[Résolu] * le passage du mode vue à celui de l'édition provoquait un bug subtil : le zoom sur un indice nécessitait 2 clics au lieu d'un.
[Résolu] * bug lorsque l'on est en mode de visualisation (show), que l'on clique sur un indice (zoom) et que l'on repasse en mode edit. (le zoom reste actif)
[Résolu] * Soucis de perte de la description d'un indice lorsque l'on passe d'un indice à l'autre
[Résolu] * Soucis de couleur sur les indices de description
[Résolu] * l'ajout d'un indice le coche automatiquement comme visible
[Résolu] * l'ajout d'un indice ne lui donne pas réellement une couleur aléatoire
[Résolu] * soucis de retour sur la zone d'édition lorsque l'on a pas accédé préalablement au détail d'un indice.
[Résolu] * en mode visu et en export, les passage d'un indice à un autre ne fermait jamais les descriptifs.
[Résolu] * l'export doit impérativement supprimer le zoom sur un indice.
[Résolu] * les indices sans textes ne doivent pas être décalés (vertical-align) par rapport aux indices ayant un titre
[Résolu] * mode visu : le clic sur un indice n'ayant pas de description devrait faire disparaitre le descriptif de l'indice précédent.
[Résolu] * drag and drop de l'ordre des indices
[Résolu] * export : l'affichage des indices dans l'encart de la description n'est pas conforme au mode de visualisation
[Résolu] * le changement de fichier est de nouveau opérationnel
[Résolu] * bug de drag and drop sous firefox
[Résolu] * l'import d'indice devrait avoir un titre en noir si existant

* dézommer quand on ferme le détail d'un indice

* la suppression de tous les indices à pour effet de bord de cacher les indices créés par la suite.


* le drag d'un indice sans drop avec l'activation du zoom ne devrait pas être possible

* le menu à l'affichage
* les soucis de zoom
* la zone de drag d'un indice est légèrement dépassé.
* l'affichage de la sidebar
* zoom : afficher un sablier au dessus de la zone svg car ce n'est pas instantanné.

# Bugs non résolus

* Sur Firefox : les indices débordent : lié à un bug du moteur Gecko : taille conditionné par une taille minimum. (valeur en préférence)
*  Sur Firefox, le drag des indices nécessite un relachement de la souris puis un nouveau clic pour le drop.

# Ce qu'il reste à faire pour une version 1.0 :

* i18n : une vrai interface disponible dans plusieurs langues.

* un vrai dialogue d'aide

* une phase de stabilisation : plus de nouvelles fonctionnalités à intégrer, tout est là... on part à la chasse aux derniers bugs !!!!

# Des versions 1.x viendrons rajouter des exemples