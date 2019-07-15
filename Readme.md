<p align="center">
  <img src="https://github.com/foxtroy-jay/DappChat/blob/master/App/src/assets/dappChat.jpg" width="350" title="DappChat">
</p>


DappChat is a real time messaging app hosted on the Ethereum blockchain. By storing our data on the blockchain, DappChat allows people from around the world to communicate permissionlessly and without restrictions. 

Many people around the world live in oppressive regimes and do not have the right of free speech. They are prevented from sharing literature, censored from current events, and prohibited from criticizing bad actors in their government. Our tool allows people to share information and peacefully coordinate, free from unwanted interference.

Install Instructions
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
