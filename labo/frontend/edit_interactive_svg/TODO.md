#TODO

## Version 1.0

* mode offline
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

[Résolu] l'import de plusieurs documents se passe sans soucis
* les tailles des indices sont calculés proportionnellement aux tailles du fichier SVG
* Sur Firefox : les indices débordent : lié à un bug du moteur Gecko : taille conditionné par une taille minimum. (valeur en préférence)
[Résolu : obligé d'inclure les icones svg dans le html] * mode offline : import des polices de l'éditeur
* l'éditeur Trumbowyg n'est pas traduit
* police de l'éditeur change de couleur : soucis lié à une balise <style> dans le fichier svg :
que décider dans ce cas ? Pour l'instant, suppression pur et dur du noeud !
Dans un second temps, ajout d'un préfix sur toutes les règles ?
* le réimport d'un fichier masque l'oeil global
* en mode offline : les exemples ne peuvent être affichés via de l'ajax (lié à chrome)
* en mode offline, trumbowyg ne devrait pas faire d'appels ajax

* l'indice devrait disparaitre après le zoom.
* Les exemples dans le "about" devrait être relatif
* dézommer quand on ferme le détail d'un indice

* la suppression de tous les indices à pour effet de bord de cacher les indices créés par la suite.

* le drag d'un indice sans drop avec l'activation du zoom ne devrait pas être possible

* le menu à l'affichage
* les soucis de zoom
* la zone de drag d'un indice est légèrement dépassé.
* l'affichage de la sidebar
* zoom : afficher un sablier au dessus de la zone svg car ce n'est pas instantanné.

# Bugs non résolus

*  Sur Firefox, le drag des indices nécessite un relachement de la souris puis un nouveau clic pour le drop.

# Ce qu'il reste à faire pour une version 1.0 :

* i18n : une vrai interface disponible dans plusieurs langues.

* un vrai dialogue d'aide

* une phase de stabilisation : plus de nouvelles fonctionnalités à intégrer, tout est là... on part à la chasse aux derniers bugs !!!!

# Des versions 1.x viendrons rajouter des exemples