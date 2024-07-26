# Pour lancer un environnement spécifique :

`ng serve --configuration=staging`
`ng s -c production`
`ng s -c development (par défaut si vous ne rentrez rien)`

Dans [/angular.json](../../angular.json), vous pouvez voir les configurations possibles ça commence l.47 :
```
"configurations": {
    "production": {...}
    "staging": {...}
    "development": {...}
}
```

Il y a des options en plus pour le développement et la production (c'était déjà la j'ai laissé tel quel)

---
## Les "fileReplacements"
Les fileReplacements permettent de remplacer le "faux" fichier environnement.ts (par le fichier que l'on veut pour l'environnement choisis). J'ai laissé les 3 booleans prod, staging, et dev uniquement parce que dans [header.ts](../app/components/header/header.component.ts) on vérifie lequel est à true.


---
## La partie "serve" à partir de la ligne 89
Si jamais vous voulez rajoutez des environnements ou en changer, pensez à modifier ces lignes, elles font références à ce qu'il faut build en fonction de la configutation (le `-c` que l'on rentre après ng s) que l'on indique.


---
Pour le moment, si je comprends bien, c'est pas méga utile car la bdd n'est pas déployé et on utilise toujours la même url d'api : localhost:8080 mais si on déploie un jour, se sera surement utile.
