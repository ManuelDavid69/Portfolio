import { Picture, Project } from './types';

const img = (src: string, width: number, height: number, alt: Picture['alt'], caption?: Picture['caption']): Picture => ({
  src,
  width,
  height,
  alt,
  caption,
});

const digidelBefore = img('/images/digidel/digidel-sync-avant.webp', 1600, 665, {
  en: 'Before: the situation shows February 2026 and the planning is still on December 2021',
  fr: 'Avant : la situation affiche février 2026 et le planning est resté sur décembre 2021',
});

const pumpcastHome = img('/images/pumpcast/accueil.webp', 1280, 820, {
  en: 'PumpCast home page with the map of stations around Lyon',
  fr: 'Accueil de PumpCast avec la carte des stations autour de Lyon',
});

const qrshieldDemo = img('/images/qrshield/demo.webp', 1600, 1000, {
  en: 'QRShield public page with the map of reported QR codes',
  fr: 'Page publique de QRShield avec la carte des QR codes signalés',
});

const bddHome = img('/images/ade-database/accueil.webp', 1440, 500, {
  en: 'Home page of the activity manager with its four sections',
  fr: 'Accueil de l’application de gestion des activités avec ses quatre rubriques',
});

const lpkfMembers = img('/images/lpkf/membres.webp', 1440, 860, {
  en: 'Admin page listing users with their role',
  fr: 'Page d’administration avec la liste des utilisateurs et leur rôle',
}, {
  en: 'The admin page to manage roles. I ran the app again with made-up users.',
  fr: 'La page admin pour gérer les rôles. J’ai relancé l’application avec des utilisateurs inventés.',
});

const iotGrafana = img('/images/iot/grafana.webp', 1600, 362, {
  en: 'Grafana dashboard with the temperature and humidity measured by the sensor',
  fr: 'Tableau de bord Grafana avec la température et l’humidité mesurées par le capteur',
}, {
  en: 'Real measures recorded by our sensor during a test session and shown in Grafana.',
  fr: 'De vraies mesures enregistrées par notre capteur pendant une séance de test et affichées dans Grafana.',
});

const forensicXss = img('/images/forensic/xss.webp', 1600, 547, {
  en: 'HackBNB room page with a red banner showing that an injected script ran',
  fr: 'Page d’un logement HackBNB avec une bannière rouge qui montre qu’un script injecté s’est exécuté',
}, {
  en: 'D7: a script hidden in a room description runs in the visitor’s browser (red banner at the top).',
  fr: 'D7 : un script caché dans la description d’un logement s’exécute dans le navigateur du visiteur (bannière rouge en haut).',
});

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------- work
  {
    slug: 'gmao-parc',
    group: 'work',
    title: 'GMAO PARC',
    year: '2025 – 2026',
    tagline: {
      en: 'Two Java batch jobs that update the fleet maintenance software on their own.',
      fr: 'Deux traitements Java qui mettent à jour tout seuls le logiciel de maintenance du parc.',
    },
    context: { en: 'Work-study at AREA (APRR group)', fr: 'Alternance chez AREA (groupe APRR)' },
    period: { en: '2025 – 2026', fr: '2025 – 2026' },
    role: { en: 'Apprentice in the business software team', fr: 'Apprenti dans le pôle logiciels de gestion' },
    team: { en: 'With my company tutor', fr: 'Avec ma tutrice en entreprise' },
    stack: ['Java', 'JDBC', 'PostgreSQL', 'REST API', 'Maven', 'Log4j', 'Azure DevOps'],
    links: [],
    cover: 'gmao',
    sections: [
      {
        title: { en: 'Context', fr: 'Contexte' },
        paragraphs: [
          {
            en: 'The GMAO PARC is the software used to manage all the vehicles and machines of the group. It plans and tracks their maintenance: tractors, salt spreaders, mowers and so on. It runs on CARL Source and exchanges data with the HR tool and the finance tools.',
            fr: 'La GMAO PARC est le logiciel qui gère tous les véhicules et matériels du groupe. Elle sert à planifier et suivre leur entretien : tracteurs, saleuses, tondeuses… Elle tourne sur CARL Source et échange des données avec l’outil RH et les outils financiers.',
          },
          {
            en: 'Two updates were still done by hand. People who had left the company had to be deactivated one by one. This was a security and GDPR issue. And when a machine moved to another site its cost centre code often stayed the same. Maintenance was then billed to the wrong department.',
            fr: 'Deux mises à jour se faisaient encore à la main. Il fallait désactiver une par une les personnes parties de l’entreprise. C’était un problème de sécurité et de RGPD. Et quand un matériel changeait de site, son code analytique restait souvent le même. L’entretien était alors facturé au mauvais service.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'gmao-flow',
            caption: {
              en: 'Simplified view of the data flows around the GMAO.',
              fr: 'Vue simplifiée des flux de données autour de la GMAO.',
            },
          },
        ],
      },
      {
        title: { en: 'What I did', fr: 'Ce que j’ai réalisé' },
        bullets: [
          {
            en: 'An equipment job in Java and JDBC. It looks for machines whose cost centre is different from their site’s and fixes them in one transaction.',
            fr: 'Un traitement des matériels en Java avec JDBC. Il cherche les matériels dont le code analytique ne correspond pas à celui de leur site et les corrige dans une seule transaction.',
          },
          {
            en: 'A people job that uses the CARL Source REST API. It gets everyone whose contract has ended and switches them to inactive.',
            fr: 'Un traitement des acteurs qui utilise l’API REST de CARL Source. Il récupère les personnes dont le contrat est terminé et les passe en inactif.',
          },
          {
            en: 'A common base shared by both jobs: database access, logs, error file and an e-mail report at the end of each run. Passwords and settings are in external files and not in the code.',
            fr: 'Un socle commun aux deux traitements : accès à la base, logs, fichier d’erreurs et mail de compte rendu à la fin de chaque exécution. Les mots de passe et paramètres sont dans des fichiers externes et pas dans le code.',
          },
          {
            en: 'Delivery as fat JARs built with Maven. The code is on Azure DevOps and the jobs were tested on the pre-production servers.',
            fr: 'Une livraison en Fat JAR avec Maven. Le code est sur Azure DevOps et les traitements ont été testés sur les serveurs de préproduction.',
          },
        ],
      },
      {
        title: { en: 'The bug that taught me the most', fr: 'Le bug qui m’a le plus appris' },
        paragraphs: [
          {
            en: 'In testing some people were never deactivated. The job read the API results page by page. But every person I deactivated left the list. Everything shifted and the next page skipped people.',
            fr: 'En test, certaines personnes n’étaient jamais désactivées. Le traitement lisait les résultats de l’API page par page. Mais chaque personne désactivée sortait de la liste. Tout se décalait et la page suivante sautait des personnes.',
          },
          {
            en: 'The fix was to always read the first page again until the API returns nothing. The list gets smaller as the job works.',
            fr: 'La solution a été de toujours relire la première page jusqu’à ce que l’API ne renvoie plus rien. La liste se vide au fur et à mesure.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'gmao-loop',
            caption: { en: 'How the people job works after the fix.', fr: 'Le fonctionnement du traitement des acteurs après la correction.' },
          },
        ],
      },
      {
        title: { en: 'Result', fr: 'Résultat' },
        paragraphs: [
          {
            en: 'The two updates no longer need anyone. I also studied the whole HR integration flow to prepare the arrival of new subsidiaries after the group reorganisation in January 2026. The code is ready for CARL Source version 7.',
            fr: 'Les deux mises à jour n’ont plus besoin de personne. J’ai aussi étudié tout le flux d’intégration RH pour préparer l’arrivée des nouvelles filiales après la réorganisation de janvier 2026. Le code est prêt pour la version 7 de CARL Source.',
          },
        ],
      },
    ],
  },
  {
    slug: 'casa',
    group: 'work',
    title: 'CASA',
    year: '2025 – 2026',
    tagline: {
      en: 'Migration of a housing management app to PHP and GDPR scripts to clean personal data.',
      fr: 'Migration d’une application de gestion des logements vers PHP et scripts RGPD pour purger les données personnelles.',
    },
    context: { en: 'Work-study at AREA (APRR group)', fr: 'Alternance chez AREA (groupe APRR)' },
    period: { en: '2025 – 2026', fr: '2025 – 2026' },
    role: { en: 'Apprentice in the business software team', fr: 'Apprenti dans le pôle logiciels de gestion' },
    team: { en: 'With a developer of the team', fr: 'Avec un développeur de l’équipe' },
    stack: ['PHP', 'PostgreSQL', 'SQL', 'JavaScript', 'AJAX'],
    links: [],
    cover: 'casa',
    sections: [
      {
        title: { en: 'Context', fr: 'Contexte' },
        paragraphs: [
          {
            en: 'CASA is the app the group uses to manage its housing for employees. Some parts were in old PHP and others in Java with Angular. One feature could use three technologies so maintenance was hard. The app also stores sensitive data like bank details and family situations.',
            fr: 'CASA est l’application qui gère le parc de logements du groupe. Une partie était en PHP ancien et une autre en Java avec Angular. Une même fonctionnalité pouvait passer par trois technologies et la maintenance était compliquée. L’application contient aussi des données sensibles comme des coordonnées bancaires ou des situations familiales.',
          },
        ],
      },
      {
        title: { en: 'What I did', fr: 'Ce que j’ai réalisé' },
        bullets: [
          {
            en: 'I moved the consultation pages and the Excel exports from Java to PHP 8.1. The Java layer is no longer needed for these features.',
            fr: 'J’ai migré les pages de consultation et les exports Excel de Java vers PHP 8.1. La couche Java n’est plus nécessaire pour ces fonctionnalités.',
          },
          {
            en: 'While reading the old Java code I found a wrong formula for the occupancy rate. Sold homes were counted. I fixed the rule with the people who use these figures.',
            fr: 'En relisant l’ancien code Java j’ai trouvé une formule fausse pour le taux d’occupation. Les logements vendus étaient comptés. J’ai corrigé la règle avec les personnes qui utilisent ces chiffres.',
          },
          {
            en: 'I added cascading filters: when you pick a region the list of districts updates without reloading the page.',
            fr: 'J’ai ajouté des filtres en cascade : quand on choisit une région la liste des districts se met à jour sans recharger la page.',
          },
          {
            en: 'I added an alert icon on tenant files when an incident is recorded. I also fixed broken accents and missing photos after the move to Linux.',
            fr: 'J’ai ajouté une icône d’alerte sur les fiches locataires quand un incident est enregistré. J’ai aussi corrigé les accents cassés et les photos introuvables après le passage sous Linux.',
          },
        ],
      },
      {
        title: { en: 'GDPR scripts', fr: 'Les scripts RGPD' },
        paragraphs: [
          {
            en: 'I wrote two SQL scripts. The first one anonymises applications that never got a home. The second one deletes the personal data of former tenants five years after they leave. The history of moves is kept because it is still used.',
            fr: 'J’ai écrit deux scripts SQL. Le premier anonymise les candidatures qui n’ont pas obtenu de logement. Le second supprime les données personnelles des anciens locataires cinq ans après leur départ. L’historique des entrées et sorties est gardé car il sert encore.',
          },
          {
            en: 'Everything runs in one transaction so nothing changes if there is an error. With EXPLAIN ANALYZE I saw that PostgreSQL was reading the whole table. A partial index on the leaving dates fixed it.',
            fr: 'Tout se fait dans une seule transaction donc rien ne change en cas d’erreur. Avec EXPLAIN ANALYZE j’ai vu que PostgreSQL lisait toute la table. Un index partiel sur les dates de sortie a réglé le problème.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'explain-plan',
            caption: {
              en: 'Estimated time of the purge query before and after the index.',
              fr: 'Temps estimé de la requête de purge avant et après l’index.',
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
      en: 'User stories in sprints on an app that tracks the hours of staff representatives.',
      fr: 'Des user stories en sprint sur une application qui suit les heures des représentants du personnel.',
    },
    context: { en: 'Summer 2026 at AREA (APRR group)', fr: 'Été 2026 chez AREA (groupe APRR)' },
    period: { en: 'July – August 2026', fr: 'Juillet – août 2026' },
    role: { en: 'Apprentice in a Scrum team', fr: 'Apprenti dans une équipe Scrum' },
    team: { en: 'Scrum team', fr: 'Équipe Scrum' },
    stack: ['Java', 'Spring Boot', 'Vue.js', 'Vuetify', 'JPA', 'Flyway', 'Azure DevOps'],
    links: [],
    thumbnail: digidelBefore,
    sections: [
      {
        title: { en: 'Context', fr: 'Contexte' },
        paragraphs: [
          {
            en: 'Staff representatives have hours for their mandates. Digidel keeps track of these hours and of the delegation slips they fill in. During the summer I joined the team and took user stories from the backlog. Each one went through a pull request on Azure DevOps.',
            fr: 'Les représentants du personnel ont des heures pour leurs mandats. Digidel suit ces heures et les bons de délégation qu’ils remplissent. Pendant l’été j’ai rejoint l’équipe et pris des user stories du backlog. Chacune passait par une pull request sur Azure DevOps.',
          },
        ],
      },
      {
        title: { en: 'Linking the situation and the planning', fr: 'Relier la situation et le planning' },
        paragraphs: [
          {
            en: 'On the home page the situation and the planning each had their own month list. Nothing linked them. You could see February 2026 on one side and December 2021 on the other. Now in monthly mode changing one month also changes the other.',
            fr: 'Sur l’accueil, la situation et le planning avaient chacun leur liste de mois. Rien ne les reliait. On pouvait voir février 2026 d’un côté et décembre 2021 de l’autre. Maintenant en mode mensuel changer le mois de l’un change aussi l’autre.',
          },
        ],
        figures: [
          {
            kind: 'pair',
            pictures: [
              digidelBefore,
              img('/images/digidel/digidel-sync-apres.webp', 1600, 666, {
                en: 'After: the situation and the planning both show September 2026',
                fr: 'Après : la situation et le planning affichent tous les deux septembre 2026',
              }),
            ],
            caption: { en: 'Before and after the change.', fr: 'Avant et après la modification.' },
          },
        ],
      },
      {
        title: { en: 'Sorting the periods', fr: 'Trier les périodes' },
        paragraphs: [
          {
            en: 'Users wanted the latest months at the top of the lists. The back end already sorted them that way. I followed the data in the front end and found a second sort run just after login. It put the oldest months first. I reversed it and every list in the app was fixed.',
            fr: 'Les utilisateurs voulaient les mois les plus récents en haut des listes. Le back-end les triait déjà dans cet ordre. J’ai suivi les données dans le front et j’ai trouvé un deuxième tri lancé juste après la connexion. Il remettait les mois les plus anciens en premier. Je l’ai inversé et toutes les listes de l’application étaient corrigées.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-periodes.webp', 1600, 668, {
              en: 'List of periods with the latest month first',
              fr: 'Liste des périodes avec le mois le plus récent en premier',
            }),
          },
        ],
      },
      {
        title: { en: 'Other user stories', fr: 'Les autres user stories' },
        bullets: [
          {
            en: 'When you add a mandate the end date is now filled in from the active mandate. I added the API endpoint for it.',
            fr: 'Quand on ajoute un mandat la date de fin est maintenant remplie à partir du mandat actif. J’ai ajouté l’endpoint d’API pour ça.',
          },
          {
            en: 'The e-mail and the UPN (the Windows login) are now two separate fields. The UPN must be unique but several people can share the same e-mail.',
            fr: 'Le mail et l’UPN (l’identifiant Windows) sont maintenant deux champs séparés. L’UPN doit être unique mais plusieurs personnes peuvent avoir le même mail.',
          },
          {
            en: 'I created the table that will receive employees from the HR tool, with its JPA entity.',
            fr: 'J’ai créé la table qui recevra les salariés de l’outil RH, avec son entité JPA.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-ajout-mandat.webp', 897, 456, {
              en: 'Add a mandate window with the end date already filled in',
              fr: 'Fenêtre d’ajout d’un mandat avec la date de fin déjà remplie',
            }),
          },
          {
            kind: 'picture',
            picture: img('/images/digidel/digidel-utilisateur.webp', 1600, 664, {
              en: 'User form with separate e-mail and UPN fields',
              fr: 'Fiche utilisateur avec les champs mail et UPN séparés',
            }, {
              en: 'User form with separate e-mail and UPN fields. The data shown is made up.',
              fr: 'Fiche utilisateur avec les champs mail et UPN séparés. Les données affichées sont fictives.',
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
      en: 'A mobile app that checks where a QR code leads before you open it.',
      fr: 'Une application mobile qui vérifie où mène un QR code avant de l’ouvrir.',
    },
    context: { en: 'Personal project', fr: 'Projet personnel' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Whole project', fr: 'Projet complet' },
    team: { en: 'Solo', fr: 'Seul' },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'React Native', 'TypeScript', 'Docker'],
    links: [
      { label: { en: 'GitHub', fr: 'GitHub' }, url: 'https://github.com/ManuelDavid69/QRShield' },
      { label: { en: 'Demo page', fr: 'Page de démo' }, url: 'https://manueldavid69.github.io/QRShield/' },
      { label: { en: 'Android APK', fr: 'APK Android' }, url: 'https://github.com/ManuelDavid69/QRShield/releases/latest' },
    ],
    thumbnail: qrshieldDemo,
    sections: [
      {
        title: { en: 'Why this project', fr: 'Pourquoi ce projet' },
        paragraphs: [
          {
            en: 'QR codes are everywhere: menus, parking meters, posters. Nobody checks where they lead. A fake QR code stuck on a parking meter is enough to send people to a fake payment page. This scam is called quishing. I wanted a project in cybersecurity that solves a real everyday problem.',
            fr: 'Les QR codes sont partout : menus, horodateurs, affiches. Personne ne vérifie où ils mènent. Un faux QR code collé sur un horodateur suffit pour envoyer les gens vers une fausse page de paiement. Cette arnaque s’appelle le quishing. Je voulais un projet de cybersécurité qui règle un vrai problème du quotidien.',
          },
        ],
      },
      {
        title: { en: 'How it works', fr: 'Comment ça marche' },
        bullets: [
          {
            en: 'The API follows the link to its final address and checks the domain with Google Safe Browsing and VirusTotal.',
            fr: 'L’API suit le lien jusqu’à son adresse finale et vérifie le domaine avec Google Safe Browsing et VirusTotal.',
          },
          {
            en: 'It spots domains that copy real ones like paypa1.com and links that download an .apk or .exe file.',
            fr: 'Elle repère les domaines qui copient de vrais sites comme paypa1.com et les liens qui téléchargent un fichier .apk ou .exe.',
          },
          {
            en: 'The app gives a verdict with the reasons. The user decides to open the link or not.',
            fr: 'L’application donne un verdict avec ses raisons. L’utilisateur décide d’ouvrir le lien ou non.',
          },
          {
            en: 'Dangerous codes are reported without any personal data and shown on a map. PostGIS handles the map queries.',
            fr: 'Les codes dangereux sont signalés sans donnée personnelle et affichés sur une carte. PostGIS gère les requêtes de la carte.',
          },
        ],
        figures: [{ kind: 'picture', picture: qrshieldDemo }],
      },
      {
        title: { en: 'A choice I made', fr: 'Un choix que j’ai fait' },
        paragraphs: [
          {
            en: 'I first thought about Kotlin Multiplatform because I already know native Android. But I work on Windows and testing the iOS version needs a Mac. With Expo I can test on Android and iPhone and use the same language as the web page.',
            fr: 'J’ai d’abord pensé à Kotlin Multiplatform car je connais déjà Android natif. Mais je travaille sous Windows et tester la version iOS demande un Mac. Avec Expo je peux tester sur Android et iPhone et garder le même langage que la page web.',
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
      en: 'A web app that forecasts fuel prices for each station over the next 7 days.',
      fr: 'Une application web qui prévoit le prix des carburants de chaque station sur 7 jours.',
    },
    context: { en: 'Personal project', fr: 'Projet personnel' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Whole project', fr: 'Projet complet' },
    team: { en: 'Solo', fr: 'Seul' },
    stack: ['Go', 'GraphQL', 'Next.js', 'MongoDB', 'Redis', 'scikit-learn', 'GitHub Actions'],
    links: [
      { label: { en: 'Live app', fr: 'Site en ligne' }, url: 'https://pump-cast.vercel.app' },
      { label: { en: 'GitHub', fr: 'GitHub' }, url: 'https://github.com/ManuelDavid69/PumpCast' },
    ],
    thumbnail: pumpcastHome,
    sections: [
      {
        title: { en: 'The idea', fr: 'L’idée' },
        paragraphs: [
          {
            en: 'Fuel apps show today’s price. But what people want to know is whether to fill up now or wait. PumpCast uses the station’s price history, the oil price, holidays and school breaks to estimate the next 7 days. All the data comes from official open data.',
            fr: 'Les applis de carburant montrent le prix du jour. Mais ce qu’on veut savoir c’est s’il faut faire le plein maintenant ou attendre. PumpCast utilise l’historique de la station, le prix du pétrole, les jours fériés et les vacances pour estimer les 7 prochains jours. Toutes les données viennent de l’open data officiel.',
          },
          {
            en: 'I built it to learn technologies I had never used: Go, GraphQL, MongoDB, Redis, Next.js and machine learning.',
            fr: 'Je l’ai fait pour apprendre des technologies que je n’avais jamais utilisées : Go, GraphQL, MongoDB, Redis, Next.js et le machine learning.',
          },
        ],
        figures: [{ kind: 'picture', picture: pumpcastHome }],
      },
      {
        title: { en: 'How it is built', fr: 'Comment c’est construit' },
        bullets: [
          {
            en: 'A Go program downloads the official price feed and stores the prices in MongoDB.',
            fr: 'Un programme Go télécharge le flux officiel des prix et les enregistre dans MongoDB.',
          },
          {
            en: 'A GraphQL API in Go gives each page only the data it needs. Redis keeps the current prices in cache.',
            fr: 'Une API GraphQL en Go donne à chaque page seulement les données dont elle a besoin. Redis garde les prix actuels en cache.',
          },
          {
            en: 'The model is trained every week with scikit-learn and the forecasts are made every day by GitHub Actions.',
            fr: 'Le modèle est entraîné chaque semaine avec scikit-learn et les prévisions sont faites chaque jour par GitHub Actions.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/pumpcast/station.webp', 1280, 1100, {
              en: 'Station page with the advice and the price history',
              fr: 'Fiche station avec le conseil et l’historique des prix',
            }),
          },
        ],
      },
      {
        title: { en: 'Being honest about the model', fr: 'Être honnête sur le modèle' },
        paragraphs: [
          {
            en: 'Most days a station does not change its price. So guessing that the price stays the same is already very accurate. At 3 days my model is wrong by 1.579 cents on average and this simple guess by 1.580 cents. That is almost the same.',
            fr: 'La plupart du temps une station ne change pas son prix. Donc prévoir que le prix ne bouge pas est déjà très juste. À 3 jours mon modèle se trompe en moyenne de 1,579 centime et cette prévision simple de 1,580 centime. C’est presque pareil.',
          },
          {
            en: 'I chose to show it. The app only draws the days where the model does better. An advice is shown only if it would have saved money in the past. A page of the site explains all the figures.',
            fr: 'J’ai choisi de le montrer. L’application n’affiche que les jours où le modèle fait mieux. Un conseil n’est affiché que s’il aurait fait gagner de l’argent dans le passé. Une page du site explique tous les chiffres.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/pumpcast/modele.webp', 1280, 1300, {
              en: 'Model page comparing the model with the simple forecast',
              fr: 'Page du modèle qui compare le modèle à la prévision simple',
            }),
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- school
  {
    slug: 'forensic',
    group: 'school',
    title: 'Forensic investigation',
    year: '2026',
    tagline: {
      en: 'A web forensic investigation: prove a hack, rebuild the attack and fix the vulnerabilities.',
      fr: 'Une investigation forensic web : prouver un piratage, reconstituer l’attaque et corriger les failles.',
    },
    context: { en: 'CPE Lyon, web and code security', fr: 'CPE Lyon, sécurité du code et du web' },
    period: { en: 'November 2026', fr: 'Novembre 2026' },
    role: { en: 'Vulnerabilities D3, D4, D7 and D8', fr: 'Failles D3, D4, D7 et D8' },
    team: { en: 'Team of 4', fr: 'Équipe de 4' },
    stack: ['Grafana', 'Loki', 'Burp Suite', 'Flask', 'React', 'Docker'],
    links: [{ label: { en: 'Fixed code', fr: 'Code corrigé' }, url: 'https://github.com/Tsuwii/project-hackbnb-sources' }],
    thumbnail: forensicXss,
    sections: [
      {
        title: { en: 'The scenario', fr: 'Le scénario' },
        paragraphs: [
          {
            en: 'HackBNB is a fictional booking platform. It received an anonymous e-mail claiming that its site had been hacked, then its customer data showed up on a darkweb forum. As a CERT team we had to prove the attack, rebuild what happened, find the stolen data and fix the code before the site went back online.',
            fr: 'HackBNB est une plateforme de réservation fictive. Elle a reçu un mail anonyme qui disait que son site avait été piraté, puis des données de ses clients sont apparues sur un forum du darkweb. En tant qu’équipe CERT nous devions prouver l’attaque, reconstituer ce qui s’était passé, trouver les données volées et corriger le code avant la remise en ligne du site.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/forensic/darkweb.webp', 1600, 730, {
              en: 'Darkweb forum post selling the HackBNB customer data',
              fr: 'Annonce sur un forum du darkweb qui vend les données des clients de HackBNB',
            }, {
              en: 'The starting point: the attacker sells the data on a darkweb forum. The example line matches the data we extracted ourselves, which proved the attack.',
              fr: 'Le point de départ : l’attaquant vend les données sur un forum du darkweb. La ligne d’exemple correspond aux données que nous avons nous-mêmes extraites, ce qui a prouvé l’attaque.',
            }),
          },
        ],
      },
      {
        title: { en: 'The investigation', fr: 'L’enquête' },
        paragraphs: [
          {
            en: 'We loaded the Apache logs of the day of the attack into Loki and read them in Grafana. One IP address stood out with almost 7,000 requests. We followed it step by step: a directory scan, an SQL injection, a booking confirmed without paying, then hundreds of requests to steal customer data from Stripe.',
            fr: 'Nous avons chargé les logs Apache du jour de l’attaque dans Loki et nous les avons analysés dans Grafana. Une adresse IP ressortait avec presque 7 000 requêtes. Nous l’avons suivie étape par étape : un scan des répertoires, une injection SQL, une réservation confirmée sans payer, puis des centaines de requêtes pour voler les données des clients chez Stripe.',
          },
          {
            en: 'At the end we had the full timeline, the profile of the attacker and the list of stolen data. We presented it all to the client in a 25-minute defense.',
            fr: 'À la fin nous avions la chronologie complète, le profil de l’attaquant et la liste des données volées. Nous avons tout présenté au client lors d’une soutenance de 25 minutes.',
          },
        ],
      },
      {
        title: { en: 'My part: four vulnerabilities', fr: 'Ma partie : quatre failles' },
        paragraphs: [
          {
            en: 'A penetration test report listed 8 vulnerabilities. I took 4 of them. For each one I found it in the code, exploited it on the pre-production site, fixed it and checked that the attack no longer worked.',
            fr: 'Un rapport de test d’intrusion listait 8 failles. J’en ai pris 4. Pour chacune je l’ai trouvée dans le code, je l’ai exploitée sur la préproduction, je l’ai corrigée et j’ai vérifié que l’attaque ne marchait plus.',
          },
        ],
        bullets: [
          {
            en: 'D4, predictable secret: the code that confirms a payment was just a hash of the booking time. I computed it and confirmed a booking without paying. Fix: a random secret and a check of the payment with Stripe.',
            fr: 'D4, secret prévisible : le code qui confirme un paiement était seulement un hash de l’heure de la réservation. Je l’ai calculé et j’ai confirmé une réservation sans payer. Correction : un secret aléatoire et une vérification du paiement auprès de Stripe.',
          },
          {
            en: 'D3, SSRF: a booking parameter was pasted into a Stripe address. With ../ I could reach other Stripe pages with the server key and read customers and their cards. Fix: the ID now comes from the database and goes through the official Stripe SDK.',
            fr: 'D3, SSRF : un paramètre de la réservation était collé dans une adresse Stripe. Avec des ../ je pouvais atteindre d’autres pages de Stripe avec la clé du serveur et lire les clients et leurs cartes. Correction : l’identifiant vient maintenant de la base et passe par le SDK officiel de Stripe.',
          },
          {
            en: 'D7, stored XSS: room descriptions were shown as raw HTML, so a script hidden inside ran for every visitor. Fix: DOMPurify on the front end and a Content-Security-Policy.',
            fr: 'D7, XSS stockée : les descriptions des logements étaient affichées en HTML brut, donc un script caché dedans s’exécutait chez chaque visiteur. Correction : DOMPurify côté front et une Content-Security-Policy.',
          },
          {
            en: 'D8, information leak: the headers gave the exact versions of Apache and Python, and Flask ran in debug mode with SQL errors on screen. Fix: hidden versions, debug off and generic error pages.',
            fr: 'D8, fuite d’informations : les en-têtes donnaient les versions exactes d’Apache et de Python, et Flask tournait en mode debug avec les erreurs SQL à l’écran. Correction : versions masquées, debug désactivé et pages d’erreur génériques.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/forensic/paiement.webp', 1350, 596, {
              en: 'Booking marked as paid although no payment was made',
              fr: 'Réservation marquée comme payée alors qu’aucun paiement n’a été fait',
            }, {
              en: 'D4: the booking shows “Payment done” although nothing was paid.',
              fr: 'D4 : la réservation affiche « Paiement effectué » alors que rien n’a été payé.',
            }),
          },
          { kind: 'picture', picture: forensicXss },
        ],
      },
      {
        title: { en: 'Result', fr: 'Résultat' },
        paragraphs: [
          {
            en: 'Each fix went into its own pull request on the team repository. This project taught me to read an application like an attacker, and to fix it without breaking how it works for normal users.',
            fr: 'Chaque correction a fait l’objet de sa propre pull request sur le dépôt de l’équipe. Ce projet m’a appris à lire une application comme un attaquant, et à la corriger sans casser son fonctionnement pour les utilisateurs normaux.',
          },
        ],
      },
    ],
  },
  {
    slug: 'iot',
    group: 'school',
    title: 'IoT mini-architecture',
    year: '2026',
    tagline: {
      en: 'A full IoT chain from a micro:bit sensor to an Android app.',
      fr: 'Une chaîne IoT complète d’un capteur micro:bit jusqu’à une application Android.',
    },
    context: { en: 'CPE Lyon, embedded systems and IoT', fr: 'CPE Lyon, développement embarqué et IoT' },
    period: { en: '2026', fr: '2026' },
    role: { en: 'Team project', fr: 'Projet d’équipe' },
    team: { en: 'Team of 4', fr: 'Équipe de 4' },
    stack: ['C++', 'micro:bit', 'Python', 'SQLite', 'Android', 'Grafana', 'Docker'],
    links: [{ label: { en: 'GitHub', fr: 'GitHub' }, url: 'https://github.com/stonoly/CPE-iot_project-3IRC' }],
    thumbnail: iotGrafana,
    sections: [
      {
        title: { en: 'The project', fr: 'Le projet' },
        paragraphs: [
          {
            en: 'A micro:bit measures temperature, humidity, pressure and light. It sends them by radio to a second micro:bit used as a gateway. The gateway sends them to a Python server over a serial link. The server stores them in SQLite and answers an Android app over UDP. From the app you can also change the order of the values shown on the sensor screen.',
            fr: 'Un micro:bit mesure la température, l’humidité, la pression et la luminosité. Il les envoie par radio à un second micro:bit qui sert de passerelle. La passerelle les transmet à un serveur Python par liaison série. Le serveur les stocke dans SQLite et répond à une application Android en UDP. Depuis l’application on peut aussi changer l’ordre d’affichage des valeurs sur l’écran du capteur.',
          },
        ],
        figures: [
          {
            kind: 'diagram',
            id: 'iot-chain',
            caption: { en: 'The path of the data.', fr: 'Le trajet des données.' },
          },
          { kind: 'picture', picture: iotGrafana },
          {
            kind: 'picture',
            picture: img('/images/iot/android.webp', 540, 930, {
              en: 'Android app showing the latest sensor values and the display order TLHP',
              fr: 'Application Android avec les dernières valeurs du capteur et l’ordre d’affichage TLHP',
            }, {
              en: 'The Android app asks for the latest values and sends the display order TLHP. For this screenshot a small script played the server and sent back the last measure recorded in May.',
              fr: 'L’application Android demande les dernières valeurs et envoie l’ordre d’affichage TLHP. Pour cette capture, un petit script jouait le rôle du serveur et renvoyait la dernière mesure enregistrée en mai.',
            }),
          },
        ],
      },
      {
        title: { en: 'Securing the radio link', fr: 'Sécuriser la liaison radio' },
        paragraphs: [
          {
            en: 'At first the values were sent in clear text. Anyone nearby could read them. We then used XOR with a fixed key but identical frames gave identical bytes. So we added a nonce that changes for every frame. A CRC16 detects broken frames and the gateway ignores a frame if its nonce was already used.',
            fr: 'Au début les valeurs étaient envoyées en clair. N’importe qui à portée pouvait les lire. Nous avons ensuite utilisé un XOR avec une clé fixe mais deux trames identiques donnaient les mêmes octets. Nous avons donc ajouté un nonce qui change à chaque trame. Un CRC16 détecte les trames abîmées et la passerelle ignore une trame si son nonce a déjà servi.',
          },
          {
            en: 'AES would have been better. The micro:bit has an AES chip but our SDK did not give access to it. We wrote this limit in our report.',
            fr: 'AES aurait été mieux. Le micro:bit a une puce AES mais notre SDK ne permettait pas de l’utiliser. Nous avons écrit cette limite dans notre rapport.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ade-database',
    group: 'school',
    title: 'ADE database interface',
    year: '2024',
    tagline: {
      en: 'A PHP interface to manage course activities in a timetable database.',
      fr: 'Une interface PHP pour gérer les activités de cours dans une base d’emploi du temps.',
    },
    context: { en: 'IUT Lyon 1, BUT GEII', fr: 'IUT Lyon 1, BUT GEII' },
    period: { en: 'November – December 2024', fr: 'Novembre – décembre 2024' },
    role: { en: 'Team project', fr: 'Projet d’équipe' },
    team: { en: 'Team of 4', fr: 'Équipe de 4' },
    stack: ['PHP', 'MySQL', 'PDO', 'HTML', 'CSS'],
    links: [],
    thumbnail: bddHome,
    sections: [
      {
        title: { en: 'The project', fr: 'Le projet' },
        paragraphs: [
          {
            en: 'The timetable of the IUT comes from a tool called ADE. We had to build a web interface to manage course activities on top of a copy of this database.',
            fr: 'L’emploi du temps de l’IUT vient d’un outil qui s’appelle ADE. Nous devions faire une interface web pour gérer les activités de cours sur une copie de cette base.',
          },
        ],
        bullets: [
          {
            en: 'A MySQL database with rooms, teachers and requests. Validations go through join tables.',
            fr: 'Une base MySQL avec les salles, les enseignants et les demandes. Les validations passent par des tables intermédiaires.',
          },
          {
            en: 'Pages to add, edit and validate activities and a supervision page. All queries use PDO prepared statements.',
            fr: 'Des pages pour ajouter, modifier et valider des activités et une page de supervision. Toutes les requêtes utilisent des requêtes préparées PDO.',
          },
          {
            en: 'MySQL triggers write every insert, update and delete into a journal table. You can see the data before and after each change.',
            fr: 'Des triggers MySQL enregistrent chaque ajout, modification et suppression dans une table de journal. On voit les données avant et après chaque changement.',
          },
        ],
        figures: [
          { kind: 'picture', picture: bddHome },
          {
            kind: 'picture',
            picture: img('/images/ade-database/supervision.webp', 1440, 540, {
              en: 'Supervision page listing the activity requests waiting for approval',
              fr: 'Page de supervision avec les demandes d’activités en attente de validation',
            }, {
              en: 'The supervision page. I ran the app again with demo data and made-up teacher names.',
              fr: 'La page de supervision. J’ai relancé l’application avec des données de démo et des noms d’enseignants inventés.',
            }),
          },
        ],
      },
    ],
  },
  {
    slug: 'lpkf',
    group: 'school',
    title: 'LPKF file submission',
    year: '2025',
    tagline: {
      en: 'A Flask web app where students submit their circuit boards for the school’s engraving machine.',
      fr: 'Une application Flask où les étudiants déposent leurs cartes électroniques pour la graveuse de l’IUT.',
    },
    context: { en: 'IUT Lyon 1, BUT GEII', fr: 'IUT Lyon 1, BUT GEII' },
    period: { en: 'February – May 2025', fr: 'Février – mai 2025' },
    role: { en: 'Team project', fr: 'Projet d’équipe' },
    team: { en: 'Team of 5', fr: 'Équipe de 5' },
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Jinja2'],
    links: [{ label: { en: 'Demo video', fr: 'Vidéo de démo' }, url: 'https://youtu.be/qo4dVAajl7M' }],
    thumbnail: lpkfMembers,
    sections: [
      {
        title: { en: 'The project', fr: 'Le projet' },
        paragraphs: [
          {
            en: 'At the IUT students design circuit boards with KiCad. They are then engraved on an LPKF machine. We built a web platform to submit these files and follow their validation.',
            fr: 'À l’IUT les étudiants conçoivent des cartes électroniques avec KiCad. Elles sont ensuite gravées sur une machine LPKF. Nous avons fait une plateforme web pour déposer ces fichiers et suivre leur validation.',
          },
        ],
        bullets: [
          {
            en: 'Students upload their project as a ZIP file and follow its status.',
            fr: 'Les étudiants déposent leur projet en ZIP et suivent son statut.',
          },
          {
            en: 'Teachers run automatic checks on the KiCad files and then accept or reject the project.',
            fr: 'Les professeurs lancent des vérifications automatiques des fichiers KiCad puis acceptent ou refusent le projet.',
          },
          {
            en: 'An admin manages users and roles. Login is handled with Flask-Login.',
            fr: 'Un administrateur gère les utilisateurs et les rôles. La connexion est gérée avec Flask-Login.',
          },
        ],
        figures: [
          {
            kind: 'picture',
            picture: img('/images/lpkf/depot.webp', 1440, 520, {
              en: 'Page to submit a project as a ZIP file',
              fr: 'Page de dépôt d’un projet en fichier ZIP',
            }),
          },
          {
            kind: 'picture',
            picture: lpkfMembers,
          },
        ],
      },
    ],
  },
];

export const findProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
