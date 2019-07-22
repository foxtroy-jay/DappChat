Instructions to have a working DappChat

1. Delete contracts folder in App/src/contracts

2. "npm i" on root directory and app directory (if you have permissions issues use "npm i --save -dev")

3. Download and open up Ganache (https://www.trufflesuite.com/ganache)

4. Compile contracts using command "truffle compile" (If you do not have truffle installed globally
   use "./node_modules/.bin/truffle compile")

5. Migrate using command "truffle migrage" (If you do not have truffle installed globally
   use "./node_modules/.bin/truffle migrate")

6. Create a .secret file in your root directory.

7. In Ganache, create a new workspace, and in the server section, change the port number to 8545 and save.

8. Copy and paste the 12 word mnemonic into the .secret file

9. Download Metamask extension for your browser and log in to Metamask using the Ganache seed account
   (12 word mnemonic from step 6)

10. Change metamask network to localhost 8545

11. "npm run start" in App folder
