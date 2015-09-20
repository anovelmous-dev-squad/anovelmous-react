import {
  GraphQLBoolean,
  GraphQLInt,
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
  NovelToken,
  FormattedNovelToken,
  Vote,
  Contributor,
  data,
  getLiveNovel,
  getNovels,
  getNovelToken,
  getFormattedNovelToken,
  getContributor
} from './anovelmousDatabase';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return data[type][id];
  },
  (obj) => {
    if (obj instanceof Novel) {
      return novelType;
    } else if (obj instanceof Chapter) {
      return chapterType;
    } else if (obj instanceof Token) {
      return tokenType;
    } else if (obj instanceof NovelToken ) {
      return novelTokenType;
    } else if (obj instanceof FormattedNovelToken) {
      return formattedNovelTokenType;
    } else if (obj instanceof Vote) {
      return voteType;
    } else if (obj instanceof Contributor) {
      return contributorType;
    } else {
      return null;
    }
  }
);

const tokenType = new GraphQLObjectType({
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

const novelTokenType = new GraphQLObjectType({
  name: 'NovelToken',
  description: 'A token that has been attributed to a Novel',
  fields: () => ({
    id: globalIdField('NovelToken'),
    token: globalIdField('Token'),
    createdAt: { type: GraphQLString },
    ordinal: {type: GraphQLInt }
  }),
  interfaces: [nodeInterface]
});

const formattedNovelTokenType = new GraphQLObjectType({
  name: 'FormattedNovelToken',
  description: 'A formatted token that has been attributed to a novel.',
  fields: () => ({
    id: globalIdField('FormattedNovelToken'),
    content: { type: GraphQLString },
    ordinal: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: novelTokenConnection } =
  connectionDefinitions({ name: 'NovelToken', nodeType: novelTokenType });

const { connectionType: formattedNovelTokenConnection } =
  connectionDefinitions(
    { name: 'FormattedNovelToken', nodeType: formattedNovelTokenType }
  );

const chapterType = new GraphQLObjectType({
  name: 'Chapter',
  description: 'A chapter of a novel.',
  fields: () => ({
    id: globalIdField('Chapter'),
    title: {
      type: GraphQLString,
      description: 'The title of the chapter.'
    },
    tokens: {
      type: novelTokenConnection,
      description: 'The tokens that make up the chapter.',
      args: connectionArgs,
      resolve: (chapter, args) => connectionFromArray(
        chapter.tokens.map((id) => getNovelToken(id)),
        args
      )
    },
    text: {
      type: formattedNovelTokenConnection,
      description: 'The formatted text of the chapter, space delimited.',
      args: connectionArgs,
      resolve: (chapter, args) => connectionFromArray(
        chapter.text.map((id) => getFormattedNovelToken(id)),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

const voteType = new GraphQLObjectType({
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
  connectionDefinitions({ name: 'Chapter', nodeType: chapterType });

const novelType = new GraphQLObjectType({
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

const contributorType = new GraphQLObjectType({
  name: 'Contributor',
  description: 'A collaborative author of novels',
  fields: () => ({
    id: globalIdField('Contributor'),
    name: {
      type: GraphQLString,
      description: 'The name of the contributor.'
    }
  }),
  interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    novels: {
      type: new GraphQLList(novelType),
      resolve: () => getNovels()
    },
    liveNovel: {
      type: novelType,
      resolve: () => getLiveNovel()
    },
    contributor: {
      type: contributorType,
      resolve: () => getContributor(1)
    },
    node: nodeField
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
