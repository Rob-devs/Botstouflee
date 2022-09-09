//Transforme un id d'utilisateur en nom
module.exports = (id, client) => {

    //Supression des caractères non compris dans l'ID "<@...>"
    id = id.substring(2, id.length - 1);

    //Nom par défaut
    let name = "[Not found]";

    //On essaye de trouver l'utilisateur
    try {
        name = client.users.cache.find(user => user.id === id).username;
    }
    catch (exception) {
        console.log(exception);
    }

    //Retour du nom
    return name;
}