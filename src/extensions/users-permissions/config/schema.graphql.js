'use strict';

const _ = require('lodash');

/**
 * Throws an ApolloError if context body contains a bad request
 * @param contextBody - body of the context object given to the resolver
 * @throws ApolloError if the body is a bad request
 */
function checkBadRequest(contextBody) {
  if (_.get(contextBody, 'statusCode', 200) !== 200) {
    const message = _.get(contextBody, 'error', 'Bad Request');
    const exception = new Error(message);
    exception.code = _.get(contextBody, 'statusCode', 400);
    exception.data = contextBody;
    throw exception;
  }
}

module.exports = {
  type: {
    UsersPermissionsPermission: false, // Make this type NOT queryable
  },
  definition: /* GraphQL */ `
    type UserMe {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      avatar: String
      confirmed: Boolean
      blocked: Boolean
      role: UsersPermissionsMeRole
    }
  `,
}
