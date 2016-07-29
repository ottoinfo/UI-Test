UI Test Project
===============

Working Example [GitHub App](https://ottoinfo.github.io/UI-Test/)

Check WebBrowser Console for JSON Data ( Need to move into a Alert )

[CodePen Challenge](http://codepen.io/ottoinfo/pen/RRBKZR)

Trying to create something that looks like this

![alt tag](http://i.imgur.com/047pCX3.png)

I thought this was going to be a simple 30 minute challenge. Granted once I saw what was being asked I knew it would take some time and sure why not. For me it took 5-6 hours. It wasn't stated what should be used, but I figured it should be React and my default tools.

What I found wrong with this initally?
--------------------------------------

Why have first & last name if they are not required? I would figure these field are used for email Template, but if they are not need remove the fields or let the user know that the email will be adressed to "Dear Roomate,".

I can't draw seperation from which roomate I am Deleting/Removing. I tried to add the first & last name to the field but still think we should add more padding or seperation between roomates. Maybe as simple as adding 'Remove Roomate #1'. Also I thought you should be able to remove any roomate, not just any after the first roommate.

Scrolling issues. Five is a lot and should I put roommates in a DIV that scrolls or once again just eliminate first and last name fields? With five users the form would be off the screen.

Why didn't you use images? Normally I would have for the "X" & "+" but didn't feel necessary for a code sample.

Should we store or create roomates join table. So when users join the site we can easily associate them to "invitees".

What Did you use for this?
--------------------------

Not Codepen. First I didn't want to try to work in limited real estate and I thought this was more then a prototype example. To me this is definetly a ***"FEATURE"***. I wanted to write this in a way that I could see my code and demonstrate how I normally work. I also didn't want to have to use CDN's for the code sources I wanted.

[Webpack](https://github.com/webpack) for building and testing server. I spent probably a hour setting up this portion. Just making sure I had all the assets needed and build would succeed.

[Mobx](https://github.com/mobxjs/mobx) and [Mobx-React](https://github.com/mobxjs/mobx-react) for state management. I created a STORE and a basic MODEL with validation inside the MODELS. I will reset the @observable errors ( object ) before validation and write keys with error values to the object if validation doesn't pass.

[React-Motion](https://github.com/chenglou/react-motion) is someting I have been trying to use lately. Helps aleviate unreliable animations.

Features:
  * Validate all fields and error messaaging ( first & last check length ) ( email uses general regex )
  * Validate only when user clicks "Send invites"
  * Remove all users and "Send invites" button disappears
  * Add 5 users and "Add another roommate" button disappears

***BUGS*** 
---------
  * Not clearing out current roommates. Just not worried currently
  * WIP: If you delete a user in the middle or before app will INDEX incorrectly

Install/Run Locally
-------------------
open Terminal

Install Node Modules

```npm install```

This will start up [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) on [localhost:8080](http://localhost:8080)

```npm run dev```


-- OR --

Build and Run
```
npm i serve -g
npm run build
serve dist/
```