---
layout: post
title: "JavaScript"
parent: Langages
description: "Langage de programmation oriente objet a prototype utilise dans les pages webs et les serveurs"
icon: "fab fa-js-square"
---

## Fonctions

### Creation de fonctions

Il existe plusieurs facons de creer des fonctions en JS.

- ***Function Declaration:*** La declaration de fonction permet de creer une fonction nommee sans l'assignee a une varaible. Les declarations de fonctions sont **hoisted**, c'est a dire que l'interpreteur les traitent avant le reste du code **dans leur scope**.

{: .exemple}
    > **Exemple:**
    > ```js
    > console.log(poulet) // Ecrit "Function" dans la console
    > poulet(); // Ecrit "poulet" dans la console
    > function poulet() { console.log('poulet'); }
    > ```

- ***Function Expression:*** L'expression d'une fonction consiste a stockee la fonction (nommee ou anonyme) dans une variable. Dans ce cas, si la declaration de la variable est *hoisted*, ce n'est pas le cas de la definition de la fonction.

{: .exemple}
  > **Exemple:**
  >
  > ```js
  > console.log(poulet) // Ecrit "undefined" dans la console
  > const poulet = function() { console.log('poulet'); }
  > console.log(poulet) // Ecrit "Function" dans la console
  > poulet(); // Ecrit "poulet" dans la console
  > ```

{: .note}
  > **Note:**
  >
  > - Une *function expression* peut etre invoquee immediatement

#### Invoquer une fonction immediatement

Il est possible d'invoquer une fonction **des sa definition**, grace aux *function expression*. En effet, l'ajout de parentheses `()` a la fin d'une *function expression* permet d'executer immediatement la fonction.

{: .exemple}
> **Exemple:**
>
> ```js
> function pouletUn() { return 'pouletUn'; } () // Synthax Error
> // Etant une function declaration, cette ligne emet une erreur car
> // la parenthese est interpretee seule, ce qui est une erreur de synthaxe
>
> function pouletUn() { return 'pouletUn'; }
> () // Synthax Error
> // Ces deux lignes sont l'equivalent de la premiere ligne de code
>
> const pouletDeux = function() { return 'pouletDeux' }()
> console.log(pouletDeux) // Ecrit "pouletDeux" dans la console
> ```

Il est ainsi possible de parser une *function declaration* en *function expression* pour l'invoquee immediatemment, grace a un operateur ou des parentheses.

{: .exemple}
> **Exemple:**
>
> ```js
> +function() { console.log('poulet') }() // Ecrit "poulet" dans la console
> !function() { console.log('poulet') }() // Ecrit "poulet" dans la console
> (function() { console.log('poulet') })() // Ecrit "poulet" dans la console
> ```

## Tricks

### Inverser un booleen

Il suffit de comparer bit a bit un booleen variable face a un fixe avec un **XOR** et de retourner le resultat

{: .exemple}
> **Exemple:**
>
> ```js
> let a = true
> a = a ^ true // a = false
> a ^= true // a = true ; short version
> ```

**Explication:**

| Ligne | Operation booleene | Valeur de a |
|:-----:|:------------------:|:-----------:|
| `let a = true` | | true|
| `a = a ^ true` | 1 XOR 1 = 0 | 0 |
| `a ^= true` | 0 XOR 1 = 1 | 1 |