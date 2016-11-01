# Rewards API V0.0.1

A [Swagger](https://www.npmjs.com/package/swagger) / [Sails](http://sailsjs.org) application

Membership API which allows returning customers to accrue rewards and redeem those rewards when they make future purchases.

## Tools

- Sails
- Swagger
- PostgreSQL
- Supertest

## Dependencies

1. Install the latest [Node.js and NPM](https://nodejs.org). This config is built with Node V6.2.0 and should work V0.10 ~ V6+
2. Sails `npm install sails -g` and ensure it is available on your PATH
3. PostgreSQL for persistent storage. `brew install postgresql`. Depending on your default setup, you might need to change the connection port in `config/connections.js` ln.85
4. Swagger (optional) `npm install swagger -g` and ensure it is available on your PATH.
5. Yarn (optional). The new and improved NPM. You'll still be able to install packages using npm, but for stability, speed and dependency resolution using yarn for all your installs is recommended. More info about Yarn can be found [here](https://github.com/yarnpkg/yarn). Also see [install guide](https://yarnpkg.com/en/docs/install)

## Setup

For development tools and building:

1. Run `yarn` (or `npm install`) within the project root directory in a new Terminal window.
2. Run `npm start` to start the server.
3. Run `npm test` to run supertest.

## Structure

- `/api` contains the sub-directories for the main API components
- `/api/controllers` The [controllers](http://sailsjs.org/documentation/concepts/controllers) invoked from each API endpoint.
- `/api/mocks` Reserved for Swagger
- `/api/models` Defines the data [models](http://docs.sequelizejs.com/en/latest/docs/models-definition/) for Sequelize
- `/api/policies` The access [policy](http://sailsjs.org/documentation/concepts/policies) definitions (not used in this project)
- `/api/responses` User defined response [codes](http://sailsjs.org/documentation/concepts/custom-responses). (not used in this project)
- `/api/services` Custom reusable helper [services](http://sailsjs.org/documentation/concepts/services)
- `/api/swagger` Contains the `swagger.yaml` file used to describe the API documentation, input validation and also map the API routes to the controller and function. More info can be found [here](https://github.com/swagger-api/swagger-node)
- `/config` Sails [configuration](http://sailsjs.org/documentation/concepts/configuration)
- `/test` Contains the supertest definitions for each controller

## API Documentation

The API editor and documentation view is available but running `swagger project edit` in terminal from the project root. It's the best way to view all available paths and definitions.

## Postman

An easy (and brilliant) tool for manually testing API routes is [Postman](https://www.getpostman.com/). I've included a Postman collection definition in the root of the project as `postman.json` you can import and use on your local machine.

## Code Style and Linting

With the best of intentions, effort has been made to follow styling practices defined by eslint-config-standard.

[eslint-config-standard](https://github.com/feross/eslint-config-standard)

To get it working, you'll need to use the recommended [Atom IDE](atom.io) and install the following packages

`apm install linter`

`apm install linter-eslint`

Unfortunately the packages in the GUI don't seem to match what is actually available, so it is necessary to install from the CLI.

Once installed, restart Atom and live linting in your IDE.

## Documentation and Comments Within the Code

Within reason, code should be written with readability in mind. Comments play an integral part for the next developer who will see your code.

```
/**
* Check rewards
* @description :: Check an item and user for all eligible rewards can can be applied
* @param {{obj}} data :: The obj to check
* @param {{obj}} data.user :: The user obj to check
* @param {{obj}} data.subtotal :: The order subtotal to check
* @param {{obj}} data.item.product :: The product to check
* @param {{obj}} data.item.qty :: The qty to check
* @param {{obj}} data.item.amt :: The amount to check
eg.
{
  user: (standard user obj),
  subtotal: 500,
  item: {
    product: 'coffee',
    qty: 1,
    amt: 250
  }
}
* @param {{callback}} cb :: The callback
* @result :: An array with eligible rewards is returned
*/
```
[JSDoc-Style-Guide](https://github.com/shri/JSDoc-Style-Guide) by shri for reference.

## NPM Package updates

Periodic checks of NPM packages is recommended in order to have the latest security and performance benefits. Importantly we also don't want the app to fall too far behind the latest version of each package either.

Now that we can use Yarn (see Dependencies) and its brilliant dependency management system, upgrading is easy. Run `yarn upgrade` to upgrade your packages.

After the upgrade is complete run your protractor tests and run around yourself. DO NOT push to the repository until everything is working.

## Scripts

| Command                     | Purpose                                                       |
|:----------------------------|:--------------------------------------------------------------|
| `npm start`                 | Start the server. Same as `swagger project start`             |
| `npm run start:prod`        | Start the server with forever in production mode.             |
| `npm run stop:prod`         | Stop the forever script running in production.                |
| `npm run restart:prod`      | Restart the forever script running in production.             |
| `npm test`                  | Start Karma testing watching for file changes.                |
| `npm run sails-eslint`      | Generate new .eslintrc-sails. Use when creating new models.   |

## Contact

Developer: [Jimmy Cann](mailto:mail@jimmycann.com)
