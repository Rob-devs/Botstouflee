module.exports = (message) => {
    var dict = {
        "L'obsidienne possède de puissantes propriétés nettoyantes et peut éliminer l'énergie négative de vous-même et de votre environnement. Cela lui permet également de neutraliser les vibrations perturbatrices. L'obsidienne supprime les blocages, les peurs et les pensées qui se limitent. Comme de fortes émotions peuvent survenir lors de la libération, la pierre n'est pas destinée aux personnes très sensibles. Avec ses propriétés nettoyantes en profondeur, il est important de nettoyer régulièrement la pierre (de préférence après chaque utilisation). Enracinant, nettoyant en profondeur, détoxifiant, illumine l'esprit.": "Wikipedia",
        "Va voir à l'ehpad, le sexe est sale quand la toilette est mal faite ... c'est à dire tous les jours": "Xoxtin",
        "Moins que le rat, le zebre fait concensus plus facilement": "Xoxtin",
        "elle a le palais détruit, go l'amener rue d'arshot elle est plus bonne qu'a avaler des bites": "Xoxtin",
        "y'a jamais de mauvais moment pour sortir sa bite": "Xoxtin",
        "VIVE LA CLEAVE": "Tout le monde",
        "Tu prends alots et bbk et boom boom": "Darksoul",
        "T1: alots 314, T2: ran 315": "Hans",
        "J'ai besoin d'amour et comme j'ai pas de meuf sg me donne des ml pour me consoler": "Daarky",
        "Sg bande de sombre p*te si vous me donnez pas des ml 5 je vais venir toquer a votre porte er vous brisé les genoux bande de catin de mes deux": "Daarky",
        "Crois en la cleave et la cleave te le rendra": "Daarky",
        "Toute la famille de sg va finir au goulag en 1v1 contre moi\nJe vais les exterminer c petite salope": "Daarky",
        "Le seul truc qui sera cité ça sera le nom de la personne qui m'a ping qui va finir dans un coffre de voiture direction Paname si je le chope": "Daarky",
        "- Mange alors\n- Pas les moyens": "Xoxtin & Daarky",
        "Utilisation simple et sans bavure de la méthode": "Soow",
        "Elle avait un cul qui ne se refuse pas": "EFX",
        "je lui explose son fion jusqu'à ce qu'elle soit incontinente et elle en tombera amoureuse de moi": "EFX",
        "Bruh je t'assure que si je pouvais l'avoir à portée de chibre elle marcherait en canard avec un air hagard": "EFX",
        "VIVE LA SPEED": "Bistouflee",
        "C'était fort sur les perso comme carrot/atywin & co où t'avais vraiment envie que ces persos soient dans le mal vu que les compos étaient très différentes, là normalement une hwa c'est ce qu'on peut appeler \"une ancre\" qui te permet de te reposer dessus si jamais tu veux pivoter sur plusieurs styles de jeu (Aria, Aravi et accessoirement Sylvian sont des ancres). C'est juste là pour te rappeler que tu peux pas stall, et que tu dois draft pour counter cette ancre particulière, et si tu le fais, bah le mec en face pivote pour te counter tes picks si possible (vu que tous le monde à pas tous les persos de gear).": "Fhulgrim",
        "Tout arrive plus vite à qui court après": "Punch",
        "Tu perds pas car il meilleur que toi mais car t'es un 1head , même si tu chill contre du top200 là t'aurais perdu car c'est juste ton cerveau le problème": "Punch",
        "Il faut bien sympathiser avec le diable quand on combat les flammes": "Monstur",
        "ah non moi j'ai autant de charisme que ervalen": "Celaloose",
        "Jvai roulez un joint de la taille de ma bite pour te fumer les entrailles": "Seji",
        "Salut tu te rapelle de moi, tu me dois de la thune": "Zickys",
        "Pendant les scènes de sex je regarde les commentaires en attendant la suite du scénario": "D4",
        "Uwu guys i missed the \"chaussette sales\" from vivian, did someone know where they are ?\nOwO\nBAKA BAKA BAKA BAKA DE PEEPO DE PERFO": "Rossi",
        "Mon ADN supérieur ma permis de voir en soow un bon leader (chef/meneur/dirigeant)  supreme et donc noius pouvons en déduire que soow est le meilleur": "Rossi",
        "Je men vais taper une queue de l'enfer pour faire sortir les larmes de ma bite": "DeadNobody",
        "Les herbivores vous foutez quoi sur discord allez dans les prés brouter": "Gofri",
        "Crois en moi qui crois en toi": "Elakir",
        "As-tu une dernière volonté à accorder au roi des sables ?": "Elakir",
    };
    const keys = Object.keys(dict);
    let random = Math.floor(Math.random() * keys.length);

    message.channel.send("*\"" + keys[random] + "\"*" + "\n\n**" + dict[keys[random]] + "**");
}