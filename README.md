# Esame per il modulo di React - 28/01/2021 - CFP-Futura

This project was bootstrapped with [Create React App](https://api.chucknorris.io).\
Thanks to [Chuck Norris Jokes API](https://github.com/facebook/create-react-app).

## Esercizi da svolgere:
1. salvare il contenuto di `input`, rendendolo quindi un componente controllato;
2. al click del pulsante `.Search-Button`, recuperare la lista delle citazioni; utilizzando l'input salvato al punto precedente, interrogando l'api all'indirizzo definito dalla costante `ALLJOKESBYKEYWORD` (a cui si deve aggiungere la parola chiave);
3. Ogni qual volta è in corso una chiamata API, il componente `Logo` deve roteare grazie alla classe CSS `App-Logo-Spinning`;
4. Salve la prima delle citazioni ottenuta tramite `3)` e visualizzarla tramite il componente `Joke` (un eventuale categoria selezionata deve essere rimossa);
5. Far sparire la porzione di codice nel `render()` per visualizzare la categoria selezionata nel caso in cui quest'ultima sia assente (ad esempio dopo la ricerca del punto 2);
6. In caso di errore dalle api, richiamare la funzione `launchErrorAlert()` tramite un meccanismo scaturito al di fuori delle funzioni delle funzioni che effettuano la chiamata;
    1. all'interno della funzione da cui è scaturito l'errore, invece, mostrare nella parte di costrutto del `catch()` un `console.error()` contentente un messaggio di errore specifico:
        1. ad esempio, cercando come parola chiave "xyz" non otterremo alcun risultato.
7. all'avvio dell'applicazione, recuperare la lista delle categorie interrogando l'api all'indirizzo definito dalla costante `ALLCATEGORIESURL`
8. salvare il contenuto della chiamata precedente e passarlo al componente `<CategoriesList />` che a sua volta renderizzerà un `<CategoryButton />` per ciascuno dei suoi elementi;
9. Al click di un `<CategoryButton />` la categoria da esso rappresentato deve essere salvata e mostrata in `.Selected-Cat`
10. Recuperare una barzelletta casuale per la categoria selezionata tramite il punto `9)` premendo il pulsante `.RandomButton`, interrogando le api all'indirizzo specificato dalla costante `RANDOMJOKEBYCATURL` (a cui si deve aggiungere la categoria selezionata);
11. Salvare la barzelletta recuperata nel punto precedente e visualizzarla tramite il componente `<Joke />`;
12. Resettare il campo di input di testo per keyword quando viene visualizzata una la barzelletta casuale per categoria;
13. Al click di una categoria tramite il componente `<CategoryButton />` far sparire la citazione recuperata per la categoria precedente.

E' possibile eseguire gli esercizi utilizzando una delle due sintassi fra **FC** *(Functional Component)* e **Class Component**.

*Per ottenere la sufficienza, è necessario svolgere **in maniera corretta** :*
- *i punti **da 1) a 6)** utilizzando la sintassi del **FC*** per il componente `App`
- *i punti **da 1) a 8)** utilizzando la sintassi del **Class Component*** per il componente `App`


## 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console