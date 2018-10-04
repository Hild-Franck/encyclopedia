---
layout: post
title: Game
description: "Concepts et astuce en game dev, game design etc..."
icon: "fas fa-gamepad"
---

## SDL
La Simple DirectMedia Layer (SDL) est une bibliothèque multimédia écrite en C.

### Definitions
- **Bit Blit / Blitting:** Combinaison de plusieurs bitmap en une seule bitmap.
- **Bitmap:** Un tableau de bits.
- **Framebuffer:** Portion de la RAM contenant une bitmap déterminant un affichage vidéo.

### Types
#### TTF_Font
Permet d'utiliser une font TTF

#### SDL_Event
Structure permettant d’utiliser des events

#### SDL_Color
Structure decrivant une couleur *(r, g, b, a)*

#### SDL_Surface
Structure contenant des pixels utilisée pour du blitting

#### SDL_Rect
Structure décrivant un rectangle *(x,y,w,h)*

### API
#### IMG_Load(char *path)
- *path:* le chemin vers le fichier à charger

Charge une image

#### SDL_DisplayFormat(SDL_Surface *surface)
- *surface:* la surface à convertir

Convertit une surface au format et couleur du video framebuffer, afin de pouvoir faire du fast blitting sur la surface d’affichage.

> **Return:** La nouvelle **SDL_Surface** ou **NULL**

{: .note}
> **Notes:**
>
> - Il faut avoir appelé **SDL_Init** avant d’appeler **SDL_DisplayFormat**
> - Il faut utiliser une surface différente pour stocker la nouvelle surface, car sinon l’ancienne n’est pas libérée en mémoire et conduit à une memory leak.

#### SDL_Init(Uint32 flags)
- *flags:* la liste des flags correspondant aux sous-systèmes à charger. Pour tout charger, utiliser le flag **SDL_INIT_EVERYTHING**.

Initialise des sous-systèmes de SDL.

#### SDL_Quit()
Clean tout les sous-systèmes initialisés.

{: .note}
> **Note:**
>
> - C’est une bonne idée d’utiliser cette fonction avec `atexit()` pour être sur qu’elle soit appeler dès que l’application se ferme.

#### SDL_SetVideoMode(int width, int height, int bpp, Uint32 flags)

{: .warning}
> **Warning:**
>
> - Cette fonction n’est plus utile dans SDL 2, on lui préfère **SDL_CreateWindow**.

- *width:* largeur de la fenêtre d’affichage
- *height:* hauteur de la fenêtre d’affichage
- *bpp:* bit-per-pixel
- *flags:* ensemble d’options diverses

Definit le mode video de l’affichage

> **Return:** La **SDL_Surface** du framebuffer ou **NULL**

#### SDL_WM_SetCaption(const char *title, const char *iconPath)

{: .warning}
> **Warning:**
>
> - Cette fonction n’est plus utile dans SDL 2, on définit le titre dans **SDL_CreateWindow**.

- *title:* titre de la fenêtre
- *iconPath:* chemin vers le fichier image de l’icône.

Definit un titre et une icône pour la fenêtre.

## WebGL
Le webGL est un standard permettant d’utiliser openGL grâce au canvas de HTML5.

### Definitions
#### Vertex Shader
Programme qui est appele pour chaque vertice

{: .exemple}
> **Exemple:**
>
> - *Appelé 4 fois pour un carré*

#### Fragment Shader
Programme appele une fois par pixel

{: .exemple}
> **Exemple:**
>
> - *Appelé 10000 pour un canvas de 100x100 px*

### API
#### clearColor(*r, g, b, a*)
- *r:* rouge
- *g:* vert
- *b:* bleu
- *a:* opacité

Couleur par défaut utilisée lorsque les buffer de couleurs sont clear

#### clear(*mask*)
- *mask* : le buffer a reset

Reset un buffer à ses valeurs prédéfinies (= par défaut)

#### createBuffer()
Crée et initialise un buffer, afin d’injecter des données dans le GPU

#### bindBuffer(*target, buffer*)
- *target:* le type de buffer
- *buffer:* le buffer à lier

Lie un buffer à un type de buffer

#### bufferData(*target, arrayBuffer, usage*)
- *target:* le type de buffer
- *arrayBuffer:* un tableau de données typé
- *usage:* le type d’accès mémoire sur les datas

Crée le data store de l’objet du buffer en y chargeant les datas

#### attachShader(*program, shader*)
- *program:* le programme sur lequel on souhaite attacher le shader
- *shader:* le shader (fragment ou vertex) que l’on souhaite attacher au programme

Attache un shader a un programme

{: .note}
> **Note:**
>
> - Apres avoir attacher les shaders, il faut les lier avec la methode **linkProgram**

#### linkProgram(*program*)
- *program:* le programme sur lequel on veut link des shaders.
Lie les shaders attachés à un programme au programme en question

#### getAttribLocation(*program, attributeName*)
- *program:* le programme dans lequel on cherche l’attribut
- *attributeName:* le nom de l’attribut que l’on recherche
Recherche un attribut dans un programme

> **Return:** L’index de l’attribut en int long ou -1 si il n’est pas trouvé.

{: .note}
> **Note:**
>
> - Les attributs sont définis dans les shaders

#### vertexAttribPointer(*index, size, type, normalized, stride, offset*)
- *index:*
- *size:*
- *type:*
- *normalized:*
- *stride:*
- *offset:*
