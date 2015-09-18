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
  getLiveNovel
} from './anovelmousDatabase';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Faction') {
      return getNovel(id);
    } else if (type === 'Chapter') {
      return getChapter(id);
    } else {
      return null;
    }
  },
  (obj) => {
    return obj.chapters ? novelType : chapterType;
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
      resolve: (faction, args) => connectionFromArray(
        faction.ships.map((id) => getChapter(id)),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    novels: {
      type: new GraphQLList(novelType),
      args: {
        ids: {
          type: new GraphQLList(GraphQLString)
        }
      },
      resolve: (root, { ids }) => getNovels(ids)
    },
    node: nodeField
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
