import * as moment from 'moment';

export const i18n = {
  BALANCE: 'Balance',
  BUDGET_DEFAULT_DESCRIPTION: 'Budget du mois de ' + moment().format('MMMM'),
  BUDGETS: 'Budgets',
  CREATE: 'Créer',
  CREATE_NEW_ENTRY: 'Créer une nouvelle entrée',
  CURRENCY: '€',
  CURRENT_BUDGET: 'Budget en cours',
  CURRENT_DATE: moment().format('DD/MM/YYYY'),
  DATE: 'Date',
  DATE_FORMAT: 'DD/MM/YYYY',
  DESCRIPTION: 'Description',
  ENTRY_ALREADY_EXISTS_EXCEPTION: 'L\'entrée existe déjà.',
  ENTRY_DEFAULT_DESCRIPTION: 'Entrée sans description',
  EXAMPLE_VALUE: 54.25,
  INCOME: 'Revenu',
  LAST_OPERATIONS: '5 dernières opérations',
  HOME: 'Accueil',
  MONTHLY: 'Mensuel',
  PROJECTS: 'Projets',
  SITE_NAME: 'Budget',
  VALUE: 'Valeur',
  WRONG_ENTRY_TYPE_EXCEPTION: 'Le type d\'entrée que vous souhaitez enregistrer n\'est pas du bon type.'
}
