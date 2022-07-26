# Zemoga UI - Test in Vue3/Nuxt 3

## Summary

This is my implementation of the excercise posted in [Github](https://github.com/zemoga/ui-test). 

In order to run this project, please install all the dependencies as outlined in **Setup** below, then bundle the application as commented in **Running bundled application** section. In the browser go to http://localhost:3000.

All mocked data is coming from `public/data.json` file (there is a copy of this file in the root project as `data.json` in case the initial data is needed). This data populates the Pinia store and is updated every time a vote is performed. For this, I'm using a couple of API endpoints inside `server/api` folder.

There are only two components for handling all the cards and cards layout inside `components/` folder.

Provided HTML and CSS files are loaded as part of a layout component inside `layouts/` folder and used in `app.vue` file. This `app.vue` file is the default route since there are no more pages needed for this excercise.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

For starting the development server on http://localhost:3000

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
