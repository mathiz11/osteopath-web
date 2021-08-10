# Application de gestion de clients pour Ostéopathe animalier

Cette application a pour but de permettre à un ostéopathe animalier de pouvoir gérer ses différentes fiches de leurs patients.

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

> Mathis ENJOLRAS - 2021
