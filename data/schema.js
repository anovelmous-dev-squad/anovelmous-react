import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getNovel,
  getNovels,
  getChapter,
  getLiveNovel,
  getContributor
} from './anovelmousDatabase';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Novel') {
      return getNovel(id);
    } else if (type === 'Chapter') {
      return getChapter(id);
    } else if (type === 'Contributor') {
      return getContributor(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Novel) {
      return novelType;
    } else if (obj instanceof Chapter) {
      return chapterType;
    } else if (obj instanceof Contributor) {
      return contributorType;
    } else {
      return null;
    }
  }
);

const chapterType = new GraphQLObjectType({
  name: 'Chapter',
  description: 'A chapter of a novel.',
  fields: () => ({
    id: globalIdField('Chapter'),
    title: {
      type: GraphQLString,
      description: 'The title of the chapter.'
    }
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
