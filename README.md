<p align="center"><strong>Ndiaye-Shoes</strong></p>

![Page d'accueil](/images/accueil.PNG)

## Présentation

**Ndiaye-Shoes** est une application web e-commerce dédiée à la vente de chaussures. Elle permet aux utilisateurs de parcourir les produits, de sélectionner leur taille, d'ajouter des articles au panier et de passer commande.

## Fonctionnalités

-   Affichage des chaussures
-   Page de détails avec sélection de taille
-   Panier d'achat (ajout /suppression)
-   Gestion des commandes
-   Envoi d'e-mail de confirmation
-   Interface responsive

## Technologies utilisées

-   Laravel
-   Inertia.js
-   React.js
-   TailwindCSS
-   MySQL
-   Laravel Breeze
-   [Laravel-Lang](https://github.com/Laravel-Lang/lang.git)
-   [Laravel-react-i18n](https://github.com/EugeneMeles/laravel-react-i18n.git)
-   Mailpit

## Prérequis

-   PHP >= 8.2
-   Laravel >= 11
-   Node.js >= 20.16
-   Composer
-   Vite

## Installation

### Dépendances Laravel

```bash
composer install
```

### Copier le fichier .env

```bash
cp .env.example .env
```

### Générer la clé

```bash
php artisan key:generate
```

### Configurer la base de données dans le fichier .env

### Lancer les migrations

```bash
php artisan migrate
```

### Installer les dépendances front-end

```bash
npm install
```

```bash
npm run dev
```

### Démarrer le serveur local

```bash
php artisan serve
```

## Contact et Contributions

Tu as une idée d'amélioration ou de contribution? N'hésite pas à ouvrir une pull request !

:email: Me contacter: [baye20041@gmail.com](mailto:baye20041@gmail.com)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
