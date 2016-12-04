import * as moment from 'moment';

export const i18n = {
  BUDGET_DEFAULT_DESCRIPTION: 'Budget du mois de ' + moment().format('MMMM'),
  CREATE: 'Créer',
  CREATE_NEW_ENTRY: 'Créer une nouvelle entrée',
  CURRENCY: '€',
  CURRENT_BUDGET: 'Budget en cours',
  CURRENT_DATE: moment().format('DD/MM/YYYY'),
  DATE: 'Date',
  DESCRIPTION: 'Description',
  ENTRY_ALREADY_EXISTS_EXCEPTION: 'L\'entrée existe déjà.',
  EXAMPLE_VALUE: 54.25,
  INCOME: 'Revenu',
  LAST_OPERATIONS: 'Dernières opérations',
  HOME: 'Accueil',
  MONTHLY: 'Mensuel',
  PROJECTS: 'Projets',
  SITE_NAME: 'Budget',
  VALUE: 'Valeur',
  WRONG_ENTRY_TYPE_EXCEPTION: 'Le type d\'entrée que vous souhaitez enregistrer n\'est pas du bon type.'
}
