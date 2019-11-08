const util = require('util')
const OAuth2Strategy = require('passport-oauth2')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError

/**
 * `Strategy` constructor.
 *
 * The gitee authentication strategy authenticates requests by delegating to
 * gitee using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your gitee application's Client ID
 *   - `clientSecret`  your gitee application's Client Secret
 *   - `callbackURL`   URL to which gitee will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new rocessonStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret',
 *         callbackURL: 'https://www.example.net/auth/gitee/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy (options, verify) {
  options = options || {}
  options.authorizationURL = options.authorizationURL || 'https://gitee.com/oauth/authorize'
  options.tokenURL = options.tokenURL || 'https://gitee.com/oauth/token'
  options.scopeSeparator = options.scopeSeparator || ''

  OAuth2Strategy.call(this, options, verify)
  this.name = 'gitee'
  this._userProfileURL = options.userProfileURL || 'https://gitee.com/api/v5/user'
  
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy)

/**
 * Retrieve user profile from gitee.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `gitee`
 *   - `id`               the user's gitee ID
 *   - `displayName`      the user's full name
 *   - `profileUrl`       the URL of the profile for the user on gitee
 *   - `photoUrl`         the user's photo url
 *   - `emails`           the user's email addresses
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err))
    }
    try {
      const profile = JSON.parse(body)
      console.log(profile)
      return done(null, profile)
    } catch (ex) {
      return done(new Error('Failed to parse user profile'))
    }
  })
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy

