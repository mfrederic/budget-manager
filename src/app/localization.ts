import * as moment from 'moment';

export const i18n = {
  ACTIONS: 'Actions',
  BALANCE: 'Balance',
  BUDGET_DEFAULT_DESCRIPTION: 'Budget du mois de ' + moment().format('MMMM'),
  BUDGET_START_EVERY_DAY: 'Les budgets commencent chaque mois le : ',
  BUDGETS: 'Budgets',
  CANCEL: 'Annuler',
  CLOSE: 'Fermer',
  CONFIRM: 'Confirmer',
  CONFIRM_SUPPRESS_MESSAGE: 'Souhaitez-vous réellement supprimer cette entrée ?',
  CONFIRM_SUPPRESS_TITLE: 'Suppression',
  CREATE: 'Créer',
  CREATE_NEW_ENTRY: 'Créer une nouvelle entrée',
  CURRENCY: '€',
  CURRENT_BUDGET: 'Budget',
  CURRENT_DATE: moment().format('DD/MM/YYYY'),
  DATE: 'Date',
  DELETE: 'Supprimer',
  DELETE_ERROR: 'La suppression n\'a pas aboutie.',
  DELETE_SUCCESS: 'Suppression effectuée.',
  BUDGET_DATE_FORMAT: 'DD',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATE_FORMAT_ENG: 'YYYY-MM-DD',
  DESCRIPTION: 'Description',
  END_DATE: 'Fin',
  ENTRY_ALREADY_EXISTS_EXCEPTION: 'L\'entrée existe déjà.',
  ENTRY_CREATED: 'L\'entrée a été créée.',
  ENTRY_DEFAULT_DESCRIPTION: 'Entrée sans description',
  EXAMPLE: 'Exemple',
  EXAMPLE_VALUE: 54.25,
  INCOME: 'Revenu',
  LAST_OPERATIONS: '5 dernières opérations',
  HOME: 'Accueil',

  HTTP_BAD_REQUEST: 'Erreur de requête. Certaines informations semblent être manquantes.',
  HTTP_CONFLICT: 'Conflit. L\'entité semble déjà exister.',
  HTTP_OK: 'L\'opération s\'est correctement déroulée.',
  HTTP_SERVER_ERROR: 'Une erreur est survenue.',

  MISSING_INFORMATIONS: 'Certaines informations sont manquante pour réaliser cette opération.',
  MONTHLY: 'Mensuel',
  MORE_INFORMATIONS: 'Voir plus d\'informations',
  NEW_ENTRY: 'Nouvelle entrée',
  OPERATIONS: 'Opérations',
  PROJECTS: 'Projets',
  REQUIRED_MARK: '*',
  REQUIRED_INFO: '*: Requis',

  S_CURRENCY: 'Devise',
  S_LANGUAGE: 'Langage',
  S_START_BUDGET_DATE: 'Jour début de budget',

  SAVE: 'Enregistrer',
  SELECTED_ENTRIES: 'Entrée(s) sélectionnée(s).',
  SETTINGS: 'Paramètres',
  SITE_NAME: 'Budget',
  START_DATE: 'Début',
  TREND: 'Tendance',
  UPDATE: 'Mettre à jour',
  UPDATE_BUDGET: 'Mettre à jour le budget',
  VALUE: 'Valeur',
  WRONG_ENTRY_TYPE_EXCEPTION: 'Le type d\'entrée que vous souhaitez enregistrer n\'est pas du bon type.'
}
