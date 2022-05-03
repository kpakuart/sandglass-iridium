

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SandglassIridium is Context,  AccessControlEnumerable, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  Counters.Counter public _tokenIdTracker;

  string private _baseTokenURI;
  uint256 private _price; 
  uint private _max;
  address private _admin;
  address private _royaltyReceiver;
  uint96 private _royaltyFeesInBips;

  mapping (uint256 => address ) public minter;
  mapping (uint256 => bool) public skipToken;

  constructor(string memory name, string memory symbol, string memory baseTokenURI, uint max, address admin) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
        _price = 150000000000000000;
        _max = max;
        _admin = admin;
        _royaltyReceiver = admin;
        _tokenIdTracker.increment();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _royaltyFeesInBips = 500;
          
        /* set Invalid tokens due to ArWeave bundler issues */
        skipToken[35] = true;
        skipToken[350] = true;
        skipToken[351] = true;
        skipToken[352] = true;
        skipToken[353] = true;
        skipToken[354] = true;
        skipToken[354] = true;
        skipToken[187] = true;
        skipToken[203] = true;
        skipToken[306] = true;
        skipToken[340] = true;
        skipToken[341] = true;
        skipToken[342] = true;
        skipToken[343] = true;
        skipToken[345] = true;
        skipToken[379] = true;
        skipToken[517] = true;
        skipToken[591] = true;
        skipToken[616] = true;
        skipToken[659] = true;
        skipToken[745] = true;

        mint(12);
  }

  function _baseURI() internal view virtual override returns (string memory) {
      return _baseTokenURI;
  }

  function setBaseURI(string memory baseURI) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to change base URI");
    _baseTokenURI = baseURI;
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to change token URI");
    _setTokenURI(tokenId, _tokenURI);
  }

  function setPrice(uint mintPrice) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to change price");
    _price = mintPrice;
  }

  function price() public view returns (uint) {
    return _price;
  }

  function mint(uint amount) public payable {

    if (msg.sender != owner()) {
      require(msg.value == _price*amount, "Not enough avax in wallet to mint.");
      require(_tokenIdTracker.current() + amount <= _max, "Not enough tokens left to mint this amount.");
    }

    require(amount <= 20, "Only 20 can be minted at a time");
    
    for(uint i=0; i < amount; i++){

      /* Skip token if invalid */
      if (skipToken[_tokenIdTracker.current()] == true) {
        _tokenIdTracker.increment();
        amount++;
        continue;
      }
      _mint(msg.sender, _tokenIdTracker.current());
      minter[_tokenIdTracker.current()] = msg.sender;
      _tokenIdTracker.increment();

    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenMinter(uint256 tokenId) public view returns(address){
    return minter[tokenId];
  }

  function withdraw(address _recipient) public payable onlyOwner {
      require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to withdraw");
      payable(_recipient).transfer(address(this).balance);
  }

  function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
    return ERC721URIStorage._burn(tokenId);
  }

   function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }


  function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerable, ERC721, ERC721Enumerable) returns (bool) {
    return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
  }

  function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
    return (_royaltyReceiver, calculateRoyalty(_salePrice));
  }

  function calculateRoyalty(uint256 _salePrice) view public returns (uint256) {
    return (_salePrice / 10000) * _royaltyFeesInBips;
  }

  function setRoyalty(address _reciever, uint96 _royaltyFee ) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to change base URI");
    _royaltyReceiver = _reciever;
    _royaltyFeesInBips = _royaltyFee;
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {  
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), '.json'))
        : "";
  }
}