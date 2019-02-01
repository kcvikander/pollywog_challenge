# Minneapolis Art Institute Browser using React/Typescript 
### Installation
```
npm install
```

### Running
Running the following command in the base project directory will start the node server.
```
node index.js
```
It can be accesed via http://localhost:8888

### Approach
I decided to write the application in Typescript as I have Redux architecture pattern that I've been tweaking and improving over the last year and a half.  I also stuck with Redux over the new Context API as I haven't had much time to learn that yet and am much more familiar with Redux.  Both the MIA elastisearch and Material UI were new to me; the latter being what took up the majority of my time.  Once I found a good pattern to follow it made it easier to work with.

Redux persists the artwork metadata, but not the image itself.  Instead, the Node server handles image requests.  The first request it takes, it fetches the image file from the MIA API and saves it locally to serve on subsequent requests.


### Bonus Criteria Attempted
* Material UI theme customization
* While I didn't write explicit unit tests, the entire client app is strictly typed and passes compilation.