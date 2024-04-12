Assignment #2: Chainlink Price Feeds Deployed to Avalanche Fuji Testnet

Submitted by: Ciel Recuerdo [101439257]
Submitted On: April 10, 2024 10:00

### Project Setup
1. npm install
2. Add .env file in the root folder and add the following:  QUICKNODE_URL, PRIVATE_KEY, REACT_APP_CONTRACT_ADDRESS
3. npx hardhat compile
4. npx hardhat run scripts/deploy.js --network fuji
5. Copy the deployed contract address to .env REACT_APP_CONTRACT_ADDRESS
6. npm run start    http://localhost:3000

### Sample UI Flows
https://www.loom.com/share/83a72dab1c9941fd94e2454f1f811c1e

### Features and Fixes
1. Chainlink Data Feeds with 4 conversion pairs and deployed to Avalanche Fuji Testnet
2. Spinner while waiting for fetched price feeds
3. Validations
4. Fixed dotenv error for contract address retrieved at App.js
https://create-react-app.dev/docs/adding-custom-environment-variables/

