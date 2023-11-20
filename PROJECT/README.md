# Ticketing Project #

We are creating a ticketing platform that takes care of everything from end to end. It allows venues to create seat maps and issue tickets for it, allows users to buy and resell those tickets, and allows concessions to be packaged with tickets as well. The system is meant to be used in anything from a small fundraising gala to selling tickets for Taylor Swift’s Eras tour.

## Dev ##
Dev mode cannot be run on department servers, because they do not support react or npm

To start dev mode locally

Start server
`cd project\backend`
`npm install`
`npm start`
This starts the local dev server, which uses the local db
This db might not have all of the data from production db

Start react
`cd project\frontend`
`npm install`
`npm start`

## PROD ##
This isn't actually PROD, just running on department servers

Build react
`cd project\frontend`
`npm run build`

Node doesn't need to build for this purpose

Then commit the changes to main, including all changes to the build folder in frontend

ssh into your department server and pull from repo

Run Prod
`cd project\backend`
`sh ./remote-start.sh`

