# do-task

Minimal task runner for NodeJS

Please &#9733; this repo if you found it useful &#9733; &#9733; &#9733;


## Features

* Works with any build tool


## Installation

```sh
npm install --save do-task
```


## Dependencies

* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)


## Usage

* JavaScript

    ```js
    import myTask from './my-task';
    import { run } from 'do-task';
    
    run(myTask).then(() => {
        console.log('Yay, myTask finished');
    });
    ```
    
* Command Line

    ```sh
    node ./node_modules/do-task/bin/do-task run my-task
    ```


## Support

Submit an [issue](https://github.com/jamrizzi/do-task/issues/new)


## Buy Me Coffee

A ridiculous amount of coffee was consumed in the process of building this project.

[Add some fuel](https://pay.jamrizzi.com) if you'd like to keep me going!


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

[MIT License](https://github.com/jamrizzi/do-task/blob/master/LICENSE)

[Jam Risser](https://jamrizzi.com) &copy; 2017


## Credits

* [Jam Risser](https://jamrizzi.com) - Author


## Changelog

0.0.1 (2017-06-20)
* Initial release
