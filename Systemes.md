# Systemes :computer:
## Unix
### grep
> **Note:**
> Ce qui suit est valable pour l'implementation **GNU** de ***grep***

Permet de filtrer des lignes
> **Note:**
> Permet de filtrer des *lignes*, ne s'utilise pas pour filtrer des expressions sur une meme ligne ; on lui prefere ***sed***

#### Options
- **`-o`:** Permet de return la string qui a match
- **`-P`:** Permet d'utiliser la synthaxe *Perl*, plus puissante et permissive
- **`-v`:** Tri les lignes en excluant un pattern
- **`-m`*`<nombre_de_ligne>`*:** Defini le nombre de ligne a retourner

### awk
> **Note:**
> Ce qui suit est valable pour l'implementation **GNU** de ***awk***

Permet de traiter des lignes en les parcourant d'un *field separator* a un autre. La synthaxe est la suivante:

**`awk`** *`[options] [programme] [fichier]`*

#### Options
**`-F`*`<field_separator>`*:** Defini le field separator

#### Programme
Un programme awk est ecrit avec la synthaxe suivante:

`'[motif1] {action1} [motif2] {action2}'`

Les motifs sont optionnels.

##### Actions
awk utilise son propre langage pour les actions.

- **`print`:** affiche a l'ecran

### sed
Permet le traitement de texte ligne par ligne.
#### Subtitution
La synthaxe permettant la subtitution est la suivante:

**`sed`** *`s/<motif_a_remplacer>/<motif_de_remplacement>/flag`*

Le principe est simple ; on donne un motif (une regex), et ce qui matche est remplacer par le motif de remplacement.
> **Exemple:**
> `*sed s/x/42/g*` permet de remplacer tout les x par le nombre 42.

Les matches des groupes `(groupe1)(groupe2)` de la regex peuvent etre recuperer avec la synthaxe `\<numero_du_groupe>`
> **Exemple:**
> `sed s/\([0-9]\)/o\1o/` permet de recuperer le premier chiffre d'une ligne et de l'entourer de *o*

> **Notes:**
> - Dans une regex, un groupe est entoure de parentheses
> - Pour integrer les parenthese a la synthaxe regex, dans sed, il faut les faire preceder d'un `\`.

##### Flags
- **`g`:** Active le nombre greedy ; remplace **tous** les matches par le motif de remplacement par ligne au lieu de seulement le premier.
