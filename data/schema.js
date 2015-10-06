import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay';

import {
  Novel,
  Chapter,
  Token,
  Vote,
  Contributor,
  Character,
  Place,
  PlotItem,
  data,
  getNovel,
  getChapter,
  getMostRecentChapter,
  getToken,
  getTokensForChapter,
  getViewer,
  getVote,
  getVotes,
  castVote,
  getCharacter,
  getCharacters,
  createCharacter,
  getPlace,
  getPlaces,
  createPlace,
  getPlotItem,
  getPlotItems,
  createPlotItem
} from './anovelmousDatabase';

const getObjectFromGlobalId = (globalId) => {
  const { type, id } = fromGlobalId(globalId);
  return data[type][id];
};

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    return getObjectFromGlobalId(globalId);
  },
  (obj) => {
    if (obj instanceof Novel) {
      return GraphQLNovel;
    } else if (obj instanceof Chapter) {
      return GraphQLChapter;
    } else if (obj instanceof Token) {
      return GraphQLToken;
    } else if (obj instanceof Vote) {
      return GraphQLVote;
    } else if (obj instanceof Contributor) {
      return GraphQLContributor;
    } else if (obj instanceof Character) {
      return GraphQLCharacter;
    } else if (obj instanceof Place) {
      return GraphQLPlace;
    } else if (obj instanceof PlotItem) {
      return GraphQLPlotItem;
    }
    return null;
  }
);

const GraphQLToken = new GraphQLObjectType({
  name: 'Token',
  description: 'A language token (word or punctuation) used for contribution',
  fields: () => ({
    id: globalIdField('Token'),
    content: {
      type: GraphQLString,
      description: 'The string representation of the token.'
    },
    isPunctuation: {
      type: GraphQLBoolean,
      description: 'Is this token a valid punctuation?'
    },
    createdAt: {
      type: GraphQLString
    },
    isValid: {
      type: GraphQLBoolean
    }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: tokenConnection } =
  connectionDefinitions({ name: 'Token', nodeType: GraphQLToken });

const GraphQLChapter = new GraphQLObjectType({
  name: 'Chapter',
  description: 'A chapter of a novel.',
  fields: () => ({
    id: globalIdField('Chapter'),
    title: {
      type: GraphQLString,
      description: 'The title of the chapter.'
    },
    tokens: {
      type: tokenConnection,
      description: 'The tokens that make up the chapter.',
      args: connectionArgs,
      resolve: (chapter, args) => connectionFromArray(
        chapter.tokens.map((id) => getToken(id)),
        args
      )
    },
    votingDuration: {
      type: GraphQLInt,
      description: 'Length of voting round in seconds.'
    },
    prevVotingEndedAt: {
      type: GraphQLString,
      description: 'Timestamp when the previous voting round ended.'
    },
    tokenCount: {
      type: GraphQLInt,
      resolve: (chapter) => getTokensForChapter(chapter.id).length
    }
  }),
  interfaces: [nodeInterface]
});

const GraphQLVote = new GraphQLObjectType({
  name: 'Vote',
  description: 'A contributor\'s vote for the next token in the novel',
  fields: () => ({
    id: globalIdField('Vote'),
    token: {
      type: GraphQLToken,
      resolve: (vote) => getToken(vote.token)
    },
    ordinal: { type: GraphQLInt },
    selected: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: chapterConnection } =
  connectionDefinitions({ name: 'Chapter', nodeType: GraphQLChapter });

const GraphQLNovel = new GraphQLObjectType({
  name: 'Novel',
  description: 'A narrative masterpiece created by a community',
  fields: () => ({
    id: globalIdField('Novel'),
    title: {
      type: GraphQLString,
      description: 'The title of the novel.'
    },
    chapter: {
      type: GraphQLChapter,
      args: {
        id: {
          type: GraphQLString
        },
        mostRecent: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve: (novel, {id, mostRecent}) => (
        mostRecent ? getMostRecentChapter() : getChapter(id)
      )
    },
    chapters: {
      type: chapterConnection,
      description: 'The chapters of the novel.',
      args: connectionArgs,
      resolve: (novel, args) => connectionFromArray(
        novel.chapters.map((id) => getChapter(id)),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

const GraphQLCharacter = new GraphQLObjectType({
  name: 'Character',
  description: 'A character in a particular novel',
  fields: () => ({
    id: globalIdField('Character'),
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    bio: { type: GraphQLString }
  }),
  interfaces: [nodeInterface]
});

const GraphQLPlace = new GraphQLObjectType({
  name: 'Place',
  description: 'A place in a particular novel',
  fields: () => ({
    id: globalIdField('Place'),
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
  interfaces: [nodeInterface]
});

const GraphQLPlotItem = new GraphQLObjectType({
  name: 'PlotItem',
  description: 'A plot item in a particular novel',
  fields: () => ({
    id: globalIdField('PlotItem'),
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: characterConnection,
        edgeType: GraphQLCharacterEdge } =
  connectionDefinitions({ name: 'Character', nodeType: GraphQLCharacter });

const { connectionType: placesConnection,
        edgeType: GraphQLPlaceEdge } =
  connectionDefinitions({ name: 'Place', nodeType: GraphQLPlace });

const { connectionType: plotItemsConnection,
        edgeType: GraphQLPlotItemEdge } =
  connectionDefinitions({ name: 'PlotItem', nodeType: GraphQLPlotItem });

const { connectionType: novelConnection } =
  connectionDefinitions({ name: 'Novel', nodeType: GraphQLNovel });

const { connectionType: voteConnection,
        edgeType: GraphQLVoteEdge } =
  connectionDefinitions({ name: 'Vote', nodeType: GraphQLVote });

const GraphQLContributor = new GraphQLObjectType({
  name: 'Contributor',
  description: 'A collaborative author of novels',
  fields: () => ({
    id: globalIdField('Contributor'),
    name: {
      type: GraphQLString,
      description: 'The name of the contributor.'
    },
    novel: {
      type: GraphQLNovel,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (contributor, {id}) => getNovel(parseInt(id, 10))
    },
    novels: {
      type: novelConnection,
      description: 'All viewable novels.',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.novels.map((id) => getNovel(id)),
        args
      )
    },
    vocabulary: {
      type: tokenConnection,
      description: 'Possible words for voting',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.vocabulary.map((id) => getToken(id)),
        args
      )
    },
    votes: {
      type: voteConnection,
      description: 'Past votes by this viewer',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.votes.map((id) => getVote(id)),
        args
      )
    },
    characters: {
      type: characterConnection,
      description: 'Characters this contributor has imagined',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.characters.map((id) => getCharacter(id)),
        args
      )
    },
    places: {
      type: placesConnection,
      description: 'Places this contributor has imagined',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.places.map((id) => getPlace(id)),
        args
      )
    },
    plotItems: {
      type: plotItemsConnection,
      description: 'Plot items this contributor has imagined',
      args: connectionArgs,
      resolve: (contributor, args) => connectionFromArray(
        contributor.plotItems.map((id) => getPlotItem(id)),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

const GraphQLCastVoteMutation = mutationWithClientMutationId({
  name: 'CastVote',
  inputFields: {
    tokenId: { type: new GraphQLNonNull(GraphQLString) },
    chapterId: { type: new GraphQLNonNull(GraphQLString) },
    ordinal: { type: new GraphQLNonNull(GraphQLInt) }
  },
  outputFields: {
    voteEdge: {
      type: GraphQLVoteEdge,
      resolve: ({localVoteId}) => {
        const vote = getVote(localVoteId);
        return {
          cursor: cursorForObjectInConnection(getVotes(), vote),
          node: vote
        };
      }
    },
    viewer: {
      type: GraphQLContributor,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({tokenId, chapterId, ordinal}) => {
    const token = getObjectFromGlobalId(tokenId);
    const chapter = getObjectFromGlobalId(chapterId);
    const localVoteId = castVote(token, chapter, ordinal);
    return {localVoteId};
  }
});

const GraphQLCreateCharacterMutation = mutationWithClientMutationId({
  name: 'CreateCharacter',
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    bio: { type: new GraphQLNonNull(GraphQLString) },
    novelId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    characterEdge: {
      type: GraphQLCharacterEdge,
      resolve: ({localCharacterId}) => {
        const character = getCharacter(localCharacterId);
        return {
          cursor: cursorForObjectInConnection(getCharacters(), character),
          node: character
        };
      }
    },
    viewer: {
      type: GraphQLContributor,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({firstName, lastName, bio, novelId}) => {
    const novel = getObjectFromGlobalId(novelId);
    const localCharacterId = createCharacter(firstName, lastName, bio, novel);
    return {localCharacterId};
  }
});

const GraphQLCreatePlaceMutation = mutationWithClientMutationId({
  name: 'CreatePlace',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    novelId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    placeEdge: {
      type: GraphQLPlaceEdge,
      resolve: ({localPlaceId}) => {
        const place = getPlace(localPlaceId);
        return {
          cursor: cursorForObjectInConnection(getPlaces(), place),
          node: place
        };
      }
    },
    viewer: {
      type: GraphQLContributor,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({name, description, novelId}) => {
    const novel = getObjectFromGlobalId(novelId);
    const localPlaceId = createPlace(name, description, novel);
    return {localPlaceId};
  }
});

const GraphQLCreatePlotItemMutation = mutationWithClientMutationId({
  name: 'CreatePlotItem',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    novelId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    placeEdge: {
      type: GraphQLPlotItemEdge,
      resolve: ({localPlotItemId}) => {
        const plotItem = getPlotItem(localPlotItemId);
        return {
          cursor: cursorForObjectInConnection(getPlotItems(), plotItem),
          node: plotItem
        };
      }
    },
    viewer: {
      type: GraphQLContributor,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({name, description, novelId}) => {
    const novel = getObjectFromGlobalId(novelId);
    const localPlotItemId = createPlotItem(name, description, novel);
    return {localPlotItemId};
  }
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLContributor,
      resolve: () => getViewer()
    },
    node: nodeField
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    castVote: GraphQLCastVoteMutation,
    createCharacter: GraphQLCreateCharacterMutation,
    createPlace: GraphQLCreatePlaceMutation,
    createPlotItem: GraphQLCreatePlotItemMutation
  }
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
});
