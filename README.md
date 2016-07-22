![blocChat](https://github.com/jstruthers/blocChat/blob/master/public/images/logo.png "blocChat")
#### A Simple Chat App
---

**blocChat** uses [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), and [Meteor](https://www.meteor.com/) to allow users to create chat rooms and send messages.

This was an exercise in learning the Meteor framework, as well as how to integrate Meteor with React and Redux.
Meteor is undergoing some changes right now. They're trying to get away from the proprietary model they began with
to create a more open and flexible environment. Right now, integration with React is cumbersome, as Meteor is built
to rely heavily on their [Blaze templating engine](https://guide.meteor.com/blaze.html). There are a lot of monkey patch
libraries out there to patch the gap, but I don't think it will be long before integrating third party templating engines
and routers will be easier.

Redux is implemented using [Meteor Methods](https://guide.meteor.com/methods.html), which allow for secure communication
between the Redux store and actions and the Meteor/mongo collections. Meteor's [pub/sub](https://guide.meteor.com/data-loading.html#publications-and-subscriptions)
methods are used to update the client whenever a mongo collection is altered.

Feel free to mess around with this. Let me know if you have any suggestions or input :)
