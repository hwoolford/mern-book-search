const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    // Check if the token starts with 'Bearer '
    if (token.startsWith('Bearer ')) {
      // Remove 'Bearer ' from token
      token = token.slice(7, token.length).trim();
    }

    if (!token) {
      throw new Error('You have no token!');
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (err) {
      console.error('Invalid token', err);
      throw new Error('Invalid token');
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// const { GraphQLError } = require('graphql')
// const jwt = require('jsonwebtoken');

// set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   AuthenticationError: new GraphQLError('Could not authenticate user.', {
//     extensions: {
//       code: 'UNAUTHENTICATED',
//     },
//   }),
  // function for our authenticated routes
  // authMiddleware: function ({ req} ) {
    // allows token to be sent via  req.query or headers
    // let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    // if (req.headers.authorization) {
    //   token = token.split(' ').pop().trim();
    // }

    // if (!token) {
    //   return req;
    // }

    // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//     }

//    return req;
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };