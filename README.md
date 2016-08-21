[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Homework : Command-Line Tool

<!-- MATERIALS METADATA -->
<!--
  title: 'Command-Line Tool'
  type: homework
  duration: ??
  creators: Matt Brendzel
  competencies: javascript
-->

## Setup

Before you begin, please fork this repo to your GitHub account, and then clone
that fork somewhere on your local machine.
Then, navigate to the root directory of the repository and run `npm install` --
this will download any dependencies that have been specified for this assignment
to a directory called `node_modules`.

As you work through this assignment, you should make commits regularly,
following our [commit guidelines](./commit-guidelines) as well as you can.
In particular, since there are automated tests built into this assignment, we
recommend that you make a commit every time that you pass a new test, in
addition to any other time you feel might be appropriate (e.g. just before
trying out something new).

## Instructions

Now that you're masters of using the terminal AND JavaScript, you're going to
help to write a JS-powered command line tool -- specifically, your job will be
to use your awesome new JavaScript skills to help this tool make decisions based
on the inputs it gets.

![Star Wars]()

> You may be getting the sense by now that we are a little bit obsessed with
> Star Wars.

The command line tool we're going to be creating will show Star Wars-related
content in the console when we type in the appropriate command.

Here is an example of what that will look like.

```bash
> node ./star-wars.js ls-films title year

'
Episode IV - A New Hope | 1977
Episode V - The Empire Strikes Back | 1980
Episode VI - Return of the Jedi | 1983
Episode I - The Phantom Menace | 1999
Episode II - Attack of the Clones | 2002
Episode III - Revenge of the Sith | 2005
Episode VII - The Force Awakens | 2015
'
```

Here's a more detailed description of the interface for this app.

| command     | purpose                                           | possible args                            |
|:-----------:|:-------------------------------------------------:|:-----------------------------------------|
| ls-films    | list info on the Star Wars films                  | title, year, director, rottentomatoes    |
| ls-worlds   | list info about planets in the Star Wars universe | name, climate, appearances, significance |
| lightsaber  | show an ASCII lightsaber in the console           | one 'word' of characters, without spaces |
| roll        | ???   Looks like you'll have to see for yourself  | none                                     |

This may seem daunting, but don't worry! A lot of the code for this app has
already been written. Your task is to complete the `routeCommand` function given
inside `command-center.js`, so that other code within the app can use it.

```js
var routeCommand = function(tokens, app){
  // Your Code Here
};
```

`routeCommand`'s purpose is to read the arguments that get passed in from
the command line. As you can see, it takes two arguments: `tokens` and
`appMethods`. `tokens` is an array of the various arguments given in the
command line. For instance, if we ran the imaginary command
`node ./star-wars.js whois Anakin Skywalker`
in the console, the `tokens` array would be
`['whois', 'Anakin', 'Skywalker']`.

> The reason the array is called 'tokens' is because in the context of
> parsing text, the term 'token' usually refers to a chunk of text that the
> parser is working with, especially when that chunk of text hasn't been
> identified yet.

The second argument, `app`, is an object that holds many methods for
doing things in the application; in a sense, you can think of `app` as an
interface -- a 'model' of the app as a whole -- through which we can access
the various different behaviors of the application. In fact, since `app` is an
interface through which we can programatically manipulate the application,
it might be appropriate to call `app` an **API**, or "application programming
interface".

Here is some documentation on the different methods available on `app`.

-   `listFilms(columnNames)` : Lists info on Star Wars films in the
    console. `columnNames` is an array of property names -- it allows us to
    choose which properties of the different films we want to see. Permitted
    column names are 'title', 'year', 'directors', and 'rottentomatoes'. If no
    columns are specified, this method will show all of the properties of each
    movie.

-   `listWorlds(columnNames)` : Lists planets that appear in the Star Wars
    films. As with `listFilms`, the values in `columnNames` determine which
    properties of the different worlds to show, and if no columns are specified,
    `listWorlds` will show all of the properties of each 'world'. Permitted
    column names are 'name', 'climate', 'appearances', and 'significance'.

-   `lightsaber(bladeChars)` : Prints an ASCII lightsaber in the console.
    `bladeChars` is string of characters that get used to draw the blade of the
    lightsaber.

-   `roll()` : What does this one do? It's a mystery! This function doesn't need
    any arguments. If you want to stop this function before it finishes running,
    type `CTRL` + `c` to kill the process.

### Testing Your Work

A set of automated tests, written in the [Mocha.js](https://mochajs.org/)
testing framework, has been provided for you with this assignment.
To run these tests, type `npm test` into the console from the root directory
of this repo. Test your work regularly, and read the feedback from the tests
carefully -- it may give you a clue about what to do next.

### Reach Target

Suppose that we wanted the ability to pass in two options flags
(e.g. the `-r` in `rm -r`) for the `ls-films` command:
`--before`, which would exclude films made in or after a certain year, and
`--after`, which would exclude films made in or before a certain year.

The code for doing the actual filtering has already been written into
`listFilms`, but in order for it to actually do the work, it needs to get an
extra argument, called `options`, in order to customize its behavior.
Specifically, if we wanted to show films made after 1980 but before 2000,
`options` would need to be `{ before: 1980, after: 2000 }`.

All you need to do is modify `command-center.js` so that it can parse those
flags, and their values, from the given list of tokens. Think you're up to the
task?

Tests have also been written for this reach target. To run them, use the
command `mocha test` -- this will run both the standard tests _and_ the tests
for handling options flags.

## Submitting Your Work

When you're ready to submit your work, push the code to your fork on GitHub.
Then, create an issue on the `wdi-remote-...` repo using the same convention
as before: "YourGitHubUsername -- Week XX Day XX". Be sure to add a link that
points to your fork to the issue!
