// SPDX-License-Identifier: GPL-3.0
// License identifier for this Solidity contract.

pragma solidity >=0.7.0 <0.9.0;
// Specifies the compiler version range for the contract.

contract Verification {
    // Contract to manage document verification with IPFS integration and exporter authorization.

    constructor() { 
        owner = msg.sender; 
    }
    // Constructor sets the deployer of the contract as the owner.

    uint16 public count_Exporters = 0;
    // Counter for the total number of authorized exporters.

    uint16 public count_hashes = 0;
    // Counter for the total number of document hashes added.

    address public owner;
    // Address of the contract owner.

    // Structure to store document information.
    struct Record {
        uint blockNumber; // Block number when the document was added.
        uint minetime; // Timestamp of when the document was added.
        string info; // Exporter information.
        string ipfs_hash; // IPFS hash of the document.
    }

    // Structure to store exporter information.
    struct Exporter_Record {
        uint blockNumber; // Block number when the exporter was authorized.
        string info; // Exporter details.
    }

    // Mapping to store document hashes and their associated records.
    mapping (bytes32 => Record) private docHashes;

    // Mapping to store exporters and their associated records.
    mapping (address => Exporter_Record) private Exporters;

    //---------------------------------------------------------------------------------------------------------//
    // Modifiers to enforce access control and validation.

    modifier onlyOwner() {
        // Ensures that only the owner can call certain functions.
        if (msg.sender != owner) {
            revert("Caller is not the owner");
        }
        _;
    }

    modifier validAddress(address _addr) {
        // Ensures that the provided address is valid (not zero address).
        assert(_addr != address(0));
        _;
    }

    modifier authorised_Exporter(bytes32 _doc) {
        // Ensures that the caller is authorized to edit a specific document.
        if (keccak256(abi.encodePacked((Exporters[msg.sender].info))) != keccak256(abi.encodePacked((docHashes[_doc].info)))) {
            revert("Caller is not authorised to edit this document");
        }
        _;
    }

    modifier canAddHash() {
        // Ensures that the caller is an authorized exporter.
        require(Exporters[msg.sender].blockNumber != 0, "Caller not authorised to add documents");
        _;
    }

    //---------------------------------------------------------------------------------------------------------//

    // Function to authorize a new exporter.
    function add_Exporter(address _add, string calldata _info) external onlyOwner { 
        assert(Exporters[_add].blockNumber == 0);
        Exporters[_add].blockNumber = block.number;
        Exporters[_add].info = _info;
        ++count_Exporters;
    }

    // Function to remove an exporter.
    function delete_Exporter(address _add) external onlyOwner {
        assert(Exporters[_add].blockNumber != 0);
        Exporters[_add].blockNumber = 0;
        Exporters[_add].info = "";
        --count_Exporters;
    }

    // Function to update the information of an existing exporter.
    function alter_Exporter(address _add, string calldata _newInfo) public onlyOwner {
        assert(Exporters[_add].blockNumber != 0);
        Exporters[_add].info = _newInfo;
    }

    // Function to transfer ownership of the contract.
    function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        owner = _newOwner;
    }

    // Event emitted when a document hash is added.
    event addHash(address indexed _exporter, string _ipfsHash);

    // Function to add a new document hash.
    function addDocHash(bytes32 hash, string calldata _ipfs) public canAddHash {
        assert(docHashes[hash].blockNumber == 0 && docHashes[hash].minetime == 0);
        Record memory newRecord = Record(block.number, block.timestamp, Exporters[msg.sender].info, _ipfs);
        docHashes[hash] = newRecord; 
        ++count_hashes;
        emit addHash(msg.sender, _ipfs);
    }

    // Function to retrieve document hash details.
    function findDocHash(bytes32 _hash) external view returns (uint, uint, string memory, string memory) {
        return (docHashes[_hash].blockNumber, docHashes[_hash].minetime, docHashes[_hash].info, docHashes[_hash].ipfs_hash);
    }

    // Function to delete a document hash.
    function deleteHash(bytes32 _hash) public authorised_Exporter(_hash) canAddHash {
        assert(docHashes[_hash].minetime != 0);
        docHashes[_hash].blockNumber = 0;
        docHashes[_hash].minetime = 0;
        --count_hashes;
    }

    // Function to retrieve information of a specific exporter.
    function getExporterInfo(address _add) external view returns (string memory) {
        return (Exporters[_add].info);
    }
}