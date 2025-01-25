# My-Chat-Agent

My-Chat-Agent est un projet qui fournit un widget de chatbot personnalisable, facilement intégrable dans des applications mobiles ou web. Ce widget permet aux utilisateurs de discuter avec un agent virtuel ou un agent humain, selon leurs besoins.

## Structure du projet

La structure du projet est organisée comme suit :  

- node_modules/ : Modules Node.js installés.
- src/ : Code source principal.
  - Config/ : Fichiers de configuration.
  - Controllers/ : Logique métier et gestionnaires de routes.
    - HomeController.js
  - Middlewares/ : Middlewares pour les requêtes HTTP.
  - Models/ : Modèles de données.
  - public/ : Fichiers publics comme les scripts et styles CSS.
    - js/ : Scripts JavaScript.
    - styles/ : Feuilles de style CSS.
  - Routes/ : Définition des routes de l'application.
    - AiRoutes.js : Routes pour l'agent intelligent.
    - HomeRoutes.js : Routes de la page principale.
  - Services/ : Services pour gérer les interactions avec l'agent.
    - GeminiService.js
  - Views/ : Fichiers de templates (vues).
    - index.ejs
- .env : Variables d'environnement.
- .gitignore : Fichiers et dossiers ignorés par Git.
- app.js : Point d'entrée principal de l'application.
- package.json : Liste des dépendances et scripts du projet.
- package-lock.json : Verrouillage des dépendances.

---

## Prérequis

Avant de commencer, assurez-vous que votre machine dispose des éléments suivants :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure).
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/).

---

## Installation

1. Clonez ce dépôt :  
   ```bash
   git clone https://github.com/TWIMM/my-chat-agent.git
   cd my-chat-agent

2. Install dependence :  
   ```bash
   npm install


3. Add APi KEYS  
   