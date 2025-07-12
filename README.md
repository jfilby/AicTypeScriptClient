# AI Construx TypeScript client

This is the official TypeScript client for [AI Construx](https://aiconstrux.com).
It can also be used in JavaScript projects.

If the language you're using isn't supported yet you'll have to call the REST
API directly.

There are also [docs for AI Construx](https://docs.aiconstrux.com/docs)
available.


## Getting started

First, create a project in AI Construx. The project page has ids for the
project environment and your user profile id.

From the project page there's an API key link at the top-right. Create an API
key, and note its secret (displayed when the API key is created).

Install this TypeScript client using npm:

```sh
npm install @aiconstrux/client
```


## Building

This section is for developers of this NPM only.

1. Ensure any new files are exported from `index.ts`.
2. Build with `npm run build`.
3. Commit changes to git.
4. Inc the version by major/minor/patch, e.g. `npm version patch`.
5. Push changes to the repo (includes the version change).
6. Publish the npm with `npm publish`.

