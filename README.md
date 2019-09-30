# DevNotes

> A progressive web application (PWA) for notes.

[Try it out!](https://rainu.github.io/dev-notes/)

## Features
* No need for external server (such like a database)
    * The whole content will be stored locally
* optional encryption
    * The note-content can be stored encrypted
* Note-Types:
    * Textual
    * Markdown
    * Image
    * Template - text with customizable placeholder
* Filterable notes - each note can have multiple tags
* Customizable boards
    * a board is a user-predefined set of filters
* Copy note-content to clipboard
* Multilingual
    * english
    * german
* Responsive - looks great at mobile and desktop
* Different Themes:
    * dark
    * light
* Backup-Mechanism
    * Download as file
    * Upload a file
    
## Changelog

### 0.9.2
* pin the most action buttons in dialog at the bottom
* make the most dialogs non-persisted (you can close them with ESC)
* note order can now be configured
* board order can now be configured
* add migration mechanism:
    * makes the export files backward compatible
    * makes the local storage backward compatible
* fix some english translations

### 0.9.1
* fix Bugs
    * [#7](https://github.com/rainu/dev-notes/issues/7)
    * [#2](https://github.com/rainu/dev-notes/issues/2)
    * [#1](https://github.com/rainu/dev-notes/issues/1)
* dont capitalize placeholder names

### 0.9.0
* implements all base features

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
