# Project Name

  Political Profiler

## Team

  - __Product Owner__: Christopher Griffis
  - __Scrum Master__: Syed Jafri
  - __Development Team Members__: Andrey Azov, Cliff Saporta Cheng
  
## Legacy Team

  - __Product Owner__: Eric Kinger
  - __Scrum Master__: Charles Crame
  - __Development Team Members__: Nate Parrish, Zach Sebag

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 0.12.x
- Angular 1.4.x
- Angular-animate: 1.4.3
- Angular-loading-bar: 0.8.0
- Angular-mocks: 1.4.3
- Angular-ui-bootstrap: 0.13.3
- Angular-ui-router: 0.2.15
- Bluebird: 2.9.34
- Bootstrap: 3.3.5
- Bower: 1.4.1
- Browserify: 11.0.1
- Browserify-shim: 3.8.10
- D3: 3.5.6
- Debug: 2.2.0
- Del: 1.2.0
- Ejs: 2.3.3
- Express: 4.13.3
- Govtrack-node: 0.2.0
- Gulp: 3.9.0
- Gulp-autoprefixer: 2.3.1
- Gulp-browserify: 0.5.1
- Gulp-clean: 0.3.1
- Gulp-concat: 2.6.0
- Gulp-jshint: 1.11.2
- Gulp-sass: 2.0.4
- Gulp-sourcemaps: 1.5.2
- Gulp-uglify: 1.2.0
- Gulp-util: 3.0.6
- Karma: 0.13.8
- Karma-browserify: 4.3.0
- Karma-chrome-launcher: 0.2.0
- Karma-mocha: 0.2.0
- Path-parse: 1.0.5
- Serve-favicon: 2.3.0
- Underscore: 1.8.3
- Vinyl-buffer: 1.0.0
- Vinyl-source-stream: 1.1.0
- Vinyl-transform: 1.0.0

## Development

### Setup
Have `gulp` installed

Enter `npm start` in one terminal window

Run `gulp` in the root of the project in a different terminal window. This will start the `gulp watch` task, which runs js-hint and builds the project files in the public folder.

Every time a change is made in the client folder, the project will be re-built and placed in the public folder in real-time. One of the tasks automatically run by gulp watcher during this step is `browserify-dev`, which executes very quickly, but produces a huge concatenated js file. Therefore this is suitable (and convenient) only for development purposes. 

### Installing Dependencies

Have bower and node installed.

From within the root directory run:

```
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
