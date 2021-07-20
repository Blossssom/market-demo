const patentMarketAddress = '0x6e62f9d95C83B07dd32e59510E845bc634c4312F'; // NEED TO CHANGE
const patentNFTAddress = '0x4095Cd45E3Eeb03bf3cA8F9d730612D65AeD149C'; // NEED TO CHANGE
const saltCoinAddress = '0x9e11B47De9D5069ff7992e18Dc96378E4B4BbF53'; // NEED TO CHANGE
const patentMarketAbi = [
    "function getPatentCount() public view returns(uint)",
    "function getBidsCount(uint patentId) public view returns(uint)",
    "function getPatentsOf(address owner) public view returns(uint[] memory)",
    "function getCurrentBid(uint patentId) public view returns(uint256, address)",
    "function getPatentsCountOfOwner(address owner) public view returns(uint)",
    "function getPatentById(uint patentId) public view returns(string memory number, address owner, uint8 status, uint8 salesType, uint256 price, uint256 deadline)",
    "function registerPatent(string memory number, uint8 salesType, uint256 price, uint256 deadline) external",
    "function deletePatent(uint patentId) external",
    "function purchasePatent(uint patentId, uint256 amount) external",
    "function finalizePatent(uint patentId) external",
    "event PatentRegistered(address owner, uint patentId)",
    "event PatentDeleted(address owner, uint patentId)",
    "event PatentPurchased(address from, uint patentId)",
    "event PatentFinalized(address from, uint patentId)"
];
const patentNFTAbi = [
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function ownerOf(uint256 tokenId) external view returns (address owner)"
];
const saltCoinAbi = [
    "function name() external view returns (string memory)",
    "function symbol() external view returns (string memory)",
    "function decimals() external view returns (uint8)",
    "function totalSupply() external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export {patentMarketAddress, patentNFTAddress, saltCoinAddress};
export {patentMarketAbi, patentNFTAbi, saltCoinAbi};
