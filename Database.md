# BDD
## InfluxDB
Sur InfluxDB, la retention des data est infini par defaut (la politique de retention utilisee est alors *autogen*)
Il est possible de definir une nouvelle politique de retention, mais il faut alors y ecrire des donnees specifiquement, ou par defaut les donnees seront ecrites dans *autogen*

**Regex dans un `WHERE`:**

Au lieu de faire ce genre de choses:
```sql
WHERE "stuff"="thing1" AND "stuff"="thing2" AND ...
```

On peu utiliser une regex dans ce style:
```sql
WHERE "stuff"=~ /thing[0-9]+/
```
