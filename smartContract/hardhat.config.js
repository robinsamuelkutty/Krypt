// https://eth-sepolia.g.alchemy.com/v2/LFmYyTwQaNIANTSNtl9J8
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/LFmYyTwQaNIANTSNtl9J8',
      accounts: ['28dff569154efd645a794ce821aa913f321a89cbbae6a7684b07fd26f17b618b'],
    },
  },
};