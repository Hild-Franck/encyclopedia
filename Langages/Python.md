# Python
## Data structures
### Lists vs Tuples
Les *Lists* sont des sequences de donnees **homogenes** et **mutables**

Les *Tuples* sont des sequences de donnees **heterogenes** et **immutables**

## Misc
### Logging
*[Source][source1]*

Pour logger des strings avec la library `logging`, il ne faut pas utiliser l'operateur de formatage dans le premier argument comme ceci:
```python
logging.info("Message de : %" % name)
```

En effet, dans ce cas la string est formatee meme si le niveau de log n'est pas assez eleve pour afficher les `.info`
Il vaut mieux donner les variables en parametres pour generer la string de maniere lazy:
```python
logging.info("Message de :", name)
```

[source1]:https://stackoverflow.com/questions/29147442/how-to-fix-pylint-logging-not-lazy