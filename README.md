# davidmanuel.fr

Mon portfolio : mes projets en entreprise, perso et à l'école, en français et en anglais.

Je suis apprenti ingénieur en informatique à CPE Lyon et je cherche un stage à l'étranger à partir de juin 2027.

## Ce qu'il y a dans le dépôt

| Dossier | Contenu | Technos |
|---|---|---|
| `apps/web` | Le site | Angular 22, rendu statique (chaque page est générée en HTML au build) |
| `apps/api` | L'API du formulaire de contact et des stats GitHub | NestJS, Prisma, PostgreSQL |
| `functions` | Deux tâches de fond | C# .NET 10, Azure Functions |
| `infra` | L'infrastructure Azure | Terraform |
| `.github/workflows` | Tests à chaque push, déploiement | GitHub Actions |

## Comment ça marche

```
Visiteur ──> Site statique (nginx sur Azure Container Apps)
                │
                │ formulaire de contact
                v
             API NestJS (Azure Container Apps) ──> PostgreSQL
                │                                     ^
                │ id du message                       │
                v                                     │
             File Azure Storage ──> Fonction C# : envoie le mail
                                     Fonction C# : chaque nuit, met à jour les stats GitHub
```

Le contenu des projets est dans le code du site (`apps/web/src/app/content`). Il change rarement, donc il est mis directement dans les pages HTML au moment du build. Le site reste rapide et bien référencé.

L'API ne sert qu'aux deux choses qui ne peuvent pas être statiques : recevoir un message et lire les stats GitHub mises à jour la nuit.

## Pourquoi ces choix

Je voulais utiliser ce portfolio pour apprendre des technos que je n'avais jamais utilisées et qui sont très demandées.

- **Angular** : je l'avais vu en alternance sans vraiment le pratiquer. Il est très utilisé dans les grandes entreprises.
- **NestJS** : je n'avais jamais fait de back-end Node.js. NestJS ressemble à Spring Boot (modules, injection de dépendances, décorateurs), ce qui m'a aidé à démarrer.
- **Prisma** : le schéma de la base est écrit à un seul endroit et les migrations sont versionnées.
- **C# et Azure Functions** : l'envoi du mail et la synchro GitHub sont des tâches de fond. Une fonction qui se lance seulement quand il y a un message ou une fois par nuit est plus adaptée qu'un serveur qui tourne en permanence. C'était aussi l'occasion de faire du C#.
- **Terraform** : toute l'infra Azure est décrite dans du code. Je peux la recréer ou la supprimer en une commande.

C'est volontairement plus que ce qu'il faut pour un portfolio. Chaque partie reste petite et je peux expliquer chacune.

## Lancer en local

Il faut Node 24, Docker et le SDK .NET 10.

```bash
# Base PostgreSQL et Azurite (émulateur de la file Azure)
docker compose up -d

# API
cd apps/api
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev

# Site (dans un autre terminal)
cd apps/web
npm install
npm start
```

## Tests

```bash
cd apps/web && npx ng test           # contenu et liens FR/EN
cd apps/api && npm test              # tests unitaires
cd apps/api && npm run test:e2e      # API complète avec un vrai PostgreSQL (Testcontainers)
cd functions && dotnet test          # fonctions C# (xUnit)
cd infra && terraform validate
```

## Captures d'écran des projets

Les captures des projets d'entreprise viennent d'environnements de test. Les noms et adresses mail visibles sont fictifs. Pour les projets scolaires, j'ai relancé les applications avec des données de démo.
