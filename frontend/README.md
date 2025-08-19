### Lancement de l'application

Pour exécuter l'application, nous aurons besoin d'un backend, en l'occurence d'une API qui est disponible à l'adresse http://127.0.0.1:8000 en local. Pour le lancement de l'application:

#### Préréquis
- Git

- Xampp/Mamp/Lamp ou Docker

- node

- Cloner le dépôt depuis votre dossier de travail avec la commande `git clone https://github.com/Joel-Henri-NGOUBE/MyBank_frontend`

#### Avec Xampp, Mamp ou Lamp
Vous devez:

- Activer les ports d'Apache et de Mysql qui seront utiles pour le lancement du backend

- Réaliser les étapes de mise en marche comme indiquer dans la documentation de l'API à l'adresse: https://github.com/Joel-Henri-NGOUBE/MyBank_backend

- Vous déplacer vers le dossier `frontend`

- Installer les dépendances grâce à la commande `npm install`

- Vous devez exécuter la commande `npm run dev`

#### Avec Docker

Vous devez:

- Mettre en marche un container qui contient le backend avec l'image qui a été créée grâce au Dockerfile de l'API

- Vous déplacer vers le dossier `frontend`

- Réaliser la commande `docker built -t frontend .`

- Créer un container et le mettre en marche avec la commande `docker run --name front -p 5173:5173 frontend`


L'application est dès lors disponible à l'adresse: http://127.0.0.1:5173