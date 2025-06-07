const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const {
  patientQueries,
  patientMutations,
  adminQueries,
  adminMutations,
} = require('../schemas/patient');  // Assuming you have a resolvers.js file
const jwt = require("jsonwebtoken");

// RootQuery - should contain all the query fields
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...patientQueries, // Patient queries
    ...adminQueries,   // Admin queries
  },
});

// Mutation - should contain all the mutation fields
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...patientMutations, // Patient mutations
    ...adminMutations,   // Admin mutations
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
