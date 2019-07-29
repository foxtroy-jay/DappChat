<p align="center">
  <img src="https://github.com/xMNG/dappchatwebsite/blob/master/img/tech/dappchatWhiteBg.png" width="350" title="DappChat">
</p>


DappChat is a real time messaging app hosted on the Ethereum blockchain. By storing our data on the blockchain, DappChat allows people from around the world to communicate without restrictions. 

Many people around the world live in oppressive regimes and do not have the right of free speech. They are prevented from sharing literature, censored from current events, and prohibited from criticizing bad actors in their government. Our tool allows people to share information and peacefully coordinate, free from unwanted interference.

----
Instructions to have a working DappChat

----

1. "npm i" on root directory and app directory

2. Download and open up Ganache (https://www.trufflesuite.com/ganache)

3. Compile contracts using command "truffle compile" (If you do not have truffle installed globally
   use "./node_modules/.bin/truffle compile")

4. Migrate using command "truffle migrate" (If you do not have truffle installed globally
   use "./node_modules/.bin/truffle migrate")

5. Create a .secret file in your root directory.

6. In Ganache, create a new workspace, and in the server section, change the port number to 8545 and save.

7. Copy and paste the 12 word mnemonic from Ganache into the .secret file

8. Download Metamask extension for your browser and log in to Metamask using the Ganache seed account
   (12 word mnemonic from step 6)

9. Change metamask network to localhost 8545

10. "npm run start" in App folder
