
// teste si l'age est >= 18
export function isMajor(age) {
    if (!isNaN(age)) {
        if (age >= 18) {
            return true;
        }
    }
    return false;
}

// teste si la chaine n'est pas vide
export function isNotEmpty(string) {
    if (string !== "") {
        return true;
    }
    return false;
}

// teste si les deux mdp spécifiés sont identiques
export function testMDP(mdpA, mdpB) {
    return mdpA === mdpB ? true : false;
}

// teste si les deux mails spécifiés sont identiques
export function testMails(mailA, mailB) {
    return mailA === mailB ? true : false;
}

//teste si le mail fourni est dans le bon format
export function checkMail(mail) {
    var mailformat = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/;
    return mail.match(mailformat);
}

//appelé par les éléments des formulaires
// event est l'évènement qui a provoqué l'appel de la fonction
// fonction est celle qui effectue le test pour gérer la couleur (trouvable dans les fonctions ci-dessus)
// fonctionChangement est celle qui change la couleur de l'élément (change la variable d'état)
// blur : false si on a focus ou change un élément du formulaire, true si on l'a blur
// elementComparaison : pour mailConfirmation et mdpConfirmation, il faut renseigner l'élément avec laquelle on compare le courant
export function handleChangeFocusAndBlur(event, fonction, fonctionChangement, blur, elementComparaison) {
    if (elementComparaison != null) {
        if (fonction(event.target.value, elementComparaison.value)) {
            if (blur) { fonctionChangement('white'); }
            else { fonctionChangement('lightgreen'); }
        }
        else {
            fonctionChangement('lightcoral');
        }
    }
    else {
        if (fonction(event.target.value)) {
            if (blur) { fonctionChangement('white'); }
            else { fonctionChangement('lightgreen'); }
        }
        else {
            fonctionChangement('lightcoral');
        }
    }
}