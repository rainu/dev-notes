# DevNotes

> A progressive web application (PWA) for notes that **is fun**!

## DEMO

[Try it out!](https://rainu.github.io/dev-notes/)


## Features
* **Serverless** note app (no server or database required)
    * The whole content will be **stored locally**
* Support for full **encryption**
    * Data can be stored encrypted
* Different Note-Types for better user experience:
    * Textual
    * Markdown
    * Reminder
    * Image
    * Photo
    * Credentials
    * Template - text with customizable placeholder
* Filter your notes easily by using **tags**
* Customizable boards
    * a board is a user-predefined set of filters
* **Copy** your note-content **to clipboard**
* Multilingual
    * english
    * german
* Responsive - looks great on mobile and desktop
* 2 different themes:
    * dark
    * light
* Backup-Mechanisms
    * Download/Upload file
    * Download/Upload from [AWS S3](https://aws.amazon.com/s3/)
    * Download/Upload from [gist](https://gist.github.com/)
    * Download/Upload from [dropbox](https://www.dropbox.com/)
    * Download/Upload via [WebDAV](http://www.webdav.org/)
        * [Nextcloud](https://nextcloud.com/) ¹
        * [ownCloud](https://owncloud.org/) ¹
        * ...

¹ These services will work if CORS is correctly configured to return the proper headers. This may not work by default.

## Quickstart

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Changelog

### 0.9.19
* use a dedicated icon for draggable elements

### 0.9.18
* edit board title directly on click on them
* edit note title directly on click on them
* fulltext search filter for notes [#26](https://github.com/rainu/dev-notes/issues/26)

### 0.9.17
* UX: redesign ordering of notes - now you can configure the order in wysiwyg-style
* UX: make placeholder in template notes sortable
* abort creation/edit of note while typing [ESC]
* autofocus the first text element on copy dialog for template notes
* fix crash when try to create new placeholder
* preselect board tags on new notes [#31](https://github.com/rainu/dev-notes/issues/31)
* UX: redesign themes

### 0.9.16
* UX: redesign the settings view
* technical issue [#35](https://github.com/rainu/dev-notes/issues/35)
* UX: redesign the new-note workflow
* UX: redesign the backup view

### 0.9.15
* autofocus the password field at unlock screen

### 0.9.14
* dont force usage of indexedDB so that DevNotes als work with older browsers

### 0.9.13
* a mechanism for faster deletion of notes (trash bin)
* make note titles optional [#22](https://github.com/rainu/dev-notes/issues/22)
* split note view in own views (one for edit one for creating new one) [#30](https://github.com/rainu/dev-notes/issues/30)

### 0.9.12
* fix crash if you have a reminder note and encryption enabled

### 0.9.11
* add built date into info screen
* add a close button in note order view [#29](https://github.com/rainu/dev-notes/issues/29)
* implements a new note type: reminder [#21](https://github.com/rainu/dev-notes/issues/21)
* implements mechanism for remembering the backup password [#27](https://github.com/rainu/dev-notes/issues/27)

### 0.9.10
* don't make app unusable after importing a file [#23](https://github.com/rainu/dev-notes/issues/23)
* implements a new backup mechanism for WebDAV [#18](https://github.com/rainu/dev-notes/issues/18)
* show export action buttons only after settings are valid [#24](https://github.com/rainu/dev-notes/issues/24)
* beautify button icons (dont squash them to the text)

### 0.9.9
* board settings moved to the bottom of the settings page
* file encryption settings moved to the footer
* note order will no be apply if there are no tags used
* file imports apply now the defined board- and note- order
* file exports contains now the note-order
* implements a new backup mechanism for dropbox [#15](https://github.com/rainu/dev-notes/issues/15)
* the board-order will no be applied [#19](https://github.com/rainu/dev-notes/issues/19)
* deletion of notes/boards causes no errors anymore [#20](https://github.com/rainu/dev-notes/issues/20)

### 0.9.8
* reduce application size (dont use the whole aws-sdk)
* implements a new backup mechanism for gist [#14](https://github.com/rainu/dev-notes/issues/14)

### 0.9.7
* implements the possibility to encrypt the backup files [#16](https://github.com/rainu/dev-notes/issues/16)

### 0.9.6
* implements a new backup mechanism for AWS S3 [#13](https://github.com/rainu/dev-notes/issues/13)

### 0.9.5
* implements new note types:
    * credentials [#4](https://github.com/rainu/dev-notes/issues/4):
    * camera(photo) [#6](https://github.com/rainu/dev-notes/issues/6):

### 0.9.4
* repair migration when crypto module is enabled

### 0.9.3
* placeholder can now have multiple types [#8](https://github.com/rainu/dev-notes/issues/8):
    * enum
    * flag 
    * text (default)
* preserve line breaks in text notes [#12](https://github.com/rainu/dev-notes/issues/12)

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

