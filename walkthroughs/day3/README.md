## ReactJS Bootcamp Day 3

###### React Component State
<img src="http://facebook.github.io/react/img/logo.svg" alt="react" width="100" />
<dl>
  <dt>
      <h5>What we will be covering</h5>
  </dt>
  <dd>Component State and more on Lifecycle</dd>
  <dd>Manipulating State</dd>
  <dd>How components can store their data</dd>
  <dd>Add logic to our application for handling data via a promise</dd>
  <dd>Start fixing up the header a bit</dd>
</dl>

######Component State
At the end of Day2 we addd some state logic into MovieTile.jsx to hold data about a movie's rating. Now we will dive into React's component state and proper usage of state.

One must be very careful when working with state as you can wind up with hard to debug code and spaghetti logic. State gets especially hairy when multiple components rely on a property of some sort of global state. It is always best to avoid shared global state when possible. So a good way to think about this is for MovieTile it had this.state.stars for rating. But nowhere else in the application do we care what a movie's rating is. Sure the static mock data has a rating value but if MovieTile owns the concern of rating a movie why not just let MovieTile edit it's own stars and propagate that data up to wherever it may live. That way if there is an issue with this.state.stars we know where it is coming from. And also there is a huge benefit of keeping state as simple types. Notice how the MovieTile doesn't store the whole movie on state. Only what it needed to perform changes - stars.

######Getting into the core concept of React's state
React State is immutable in its own right but you can update a components state using `this.setState({})` which is an asynchronous method to update state. React will see the invocation of this method and later update state and call `render()`. So you can have multiple properties on state and update a single prop with `this.setState({prop1: false})` and the other props will still exist and remain the same value. Remeber to keep in mind as with any framework the less data on state the easier it is to test.

######Update State
As mentioned we can update state through `this.setState({})` but because that triggers a rerender we can not update state in render's lifecycle.  A good place for state to update is with dom events or maybe ajax call completion etc. 

######Pure Rendering
We can also tell React not to rerender on all state changes by using `shouldComponentUpdate(nextProps, nextState)`. This is a powerful tool and is actually use in React's `pureRenderMixin` located <a href="https://github.com/facebook/react/blob/531e6280a357515512dbcefe9170dbd8bf109d4a/src/addons/ReactComponentWithPureRenderMixin.js">here</a>

```
//code for convenience 
/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
};
```


<h5><a href="https://github.com/westeezy/ReactJS-Bootcamp/blob/master/agendas/day4.md">Link to Day 4 - React Forms and Events</a></h5>
