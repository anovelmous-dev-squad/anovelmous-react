# Anovelmous (web front-end)

![Anovelmous X Large Logo](./src/assets/AnovelmousLogoXLarge.png)

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

### Prewriting

Good literature needs prior thought.

It also needs *characters*, *places*, and *plot items*.

Before we start a novel, we need to do the following:

  1. Figure out a vague back-of-book summary
  2. Craft some characters, places, and plot items
  3. (Proto) Name it

These steps will happen in sequence, each after a certain amount of time to
allow for reddit-style voting to occur on contributions.

The word-by-word contribution will begin once the prewriting rounds are completed.

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
    npm start

## Working on

- [X] Migrate from Redux/REST to Relay/GraphQL  ([see my post about why](https://medium.com/@gregoryziegan/how-graphql-taught-me-to-code-client-apps-1c631a9953bd))
- [ ] Style the Live Novel view
- [X] Support Voting mutations
- [ ] Migrate the GraphQL implementation to Python for the existing [backend](https://github.com/anovelmous-dev-squad/anovelmous)
