---
layout: post
title: Systemes
description: "Les differents OS et leur utilisation"
icon: "fas fa-desktop"
---

## Unix
### Programmes
#### Squid
Squid est un proxy et reverse-proxy

##### SSL
Lorsque des requetes HTTPS transitent dans Squid, ces dernieres ne sont pas loggees dans `access.log`, puisque les data sont chifrees.
Seule la methode *CONNECT*, qui ouvre la connection SSL/TLS, est loggee lorsqu'elle est faite via le proxy.

###### SSL Bumping
Il est possible de traiter les requetes HTTPS comme des requetes HTTP grace au SSL Bumping.

{: .warning}
> **Warning:**
> 
> - Le SSL Bumping presente autant un benefice qu'un inconvenient en terme de securite.

### Definitions
#### Word Splitting

#### File Globbing

### Ecrire dans un fichier
Depuis le terminal, il est possible d'ecrire dans le terminal a l'aide des symboles `>` et `>>` :
```bash
$ echo "someString" > myFile
```

Ici, le symbole `>` permet d'ecrire en *overwrite*.
```bash
$ echo "someString" >> myFile
```

Et ici, le contenu est ecrit en *append*.

{: .note}
> **Note:**
> 
> - Dans les deux cas, si *myFile* n'existe pas, il est cree.

### Built-in programmes
#### echo
Permet d'afficher ce qui lui ai donne en entree.

**`echo`** *`[options] [string]`*

{: .note}
> **Note:**
> 
> - Lorsqu'on `echo` une variable sans les double quotes, la variable sera sujet au *word splitting* et au *file globbing*. Une string sur plusieurs lignes sera notamment consideree comme une seule ligne en sortie.

##### Options
- **`-e`:** Permet d'escape, entre autre, les backslashes tel que `\n`, `\r`, ... 
- **`-n`:** N'ajoute pas le retour a la ligne a la fin du display 

***

#### grep

Permet de filtrer des lignes selon un pattern fourni

**`grep`** *`[options] pattern [files]`*

{: .note}
> **Notes:**
>
> - Ce qui suit est valable pour l'implementation **GNU** de ***grep***
> - Permet de filtrer des *lignes*, ne s'utilise pas pour filtrer des expressions sur une meme ligne ; on lui prefere ***sed***

##### Options
- **`-o`:** Permet de return la string qui a match
- **`-P`:** Permet d'utiliser la synthaxe *Perl*, plus puissante et permissive
- **`-v`:** Tri les lignes en excluant un pattern
- **`-m`*`<nombre_de_ligne>`*:** Defini le nombre de ligne a retourner
- **`-c`:** retourne le nombre de lignes en sortie

***

#### awk

Permet de traiter des lignes en les parcourant d'un *field separator* a un autre. La synthaxe est la suivante:

**`awk`** *`[options] [programme] [fichier]`*

{: .note}
> **Note:**
> 
> - Ce qui suit est valable pour l'implementation **GNU** de ***awk***

##### Options
**`-F`*`<field_separator>`*:** Defini le field separator

##### Programme
Un programme awk est ecrit avec la synthaxe suivante:

`'[motif1] {action1} [motif2] {action2}'`

Les motifs sont optionnels.

###### Actions
awk utilise son propre langage pour les actions.

- **`print`:** affiche a l'ecran

***

#### sed
Permet le traitement de texte ligne par ligne.

**`sed`** *`[options] commande [fichier]`*

##### Options
**`-i`*`[extension_du_backup]`*:** Permet de modifier directement le ficher contenant le texte. Si une extension est precisee, un fichier de backup sera cree.

**`-r`:** Permet d'utiliser les *extended regex*, qui permet d'ecrire les regex comme avec grep par exemple.

{: .warning}
> **Warning:**
> 
> - Les Regex de sed, meme en mode exended, ne supporte pas les PCRE (Perl Compatible REgex)

##### Subtitution
La commande permettant la subtitution est la suivante:

**`sed`** *`s/<motif_a_remplacer>/<motif_de_remplacement>/flag`*

Le principe est simple ; on donne un motif (une regex), et ce qui matche est remplacer par le motif de remplacement.

{: .exemple}
> **Exemple:**
> 
> - *`sed s/x/42/g`* permet de remplacer tout les x par le nombre 42.

Les matches des groupes `(groupe1)(groupe2)` de la regex peuvent etre recuperer avec la synthaxe `\<numero_du_groupe>`

{: .exemple}
> **Exemple:**
> 
> - *`sed s/\([0-9]\)/o\1o/`* permet de recuperer le premier chiffre d'une ligne et de l'entourer de *o*

{: .note}
> **Notes:**
> 
> - Dans une regex, un groupe est entoure de parentheses
> - Pour integrer les parenthese a la synthaxe regex, dans sed, il faut les faire preceder d'un `\` ou utiliser l'option `-r` pour pouvoir utiliser les *extended regex*.

###### Flags
- **`g`:** Active le mode greedy ; remplace **tous** les matches par le motif de remplacement par ligne au lieu de seulement le premier.