import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  events: [],

  myTickets: [],

  tickets: [],

  activeEvent: null,

  comments: [],

  ticketHolders: [],

  myEvents: [],

})
