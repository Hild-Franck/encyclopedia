# Game  :video_game:
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
charge une image

#### SDL_DisplayFormat(SDL_Surface *surface)
- *surface:* la surface à convertir
convertit une surface au format et couleur du video framebuffer, afin de pouvoir faire du fast blitting sur la surface d’affichage.

> **Return:** La nouvelle **SDL_Surface** ou **NULL**

> **Notes:**
> - Il faut avoir appelé **SDL_Init** avant d’appeler **SDL_DisplayFormat**
> - Il faut utiliser une surface différente pour stocker la nouvelle surface, car sinon l’ancienne n’est pas libérée en mémoire et conduit à une memory leak.

#### SDL_Init(Uint32 flags)
- *flags:* la liste des flags correspondant aux sous-systèmes à charger. Pour tout charger, utiliser le flag **SDL_INIT_EVERYTHING**.
Initialise des sous-systèmes de SDL.

#### SDL_Quit()
clean tout les sous-systèmes initialisés.

> **Note:**
> C’est une bonne idée d’utiliser cette fonction avec `atexit()` pour être sur qu’elle soit appeler dès que l’application se ferme.

#### SDL_SetVideoMode(int width, int height, int bpp, Uint32 flags)

> **Attention:**
> Cette fonction n’est plus utile dans SDL 2, on lui préfère **SDL_CreateWindow**.

- *width:* largeur de la fenêtre d’affichage
- *height:* hauteur de la fenêtre d’affichage
- *bpp:* bit-per-pixel
- *flags:* ensemble d’options diverses
Definit le mode video de l’affichage

> **Return:** La **SDL_Surface** du framebuffer ou **NULL**

#### SDL_WM_SetCaption(const char *title, const char *iconPath)

> **Attention:**
> Cette fonction n’est plus utile dans SDL 2, on définit le titre dans **SDL_CreateWindow**.

- *title:* titre de la fenêtre
- *iconPath:* chemin vers le fichier image de l’icône.
Definit un titre et une icône pour la fenêtre.
