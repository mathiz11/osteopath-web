# Application de gestion de clients pour Ostéopathe animalier :racehorse:

Cette application a pour but de permettre à un ostéopathe animalier de pouvoir gérer ses différentes fiches de leurs patients.

Les ostéopathes pourront ajouter des schémas à l'intérier de leur fiche patient.

## Architecture

![Architecture](https://github.com/mathiz11/osteopath-web/blob/main/images/architecture.jpg?raw=true)

Cette application est constituée d'une partie backend avec une API REST Express reliée à une base de données PostgreSQL dockerisée.

Pour l'authentification, le choix s'est porté sur le [JWT](https://jwt.io/) token avec access/refresh token et sel.

Pour la partie frontend, l'application utilise le librairie React.

Pour stocker les schémas, le choix s'est porté sur Google Cloud Storage qui va permettre de stocker ces fichiers.

## Quelques images de l'application

![Screenshot 1](https://github.com/mathiz11/osteopath-web/blob/main/images/screen1.jpg?raw=true)

![Screenshot 2](https://github.com/mathiz11/osteopath-web/blob/main/images/screen2.jpg?raw=true)

![Screenshot 3](https://github.com/mathiz11/osteopath-web/blob/main/images/screen3.jpg?raw=true)

## Technologies utilisées

### Client

- React
- TypeScript
- Formik (Gestion des formulaires)

### Server

- ExpressJS
- Typescript
- TypeORM
- PostgreSQL
- JWT

## Prérequis

NodeJS, PostgreSQL

## Installation

### Backend

Se rendre dans le dossier `/server` et lancer :

```bash
yarn install
```

### Frontend

Se rendre dans le dossier `/client` et lancer :

```bash
yarn install
```

## Docker

Se rendre dans le dossier `/docker` et lancer :

```bash
docker-compose up -d
```

Pour accéder au conteneur :

```bash
docker exec -it <dockerId> bash
```

Pour se connecter à Postgres :

```bash
psql -U postgres
```

## Lancement

### Backend

Se rendre dans le dossier `/server` et lancer :

```bash
yarn run dev
```

### Frontend

Se rendre dans le dossier `/client` et lancer :

```bash
yarn start
```

> Mathis ENJOLRAS - 2021
