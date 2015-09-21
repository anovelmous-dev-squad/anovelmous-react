# Anovelmous (web front-end)


## Concept

 - Strangers create a narrative, word-by-word
 
 - Every 10 seconds, contributors vote with an allowed vocabulary for the next word
 
 - Grammar checker enforces readability


Constraints create interesting and creative situations.
 
Constraints are a way to game-ify some aspect of communication.
 
 - Messages... with 140 character limits = Twitter
 - Photos... purposefully, permanently deleted = Snapchat
 - Videos... limited to 7 seconds = Vine
 - Novels.. one word at a time, together = Anovelmous



## Tech
- The Facebook Trifecta
  - React
  - Relay
  - GraphQL
- React Router
- Hot Loading 
  - Webpack
  - React-Transform

## Development

    npm install
    npm run dev

## Working on

- [X] Migrate from Redux/REST to Relay/GraphQL  ([see my post about why](https://medium.com/@gregoryziegan/how-graphql-taught-me-to-code-client-apps-1c631a9953bd))
- [ ] Style the Live Novel view
- [ ] Support Voting mutations
- [ ] Migrate the GraphQL implementation to Python for the existing [backend](https://github.com/anovelmous-dev-squad/anovelmous)
