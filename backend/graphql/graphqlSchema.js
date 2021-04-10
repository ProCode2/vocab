// schema to build graphql queries
module.exports = {
  graphqlSchema: `
  type Definitions {
    definition: String
    examples: [String!]
  }

  input DefinitionsInput  {
    definition: String!
    examples: [String!]
  }

  type Info {
    pos: String!
    definitions: [Definitions!]
  }

  input InfoInput {
    pos: String!
    definitions: [DefinitionsInput!]!
  }

  type Word {
    _id: ID
    word: String!
    origin: String
    pronunciations: [String!]!
    info: [Info!]!
  }

  type RootQuery {
    words: [Word!]!
  }

  type RootMutation {
    createWord(name: String!): Word
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `,
};
