const patentMarketAddress = '0x99CAEDCDAc9860299a54838051A0FDd947183C9A'; // NEED TO CHANGE
const patentNFTAddress = '0xFE084f058bfC051626F4e10ae2ED2855D0ceB9c7'; // NEED TO CHANGE
const saltCoinAddress = '0xB405dad8b6C31E96E78741dF7C24c3EeD0316c65'; // NEED TO CHANGE
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
