# Langages
## Bash script
### Conditions
Il existe differentes methodes pour effectuer une condition:
- `test ...`
- `[ ... ]`
- `[[ ... ]]`

Le `[[ ... ]]` est la version la plus recente et intuitive, mais non compatible avec certains shells, tel que *sh*.
#### If ... elsif ... else
##### Synthaxe
Les conditions commencent toutes par un if et finissent par un fi. Chaque bloc d'instruction commence par un then.
> **Exemple:**
> ```bash
> if <condition>
> then
>   ...
> elif <condition>
>   ...
> else
>   ...
> fi
> ```

##### One liner
Il est possible d'ecrire les conditions en plus "condensees" en mettant un `;` apres la condition et en faisant suivre le then. On peut alors soir ecrire la ou les intructions du bloc d'instruction a la ligne ou bien toujours sur la meme ligne en les separant avec des `;`.
> **Exemple:**
> ```bash
> if <condition>; then
>   <instruction>
> fi
> ```
> ou
> ```bash
> if <instruction>; then <instruction>; fi
> ```

### Variables scope
Une variable d'environnement declaree / modifiee dans un script source est disponible / modifie dans tout les scripts du meme shell
```bash
#!/bin/bash
# main.bash

export test_value=0

test_script() {
    . ./test-script.bash
}

test_script 42

echo "$test_value" # print 42
```

```bash
#!/bin/bash
# test-script.bash

test_value="$1"

```

Cependant, les exports dans un subshells sont isoles
```bash
#!/bin/bash

export test_value=42

out=$({ test_value=0; })

echo "$test_value" # print 42

```

Pour restreindre le scope d'une variable, il est possible d'utiliser le keyword `declare`
```bash
#!/bin/bash

test_function() {
    declare test1="jesus"
    test2="poulet"
}

main() {
    test_function
    echo "[$test1 | $test2]"
}

main # print [ | poulet]
```

#### Expressions conditionnelles
Ces expressions sont utilisables dans les trois methodes precedemment citees.
- **`-z`** *`string`* **:** Retourne vrai si la *string* est vide.
- **`-n`** *`string`* **:** Retourne vrai si la *string* n'est pas vide. Equivalent a **`! -z`** *`string`*.
- **`-d`** *`directory`* **:** Retourne vrai si le *directory* existe.

### Synthaxe
#### Double crochet `[[ ... ]]`
Le double crochet ne marche que sur Bash, Zsh et Korn shell. Il permet d'utiliser `&&` et `||` a la place de `-a` et `-o`, ainsi que les Regex et le pattern matching.

#### Double parenthese `(( ... ))`
La d ouble parenthese permet d'utiliser les *expression arithmetiques* telles que `+ - * > <` etc.
> **Notes:**
> - Il est preferable d'utiliser la double parenthese lorsqu'on compare deux chiffres entre eux
> - A l'interieur d'une double parenthese, il est inutile d'ajouter le `$` devant le nom des variables. On peut cependant ajouter un `$` devant la double parenthese pour en retourner le resultat.

> **Exemple:**
> 
> ```shell
> one=1
> three=$((one + 2))
> if ((three > 4)); then echo "Poulet"; fi
> ```

## C++
### Flags
Le système de flags en C++ sert en quelque sorte à simuler une fonction variadique. Un flag est un nombre binaire dont le premier chiffre est toujours 1 et les autres sont tous 0, afin de faire des opérations bit à bit dessus.

> **Exemple:** *1, 10, 100, 1000*

En UInt32, cela correspond à des multiples de 2.
#### Entrer plusieurs flags dans une fonction
Pour entre plusieurs flags dans une fonction, on utilise l'opérateur bitwise `|`

> **Exemple:** *2|8 retourne le binaire 101, qui correspond au flag 100 et 1*

#### Verifier les flags
Pour vérifier quels flags sont activés sur un nombre binaire, il suffit de détecter la position des 1 dans les flags, comme le montre l’exemple ci-dessus. Pour cela, on utilise l'opérateur bitwise &, qui correspond a ET.

> **Exemple:**
> *010010 & 10 = 10*
> *010010 & 10000 = 10000*

Il suffit donc, pour verifier tout les flags, d'enchaîner une série de if qui vérifie un ensemble de flags avec chaque flag.

> **Exemple:** *verification des flags 1, 10, 100*\
> ```
> int flags = 13 // 1101
> if (flags & 1 > 0) {
> /* … */
> }
> if (flags & 10 > 0) {
> /* … */
> }
> if (flags & 100 > 0) {
> /* … */
> }
> ...
> ```

### Mettre un process en background
```bash
command_to_make_backgroung &
```

Il est possible de recuperer le *PID* de la derniere commande mise en background grace a `$!`

> **Note:**
> Une commande, meme tres longue, mise en background n'est pas bloquante.