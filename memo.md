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

# 333. Executing Asynchronous Code
* compose: from redux, allows us to compose our own set of enhancers and middleware is just one kind of enhancer