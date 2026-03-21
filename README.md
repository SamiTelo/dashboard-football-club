# Football Club Dashboard

Dashboard frontend pour la gestion d’un club de football.
Construit avec Next.js et connecté à une API backend NestJS + Prisma.


**Note** : Il s’agit d’un prototype actuellement en développement. compatible mobile, tablette et PC

## Stack technique

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer motion
- Shadcn UI

### Backend
- NestJS 
- PostgreSQL
- Prisma 

### Autres
- Axios
- JWT Authentication


##  Fonctionnalités 

- Interface responsive avec TailwindCSS (OK)
- Page login (OK)
- Page register (OK)
- Page mot de passe oublié (OK)
- Page réinitialisation du mot de passe (OK)
- Page verification code OTP (OK)
- Export PDF player avec pdfmake (OK)
- Pop Form add player (OK)
- Dashboard main (OK)
- Tableau des joueurs (OK)
- Tableau des utilisateurs (OK)
- Tableau des postes (OK)
- Tableau des équipes (OK)
- Authentification sécurisée JWT + Refresh Token connexion a mon API externe
- Upload d'images (joueurs, logos)

## Fonctionnalités à venir (feature)
 
- Gestion des joueurs, équipes et postes (connexion a mon API) (dev en cours...)
- etc...



## Screenshots

| Connexion | Inscription |
|-------|---------|
| ![login](./assets/screenshots/login.png) | ![register](./assets/screenshots/register.png) |
| Vérification | Vérifier l’email |
| ![verification](./assets/screenshots/verification.png) | ![verify-mail](./assets/screenshots/verify-mail.png) |
| Mot de passe oublié | Réinitialiser le mot de passe |
| ![forgot-password](./assets/screenshots/forgot-password.png) | ![reset-password](./assets/screenshots/reset-password.png) |
| Tableau de bord | Tableau des joueurs |
| ![dashboard](./assets/screenshots/dashboard-main.png) | ![dashboard-player](./assets/screenshots/dashboard-player.png) |
| Ajouter un joueur | Tableau des utilisateurs |
| ![pop-add-player](./assets/screenshots/pop-add-player.png) | ![dashboard-users](./assets/screenshots/dashboard-users.png) |
| Ajouter un utilisateur | Supprimer un utilisateur |
| ![pop-add-users](./assets/screenshots/pop-add-users.png) | ![pop-delete-users](./assets/screenshots/pop-delete-users.png) |
| Modifier un utilisateur | Tableau des postes |
| ![pop-update-users](./assets/screenshots/pop-update-users.png) | ![dashboard-position](./assets/screenshots/dashboard-positions.png) |
| Ajouter un poste | Tableau des équipes |
| ![pop-add-positions](./assets/screenshots/pop-add-positions.png) | ![dashboard-teams](./assets/screenshots/dashboard-teams.png) |
| Ajouter une équipe |
| ![pop-add-teams](./assets/screenshots/pop-add-teams.png) |


## Architecture du projet


```bash

assets/              # screenshots pour le README

public/
└── assets/          # images et ressources utilisées par l'application

src/
├── app/             # routing et pages Next.js
├── features/        # fonctionnalités (auth, dashboard, players, team, user, position)
├── components/      # composants UI réutilisables
├── hooks/           # hooks React personnalisés
├── lib/             # utilitaires et services

types/               # types TypeScript globaux

README.md            # documentation du projet

```
## Installation du projet

```bash

git clone https://github.com/SamiTelo/dashboard-football-club
cd dashboard-football-club
npm install
npm run dev

```

##  Auteur
**Tiemtore Samuel**
Email: [samueltiemtore10@gmail.com](mailto:samueltiemtore10@gmail.com)