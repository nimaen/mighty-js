# Welcome to Mighty JS (MJS)

[![Build Status](https://travis-ci.org/Elium/mighty.svg?branch=master)](https://travis-ci.org/Elium/mighty)
[![Coverage Status](https://coveralls.io/repos/github/Elium/mighty/badge.svg?branch=master)](https://coveralls.io/github/Elium/mighty?branch=master)

## Preamble

MJS is context agnostic ORM written in pure JS.
It has been inspired by EmberData, Backbone models, js-data and Waterline.

## Why ?

When working on huge, enterprise size client side projects, you have to structure your application with good separation of concerns.
A good way to do it is to use the MVC pattern, or one of its variants.

The Model part is often misunderstood : developpers usually uses plain javascript objects without any mapping, validations, etc.

That's where MJS is going strong, look at all the features bellow.

## Installation

NodeJS is required. Use the folling commands to bootstrap your application :

- `npm install`
- `npm run build`

To launch tests :

- `npm test`

## Main features (preview)

### Models and ORM
- RESTful entities
- Schemas
- Inheritance
- Attributes
- Lifecycle callbacks
- Associations
- Query language

### Validation
- Basic rules
- Custom rules

### Adapters
- HTTP
- Web socket
- Local Storage
- Local Forage
- Firebase
- Parse
