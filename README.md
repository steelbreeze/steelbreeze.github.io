## Build instructions
1. Compile the TypeScript into JavaScript with the following command; all the compiler settings are in the file tsconfig.json
```
   tsc -p .
```
2. Package the JavaScript into a form that can be used in the browser with the following command; all the settings are in the file webpack.config.json
```
   webpack
```
## Tools required
TypeScript: https://www.typescriptlang.org

WebPack: https://webpack.js.org
### Recommended
Visual Studio Code https://code.visualstudio.com


## Development shortcuts
The demo application data for the "Mythical bank" is bundled within the JavaScript code. This should be dynamically loaded by the browser.

## Development notes
The functions: ```exists```, ```distinct```, ```permutations```, ```select```, ```where```, ```selectMany``` are all *deferred execution* operations, meaning they do not consume their inputs until their outputs are consumed. This has two important points to note:

1. Algorithms built using these functions can *fail fast*.
2. You can only iterate over the results of these operations once. For results that you need to iterate over more than once, wrap in ```toArray```.

As this layout optimisation process can be expensive, the ```bruteForce``` method is *O*(n!), I have used tricks such as *reverse for* loops to try and squeeze every ounce of performance.