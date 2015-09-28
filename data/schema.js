import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

import {
  Novel,
  Chapter,
  Token,
  Vote,
  Contributor,
  data,
  getNovel,
  getChapter,
  getToken,
  getViewer,
  getVote,
  getVocabulary
} from './anovelmousDatabase';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return data[type][id];
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
    } else {
      return null;
    }
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
    }
  }),
  interfaces: [nodeInterface]
});

const GraphQLVote = new GraphQLObjectType({
  name: 'Vote',
  description: 'A contributor\'s vote for the next token in the novel',
  fields: () => ({
    id: globalIdField('Vote'),
    chapter: globalIdField('Chapter'),
    contributor: globalIdField('Contributor'),
    token: globalIdField('Token'),
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

const { connectionType: novelConnection } =
  connectionDefinitions({ name: 'Novel', nodeType: GraphQLNovel });

const { connectionType: voteConnection } =
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
      resolve: (root, {id}) => getNovel(parseInt(id, 10))
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
    }
  }),
  interfaces: [nodeInterface]
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

export const Schema = new GraphQLSchema({
  query: Root
});
