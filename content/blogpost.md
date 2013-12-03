Also posted on my blog at [this link](http://whird.jpope.org/2013/12/02/simple-nodejs-express-server/).

Just for fun (and because I [mentioned](http://micro.fragdev.com/notice/932970) to @[jonkulp](http://micro.fragdev.com/jonkulp) that I would), here is a quick (plus slightly extended) write up on how to spin up a simple nodejs server with express.js.

First, install nodejs and npm, it's bundled together in [ArchLinux](https://www.archlinux.org/), not sure about other distros. In Debian, it looks like they are split. Also, in Debian, they have decided to rename the node executable to `nodejs`, which breaks some things. This is due to a package for a Ham Radio program being called [node](http://packages.debian.org/wheezy/node). If you don't have this `node` installed, you can "fix" nodejs by creating a symlink.

    $ sudo ln -s /usr/bin/nodejs /usr/bin/node

At the time of this writing, here are the versions that I have installed:

    $ node -v
    v0.10.22
    $ npm -v
    1.3.14

Once these are installed, we'll install `express` globally with:

    $ sudo npm install -g express

Next we need a directory where you would like to run the server so, create a directory where ever and navigate into it.

    $ mkdir express_server
    $ cd express_server

Express has a built in function to set things up for you simply. To write the basic files, install dependencies and start the server, run:

    $ express -c stylus
    $ npm install
    $ npm start

The server should start up and in the console it should say _"Express server listening on port 3000"_, which means you can navigate to <http://localhost:3000> with your browser to access the server.

So here is the start of your simple server. To edit the content on the page, edit the file `/views/index.jade`. This file is using [jade](http://jade-lang.com/) HTML short hand. If you've never used it before, there is a slight learning curve but, it's fairly easy to get the hang of. Be sure to look over the [tutorial](http://jade-lang.com/tutorial/) some.

Seeing that I like [markdown](http://daringfireball.net/projects/markdown/), let's go through adding it in since it is really damn easy. We'll add the line `"marked": "*"` to `/package.json` so that it looks similar to this:

    "dependencies": {
      "express": "3.4.6",
      "jade": "*",
      "stylus": "*",
      "marked": "*"
    }

This just tells npm that we want to use any version ("*") of "marked" within our app. Now we can run `npm install` and it'll pull in marked.

With this installed, lets create a directory to hold our markdown files, how about we call it `/content`. And within this content directory, lets create and edit a file called `index.md` and put some _content_ in there. Now we have to tell our `index.jade` file where to grab our markdown file with an "include":

    extends layout
    
    block content
      h1= title
      p Welcome to #{title}
      p.
        Here is a paragraph, just for the hell of it. There isn't much in this
        paragraph but, that is ok. Lemme add a <a href="http://example.org">link</a> 
        just for the hell of it also.
      include ../content/index.md

Now, head back to your browser and refresh the page, you should see the content that you added to the markdown file.

How about quickly adding in some style? I'm going to cheat here and just grab some [bootstrap](https://github.com/twbs/bootstrap/) css from <http://bootswatch.com>.

    $ cd public/stylesheets
    $ wget http://bootswatch.com/yeti/bootstrap.min.css

We'll need to link in the new css and we'll open up `/views/layout.jade` to do that. I added the line under the existing stylesheet line as such:

    link(rel='stylesheet', href='/stylesheets/bootstrap.min.css')

A refresh in the browser shows a little styling to the text. Let's keep going and add a navbar to the top. ;)

In a file `/views/navbar.jade`, I've entered:

    .navbar.navbar-inverse.navbar-fixed-top
      .container
        .navbar-header
          a(href='/', class='navbar-brand') Express

and saved the file. We then need to add this to the site layout (`/views/layout.jade`) so that it looks like this:

    doctype 5
    html
      head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        link(rel='stylesheet', href='/stylesheets/bootstrap.min.css')
      body
        include navbar.jade
        block content

And again, after refreshing the browser, there should be a static blue bar across the top. w00t!

Well, that's fancy but, what if you want to add another page to this simple server? Ok, let's add a page then. First, we'll create a couple of files and then add it to the webapp. We'll add an "about" page.

    $ touch views/about.jade

Next we'll edit the file at `/routes/index.js`, adding this to the bottom of the file:

    exports.about = function(req, res){
      res.render('about', { title: 'About Page' });
    };

Next, we've got to tell the web server about the page so, this gets added to ~line 34 in `/app.js`:

    app.get('/about', routes.about);

Once added, the server needs to be restarted (ctrl+c and `npm start` should do the trick). Now, navigating to <http://localhost:3000/about> should pull up a completely blank page. Let's fix the blankness. The first three lines in this file will be exactly like `/views/index.jade` and then we'll use a markdown file for the actual content. In the end, my `about.jade` looks like:

    extends layout
    
    block content
      include ../content/about.md

And for the `about.md` file, add in some content, I cheated again and grabbed some gobbledigook [lorem ipsum](http://jaspervdj.be/lorem-markdownum/). Now that we've got another page, lets add it to the navbar so that it can be accessed easily. In the end, my `navbar.jade` turned out like this:

    .navbar.navbar-inverse.navbar-fixed-top
      .container
        .navbar-header
          a(href='/', class='navbar-brand') Express
        ul(class='nav navbar-nav')
          li
            a(href='/about') About

Refresh the page in the browser and there you go. I simple website using nodejs (and expressjs, and markdown, and bootstrap...). In the end, I added this blog post as another page and uploaded the whole shebang to [github](https://github.com/jpope777/simple_express_server) for reference sake. If you have trouble anywhere along the line, at least you can check and see what I had done. 

    $ git clone https://github.com/jpope777/simple_express_server.git
    $ cd simple_express_server
    $ npm install
    $ npm start

;)
