Heroku Uptime Server
===

I wrote a server in Node.JS to provide an API for the "heroku ps" uptime command. It simply parses the result of that command's stdout and throws that in a JSON object. Probably not the best way to do this, but whatever.

Built for [ship.io](ship.io).
