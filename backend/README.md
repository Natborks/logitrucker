# This is the node "server" for the backend

This backend server uses node and the ws npm package to update the locations of drivers for the logistics trucks.

## How it works

1. Keep a list of current drivers
2. every 2 seconds, find a random driver from the list of drivers and update their location

## Setup Instuctions

1. run `npm run buld` in your console
2. run `npm run start` in your console
