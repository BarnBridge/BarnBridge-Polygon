import { ethers } from 'hardhat';

export const mineBlocks = async (blocks: number): Promise<void> => {
  const blockBefore = await ethers.provider.getBlock('latest');
  for (let f = 0; f < blocks; f++) {
    await ethers.provider.send('evm_mine', []);
  }
};
