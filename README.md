# passport-gitee

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Gitee](http://www.gitee.com/) using the OAuth 1.0a API.

This module lets you authenticate using Gitee in your Node.js applications.
By plugging into Passport, Gitee authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-gitee

## Usage

#### Create an Application

Before using `passport-gitee`, you must first get an Gitee API key. If you
have not already done so, an API key can be requested at internal.
Your will be issued an API key and secret, which need to be provided to the
strategy.

#### Configure Strategy

The Gitee authentication strategy authenticates users using an Gitee
account and OAuth tokens.  The API key secret obtained from Gitee are
supplied as options when creating the strategy.  The strategy also requires a
`verify` callback, which receives the access token and corresponding secret as
arguments, as well as `profile` which contains the authenticated user's Gitee
profile.   The `verify` callback must call `cb` providing a user to complete
authentication.

    passport.use(new GiteeStrategy({
        consumerKey: Gitee_CONSUMER_KEY,
        consumerSecret: Gitee_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/gitee/callback"
      },
      function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ giteeId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'gitee'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/gitee',
      passport.authenticate('gitee'));
    
    app.get('/auth/gitee/callback', 
      passport.authenticate('gitee', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

