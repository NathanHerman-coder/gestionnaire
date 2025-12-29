# Gestionnaire — application de gestion de factures
 Le projet est composé d'un backend Django REST et d'un frontend React (Vite + Tailwind). Ce document décrit l'architecture, l'installation, le déploiement et les bonnes pratiques à suivre avant de publier le code.

Table des matières
- Présentation
- Fonctionnalités
- Architecture & stack
- Pré-requis
- Configuration (variables d'environnement)
- Démarrage local — Backend
- Démarrage local — Frontend
- Tests
- Sécurité
- Déploiement (conseils rapides)
- CI / Recommandations pour GitHub
- Contribution
- Licence

## Présentation

Gestionnaire est une application modulaire pour gérer les clients et les factures. Elle fournit :
- Authentification JWT (login / refresh)
- Gestion des clients (CRUD)
- Gestion des factures (CRUD, marquer payée)
- Dashboard avec KPI et vues détaillées

Conçue pour être simple à étendre, elle sépare clairement backend (API) et frontend (UI) et suit les bonnes pratiques de sécurité (tokens, variables d'environnement).

## Fonctionnalités

- Inscription et login (JWT)
- CRUD clients
- CRUD factures (avec relation client)
- Rafraîchissement automatique du token d'accès
- Dashboard (nombre de clients, factures, revenu total, factures non payées)
- Exemples de pages : Home, Login/Register, Dashboard, Clients, Factures, Détail facture

## Architecture & stack

- Backend : Django, Django REST Framework, djangorestframework-simplejwt
- Frontend : React (Vite), Tailwind CSS, Axios
- Auth : JWT (access + refresh)
- DB (dev) : SQLite (db.sqlite3) — prévoir PostgreSQL en production

## Pré-requis

- Python 3.10+
- Node.js 18+ et npm
- Git

## Configuration — variables d'environnement

Les valeurs sensibles doivent venir d'un fichier `.env` non commité ou de variables d'environnement fournis par ton hébergeur/CI.

Fichier backend exemple : `backend/.env` (NE PAS COMMIT)

```
DJANGO_SECRET_KEY=your_production_secret_key_here
```

Fichier frontend exemple : `frontend/.env` (optionnel)

```
VITE_API_BASE=http://127.0.0.1:8000/api/
```

## Démarrage local — Backend

1. Ouvrir un terminal et se placer dans le dossier backend :

```bash
cd backend
```

2. Créer et activer un environnement virtuel :

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Installer les dépendances :

```bash
pip install -r requirements.txt
```

4. Créer ou mettre à jour la base de données :

```bash
python manage.py migrate
```

5. Créer un superuser (optionnel mais pratique) :

```bash
python manage.py createsuperuser
```

6. Lancer le serveur de développement :

```bash
python manage.py runserver
```

L'API sera disponible par défaut sur `http://127.0.0.1:8000/api/`.

## Démarrage local — Frontend

1. Placer vous dans le dossier frontend :

```bash
cd frontend
```

2. Copier le fichier d'exemple d'environnement (optionnel) :

```bash
cp .env.example .env
# modifier VITE_API_BASE si nécessaire
```

3. Installer les dépendances et lancer en mode développement :

```bash
npm install
npm run dev
```

4. Build production :

```bash
npm run build
```

## Tests

- Backend : écrire des tests Django dans `*/tests.py` et exécuter :

```bash
cd backend
source .venv/bin/activate
python manage.py test
```

- Frontend : nous recommandons d'utiliser Vitest + Testing Library pour tests unitaires et d'intégration. (Non inclus par défaut dans ce template.)

## Sécurité

- Ne commitez jamais `backend/.env`, `frontend/.env`, `db.sqlite3` ou des clés privées. Le `.gitignore` à la racine du projet est configuré pour les ignorer.
- En production, préférez stocker le refresh token dans un cookie HttpOnly plutôt que dans localStorage.
- Changez la `DJANGO_SECRET_KEY` par une valeur sécurisée en production.
- Configurez `ALLOWED_HOSTS` et CORS de manière stricte pour l'environnement de production.

## Déploiement (conseils rapides)

- Pour un déploiement simple, utilisez Docker + docker-compose (web: Django + gunicorn, db: Postgres, frontend: build + Nginx).
- Exemple de checklist pour prod :
	- Migrer vers PostgreSQL
	- Configurer DEBUG=False
	- Configurer DJANGO_SECRET_KEY et autres variables via le provider (secrets)
	- Mettre en place HTTPS (Let's Encrypt)
	- Configurer monitoring et sauvegardes DB

## CI / Recommandations GitHub

- Ajouter une pipeline GitHub Actions qui vérifie :
	- `pip install -r backend/requirements.txt` et `python manage.py test`
	- `npm ci` et `npm run build` pour le frontend
	- Linter (ESLint) et format (prettier / black)

## Avant de pusher sur GitHub

1. Vérifier que `.gitignore` contient bien : `.env`, `db.sqlite3`, `.venv`, `node_modules`, etc.
2. S'assurer qu'aucun secret n'a été committé :

```bash
git status --porcelain
git ls-files --others --exclude-standard
```

Si tu as committé des secrets par erreur, il faudra les révoquer et purger l'historique (BFG/gitrepo-filter). Je peux t'aider à le faire en toute sécurité.

## Contribution

Merci de respecter la structure du projet :
- Ouvrir une branche par fonctionnalité `feature/<description>`
- Ouvrir une PR décrivant le changement, inclure screenshots si nécessaire
- Ajouter des tests pour la logique métier

## Licence

Ce projet est sous licence MIT.  
Voir le fichier LICENSE pour plus de détails.


