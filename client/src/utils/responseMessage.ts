const translateErrorMessage = (errorMessage: string): string => {
  switch (errorMessage) {
    case "provide email and password":
      return "Veuillez saisir votre email et votre mot de passe";
    case "login or password incorrect":
      return "Votre email ou mot de passe est incorrect";
    case "token is linked to any user":
      return "Votre token est lié à aucun utilisateur";
    case "refresh token expired":
      return "Votre refresh token a expiré";
    default:
      return "Une erreur est survenue, veuillez contacter l'administrateur";
  }
};

const translateSuccessMessage = (successMessage: string): string => {
  switch (successMessage) {
    case "log in successfully":
      return "Vous êtes maintenant connecté";
    case "log out successfully":
      return "Vous vous êtes déconnecté avec succès";
    case "user updated":
      return "Votre profil a été mis à jour";
    default:
      return "";
  }
};

export const translateMessage = (message: string, isOk: boolean): string => {
  return isOk
    ? translateSuccessMessage(message)
    : translateErrorMessage(message);
};
