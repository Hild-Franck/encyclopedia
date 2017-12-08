# DevOps
## Docker
Docker permet la simplification des workflows et de la communication. Autrement dit, il permet un déploiement plus simple des applications.

Ce n’est évidemment pas le seul avantage de Docker ; il permet également d’augmenter la productivité, de gérer les dépendances plus facilement,etc. De plus, de plus en plus de cloud (comme AWS) le supporte.

### Fonctionnement
Docker fonctionne sur un modèle client/serveur :
- **client:** a un rôle de communication, il dit au serveur quoi faire
- **serveur:** a un rôle de host, il run et manage les containers

Un client peut s'adresser à n’importe quel nombre de serveur qu’il le souhaite, pour un bonne et simple raison ; ils possèdent tous deux le même binary.

Pour qu’un serveur Docker écoute les connections entrantes, il suffit de le lancer avec le flag `-d` :
```shell
docker -d
```
> **Note:** *Une daemon est un processus qui s'execute en arriere plan*

On peut donc en venir à la question suivante ; comment s’effectue la communication client/serveur ?

### Communication client / serveur
Il existe deux cas :
- Le client et le serveur sont sur la même machine, on utilise alors un socket Unix, nommé `docker.sock`.
> **Note:** *Un socket Unix permet de partager des données entre deux processus Unix via le système de fichier (plus particulièrement grâce à un fichier `*.sock`)*

- Le serveur est sur une machine distante, on utilise un socket TCP pour y accéder. Le port par défaut est le 2375, ou le 2346 pour du encrypted.

Pour faciliter la communication avec un serveur Docker, le deamon possède une API. De même, le networking de Docker est un bridge par l’interface Docker.

D’ailleurs, il est possible d’utiliser le réseau de l'hôte grâce à la commande:
```shell
docker -d --net host
```

### Qu'est ce que Docker ?
Docker n’est pas une Virtual Machine ; c’est un wrapper autour d’un process Unix. Il est donc extrêmement léger, et peu servir pour une tâche éphémère, c’est à dire démarrer un Docker, faire une courte exécution et s'éteindre. Il est d’ailleurs d’usage de faire en sorte que les applications exécutées dans un Docker soient stateless ; les data sont conservées de manière externes.

Docker utilise les ressources du host, donc plusieurs containers sur une même machine entrent en compétition pour l’acquisition des ressources du host ; cela veut dire aussi que les containers utilisent le même kernel que l’host, ce qui peut induire des failles de sécurités.

Comme dit précédemment, les applications sont supposées être stateless et peuvent se lancer et s'éteindre en un instant. On veut donc souvent qu’elle ai la même configuration a chaque demarrage. On parvient à faire cela grâce aux variables d’environnements.

Il est également possible de sauver des data dans le file system, mais cette pratique est déconseillée pour de nombreuse raisons :
- Peu de performance
- Peu de place
- Le state n’est pas conservé a chaque redémarrage
- Le container dépend du host (et de son fs) et n’est donc plus scalable

### Docker Mirror Registry
##### Interet
Un *Docker Mirror Registry* permet de mettre en place un registry local, qui stocke les images que l'on pull. Si l'image que l'on pull existe dans le mirror registry, il sera pull depuis lui, et non depuis internet, ce qui prend beaucoup moins de temps.
> **Note:**
> Le Docker Mirror Registry doit etre sur le meme fs ou le meme reseau local que le(s) Docker Server pour que ca ait de l'interet. Cela est particulierement utile lorsqu'on utiliser `docker-machine`

##### Mise en place
Pour les systemes utilisant systemd comme gestionnaire de service, il faut ajouter la ligne suivante au fichier `/etc/docker/daemon` (JSON):
`"registry-mirrors": [ "http://<mirror_host>:<mirror_port>" ]`
Pour la modification soit prise en compte par Docker, il faut restart le service Docker.