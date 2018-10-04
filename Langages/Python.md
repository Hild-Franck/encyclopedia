# Python 🐍
## Data structures
### Lists vs Tuples
Les *Lists* sont des sequences de donnees **homogenes** et **mutables**

Les *Tuples* sont des sequences de donnees **heterogenes** et **immutables**

## Misc
### Logging
*[Source][source1]*

Pour logger des strings avec la library `logging`, il ne faut pas utiliser l'operateur de formatage dans le premier argument comme ceci:
```python
logging.info("Message de : %s" % name)
```

En effet, dans ce cas la string est formatee meme si le niveau de log n'est pas assez eleve pour afficher les `.info`
Il vaut mieux donner les variables en parametres pour generer la string de maniere lazy:
```python
logging.info("Message de : %s", name)
```

## Modules
### Argparse
*argparse* permet de generer des outils en ligne de commande en parsant les arguments donnes au script.

On cree un parser comme ceci:
```python
parser = argparse.ArgumentParser(description="Je suis une description")
```

#### Ajouter un argument
Un fois `parser` cree, on peut ajouter un argument au script avec la methode `parser.add_argument("-c", "--long")`. Cette methode prend le nom court `-c`, le nom long `--long` ou les deux.

Il y a bien d'autres arguments a ajouter a cette methode

##### action
Defini l'action a effectuer lorsque l'argument est appele.
- **store:** Attribue la valeur passee a l'argument a une variable.

> **Exemple:**
> ```python
> """ test.py """
> ...
> parser.add_argument("--long", action="store")`
> args = parser.parse_args()
> print args.long # test.py --long poulet -> "poulet"
> ```

- **append:** Attribue dans une liste les valeurs passees a chaque appel de cet argument dans une variable.

> **Exemple:**
> ```python
> """ test.py """
> ...
> parser.add_argument("--long", action="append")`
> args = parser.parse_args()
> print args.long # test.py --long poulet --long jesus -> ["poulet", "jesus"]
> ```

[source1]:https://stackoverflow.com/questions/29147442/how-to-fix-pylint-logging-not-lazy