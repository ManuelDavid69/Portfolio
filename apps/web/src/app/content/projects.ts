import { Picture, Project } from './types';

const img = (src: string, width: number, height: number, alt: Picture['alt'], caption?: Picture['caption']): Picture => ({
  src,
  width,
  height,
  alt,
  caption,
});

const pumpcastHome = img('/images/pumpcast/accueil.webp', 1280, 820, {
  en: 'PumpCast home page: map and list of fuel stations around Lyon',
  fr: 'Accueil de PumpCast : carte et liste des stations autour de Lyon',
});

const digidelBefore = img('/images/digidel/digidel-sync-avant.webp', 1600, 665, {
  en: 'Before: the situation shows February 2026 while the planning still shows December 2021',
  fr: 'Avant : la situation affiche février 2026 et le planning est resté sur décembre 2021',
});

const gmaoLog = img('/images/gmao-parc/gmao-log.webp', 1600, 501, {
  en: 'Log of a run of the equipment update job',
  fr: 'Journal d’une exécution du traitement de mise à jour des matériels',
}, {
  en: 'A real run of the equipment job. I removed the lines with server names, paths and e-mail addresses. What is left: the query, one update per machine, the commit, then the totals and return code 0.',
  fr: 'Une vraie exécution du traitement des matériels. J’ai retiré les lignes contenant les noms de serveurs, les chemins et les adresses mail. Il reste la requête, une mise à jour par matériel, le commit, puis les totaux et le code retour 0.',
});

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------- work
  {
    slug: 'gmao-parc',
    group: 'work',
    title: 'GMAO PARC',
    year: '2025–2026',
    tagline: {
      en: 'Java batch jobs that keep a fleet maintenance system in line with HR and finance data.',
      fr: 'Des traitements Java qui gardent une GMAO de flotte cohérente avec les données RH et financières.',
    },
    context: { en: 'Work-study at AREA (APRR group)', fr: 'Alternance chez AREA (groupe APRR)' },
    period: { en: '2025 – 2026', fr: '2025 – 2026' },
    role: { en: 'Developer (work-study)', fr: 'Développeur (alternant)' },
    team: { en: 'Supervised by my tutor, with the fleet team as users', fr: 'Encadré par mon tuteur, avec l’équipe du parc comme utilisateurs' },
    stack: ['Java', 'JDBC', 'PostgreSQL 17', 'REST API', 'Maven', 'Log4j 2', 'SMTP', 'Azure DevOps'],
    links: [],
    thumbnail: gmaoLog,
    sections: [
      {
        title: { en: 'The problem', fr: 'Le problème' },
        paragraphs: [
          {
            en: 'The GMAO (a computerised maintenance management system built on the CARL Source software) tracks every vehicle and machine of the group: tractors, salt spreaders, mowers. It receives identities from HR and sends maintenance costs to the finance tools.',
            fr: 'La GMAO PARC, construite sur le progiciel CARL Source, suit tous les véhicules et matériels du groupe : tracteurs, saleuses, tondeuses. Elle reçoit les identités depuis l’outil RH et envoie les coûts de maintenance aux outils financiers.',
          },
          {
            en: 'Two updates were still done by hand. People who had left the company had to be deactivated one by one, which was a security and GDPR risk. And when a machine moved to another site, its cost centre often stayed on the old one, so maintenance was billed to the wrong department.',
            fr: 'Deux mises à jour se faisaient encore à la main. Les personnes parties de l’entreprise devaient être désactivées une par une, avec un risque pour la sécurité et le RGPD. Et quand un matériel changeait de site, son code analytique restait souvent sur l’ancien, donc l’entretien était facturé au mauvais service.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'gmao-flow',
            caption: {
              en: 'Where the GMAO sits. Simplified: the real systems have internal names.',
              fr: 'La place de la GMAO. Version simplifiée : les vrais systèmes ont des noms internes.',
            },
          },
        ],
      },
      {
        title: { en: 'What I built', fr: 'Ce que j’ai fait' },
        bullets: [
          {
            en: 'Equipment job: one SQL query finds the machines whose cost centre differs from the one of the site they are attached to, then updates them in a single transaction and ends with a return code for the scheduler.',
            fr: 'Traitement des matériels : une requête SQL trouve les matériels dont le code analytique diffère de celui du site de rattachement, puis les met à jour dans une seule transaction et se termine par un code retour pour l’ordonnanceur.',
          },
          {
            en: 'People job: calls the CARL Source REST API, gets everyone whose contract has ended and switches their records to inactive (identity, user account, technician profile). It refreshes its access token when it expires.',
            fr: 'Traitement des acteurs : appelle l’API REST de CARL Source, récupère les personnes dont le contrat est terminé et passe leurs fiches en inactif (acteur, compte utilisateur, intervenant). Le jeton d’accès est renouvelé quand il expire.',
          },
          {
            en: 'A shared core for both jobs: database connection, e-mail report, error file and Log4j 2 logging. Settings live in external .properties files managed by operations, so no password is in the code.',
            fr: 'Un socle commun aux deux traitements : connexion à la base, mail de compte rendu, fichier d’erreurs et journalisation Log4j 2. Les paramètres sont dans des fichiers .properties externes gérés par l’exploitation, donc aucun mot de passe dans le code.',
          },
          {
            en: 'Packaged as standalone fat JARs with Maven, versioned on Azure DevOps and run on the pre-production servers before going live.',
            fr: 'Livré sous forme de Fat JAR autonomes avec Maven, versionné sur Azure DevOps et exécuté sur les serveurs de préproduction avant la mise en production.',
          },
        ],
        figures: [{ kind: 'picture', picture: gmaoLog }],
      },
      {
        title: { en: 'A bug worth telling', fr: 'Un bug qui mérite d’être raconté' },
        paragraphs: [
          {
            en: 'The people job read the API results page by page. In tests, some people were never deactivated. The reason: each person I deactivated left the filtered list, so everything shifted and the next page skipped records.',
            fr: 'Le traitement des acteurs lisait les résultats de l’API page par page. En test, certaines personnes n’étaient jamais désactivées. La raison : chaque personne désactivée sortait de la liste filtrée, tout se décalait et la page suivante sautait des fiches.',
          },
          {
            en: 'The fix was to always read from the first page until the API returns nothing. The list empties as the work gets done, like a queue.',
            fr: 'La correction a été de toujours relire la première page jusqu’à ce que l’API ne renvoie plus rien. La liste se vide au fur et à mesure du travail, comme une file d’attente.',
          },
        ],
      },
      {
        title: { en: 'Results', fr: 'Résultats' },
        bullets: [
          {
            en: 'Both updates now run on their own, and each run sends an e-mail report with the number of items read and updated.',
            fr: 'Les deux mises à jour tournent seules, et chaque exécution envoie un mail avec le nombre d’éléments lus et mis à jour.',
          },
          {
            en: 'After a reorganisation of the group in January 2026, I studied the existing HR integration flow end to end to prepare the arrival of new subsidiaries.',
            fr: 'Après la réorganisation du groupe en janvier 2026, j’ai étudié de bout en bout le flux d’intégration RH existant pour préparer l’arrivée des nouvelles filiales.',
          },
          {
            en: 'The code is ready for version 7 of CARL Source, planned for the end of 2026.',
            fr: 'Le code est prêt pour la version 7 de CARL Source, prévue fin 2026.',
          },
        ],
      },
    ],
  },
  {
    slug: 'casa',
    group: 'work',
    title: 'CASA',
    year: '2025–2026',
    tagline: {
      en: 'Modernising a housing management app: Java layer removed, Excel exports rewritten, GDPR purge scripts.',
      fr: 'Modernisation d’une application de gestion de logements : couche Java supprimée, exports Excel réécrits, scripts de purge RGPD.',
    },
    context: { en: 'Work-study at AREA (APRR group)', fr: 'Alternance chez AREA (groupe APRR)' },
    period: { en: '2025 – 2026', fr: '2025 – 2026' },
    role: { en: 'Developer (work-study)', fr: 'Développeur (alternant)' },
    team: { en: 'Supervised by my tutor, with the housing and finance teams', fr: 'Encadré par mon tuteur, avec les équipes logement et finance' },
    stack: ['PHP 8.1', 'PostgreSQL', 'SQL', 'JavaScript', 'AJAX', 'Linux'],
    links: [],
    sections: [
      {
        title: { en: 'The problem', fr: 'Le problème' },
        paragraphs: [
          {
            en: 'CASA manages the housing that the group provides to its staff. It mixed old PHP modules with newer Java and Angular parts, so a single feature could cross three technologies. It also stores sensitive personal data, such as bank details and household information, which must be deleted after a set time.',
            fr: 'CASA gère les logements que le groupe met à disposition de ses agents. L’application mélangeait d’anciens modules PHP et des parties plus récentes en Java et Angular, donc une seule fonctionnalité pouvait traverser trois technologies. Elle contient aussi des données personnelles sensibles, comme des coordonnées bancaires et la composition du foyer, qui doivent être supprimées après un certain délai.',
          },
        ],
      },
      {
        title: { en: 'What I did', fr: 'Ce que j’ai fait' },
        bullets: [
          {
            en: 'Moved the consultation pages and Excel exports from the Java service to PHP 8.1. The page no longer goes through Angular, then a Java API, then the database.',
            fr: 'Migré les pages de consultation et les exports Excel du service Java vers PHP 8.1. La page ne passe plus par Angular, puis une API Java, puis la base.',
          },
          {
            en: 'Found a wrong occupancy formula in the old export: sold or unavailable homes were counted. I fixed the rule with the business owners, so the ratio is now occupied homes over homes that can be occupied.',
            fr: 'Trouvé une formule d’occupation fausse dans l’ancien export : les logements vendus ou indisponibles étaient comptés. J’ai revu la règle avec les référents métier : le taux porte maintenant sur les logements occupés par rapport aux logements occupables.',
          },
          {
            en: 'Put the SQL joins in Manager classes to keep queries out of the display code, and added cascading filters: choosing a region updates the district list without reloading the page.',
            fr: 'Regroupé les jointures SQL dans des classes Manager pour séparer les requêtes de l’affichage, et ajouté des filtres en cascade : choisir une région met à jour la liste des districts sans recharger la page.',
          },
          {
            en: 'Added incident tracking on tenant files, with an alert icon, and fixed two bugs that appeared after the move to Linux: broken accented characters and missing photos and plans.',
            fr: 'Ajouté le suivi des incidents sur les fiches locataires, avec une icône d’alerte, et corrigé deux bugs apparus après le passage sous Linux : les accents cassés et les photos et plans introuvables.',
          },
        ],
      },
      {
        title: { en: 'GDPR scripts that stay fast', fr: 'Des scripts RGPD qui restent rapides' },
        paragraphs: [
          {
            en: 'I wrote two SQL scripts. The first anonymises applications that never led to a home. The second deletes the personal data of former tenants five years after they leave, but keeps the move-in and move-out history used for property management.',
            fr: 'J’ai écrit deux scripts SQL. Le premier anonymise les candidatures qui n’ont pas abouti à un logement. Le second supprime les données personnelles des anciens locataires cinq ans après leur départ, tout en gardant l’historique des entrées et sorties utile à la gestion du patrimoine.',
          },
          {
            en: 'A CTE computes the list of records once, and every update uses it inside one transaction: if anything fails, nothing is changed. EXPLAIN ANALYZE showed a full scan of the occupancy table, so I added a partial index on the leaving dates.',
            fr: 'Une CTE calcule une seule fois la liste des enregistrements, puis toutes les mises à jour l’utilisent dans une même transaction : en cas d’erreur, rien n’est modifié. EXPLAIN ANALYZE montrait un parcours complet de la table des occupations, j’ai donc ajouté un index partiel sur les dates de sortie.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'explain-plan',
            caption: {
              en: 'Query plan of the purge before and after the partial index (PostgreSQL estimates on a test volume).',
              fr: 'Plan d’exécution de la purge avant et après l’index partiel (estimations PostgreSQL sur un volume de test).',
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'digidel',
    group: 'work',
    title: 'Digidel',
    year: '2026',
    tagline: {
      en: 'Sprint work on an app that tracks the delegation hours of staff representatives (Spring Boot and Vue.js).',
      fr: 'Travail en sprints sur une application qui suit les heures de délégation des représentants du personnel (Spring Boot et Vue.js).',
    },
    context: { en: 'Summer 2026 at AREA (APRR group)', fr: 'Été 2026 chez AREA (groupe APRR)' },
    period: { en: 'July – August 2026', fr: 'Juillet – août 2026' },
    role: { en: 'Full-stack developer', fr: 'Développeur full stack' },
    team: { en: 'Scrum team, user stories reviewed through pull requests', fr: 'Équipe Scrum, user stories relues en pull request' },
    stack: ['Java', 'Spring Boot', 'JPA', 'Flyway', 'MapStruct', 'Vue.js', 'Vuex', 'Vuetify', 'OAuth2', 'Azure DevOps'],
    links: [],
    thumbnail: digidelBefore,
    sections: [
      {
        title: { en: 'Context', fr: 'Contexte' },
        paragraphs: [
          {
            en: 'Staff representatives get a number of hours for their mandates. Digidel tracks those hours (credits, carry-overs, donations) and the delegation slips they fill in. I joined the team for the summer and took user stories from the backlog, sprint after sprint.',
            fr: 'Les représentants du personnel disposent d’heures pour leurs mandats. Digidel suit ces heures (crédits, reports, dons) et les bons de délégation qu’ils remplissent. J’ai rejoint l’équipe pour l’été et pris des user stories du backlog, sprint après sprint.',
          },
        ],
      },
      {
        title: { en: 'Keeping two month pickers in sync', fr: 'Synchroniser deux sélecteurs de mois' },
        paragraphs: [
          {
            en: 'The home page shows the representative’s situation and planning, each with its own month picker. Nothing linked them, so you could read February 2026 next to December 2021. Now, in monthly mode, changing one moves the other. In yearly mode they stay independent, as the business asked.',
            fr: 'L’accueil affiche la situation et le planning du représentant, chacun avec son sélecteur de mois. Rien ne les reliait, on pouvait donc lire février 2026 à côté de décembre 2021. En mode mensuel, changer l’un déplace maintenant l’autre. En mode annuel ils restent indépendants, comme demandé par le métier.',
          },
        ],
        figures: [
          {
            kind: 'pair',
            pictures: [
              digidelBefore,
              img('/images/digidel/digidel-sync-apres.webp', 1600, 666, {
                en: 'After: situation and planning both show September 2026',
                fr: 'Après : la situation et le planning affichent tous les deux septembre 2026',
              }),
            ],
            caption: { en: 'Before and after.', fr: 'Avant et après.' },
          },
        ],
      },
      {
        title: { en: 'A sort that undid another sort', fr: 'Un tri qui en annulait un autre' },
        paragraphs: [
          {
            en: 'Users wanted the most recent periods first. The repository already sorted them that way, and the selector component did not touch the order. The cause was in the callback that runs after login: it sorted the periods again, oldest first, before storing them. Reversing that comparison fixed every period list in the app.',
            fr: 'Les utilisateurs voulaient voir les périodes les plus récentes en premier. Le repository les triait déjà dans cet ordre et le composant de sélection ne changeait rien. La cause était dans le callback exécuté après la connexion : il retriait les périodes, de la plus ancienne à la plus récente, avant de les ranger dans le store. Inverser cette comparaison a corrigé toutes les listes de périodes de l’application.',
          },
        ],
        figures: [
          {
            kind: 'code',
            language: 'javascript',
            code: `// AuthorizationCodeCallbackView.vue
// before: oldest first
periodes.sort((a, b) => new Date(a.debut).getTime() - new Date(b.debut).getTime())
// after: most recent first
periodes.sort((a, b) => new Date(b.debut).getTime() - new Date(a.debut).getTime())`,
            caption: { en: 'The one-line fix, once the cause was found.', fr: 'La correction d’une ligne, une fois la cause trouvée.' },
          },
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-periodes.webp', 1600, 668, {
              en: 'Period list sorted from the most recent month',
              fr: 'Liste des périodes triée à partir du mois le plus récent',
            }),
          },
        ],
      },
      {
        title: { en: 'Other stories', fr: 'Autres user stories' },
        bullets: [
          {
            en: 'Prefilled dates: when a mandate is added, the end date now comes from the active mandate through a new API endpoint, and the date fields come after the fields they depend on.',
            fr: 'Dates préremplies : à l’ajout d’un mandat, la date de fin vient maintenant du mandat actif grâce à un nouvel endpoint, et les champs de date sont placés après ceux dont ils dépendent.',
          },
          {
            en: 'E-mail and UPN: the uniqueness rule moved from the e-mail address to the UPN (the Windows login), so several people can share a team mailbox. Login looks up the UPN first, then the e-mail as a fallback.',
            fr: 'Mail et UPN : la règle d’unicité est passée du mail à l’UPN (l’identifiant Windows), pour que plusieurs personnes puissent partager une boîte générique. La connexion cherche d’abord l’UPN, puis le mail en secours.',
          },
          {
            en: 'An interface table for the HR system’s employees, with its JPA entity and repository, as the base for creating users from HR data.',
            fr: 'Une table d’interface pour les salariés de l’outil RH, avec son entité JPA et son repository, comme base pour créer des utilisateurs à partir des données RH.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-ajout-mandat.webp', 897, 456, {
              en: 'Add a mandate dialog with the end date already filled in',
              fr: 'Fenêtre d’ajout d’un mandat avec la date de fin déjà remplie',
            }),
          },
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-utilisateur.webp', 1600, 664, {
              en: 'User form with separate e-mail and UPN fields, filled with fictitious data',
              fr: 'Fiche utilisateur avec les champs mail et UPN séparés, remplie avec des données fictives',
            }, {
              en: 'User form with separate e-mail and UPN fields. The data is fictitious.',
              fr: 'Fiche utilisateur avec les champs mail et UPN séparés. Les données sont fictives.',
            }),
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------ personal
  {
    slug: 'qrshield',
    group: 'personal',
    title: 'QRShield',
    year: '2026',
    tagline: {
      en: 'A mobile app that checks where a QR code really leads before you open it.',
      fr: 'Une application mobile qui vérifie où mène vraiment un QR code avant de l’ouvrir.',
    },
    context: { en: 'Personal project', fr: 'Projet personnel' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Everything, from API to app', fr: 'Tout, de l’API à l’application' },
    team: { en: 'Solo', fr: 'Seul' },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'PostGIS', 'React Native', 'Expo', 'TypeScript', 'React', 'Leaflet', 'Docker', 'Playwright'],
    links: [
      { label: { en: 'Source code', fr: 'Code source' }, url: 'https://github.com/ManuelDavid69/QRShield' },
      { label: { en: 'Demo page', fr: 'Page de démo' }, url: 'https://manueldavid69.github.io/QRShield/' },
      { label: { en: 'Android APK', fr: 'APK Android' }, url: 'https://github.com/ManuelDavid69/QRShield/releases/latest' },
    ],
    sections: [
      {
        title: { en: 'Why', fr: 'Pourquoi' },
        paragraphs: [
          {
            en: 'People scan QR codes on menus, parking meters and posters without checking where they lead. Sticking a fake code on a parking meter is enough to send people to a fraudulent payment page. This is called quishing, and it already has victims in France.',
            fr: 'On scanne des QR codes sur des menus, des horodateurs ou des affiches sans vérifier où ils mènent. Coller un faux code sur un horodateur suffit pour envoyer les gens vers une fausse page de paiement. On appelle ça le quishing, et il a déjà fait des victimes en France.',
          },
        ],
      },
      {
        title: { en: 'How it works', fr: 'Comment ça marche' },
        bullets: [
          {
            en: 'The API follows the link to its final address, checks the domain against Google Safe Browsing and VirusTotal, spots look-alike domains such as paypa1.com, and flags direct downloads of .apk or .exe files.',
            fr: 'L’API suit le lien jusqu’à son adresse finale, vérifie le domaine auprès de Google Safe Browsing et VirusTotal, repère les domaines qui imitent un vrai site comme paypa1.com et signale les téléchargements directs de fichiers .apk ou .exe.',
          },
          {
            en: 'The app shows a verdict (safe, suspicious or dangerous) with the reasons, and the user decides whether to open the link.',
            fr: 'L’application affiche un verdict (sûr, suspect ou dangereux) avec ses raisons, et l’utilisateur décide d’ouvrir le lien ou non.',
          },
          {
            en: 'Dangerous codes are reported anonymously and shown on a map, in the app and on a public web page. PostGIS runs the geographic queries.',
            fr: 'Les codes dangereux sont signalés anonymement et affichés sur une carte, dans l’application et sur une page web publique. PostGIS fait les requêtes géographiques.',
          },
          {
            en: 'Each scan is saved, and a statistics screen shows the user’s habits. Statistics are computed in SQL.',
            fr: 'Chaque scan est enregistré, et un écran de statistiques montre les habitudes de l’utilisateur. Les statistiques sont calculées en SQL.',
          },
        ],
      },
      {
        title: { en: 'Choices I can explain', fr: 'Des choix que je peux expliquer' },
        paragraphs: [
          {
            en: 'I considered Kotlin Multiplatform, which builds on my native Android experience. But I work on Windows, and building and testing the iOS version of a KMP app requires a Mac. Expo let me test on Android and iPhone, with the same language as the web page.',
            fr: 'J’ai envisagé Kotlin Multiplatform, qui prolongeait mon expérience Android native. Mais je travaille sous Windows, et compiler puis tester la version iOS d’une application KMP demande un Mac. Expo me permet de tester sur Android et iPhone, avec le même langage que la page web.',
          },
        ],
      },
    ],
  },
  {
    slug: 'pumpcast',
    group: 'personal',
    title: 'PumpCast',
    year: '2026',
    tagline: {
      en: 'A web app that forecasts fuel prices station by station, and says honestly when it cannot.',
      fr: 'Une application web qui prévoit le prix des carburants station par station, et dit franchement quand elle ne sait pas.',
    },
    context: { en: 'Personal project', fr: 'Projet personnel' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Everything, from data pipeline to front end', fr: 'Tout, du pipeline de données au front' },
    team: { en: 'Solo', fr: 'Seul' },
    stack: ['Go', 'GraphQL', 'Next.js', 'TypeScript', 'MongoDB', 'Redis', 'Python', 'scikit-learn', 'GitHub Actions', 'Docker'],
    links: [
      { label: { en: 'Live app', fr: 'Application en ligne' }, url: 'https://pump-cast.vercel.app' },
      { label: { en: 'Source code', fr: 'Code source' }, url: 'https://github.com/ManuelDavid69/PumpCast' },
    ],
    thumbnail: pumpcastHome,
    sections: [
      {
        title: { en: 'The question', fr: 'La question' },
        paragraphs: [
          {
            en: 'Fuel price apps show today’s price. The real question is different: should I fill up now or wait a few days? PumpCast looks at the station’s history, the oil price, the euro to dollar rate, holidays and school breaks to estimate the next seven days. All the data comes from official open sources.',
            fr: 'Les applis de prix montrent le prix du jour. La vraie question est autre : je fais le plein maintenant ou j’attends quelques jours ? PumpCast regarde l’historique de la station, le cours du pétrole, le taux euro-dollar, les jours fériés et les vacances pour estimer les sept prochains jours. Toutes les données viennent de sources ouvertes officielles.',
          },
        ],
        figures: [{ kind: 'picture', picture: pumpcastHome }],
      },
      {
        title: { en: 'How it is built', fr: 'Comment c’est construit' },
        bullets: [
          {
            en: 'A Go program downloads the official price feed, updates the stations and stores one price per station, fuel and day in a MongoDB time series collection.',
            fr: 'Un programme Go télécharge le flux officiel des prix, met à jour les stations et enregistre un prix par station, carburant et jour dans une collection time series MongoDB.',
          },
          {
            en: 'A GraphQL API in Go serves each page exactly what it needs. Redis caches current prices and department statistics.',
            fr: 'Une API GraphQL en Go donne à chaque page exactement ce dont elle a besoin. Redis met en cache les prix actuels et les statistiques par département.',
          },
          {
            en: 'The model is trained weekly and predicts daily in batch, through GitHub Actions. There is no Python server to host.',
            fr: 'Le modèle est entraîné chaque semaine et prédit chaque jour en batch, via GitHub Actions. Pas de serveur Python à héberger.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/pumpcast/station.webp', 1280, 1100, {
              en: 'Station page with the recommendation, price history and forecast range',
              fr: 'Fiche station avec la recommandation, l’historique des prix et la fourchette de prévision',
            }),
          },
        ],
      },
      {
        title: { en: 'An honest model', fr: 'Un modèle honnête' },
        paragraphs: [
          {
            en: 'On most days a station does not change its price, so “the price stays the same” is very hard to beat. At three days, my model is off by 1.579 cents per litre on average, against 1.580 for that naive guess. The best gain is 1% at seven days.',
            fr: 'La plupart des jours, une station ne change pas son prix, donc « le prix ne bouge pas » est très dur à battre. À trois jours, mon modèle se trompe en moyenne de 1,579 centime par litre, contre 1,580 pour cette prévision naïve. Le meilleur gain est de 1 % à sept jours.',
          },
          {
            en: 'So the app only draws the horizons where the model beats the naive guess, and each type of advice is replayed on past data and turned off if it would not have saved money. A model page shows all these numbers.',
            fr: 'L’application n’affiche donc que les horizons où le modèle bat la prévision naïve, et chaque type de conseil est rejoué sur le passé puis désactivé s’il n’aurait pas fait gagner d’argent. Une page dédiée au modèle affiche tous ces chiffres.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/pumpcast/modele.webp', 1280, 1300, {
              en: 'Model page comparing the model to the naive forecast for each horizon',
              fr: 'Page du modèle comparant le modèle à la prévision naïve pour chaque horizon',
            }),
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- school
  {
    slug: 'iot',
    group: 'school',
    title: 'IoT mini-architecture',
    year: '2026',
    tagline: {
      en: 'From a micro:bit sensor to an Android app, through radio, a serial link, a UDP server and Grafana.',
      fr: 'D’un capteur micro:bit à une application Android, en passant par la radio, une liaison série, un serveur UDP et Grafana.',
    },
    context: { en: 'CPE Lyon, embedded systems and IoT module', fr: 'CPE Lyon, module développement embarqué et IoT' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Team member', fr: 'Membre de l’équipe' },
    team: { en: 'Team of 4', fr: 'Équipe de 4' },
    stack: ['C++', 'micro:bit', 'Python', 'UDP', 'UART', 'SQLite', 'Android', 'Grafana', 'Docker Compose'],
    links: [{ label: { en: 'Source code', fr: 'Code source' }, url: 'https://github.com/stonoly/CPE-iot_project-3IRC' }],
    sections: [
      {
        title: { en: 'The chain', fr: 'La chaîne' },
        paragraphs: [
          {
            en: 'A micro:bit with sensors measures temperature, humidity, pressure and light, and shows them on an OLED screen. It sends them by radio to a second micro:bit acting as a gateway, which passes them to a Python server over a serial link. The server stores the values and answers UDP requests from an Android app. The app can also send back the display order of the values on the screen.',
            fr: 'Un micro:bit équipé de capteurs mesure la température, l’humidité, la pression et la luminosité, et les affiche sur un écran OLED. Il les envoie par radio à un second micro:bit qui sert de passerelle et les transmet à un serveur Python par liaison série. Le serveur stocke les valeurs et répond aux requêtes UDP d’une application Android. L’application peut aussi renvoyer l’ordre d’affichage des valeurs sur l’écran.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'iot-chain',
            caption: { en: 'The data path, and how each link is protected.', fr: 'Le trajet des données, et la protection de chaque liaison.' },
          },
        ],
      },
      {
        title: { en: 'Protecting the frames', fr: 'Protéger les trames' },
        paragraphs: [
          {
            en: 'We first encrypted radio frames with XOR and a fixed key. It is cheap enough for a micro:bit, but identical frames produce similar bytes, so patterns show. We added a nonce to each frame. The gateway does not forward data in clear: it encrypts it again with XORSHIFT32 and another key, and wraps it in a frame with a start byte, the payload size and a CRC16.',
            fr: 'Nous avons d’abord chiffré les trames radio avec un XOR et une clé fixe. C’est assez léger pour un micro:bit, mais des trames identiques donnent des octets similaires et des motifs apparaissent. Nous avons ajouté un nonce à chaque trame. La passerelle ne renvoie pas les données en clair : elle les rechiffre avec XORSHIFT32 et une autre clé, dans une trame avec un octet de début, la taille du message et un CRC16.',
          },
          {
            en: 'This is light obfuscation suited to the hardware, not strong encryption, and we wrote that limit down in our report.',
            fr: 'C’est un brouillage léger adapté au matériel, pas un chiffrement fort, et nous avons écrit cette limite dans notre rapport.',
          },
        ],
      },
    ],
  },
  {
    slug: 'lpkf',
    group: 'school',
    title: 'LPKF submission platform',
    year: '2025',
    tagline: {
      en: 'A Flask web app where students submit their KiCad boards for the school’s PCB engraver, and teachers approve them.',
      fr: 'Une application Flask où les étudiants déposent leurs cartes KiCad pour la graveuse de circuits de l’IUT, et où les professeurs les valident.',
    },
    context: { en: 'IUT Lyon 1, BUT GEII', fr: 'IUT Lyon 1, BUT GEII' },
    period: { en: 'February – May 2025', fr: 'Février – mai 2025' },
    role: { en: 'Team member', fr: 'Membre de l’équipe' },
    team: { en: 'Team of 5', fr: 'Équipe de 5' },
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Jinja2'],
    links: [{ label: { en: 'Demo video', fr: 'Vidéo de démo' }, url: 'https://youtu.be/qo4dVAajl7M' }],
    sections: [
      {
        title: { en: 'What it does', fr: 'Ce que fait l’application' },
        bullets: [
          {
            en: 'Students upload their KiCad project as a ZIP file and follow its status.',
            fr: 'Les étudiants déposent leur projet KiCad en ZIP et suivent son statut.',
          },
          {
            en: 'Teachers run automatic checks on the KiCad files from the project list, then approve or reject each project.',
            fr: 'Les professeurs lancent des vérifications automatiques des fichiers KiCad depuis la liste des projets, puis valident ou refusent chaque projet.',
          },
          {
            en: 'Administrators manage users, roles and the checking rules.',
            fr: 'Les administrateurs gèrent les utilisateurs, les rôles et les règles de vérification.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ade-database',
    group: 'school',
    title: 'ADE activity manager',
    year: '2024',
    tagline: {
      en: 'A PHP interface to add, approve and supervise course activities on top of a timetable database.',
      fr: 'Une interface PHP pour ajouter, valider et superviser des activités de cours sur une base d’emploi du temps.',
    },
    context: { en: 'IUT Lyon 1, BUT GEII', fr: 'IUT Lyon 1, BUT GEII' },
    period: { en: 'November – December 2024', fr: 'Novembre – décembre 2024' },
    role: { en: 'Team member', fr: 'Membre de l’équipe' },
    team: { en: 'Team of 4', fr: 'Équipe de 4' },
    stack: ['PHP', 'MySQL', 'PDO', 'HTML', 'CSS'],
    links: [],
    sections: [
      {
        title: { en: 'What it does', fr: 'Ce que fait l’application' },
        bullets: [
          {
            en: 'A relational MySQL database models rooms, teachers and requests, with join tables for validations.',
            fr: 'Une base MySQL relationnelle modélise les salles, les enseignants et les demandes, avec des tables intermédiaires pour les validations.',
          },
          {
            en: 'Forms to add and edit activities, a validation page and a supervision page, all with PDO prepared statements.',
            fr: 'Des formulaires pour ajouter et modifier des activités, une page de validation et une page de supervision, le tout avec des requêtes préparées PDO.',
          },
        ],
      },
    ],
  },
];

export const findProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
