# 154. Creating a Layout Component

* containers: are stateful components, which created with the class keyword or functional component using useState and components going into the components folder are dumb or presentational components that don't manage state

* assets: use this later once we add a logo

* hoc: for higher order component e.g. Aux component
  - Aux: auxiliary component
    - it's a functional component where I also won't manage any state with hooks
    - don't even have any JSX in this file


# 190. Understanding Http Requests in React

* not get back a new html page from server, instead back some json data or send some json data to the server.

# 253. Navigating to the Checkout Page

* withRouter(component) | react-router-dom
  - wrap our export with it, can get the history and match which are referred to the nearest match.

# 254. Navigating Back & To Next Page

* this.props.history.goBack()
  - the history prop also has a go back method, which I want to execute upon cancelling.
  - simply goes back to the last page

* this.props.history.replace('checkout/contactData')
  - replace the current route with checkout/contactData

# 255. Passing Ingredients via Query Params

* encodeURLComponent()
- which simply encodes my elements such that they can be used in the URL,

* new URLSearchParams()
-  interface defines utility methods to work with the query string of a URL.
-  can directly be used in a for...of structure, for example the following two lines are equivalent:
    ```
      for (const [key, value] of mySearchParams) {}
      for (const [key, value] of mySearchParams.entries()) {}
    ```
# 270. Handling User Input

* changed method should be a referenced to an anonymous function
```
changed={(event) => this.inputChangedHandler(event, formElement.id)}
```

# 271. Handling Form Submission

* onSubmit: which is the event handler that can use on the from

# 303. Executing Asynchronous Code
* compose: from redux, allows us to compose our own set of enhancers and middleware is just one kind of enhancer

# 326. Getting a Token from the Backend

  * sign up document
    https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  * get apiKey
    https://stackoverflow.com/questions/37337512/where-can-i-find-the-api-key-for-firebase-cloud-messaging

#  331. Accessing Protected Resource

  * Firebase - database / rules setting: to make an authentication required api
  ```
    {
      "rules": {
        "ingredients": {
            ".read": true,
            ".write": true
        },
        "orders": {
          ".read": "auth != null",
          ".write": "auth != null"
        }
      }
    }
  ```

# 338. Ensuring App Security

  * Exchange a refresh token for an ID token
  - https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
  - can enhance the user experience by using the refresh token,
    can essentially make sure the user is never logged out because as the refreshed token never expires,
    you can refresh the main token even after a week just check for the token being valid, it isn't, take the refresh token and get a new one.
  - but due to that security thing, I opted to not use it and I wanted to bring this to your attention.

# 340. Displaying User Specific Orders

  * orderBy="userId"&equalTo="${userId}": want to order by that user id property on our firebase data, and we only want to fetch the data where this key, user ID is equal to
  - orderBy: with a capital B that is a query parameter understood by firebase which allows us to well order our data.
  - "userId": this always refers to the key you're ordering by. should be enclosed in quotation marks, in double quotation marks.

  * [FireBase]
  - if you want to be able to filter data, have to adjust our rules to make a certain field indexable so that firebase can search through it.
  ```
    {
      "rules": {
        "ingredients": {
            ".read": true,
            ".write": true
        },
        "orders": {
          ".read": "auth != null",
          ".write": "auth != null",
          ".indexOn": ["userId"]     // ADD THIS LINE
        }
      }
    }
  ```

# 342. Useful Resources & Links

  * SPA Authentication in general:
  - https://stormpath.com/blog/token-auth-spa


# 347. Using Environment Variables

> config/env.js
  - NODE_ENV: it's automatically set for you and it is development if you in development mode.
  
# 355. What to test?

  1. Don't test the library
  2. Don't test complex connects
  3. Do test isolated units
  4. Do test your conditional outputs

# 356. Writing our First Test

  Install package
  1. jest
  2. enzyme: allows us to just render this navigation items component standalone independent of the entire other react application, is the whole idea behind the enzyme package, that we can really write unit tests, isolated test, test where we don;t need to render the complete react app.
  
  * install additional package to make it work correctly with jest and react
  1. react-test-renderer: is a dependency of enzyme which we need to install separately
  2. enzyme-adapter-react-16: is an adapter of the enzyme package to our current react version

  * describe(): 
  - not need to import to the file, it will automatically be made available in our create react app project
  - takes two arguments:
    1. description of the test bundle this file hold: is only what you'll see later in the console output, it should be something which allows you to identify which kind of tests we'll run here
    2. testing function: it's a normal javascript function

      2-1. it(): describes or allows you to write one individual test, also takes two arguments

        2-1-1. description(string): which will appear in the console
        Writing our First Test. testing function: which is something you want to test
          - configure()
          - Adapter
          >> execute configure and pass a javascript object to configure.
          - configure({adapter: new Adapter()});
          >> To make enzyme is connected

          2-1-1-1. shallow(): is the most popular or the best way of rendering react components inn many circumstances, and is the one use as often as possible because one thing shallow does is it renders the component with all its content but the content isn't deeply rendered.
            1. <NavigationItems />: pass a react element(JSX: which need to be converted to its react create element)

          2-1-1-2. expect(): is made globally available by jest, to define our the thing we want to check

            1. .find(): a utility function provided by enzyme defined method, allows us to look into the wrapper and see if it contains a certain content
            - argument is not a JSX element, it;s normal exported function from the NavigationItem file.

            2. .toHaveLength(2): a utility function provided by jest, can expect to find the NavigationItem two times if we're not authenticated

# 357. Testing Components Continued

  * beforeEach: will automatically be executed but for each of your tests, you also have an afterEach function to cleanup after all tests if you need do.
    -  is a helper method we can ues inside the describe function
    - constantly do the same
    - take a function as an argument

  * component.setProps({key: value})
    - is a helper method from the enzyme package
    - pass a javascript object