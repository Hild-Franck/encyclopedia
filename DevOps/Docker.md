---
layout: post
title: Docker
parent: DevOps
description: "Docker permet la simplification des workflows et de la communication. Autrement dit, il permet un déploiement plus simple des applications.

Ce n’est évidemment pas le seul avantage de Docker ; il permet également d’augmenter la productivité, de gérer les dépendances plus facilement,etc. De plus, de plus en plus de cloud (comme AWS) le supporte."
icon: "fab fa-docker"
---

## Fonctionnement

Docker fonctionne sur un modèle *client-serveur* :

- **client:** a un rôle de communication, il dit au serveur quoi faire.
- **serveur:** a un rôle de host, il run et manage **les containers**.

Un client peut s'adresser à *n’importe quel nombre de serveurs qui le souhaitent*, pour une bonne et simple raison ; ils possèdent tous deux le même binary.

Pour qu’un serveur Docker écoute les connections entrantes, il suffit de le lancer avec le flag `-d` :

```shell
docker -d
```

{: .note}
> **Note:**
>
> - **Un daemon** est un processus qui *s'exécute en arriere plan*.

On peut donc en venir à la question suivante : comment s’effectue la communication client-serveur ?

## Communication client-serveur

Il existe deux cas :

1. Le client et le serveur sont sur la même machine, on utilise alors un **socket Unix**, nommé `docker.sock`.

    {: .note}
    > **Note:**
    >
    > + Un socket Unix permet de partager des données entre deux processus Unix via le système de fichier (plus particulièrement grâce à un fichier `*.sock`)

2. Le serveur est sur une machine distante, on utilise un **socket TCP** pour y accéder. Le port par défaut est le 2375, ou le 2346 pour du encrypted.

Pour faciliter la communication avec un serveur Docker, le deamon possède une API. De même, le networking de Docker est un bridge par l’interface Docker.

D’ailleurs, il est possible d’utiliser le réseau de l'hôte grâce à la commande:

```shell
docker -d --net host
```

## Qu'est ce que Docker

*Docker n’est pas une Virtual Machine*, c’est un wrapper autour d’un **process Unix**. Il est donc extrêmement léger, et peut servir pour une tâche éphémère, c’est à dire démarrer un container, faire une courte exécution et s'éteindre. Il est d’ailleurs d’usage de faire en sorte que les applications exécutées dans un container soient **stateless** ; les data doivent être conservées de manière externes.

*Docker utilise les ressources du host*, donc plusieurs containers sur une même machine entrent en compétition pour l’acquisition de ses ressources ; cela veut dire aussi que les containers utilisent le même kernel que l’host, ce qui peut induire des failles de sécurités.

Comme dit précédemment, les applications sont supposées être stateless et peuvent se lancer et s'éteindre en un instant. On veut donc souvent qu’elles aient la même configuration a chaque demarrage. On parvient à faire cela grâce aux variables d’environnements.

Il est également possible de sauver des data dans **le filesystem** (fs), mais cette pratique est déconseillée pour de nombreuse raisons :

- Peu de performance
- Peu de place
- Le state *n’est pas conservé* à chaque redémarrage
- Le container dépend du host (et de son fs) et n’est donc plus scalable

## Images Docker

**Une image Docker** est une pile de couche de filesystem. Chaque instruction permettant de construire une telle image génère une nouvelle couche, dépendante de celle qui la précède. *Ces couches pouvant être reutilisées entre différentes images*, cela permet de sauver de l'espace disque et du réseau.

{: .note}
> **Note:**
>
> - Ce système de **layers**, couplé aux **tags**, permet de faire du **Revision Control**.

### Build une image Docker

#### Dockerfile

Afin de créer une image Docker, on décrit chaque layer grâce à une instruction dans le fichier `Dockerfile`. *Chaque instruction génère un layer*, sauvegardé par Docker lors du build. Un layer peut être réutilisé par une autre image si les instructions **consécutives** sont les mêmes *en partant de la premiere instruction*.

{: .exemple}
> **Exemples:**
>
> - Utilisation des layers build par l'image 1 par l'image 2 pour les instructions consécutives à partir de la première instruction.
>
> | Instructions img 1 | Layer img 1 | Build | Instructions img 2 | Layer img 2 | Build |
> |:------------------:|:-----------:|:-----:|:------------------:|:------------:|:-----:|
> | **FROM** ubuntu | Layer A | Building | **FROM** ubuntu | Layer A | Using cache |
> | **RUN** echo "a" | Layer B | Building | **RUN** echo "a" | Layer B | Using cache |
> | **RUN** echo "b" | Layer C | Building | **RUN** echo "poulet" | Layer Z | Building |
>
> - L'image 2 n'utilise pas les layers build par l'image 1 car *la première instruction est différente* et chaque layer dépend des layers qui le précède.
>
>| Instructions img 1 | Layer img 1 | Build | Instructions img 2 | Layer img 2 | Build |
>|:------------------:|:-----------:|:-----:|:------------------:|:------------:|:-----:|
>| **FROM** ubuntu | Layer A | Building | **FROM** alpine | Layer Q | Building |
>| **RUN** echo "a" | Layer B | Building | **RUN** echo "a" | Layer R | Building |
>| **RUN** echo "b" | Layer C | Building | **RUN** echo "b" | Layer S | Building |

{: .note}
> **Note:**
>
> - Pour désactiver l'utilisation du cache lors du build, il suffit d'ajouter l'option `--nocache` à la commande `docker build`

##### Instructions

- **FROM** `image:tag`: image sur laquelle se base la nouvelle image
- **MAINTAINER** `prenom nom <mail>`: informations pour contacter l'auteur du Dockerfile. Ces informations se retrouvent dans **les metadatas** de l'image.
- **LABEL** `"key"="value"`: ajoute des informations dans les metadatas de l'image pour identifier / rechercher des images. On peut voir les labels d'une image grâce à la commande `docker inspect`
- **USER** `username`: définit quel user va run les process. Par defaut, cet user est `root`

{: .warning}
> **Warning:**
>
> - En production, il est conseillé de run les process avec *un utilisateur sans privileges*, pour des questions de sécurité.

- **ENV** `VARNAME value` ou `VARNAME1=value1 VARNAME2=value2`: image sur laquelle se base la nouvelle image
- **RUN** `command`: exécute une commande shell

{: .note}
> **Notes:**
>
> - Il vaut mieux ne pas *RUN* des commandes de type `apt update` car cela rallonge les temps de build. Il vaut mieux se baser sur *des images contenant deja les updates*.
> - Chaque instruction créant un **image layer**, c'est une bonne idée de combiner les commandes ou de faire et ajouter un script avec *ADD* et l'exécuter avec *RUN* pour limiter le nombre d'instructions et donc la taille de l'image

- **ADD** `sourcePath destinationPath`: inclus des fichiers du host vers l'image. *Ils sont copiés*
- **WORKDIR** `path`: change le dossier actuel dans l'image. Toutes les instructions qui suivent seront exécutées dans ce `path`
- **CMD** `commandArray`: Definit la commande qui va lancer les process dans le container. Il est vivement conseillé de n'avoir *qu'un process par container*
    {: .exemple}
    > **Exemple:**
    >
    > + **CMD** ["echo", "'a'"]

### Run une image Docker

Pour run une image Docker, il suffit d'utiliser la commande `docker run <image>`. Lorsqu'on run une image Docker, on crée un *container* dans lequel le processus s'exécute.

**Options:**

- **`-d`** : run l'image en arrière plan
- **`-p <host_port>:<container_port>`** : lie un port du host à un port du container
- **`-e <key>=<value>`** : ajoute une variable d'environnement au container

## Containers Docker

Un container Docker est **une instance** d'une image Docker, dans lequel est encapsulé un processus.

### Lister les containers sur un host

Il est possible de lister les containers *sur le docker host actuel* grâce à la commande `docker ps`.
Pas defaut, cette commande ne liste que les containers en cours d'éxécution.

**Options:**

- **`-q`** : retourne seulement les ID des containers
- **`-a`** : liste tous les containers
- **`--format <string_format>`** : formate l'output de la commande en utilisant un template Go qui permet de mettre des placeholders `{{.Placeholder}}`

    {: .note}
    > **Note:**
    >
    > + Disponible depuis la version 1.8

    {: .exemple}
    > **Exemple:**
    >
    > + `docker ps --format "{{.ID}}\t{{.Image}}"`

## Docker Mirror Registry

### Intérêt

Un **Docker Mirror Registry** permet de mettre en place **un registry local**, qui stocke les images que l'on pull. Si l'image que l'on pull existe dans le **mirror registry**, il sera pull depuis lui, et non depuis internet, ce qui prend beaucoup moins de temps.

{: .note}
> **Note:**
>
> - Le Docker Mirror Registry doit être sur *le meme filesystem ou le même réseau local* que le(s) Docker Server pour que ça ait de l'intérêt. Cela est particulièrement utile lorsqu'on utilise `docker-machine`

### Mise en place

Pour les systèmes utilisant **systemd** comme gestionnaire de service, il faut ajouter la ligne suivante au fichier `/etc/docker/daemon` (JSON):

```json
{
    "registry-mirrors": [ "http://<mirror_host>:<mirror_port>" ]
}
```

Pour la modification soit prise en compte par Docker, il faut *restart le service Docker*.

## Swarm

**Docker Swarm** permet de faire *tourner des containers sur differents hosts*, orchestrés et plannifiés par un ou plusieurs managers. Le Swarm permet donc d'implémenter **la scalabilité** et **la tolérance de panne** à Docker.

### Managers

Les managers sont les nodes du Swarm qui prennent les décisions dans le management de celui-ci. Parmi les managers est élu un **leader** qui prend les décisions et les fait approuver par les autres via *un consensus distribue assure par **l'algorithme Raft***.

#### Leader

Pour déterminer un leader dans *un pool de manager sans leader*, chaque manager démarre un timer d'une durée aléatoire.

Lorsque leur timer est fini, chaque manager *envoie une requête aux autres*. Le premier manager à recevoir une réponse de validation de *chaque managers* est élu **leader**.

Une fois élu, *le leader envoi périodiquement des notifications aux autres managers* pour leur signifier qu'il est toujours up et leader.

Si les managers ne recoivent plus de notification du leader pendant un certain temps, ils procèdent à *une nouvelle election*.

Chaque manager a une copie de **la base de donnée raft** contenant **l'état du cluster**.
Lors d'une décision, *le leader envoie sa décision aux managers*, et si la majorité des réponses sont positives, les base de données raft de chaque manager est mis a jour.

#### Nombre de managers

Pour un nombre de manager N, la majorité, appelée ***quorum*** se fait à : `floor(N+1 / 2)`
Il est conseillé de choisir un nombre impair, car si le réseau se segmente en deux, il y aura toujours un des deux networks qui aura assez de manager pour survivre

Mais si un cluster fail, les worker nodes fonctionnent toujours et continuent de fonctionner. Il n'est juste plus possible de modifier le cluster.

#### Perte du quorum

Lorsque la majorite des managers deviennent *Unreachable*, il y a **perte du quorum**. Les commandes de management du swarm deviennent alors impossibles et renvoient une erreur.

Il existe deux solutions pour palier a ce probleme :

- remettre en route un master *Unreachable*
- forcer la creation d'un nouveau cluster sur l'un des master encore *Reachable* grace a la commande `docker swarm init --force-new-cluster --advertise-addr <ip>`

{: .note}
> **Note:**
>
> - Les services et nodes du precedents cluster seront conserves. Un quorum sera simplement recree avec les masters reachable (ou en tant que single-master quorum si un seul master a survecu)

{: .exemple}
> **Exemple:**
>
> ![Demo]({{ site.baseurl }}/assets/img/docker-swarm-quorum-loss.svg)

### Creation d'un swarm

On peut creer un swarm grace a la commande :

```bash
docker swarm init
```

L'hote sur lequel est execute cette commande devient alors un manager *leader* d'un swarm a un node (lui-meme)

{: .note}
> **Notes:**
>
> - Cette commande echouera si l'hote sur lequel elle est executee possede **plus d'une** interface reseau. Dans ce cas, il faut absolument preciser quelle interface utilisee grace a l'option `--advertise-addr`
> - L'output de cette commande contient la commande permettant d'ajouter un worker au swarm

{: .exemple}
> **Exemple:**
>
> ![Demo]({{ site.baseurl }}/assets/img/docker-swarm-creation.svg)

### Management des nodes

#### Ajouter un node

Il est possible d'ajouter un node en tant que manager ou worker en executant la commande `docker swarm join-token manager` ou `docker swarm join-token worker` dans un master et en copiant-collant son output dans le nouvel hote.

{: .note}
> **Notes:**
>
> - Il est egalement possible de promouvoir un worker en master grace a la commande `docker node promote <node_name>` dans un master
> - Il est possible d'ajouter l'option `-q` a la commande `docker swarm join-token` pour que seul le token soit renvoye en output.

{: .exemple}
> **Exemple:**
>
> ![Demo]({{ site.baseurl }}/assets/img/docker-swarm-add-node.svg)

#### Lister les nodes

Sur le master, la commande `docker node ls` permet de visualiser le worker et le master actuellement dans le node.

La presence d'un asterisque permet d'identifier le serveur sur lequel on se trouve. Les nodes dont le champs **MANAGER STATUS** est vide est obligatoirement un worker.

{: .exemple}
> **Exemple:**
>
> ![Demo]({{ site.baseurl }}/assets/img/docker-swarm-list-nodes.svg)

#### Enlever un worker

Pour enlever un node du swarm, il suffit de:

1. executer la commande `docker swarm leave` sur le worker
2. executer la commande `docker node rm <node_name>` sur un manager

{: .warning}
> **Warning:**
>
> - Avant d'executer la seconde commande, il faut attendre que le status du node dans `docker node ls` devienne *Down*. Cela peut prendre du temps.
> - Si c'est un master qu'il faut retirer, il faut d'abord le *demote* grace a la commande `docker node demote <node_name>` executee sur un master.

{: .exemple}
> **Exemple:**
>
> ![Demo]({{ site.baseurl }}/assets/img/docker-swarm-remove-node.svg)

### Docker Service

Les services sont les applications lancees dans un swarm.
Lorsqu'on cree un service, **l'orchestrator** decide du nombre de taches a creer, et **le scheduler** decide du nombre de tache a lancer sur chaque worker. **Une tache** est *UNE* instance du service.

#### Fonctionnement des services

Les services se repartissent sur les workers *ET* les managers. Ce sont les managers qui font en sortent que le bon nombre d'instances sont lancees en temps reel, et ils recreent des taches si un node ou une tache vient a faillir.

{: .note}
> **Note:**
>
> - Pour empecher les taches de se repartir sur les managers, qui ont deja la charge de faire fonctionner le swarm, il faut les faire passer au statut **DRAIN** grace a la commande `docker node update --availability drain <manager_name>`

Lors de la creation d'un service, il y a plusieurs facons de gerer son nombre d'instances :

- **replicas:** Le nombre d'instances est specifie dans l'option `--replicas`
- **global:** Le nombre d'instances est fixe a *un par node*.

Lorsque le nombre d'instance est determine via **replicas**, il est possible *d'update le nombre d'instances* via la commande `docker service update --replicas=<instance_number> <service_name>`

{: .note}
> **Note:**
>
> - Le nom des servies est aleatoire, a moins d'ajouter l'option `--name` lors de la creation du service.

#### Update des services

Lors d'un update d'un service, si la configuration du service reste la meme, le service ne sera pas reload. Pour cela, il faut rajouter l'option `-f`. Dans ce cas, le container sera relance !

{: .exemple}
> **Exemple:**
>
> ```bash
> docker service update -f myService
> ```

Il est egalement possible de changer la version ou l'application d'un service grace a l'option `--image`

{: .exemple}
> **Exemple:**
>
> ```bash
> docker service update --image "<image-name>:<version>" myServiceName
> ```

{: .warning}
> **Warning:**
>
> - Changer d'image a pour effet de redemarrer les instances du service.

### Networking

Il y a trois principaux types de networks fournis par Docker :

- **bridge:** reseau prive interne. Reseau par defaut sur l'interface docker0 (souvent 172.17.0.0).
- **host:** directement sur le reseau du host
- **none:** pas de network, pas acces reseau

{: .warning}
> **Warning:**
>
> - Sur un reseau host, chaque container doit avoir un port different, puisqu'il n'y a pas de mapping *container:host*

Lorsqu'on lance des containers sur differents serveur, il n'est pas possible pour ces derniers de communiquer entre eux a moins de manuellement mettre en place un routing.

Pour palier a ce probleme, il existe le reseau ***overlay***, utilise dans les clusters swarm. Ce reseau est un reseau prive partage par tous les nodes du cluster.

{: .note}
> **Note:**
>
> - Docker possede un serveur DNS embarque qui permet l'acces inter-container via le nom des container au lieu de l'ip du container (dans un reseau host par exemple)

#### Networking dans le Swarm

Le Swarm peut etre considere comme un cas particulier car le principe est de faire tourner plusieurs instances d'un meme service sur plusieurs hotes. Docker Swarm cree automatiquement un reseau **ingress**  qui s'occupe de loadbalancer les requetes entrantes entre les instances du service que l'on essait de contacter.

{: .note}
> **Note:**
>
> - Il est possible de contacter un service depuis n'importe quel node du swarm, meme si ce dernier ne possede pas d'instance du service. Le reseau ingress se charge de tout.