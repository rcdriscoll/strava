# Tour de Nerd™
Welcome to Tour de Nerd™! A full stack web application written in Svelte and NodeJS (Express) that allows users to view metrics of their overall performance within Strava.

## How to Run
1. Ensure Node version 22.19 (or greater) is downloaded on the machine https://nodejs.org/en/download
2. Clone down the repository into a local folder
3. From the command line navigate into the directory named 'server'
4. Perform the following command
   ```bash
   npm install
   ```
5. Once the installation is complete enter the following command to start the server. This should be running on port 3000
    ```bash
    node index.js
    ```
6. In a different terminal window navigate to the directory named 'client'
7. Perform the following command
   ```bash
   npm install
   ```
8. Once the installation is complete enter the following command to start the client. This should be running on port 5173
   ```bash
   npm run dev
   ```

## Tech Stack
- Svelte (SPA)
- Express JS (API)
- Strava (3rd party integration for data)
- 1 late night coffee
  
## Dependencies/Assumptions
- Node version 22.19.0
- Built and tested on Windows PC
