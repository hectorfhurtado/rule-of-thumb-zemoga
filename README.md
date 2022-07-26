# Zemoga UI - Test in Vue3/Nuxt 3

## Summary

This is my implementation of the excercise posted in [Github](https://github.com/zemoga/ui-test). 

In order to run this project, please install all the dependencies as outlined in **Setup** below, then bundle the application as commented in **Running bundled application** section. In the browser go to http://localhost:3000.

All mocked data is coming from `public/data.json` file (there is a copy of this file in the root project as `data.json` in case the initial data is needed). This data populates the Pinia store and is updated every time a vote is performed. For this, I'm using a couple of API endpoints inside `server/api` folder.

There are only two components for handling all the cards and cards layout inside `components/` folder.

Provided HTML and CSS files are loaded as part of a layout component inside `layouts/` folder and used in `app.vue` file. This `app.vue` file is the default route since there are no more pages needed for this exercise.

## Setup

Make sure to install all dependencies:

```bash
# yarn
yarn install
```

## Development Server

For starting the development server on http://localhost:3000 run

```bash
npx nuxi dev
```

## Running bundled application

Build the application with:

```bash
npx nuxi build
```

Locally preview the build:

```bash
npx nuxi preview
```

## Running tests

Run the following command

```bash
npx nuxi test
```

When Nuxt runs a test, it creates a folder inside `.nuxt`. It should be deleted every time. This is temporal since testing part is still in active development.

## Others

Using Chrome DevTools SEO audit is above 90%

![](./public/img/seo-result.png)

End to end tests passed

![](./public/img/end-to-end-tests-passing.png)
