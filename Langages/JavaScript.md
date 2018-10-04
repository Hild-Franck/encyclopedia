# JavaScript
## Tricks
### Inverser un booleen
Il suffit de comparer bit a bit un booleen variable face a un fixe avec un **XOR** et de retourner le resultat
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