### Lancement de l'application

Pour exécuter l'application, nous aurons besoin d'un backend, en l'occurence d'une API qui est disponible à l'adresse http://127.0.0.1:8000 en local. Pour le lancement de l'application:

#### Préréquis
- Git

- node

- Cloner le dépôt depuis votre dossier de travail avec la commande `git clone https://github.com/Joel-Henri-NGOUBE/MyBank_frontend`

#### En local sans Docker

Vous devez:

- Réaliser les étapes de mise en marche comme indiqué dans la documentation de l'API à l'adresse: https://github.com/Joel-Henri-NGOUBE/MyBank_backend

- Vous déplacer vers le dossier `frontend` du dossier cloné

- Installer les dépendances grâce à la commande `npm install`

- Vous devez exécuter la commande `npm run dev`

##### Tests des composants

Pour réaliser les tests unitaires et d'intégration des composants, vous pouvez effectuer la commande `npm run test`

#### Avec Docker

Vous devez:

- Réaliser les étapes de mise en marche comme indiqué dans la documentation de l'API à l'adresse: https://github.com/Joel-Henri-NGOUBE/MyBank_backend

- Vous déplacer vers le dossier `frontend` du dossier cloné

- Réaliser la commande `docker built -t frontend .`

- Créer un container et le mettre en marche avec la commande `docker run --name front -p 5173:5173 frontend`

#### Avec Docker-compose

Vous devez:

- Exécuter la commande `docker compose up -d`


L'application est dès lors disponible à l'adresse: http://127.0.0.1:5173