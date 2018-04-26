# C++
## Flags
Le système de flags en C++ sert en quelque sorte à simuler une fonction variadique. Un flag est un nombre binaire dont le premier chiffre est toujours 1 et les autres sont tous 0, afin de faire des opérations bit à bit dessus.

> **Exemple:** *1, 10, 100, 1000*

En UInt32, cela correspond à des multiples de 2.
### Entrer plusieurs flags dans une fonction
Pour entre plusieurs flags dans une fonction, on utilise l'opérateur bitwise `|`

> **Exemple:** *2|8 retourne le binaire 101, qui correspond au flag 100 et 1*

### Verifier les flags
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

## Mettre un process en background
```bash
command_to_make_backgroung &
```

Il est possible de recuperer le *PID* de la derniere commande mise en background grace a `$!`

> **Note:**
> Une commande, meme tres longue, mise en background n'est pas bloquante.