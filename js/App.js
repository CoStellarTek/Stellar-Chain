// Your IPFS API key from Infura.io
const projectId = "28LuNAotbXzcvtpOcE9F8ayKOeP";  // Replace with your own Infura project ID

// Your API secret from Infura.io (ALSO KEEP THIS SECRET API SOMEWHERE NOT EXPOSED IN PUBLICS)
const projectSecret = "3de3d9c099c6c0c168e39b8bc03e2f7a";  // Replace with your own Infura project secret

// Defines the contract information
window.CONTRACT = {
  // The contract's Ethereum address
  address: "0x736B3311844fCc222c9d4D98F7871EfD5eD1576F",  // Replace with the actual contract address

  // Network URL for Sepolia (test network) used in this case
  network: "https://sepolia.etherscan.io",  // Replace with the appropriate network URL for your project

  // URL to explore transactions on Sepolia via Etherscan
  explore: "https://sepolia.etherscan.io",  // Replace with the appropriate block explorer URL for your network

  // Your Contract ABI
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_exporter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "addHash",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_ipfs",
          "type": "string"
        }
      ],
      "name": "addDocHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_info",
          "type": "string"
        }
      ],
      "name": "add_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_newInfo",
          "type": "string"
        }
      ],
      "name": "alter_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "count_Exporters",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "count_hashes",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "deleteHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        }
      ],
      "name": "delete_Exporter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "findDocHash",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        }
      ],
      "name": "getExporterInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
};

// Login function to connect to the Ethereum wallet
async function connect() {
  // Check if the Ethereum object (MetaMask) is available in the browser
  if (window.ethereum) {
    try {
      // Request the user to connect their wallet and select an account
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts", // Request user's Ethereum accounts
        })
        .then((accounts) => {
          return accounts[0]; // Return the first account from the list of accounts
        })
        .catch(() => {
          // If no account is selected or an error occurs, throw an error
          throw Error("No account selected");
        });

      // Set the selected account address to the global userAddress variable
      window.userAddress = selectedAccount;
      console.log(selectedAccount);

      // Store the user's address in local storage for later use
      window.localStorage.setItem("userAddress", window.userAddress);

      // Reload the page to update UI with the selected account
      window.location.reload();
    } catch (error) {
      // Handle any error that occurs during the account selection process
      console.error(error);
    }
  } else {
    // If Ethereum (MetaMask) is not available, disable the file upload button and input
    $("#upload_file_button").attr("disabled", true);
    $("#doc-file").attr("disabled", true);
    
    // Show a warning message for not detecting a wallet
    document.querySelector(".alert").classList.remove("d-none");
  }
}

// Asynch function for the system to read various things like html func and metamask parts
window.onload = async () => {
  // When the page loads, execute this function asynchronously

  // Check if the current page is "verify.html"
  if (window.location.href.indexOf("verify.html") > -1) {
    $("#loader").hide(); // Hide the loader element
    $(".loader-wraper").fadeOut("slow"); // Smoothly fade out the loader wrapper

    // Check the URL for a document hash and disable the upload button initially
    $("#upload_file_button").attr("disabled", true);
    checkURL(); // Function to validate or process the URL
  }

  // Initial UI setup: hide login button, recent header, and loader
  $("#loginButton").hide();
  $("#recent-header").hide();
  $(".loader-wraper").fadeOut("slow");
  hide_txInfo(); // Function to hide transaction information
  $("#upload_file_button").attr("disabled", true); // Disable the upload button initially

  // Retrieve the user's address from local storage (if previously logged in)
  window.userAddress = window.localStorage.getItem("userAddress");

  // Check if MetaMask (or another Ethereum provider) is installed
  if (window.ethereum) {
    // Initialize Web3 instance using MetaMask provider
    window.web3 = new Web3(window.ethereum);

    // Connect to the smart contract using ABI and address
    window.contract = new window.web3.eth.Contract(
      window.CONTRACT.abi, // Contract ABI
      window.CONTRACT.address // Contract address
    );

    // Check if the user is logged in by validating the length of the stored address
    if (window.userAddress.length > 10) {
      // Show logout button and hide login button
      $("#logoutButton").show();
      $("#loginButton").hide();

      // Display the user's Ethereum address with an explorer link
      $("#userAddress").html(
        `<i class="fa-solid fa-address-card mx-2 text-primary"></i>${truncateAddress(
          window.userAddress
        )}
         <a class="text-info" href="${window.CONTRACT.explore}/address/${
          window.userAddress
        }" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-square-arrow-up-right text-warning"></i></a>`
      );

      // If the admin page is being viewed, fetch document/exporter counters
      if (window.location.pathname == "/admin.html") await getCounters();

      // Fetch additional user and blockchain information
      await getExporterInfo();
      await get_ChainID();
      await get_ethBalance();

      // Display exporter information
      $("#Exporter-info").html(
        `<i class="fa-solid fa-building-columns mx-2 text-warning"></i>${window.info}`
      );

      // Start listening for blockchain events after a short delay
      setTimeout(() => {
        listen();
      }, 0);
    } else {
      // User not logged in: update UI accordingly
      $("#logoutButton").hide();
      $("#loginButton").show();
      $("#upload_file_button").attr("disabled", true); // Disable upload button
      $("#doc-file").attr("disabled", true); // Disable document file input
      $(".box").addClass("d-none"); // Hide additional UI elements
      $(".loading-tx").addClass("d-none"); // Hide transaction loader
    }
  } else {
    // No Ethereum provider detected (e.g., MetaMask not installed)
    $("#logoutButton").hide();
    $("#loginButton").hide();
    $(".box").addClass("d-none"); // Hide additional UI elements
    $("#upload_file_button").attr("disabled", true); // Disable upload button
    $("#doc-file").attr("disabled", true); // Disable document file input

    // Display an alert message about the missing MetaMask installation
    document.querySelector(".alert").classList.remove("d-none");

    // Uncomment these lines to redirect users to the MetaMask download page
    // alert("Please download MetaMask extension first.\nhttps://metamask.io/download/");
    // window.location = "https://metamask.io/download/";
  }
};

// Verifies hash here
async function verify_Hash() {
  //Show the loading
  $("#loader").show();

  if (window.hashedfile) {
    /*   I used the contract address (window.CONTRACT.address) as the caller of the function 'findDocHash'
        you can use any address because it used just for reading info from the contract
    */
    await contract.methods
      .findDocHash(window.hashedfile)
      .call({ from: window.userAddress })
      .then((result) => {
        $(".transaction-status").removeClass("d-none");
        window.newHash = result;
        if ((result[0] != 0) & (result[1] != 0)) {
          //Doc Verified
          print_verification_info(result, true);
        } else {
          //Doc not Verified
          print_verification_info(result, false);
        }
      });
  }
}

// Checks current url of the page
function checkURL() {
  // Get the current URL of the page
  let url_string = window.location.href;

  // Create a URL object from the current URL
  let url = new URL(url_string);

  // Extract the "hash" parameter from the URL's query string
  window.hashedfile = url.searchParams.get("hash");

  // If no "hash" parameter is found, exit the function
  if (!window.hashedfile) return;

  // If a "hash" parameter is found, proceed to verify it
  verify_Hash();
}

// Function to generate a SHA3 hash from a selected file
async function get_Sha3() {
  // Display a note to the user indicating that hashing is in progress
  $("#note").html(`<h5 class="text-warning">Hashing Your Document...</h5>`);
  // Enable the upload button
  $("#upload_file_button").attr("disabled", false);
  console.log("file changed"); // Log that a file input change has been detected

  // Retrieve the first file selected by the user
  var file = await document.getElementById("doc-file").files[0];
  // Check if a file was selected
  if (file) {
    var reader = new FileReader(); // Create a FileReader to read the file's content
    // Read the file as a UTF-8 encoded text
    reader.readAsText(file, "UTF-8");
    // Event handler for when the file is successfully read
    reader.onload = async function (evt) {
      // Generate a SHA3 hash from the file content using Web3.js utility
      window.hashedfile = await web3.utils.soliditySha3(evt.target.result);
      // Log the resulting hash to the console
      console.log(`Document Hash : ${window.hashedfile}`);

      // Update the note to indicate the document has been successfully hashed
      $("#note").html(
        `<h5 class="text-center text-info">Document Hashed</h5>`
      );
    };

    // Event handler for file reading errors
    reader.onerror = function (evt) {
      console.log("error reading file"); // Log the error
      return false; // Exit the function with an error state
    };
  } else {
    // If no file was selected, clear any existing hash and exit
    window.hashedfile = null;
    return false; // Indicate the process was unsuccessful
  }
}

// Print verifications pulled from Sepolia Network for hash confirmation
function print_verification_info(result, is_verified) {
  // Set default image for documents that are not verified
  document.getElementById("student-document").src = "./assets/images/misc/notvalid.svg";

  // Hide the loader initially
  $("#loader").hide();

  // Case: Document not verified
  if (!is_verified) {
    // Hide the download button as the document is not verified
    $("#download-document").hide();

    // Display status message indicating that the certificate is not verified
    $("#doc-status").html(`<h3 class="text-danger">
        Certificate not Verified
        <i class="text-danger fa fa-times-circle" aria-hidden="true"></i>
        </h3>`);

    // Display the hash of the uploaded document
    $("#file-hash").html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );

    // Hide additional verification details since the document is not valid
    $("#college-name").hide();
    $("#contract-address").hide();
    $("#time-stamps").hide();
    $("#blockNumber").hide();

    // Show the transaction status section
    $(".transaction-status").show();
  } else {
    // Case: Document verified

    // Show the download button for the verified document
    $("#download-document").show();

    // Display additional details since the document is valid
    $("#college-name").show();
    $("#contract-address").show();
    $("#time-stamps").show();
    $("#blockNumber").show();

    // Convert the blockchain timestamp (seconds since epoch) to a readable date
    var t = new Date(1970, 0, 1);
    t.setSeconds(result[1]); // Add the timestamp
    console.log(result[1]);
    t.setHours(t.getHours() + 3); // Adjust time zone if necessary

    // Update the status to indicate successful verification
    $("#doc-status").html(`<h3 class="text-info">
         Certificate Verified Successfully
         <i class="text-info fa fa-check-circle" aria-hidden="true"></i>
        </h3>`);

    // Display the file hash
    $("#file-hash").html(
      `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
        window.hashedfile
      )}`
    );

    // Display the college name obtained from the verification result
    $("#college-name").html(
      `<span class="text-info"><i class="fa-solid fa-graduation-cap"></i></span> ${result[2]}`
    );

    // Display the contract address of the blockchain used for verification
    $("#contract-address").html(
      `<span class="text-info"><i class="fa-solid fa-file-contract"></i> </span>${truncateAddress(
        window.CONTRACT.address
      )}`
    );

    // Display the timestamp of the document verification
    $("#time-stamps").html(
      `<span class="text-info"><i class="fa-solid fa-clock"></i> </span>${t}`
    );

    // Display the block number containing the document's information
    $("#blockNumber").html(
      `<span class="text-info"><i class="fa-solid fa-cube"></i></span> ${result[0]}`
    );

    // Set the verified document's image source using IPFS
    document.getElementById(
      "student-document"
    ).src = `https://ipfs.io/ipfs/${result[3]}`;

    // Set the download link for the verified document
    document.getElementById("download-document").href =
      document.getElementById("student-document").src;

    // Show the transaction status section
    $(".transaction-status").show();
  }
}

// Hides text info
function hide_txInfo() {
  $(".transaction-status").addClass("d-none");
}

// Shows text info
function show_txInfo() {
  $(".transaction-status").removeClass("d-none");
}

// Function to retrieve and display the user's Ethereum balance
async function get_ethBalance() {
  // Use Web3.js to fetch the balance of the current user's address
  await web3.eth.getBalance(window.userAddress, function (err, balance) {
    if (err === null) {
      // If no error, convert the balance from Wei to Ether and display it
      $("#userBalance").html(
        "<i class='fa-brands fa-gg-circle mx-2 text-danger'></i>" +
          web3.utils.fromWei(balance).substr(0, 6) + // Display only the first 6 characters for brevity
          ""
      );
    } else {
      // If there is an error, display 'n/a' as the balance
      $("#userBalance").html("n/a");
    }
  });
}

// Check if the Ethereum provider (e.g., MetaMask) is available
if (window.ethereum) {
  // Listen for changes in the connected Ethereum accounts
  window.ethereum.on("accountsChanged", function (accounts) {
    // Call the connect function to handle the updated accounts
    connect();
  });
}

// Function to display transaction and upload information on the UI
function printUploadInfo(result) {
  // Display the transaction hash as a clickable link to view on a blockchain explorer (e.g., Polygon Scan)
  $("#transaction-hash").html(
    `<a target="_blank" title="View Transaction at Polygon Scan" href="${window.CONTRACT.explore}/tx/` +
      result.transactionHash +
      '"><i class="fa fa-check-circle font-size-2 mx-1 text-white mx-1"></i></a>' +
      truncateAddress(result.transactionHash)
  );

  // Display the file's hash in the UI
  $("#file-hash").html(
    `<i class="fa-solid fa-hashtag mx-1"></i> ${truncateAddress(
      window.hashedfile
    )}`
  );

  // Display the contract address involved in the transaction
  $("#contract-address").html(
    `<i class="fa-solid fa-file-contract mx-1"></i> ${truncateAddress(
      result.to
    )}`
  );

  // Display the current timestamp in a readable format
  $("#time-stamps").html(
    '<i class="fa-solid fa-clock mx-1"></i>' + getTime()
  );

  // Display the block number in which the transaction was confirmed
  $("#blockNumber").html(
    `<i class="fa-solid fa-link mx-1"></i>${result.blockNumber}`
  );

  // Display the hash of the block containing the transaction
  $("#blockHash").html(
    `<i class="fa-solid fa-shield mx-1"></i> ${truncateAddress(
      result.blockHash
    )}`
  );

  // Display the blockchain network ID
  $("#to-netowrk").html(
    `<i class="fa-solid fa-chart-network"></i> ${window.chainID}`
  );
  $("#to-netowrk").hide(); // Optionally hide this element if not needed on the UI

  // Display the gas used for the transaction in Gwei
  $("#gas-used").html(
    `<i class="fa-solid fa-gas-pump mx-1"></i> ${result.gasUsed} Gwei`
  );

  // Hide the loader after the transaction details are displayed
  $("#loader").addClass("d-none");

  // Make the upload file button visible again
  $("#upload_file_button").addClass("d-block");

  // Display additional transaction info
  show_txInfo();

  // Update the user's Ethereum balance after the transaction
  get_ethBalance();

  // Display a confirmation message to indicate the transaction was successfully added to the blockchain
  $("#note").html(
    `<h5 class="text-info">
     Transaction Confirmed to the BlockChain
     <i class="mx-2 text-info fa fa-check-circle" aria-hidden="true"></i>
     </h5>`
  );

  // Start listening for further events or actions
  listen();
}

// Function to retrieve file information from the Filebin API
async function getFilebinInfo(filebinUrl, filebinId) {
  try {
    // Make an HTTP GET request to the specified API endpoint
    const response = await fetch(
      `https://api.pdfrest.com/resource/${window.hashedfile}?format=url`,
      {
        method: "GET", // Specify the request method as GET
        headers: {}, // Provide any necessary headers (currently empty)
      }
    );

    // Check if the response status is not OK (e.g., 200)
    if (!response.ok) {
      // Throw an error with the response text for debugging purposes
      throw new Error(
        "Failed to retrieve file information:",
        await response.text() // Await and include the error details in the thrown error
      );
    }

    // Parse the JSON response from the API
    const data = await response.json();
    console.log(data); // Log the retrieved file information for debugging
    return data; // Return the parsed data for use in the calling code
  } catch (error) {
    // Handle errors during the fetch operation or JSON parsing
    console.error("Error fetching file information:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}

// Function to upload a file to IPFS via Infura and return its CID
async function uploadFileToIpfs() {
  // Get the file input element and retrieve the selected file
  const fileInput = document.getElementById("doc-file"); // Assumes there's an input element with id 'doc-file'
  const file = fileInput.files[0]; // Select the first file from the input

  // Create a FormData object to send the file as part of the POST request
  const formData = new FormData();
  formData.append("file", file); // Append the file to the FormData object

  // Authentication credentials for Infura API
  const auth = "Basic " + btoa(`${projectId}:${projectSecret}`); // Base64 encoding of project ID and secret

  try {
    // Make a POST request to Infura's IPFS API to upload the file
    const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST", // Specify the HTTP method as POST
      body: formData, // Attach the file data to the request body
      headers: {
        Authorization: auth, // Include the authorization header for Infura
      },
    });

    // Check if the response is not successful
    if (!response.ok) {
      throw new Error("File upload failed"); // Throw an error for debugging if the upload fails
    }

    // Parse the response JSON to retrieve the file's IPFS hash (CID)
    const data = await response.json();
    console.log(data["Hash"]); // Log the IPFS hash (CID) for debugging

    // Return the CID for further use, such as storing it in a smart contract
    return data["Hash"];
  } catch (error) {
    // Handle errors during the upload process
    console.error("Error uploading file:", error); // Log the error for debugging
    throw error; // Re-throw the error for handling in the calling code
  }
}

// Function to send the document hash and CID to the smart contract
async function sendHash() {
  // Display a loader to indicate that a process is running
  $("#loader").removeClass("d-none");
  
  // Hide the upload button while the transaction is in progress
  $("#upload_file_button").slideUp();
  
  // Update the note to ask the user to confirm the transaction
  $("#note").html(
    `<h5 class="text-info">Please confirm the transaction</h5>`
  );
  
  // Disable the upload button to prevent multiple submissions during the transaction
  $("#upload_file_button").attr("disabled", true);
  
  // Retrieve the current chain ID for reference
  get_ChainID();

  // Upload the file to IPFS and get the CID (Content Identifier)
  const CID = await uploadFileToIpfs();

  // Ensure the document hash is valid before proceeding
  if (window.hashedfile.length > 4) {
    // Interact with the smart contract to add the document hash and CID to the contract
    await window.contract.methods
      .addDocHash(window.hashedfile, CID)  // Call the smart contract method to add the document hash and CID
      .send({ from: window.userAddress })  // Send the transaction from the user's address
      .on("transactionHash", function (_hash) {
        // Display a message that the transaction is being mined
        $("#note").html(
          `<h5 class="text-info p-1 text-center">Please wait for transaction to be mined...</h5>`
        );
      })
      
      .on("receipt", function (receipt) {
        // Print the receipt information and generate a QR code once the transaction is successful
        printUploadInfo(receipt);
        generateQRCode();
      })

      .on("confirmation", function (confirmationNr) {
        // Handle any confirmations if needed (could be used for extra feedback)
      })
      
      .on("error", function (error) {
        // Handle errors during the transaction process
        console.log(error.message);  // Log the error message for debugging
        $("#note").html(`<h5 class="text-center">${error.message}</h5>`);  // Display the error to the user
        $("#loader").addClass("d-none");  // Hide the loader
        $("#upload_file_button").slideDown();  // Show the upload button again
      });
  }
}

// Function to delete the document hash from the contract
// Only the exporter who added the hash can delete it
async function deleteHash() {
  // Show the loader to indicate that the deletion process is starting
  $("#loader").removeClass("d-none");
  
  // Hide the upload file button during the transaction
  $("#upload_file_button").slideUp();
  
  // Update the note to inform the user that the transaction needs confirmation
  $("#note").html(
    `<h5 class="text-info">Please confirm the transaction</h5>`
  );
  
  // Disable the upload button to prevent further submissions during the transaction
  $("#upload_file_button").attr("disabled", true);
  
  // Get the current chain ID for context (might be used for checking the network)
  get_ChainID();

  // Ensure the document hash exists before attempting to delete it
  if (window.hashedfile) {
    // Call the smart contract's deleteHash method to remove the document hash
    await window.contract.methods
      .deleteHash(window.hashedfile)  // Pass the document hash to the contract
      .send({ from: window.userAddress })  // Send the transaction from the user's address
      .on("transactionHash", function (hash) {
        // Show a message indicating that the transaction is being mined
        $("#note").html(
          `<h5 class="text-info p-1 text-center">Please wait for transaction to be mined</h5>`
        );
      })
      
      .on("receipt", function (receipt) {
        // Show a success message once the document hash has been successfully deleted
        $("#note").html(
          `<h5 class="text-info p-1 text-center">Document Deleted</h5>`
        );

        // Hide the loader and show the upload button again after the transaction is complete
        $("#loader").addClass("d-none");
        $("#upload_file_button").slideDown();
      })

      .on("confirmation", function (confirmationNr) {
        // Log confirmation number (useful for debugging or providing real-time feedback)
        console.log(confirmationNr);
      })

      .on("error", function (error) {
        // Handle any errors that occur during the transaction process
        console.log(error.message);  // Log the error for debugging
        $("#note").html(`<h5 class="text-center">${error.message}</h5>`);  // Display the error message
        $("#loader").addClass("d-none");  // Hide the loader in case of an error
        $("#upload_file_button").slideDown();  // Show the upload button again after the error
      });
  }
}

// Function to get the current time in a specific format (YYYY-MM-DD - HH:MM:SS)
function getTime() {
  // Create a new Date object to fetch the current date and time
  let d = new Date();

  // Format the date and time as 'YYYY-MM-DD - HH:MM:SS'
  let a =
    d.getFullYear() +                    // Get the full year (e.g., 2024)
    "-" +
    (d.getMonth() + 1) +                 // Get the month (0-indexed, so add 1 for correct month)
    "-" +
    d.getDate() +                        // Get the day of the month (1-31)
    " - " +
    d.getHours() +                       // Get the hours (0-23)
    ":" +
    d.getMinutes() +                     // Get the minutes (0-59)
    ":" +
    d.getSeconds();                      // Get the seconds (0-59)

  // Return the formatted date and time string
  return a;
}

// Get network name based on ID
async function get_ChainID() {
  // Get the current chain ID from the connected wallet
  let a = await web3.eth.getChainId();
  console.log(a); // Log the chain ID for debugging
  
  // Identify the network based on the chain ID
  switch (a) {
    case 1:
      // Ethereum Main Network (Mainnet)
      window.chainID = "Ethereum Main Network (Mainnet)";
      break;
    case 80001:
      // Polygon Test Network (Mumbai Testnet)
      window.chainID = "Polygon Test Network";
      break;
    case 137:
      // Polygon Mainnet (Layer 2 scaling solution for Ethereum)
      window.chainID = "Polygon Mainnet";
      break;
    case 3:
      // Ropsten Test Network (Ethereum Testnet, deprecated as of late 2022)
      window.chainID = "Ropsten Test Network";
      break;
    case 4:
      // Rinkeby Test Network (Ethereum Testnet, deprecated as of mid-2023)
      window.chainID = "Rinkeby Test Network";
      break;
    case 5:
      // Goerli Test Network (Ethereum Testnet, widely used for testing)
      window.chainID = "Goerli Test Network";
      break;
    case 42:
      // Kovan Test Network (Ethereum Testnet, deprecated as of 2023)
      window.chainID = "Kovan Test Network";
      break;
    case 11155111:
      // Sepolia Test Network (Ethereum Testnet, used for testing smart contracts)
      window.chainID = "Sepolia Test Network";
      break;
    case 1337:
      // Ganache Local Blockchain (Used for local development and testing)
      window.chainID = "Ganache Local Blockchain";
      break;
    case 56:
      // Binance Smart Chain (BSC) Mainnet (Popular blockchain for DApps)
      window.chainID = "Binance Smart Chain Mainnet";
      break;
    case 97:
      // Binance Smart Chain (BSC) Testnet (For testing on BSC)
      window.chainID = "Binance Smart Chain Testnet";
      break;
    default:
      // Unknown Chain ID (Fallback for unsupported networks)
      window.chainID = `Unknown ChainID`;
      break;
  }

  // Update the DOM element to show the detected network
  let network = document.getElementById("network");
  if (network) {
    document.getElementById(
      "network"
    ).innerHTML = `<i class="text-info fa-solid fa-circle-nodes mx-2"></i>${window.chainID}`;
  }
}

// Function to hash the selected document using the SHA3 algorithm
function get_Sha3() {
  // Hide transaction info (if any) and show a "Hashing Your Document" message
  hide_txInfo();
  $("#note").html(`<h5 class="text-warning">Hashing Your Document...</h5>`);

  // Enable the upload file button after hashing
  $("#upload_file_button").attr("disabled", false);

  console.log("file changed");

  // Get the file object from the file input field
  var file = document.getElementById("doc-file").files[0];

  // Check if a file was selected
  if (file) {
    // Create a FileReader to read the content of the file
    var reader = new FileReader();

    // Read the file as a text string (UTF-8 encoding)
    reader.readAsText(file, "UTF-8");

    // When the file has been successfully loaded
    reader.onload = function (evt) {
      // Hash the file content using web3.js's Solidity SHA3 hashing function
      window.hashedfile = web3.utils.soliditySha3(evt.target.result);

      // Log the hashed document to the console
      console.log(`Document Hash : ${window.hashedfile}`);

      // Update the UI to indicate that the document has been hashed
      $("#note").html(
        `<h5 class="text-center text-info">Document Hashed</h5>`
      );
    };

    // Handle errors that may occur during the file reading process
    reader.onerror = function (evt) {
      console.log("error reading file");
    };
  } else {
    // If no file was selected, set hashedfile to null
    window.hashedfile = null;
  }
}

// Function to log out the user by disconnecting the wallet and updating the UI
function disconnect() {
  // Hide the logout button and show the login button
  $("#logoutButton").hide();
  $("#loginButton").show();

  // Clear the user address from the window object
  window.userAddress = null;

  // Hide wallet status UI elements
  $(".wallet-status").addClass("d-none");

  // Remove the user address from local storage
  window.localStorage.setItem("userAddress", null);

  // Disable the file upload button after logout
  $("#upload_file_button").addClass("disabled");
}

// Function to truncate an Ethereum address for display purposes
function truncateAddress(address) {
  // Check if the address is valid (not undefined or null)
  if (!address) {
    return;
  }

  // Truncate the address to show only the first 7 characters and the last 8 characters
  // This is commonly done to keep the address readable while hiding the middle part for privacy
  return `${address.substr(0, 7)}...${address.substr(
    address.length - 8,  // Starting from the last 8 characters
    address.length       // Up to the length of the address
  )}`;
}

// Function to add a new exporter to the blockchain
async function addExporter() {
  // Get the exporter address and information from the input fields
  const address = document.getElementById("Exporter-address").value;
  const info = document.getElementById("info").value;

  // Check if both address and information are provided
  if (info && address) {
    // Show the loader and hide the exporter buttons while the transaction is being processed
    $("#loader").removeClass("d-none");
    $("#ExporterBtn").slideUp(); // Hide the "Add Exporter" button
    $("#edit").slideUp();        // Hide the "Edit" button
    $("#delete").slideUp();      // Hide the "Delete" button
    $("#note").html(
      `<h5 class="text-info">Please confirm the transaction...</h5>`
    );
    
    // Disable the buttons to prevent further interaction during the transaction
    $("#ExporterBtn").attr("disabled", true);
    $("#delete").attr("disabled", true);
    $("#edit").attr("disabled", true);

    // Fetch the Chain ID (for network identification)
    get_ChainID();

    try {
      // Call the smart contract's add_Exporter method with the provided address and info
      await window.contract.methods
        .add_Exporter(address, info) // Adding exporter to the blockchain
        .send({ from: window.userAddress }) // Sending the transaction from the user's address
        .on("transactionHash", function (hash) {
          // Show a message when the transaction hash is generated
          $("#note").html(
            `<h5 class="text-info p-1 text-center">Please wait for transaction to be mined...</h5>`
          );
        })
        .on("receipt", function (receipt) {
          // When the transaction is mined, show success message and restore the buttons
          $("#loader").addClass("d-none"); // Hide loader
          $("#ExporterBtn").slideDown();   // Show "Add Exporter" button
          $("#edit").slideDown();          // Show "Edit" button
          $("#delete").slideDown();        // Show "Delete" button
          console.log(receipt);            // Log the receipt for debugging
          $("#note").html(
            `<h5 class="text-info">Exporter Added to the Blockchain</h5>`
          );
        })
        .on("confirmation", function (confirmationNr) {
          // This event is fired on transaction confirmation
          console.log(confirmationNr);
        })
        .on("error", function (error) {
          // Handle errors (e.g., insufficient funds, network issues)
          console.log(error.message);
          $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
          $("#loader").addClass("d-none"); // Hide loader in case of error
          $("#ExporterBtn").slideDown();   // Restore the "Add Exporter" button
        });
    } catch (error) {
      // Catch any other errors (e.g., network connection issues) and display the message
      $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
      $("#loader").addClass("d-none");
      $("#ExporterBtn").slideDown();
      $("#edit").slideDown();
      $("#delete").slideDown();
    }
  } else {
    // If the address or info is missing, show a warning message
    $("#note").html(
      `<h5 class="text-center text-warning">You need to provide address & information to add</h5>`
    );
  }
}

// Function to get exporter's information from the blockchain
async function getExporterInfo() {
  // Call the 'getExporterInfo' method from the smart contract to get information for the current user
  await window.contract.methods
    .getExporterInfo(window.userAddress) // This sends the call to the smart contract to fetch exporter info for the user's address
    .call({ from: window.userAddress }) // Executes the call from the user's address
    .then((result) => { // Handles the result once the call is successful
      window.info = result; // Store the fetched exporter information in a global variable
    });
}

// Function asynchronously retrieves two counts from the blockchain: the number of exporters and the number of hashes stored on the smart contract.
async function getCounters() {
  // Retrieve the count of exporters
  await window.contract.methods
    .count_Exporters()  // Calls the 'count_Exporters' method on the smart contract
    .call({ from: window.userAddress })  // Executes the method call from the current user's address
    .then((result) => {  // Once the result is returned, handle the result
      $("#num-exporters").html(
        `<i class="fa-solid fa-building-columns mx-2 text-info"></i>${result}` // Update the HTML to display the number of exporters
      );
    });

  // Retrieve the count of hashes
  await window.contract.methods
    .count_hashes()  // Calls the 'count_hashes' method on the smart contract
    .call({ from: window.userAddress })  // Executes the method call from the current user's address
    .then((result) => {  // Once the result is returned, handle the result
      $("#num-hashes").html(
        `<i class="fa-solid fa-file mx-2 text-warning"></i>${result}` // Update the HTML to display the number of hashes
      );
    });
}

// Function is responsible for updating an exporter's details on the blockchain.
async function editExporter() {
  const address = document.getElementById("Exporter-address").value;
  const info = document.getElementById("info").value;

  // Ensure both address and information are provided
  if (info && address) {
    // Show loading state
    $("#loader").removeClass("d-none");
    $("#ExporterBtn").slideUp();
    $("#edit").slideUp();
    $("#delete").slideUp();
    $("#note").html(
      `<h5 class="text-info">Please confirm the transaction...</h5>`
    );
    $("#ExporterBtn").attr("disabled", true);
    get_ChainID();

    try {
      // Send the transaction to update the exporter's information
      await window.contract.methods
        .alter_Exporter(address, info)  // Smart contract method
        .send({ from: window.userAddress })  // Transaction sender address

        // Monitor transaction hash
        .on("transactionHash", function (hash) {
          $("#note").html(
            `<h5 class="text-info p-1 text-center">Please wait for transaction to be mined...</h5>`
          );
        })

        // Monitor receipt once the transaction is mined
        .on("receipt", function (receipt) {
          $("#loader").addClass("d-none");  // Hide loader
          $("#ExporterBtn").slideDown();  // Show button again
          console.log(receipt);  // Log the receipt
          $("#note").html(
            `<h5 class="text-info">Exporter Updated Successfully</h5>`
          );
        })

        // Confirmation event (optional)
        .on("confirmation", function (confirmationNr) {})

        // Error handling during the transaction
        .on("error", function (error) {
          console.log(error.message);
          $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
          $("#loader").addClass("d-none");
          $("#ExporterBtn").slideDown();  // Show button again if error occurs
        });
    } catch (error) {
      // Catch any errors that might occur in the try block
      $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
      $("#loader").addClass("d-none");
      $("#ExporterBtn").slideDown();
      $("#edit").slideDown();
      $("#delete").slideDown();
    }
  } else {
    // Alert user if address or info is missing
    $("#note").html(
      `<h5 class="text-center text-warning">You need to provide address & information to update</h5>`
    );
  }
}

// Function is designed to delete an exporter's information from the blockchain based on their address.
async function deleteExporter() {
  const address = document.getElementById("Exporter-address").value; // Get address from the input field

  // Ensure the address is provided
  if (address) {
    // Show loading state and hide buttons
    $("#loader").removeClass("d-none");
    $("#ExporterBtn").slideUp();
    $("#edit").slideUp();
    $("#delete").slideUp();
    $("#note").html(
      `<h5 class="text-info">Please confirm the transaction...</h5>`
    );
    $("#ExporterBtn").attr("disabled", true);
    get_ChainID(); // Get Chain ID

    try {
      // Send the transaction to delete the exporter from the blockchain
      await window.contract.methods
        .delete_Exporter(address)  // Smart contract method to delete exporter
        .send({ from: window.userAddress })  // Transaction sender's address

        // Monitor transaction hash event
        .on("transactionHash", function (hash) {
          $("#note").html(
            `<h5 class="text-info p-1 text-center">Please wait for transaction to be mined...</h5>`
          );
        })

        // Transaction receipt event (when the transaction is mined)
        .on("receipt", function (receipt) {
          $("#loader").addClass("d-none");  // Hide loader
          $("#ExporterBtn").slideDown();  // Show Exporter Button
          $("#edit").slideDown();  // Show Edit Button
          $("#delete").slideDown();  // Show Delete Button
          console.log(receipt);  // Log receipt for debugging
          $("#note").html(
            `<h5 class="text-info">Exporter Deleted Successfully</h5>`
          );
        })

        // Error event during transaction
        .on("error", function (error) {
          console.log(error.message);  // Log the error
          $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
          $("#loader").addClass("d-none");  // Hide loader
          $("#ExporterBtn").slideDown();  // Show button again
          $("#edit").slideDown();  // Show Edit button
          $("#delete").slideDown();  // Show Delete button
        });
    } catch (error) {
      // Catch any errors that occur during the try block
      $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
      $("#loader").addClass("d-none");
      $("#ExporterBtn").slideDown();
      $("#edit").slideDown();
      $("#delete").slideDown();
    }
  } else {
    // If the address is not provided, show a warning message
    $("#note").html(
      `<h5 class="text-center text-warning">You need to provide an address to delete</h5>`
    );
  }
}

// Generate QR code so any one an Verify the documents
// note: if you are using local server you need to replace 127.0.0.1 with your machine local ip address got from the router
function generateQRCode() {
  document.getElementById("qrcode").innerHTML = "";
  console.log("making qr-code...");
  
  // Check if the document hash is available
  if (!window.hashedfile) {
    alert("No document hash available to generate QR code.");
    return;
  }

  // Create the QR Code instance
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Generate the URL for verification
  let host = window.location.hostname === '127.0.0.1' ? 'localhost' : window.location.hostname;
  let url = `${host}/verify.html?hash=${window.hashedfile}`;

  // Generate the QR code
  qrcode.makeCode(url);

  // Prepare the download link for the QR code image
  document.getElementById("download-link").download = document.getElementById("doc-file").files[0].name;
  document.getElementById("verfiy").href = window.location.protocol + "//" + url;

  // Function to update download link with QR code image source
  function makeDownload() {
    document.getElementById("download-link").href = document.querySelector("#qrcode img").src;
  }

  // Delay the update of the download link to ensure QR code is generated
  setTimeout(makeDownload, 500);
}

// check old transactions and show them if they exist
// Transactions from the last few hours will show, but very old transactions won't show
// The pastEvents returns transactions from the last 999 blocks
async function listen() {
  console.log("started...");

  // Check if the current page is '/upload.html', otherwise stop the execution
  if (window.location.pathname != "/upload.html") return;

  // Show the loading indicator while fetching transactions
  document.querySelector(".loading-tx").classList.remove("d-none");

  // Initialize Web3 using the Ethereum provider from MetaMask (or another provider)
  window.web3 = new Web3(window.ethereum);

  // Create a contract instance with the ABI and address
  window.contract = new window.web3.eth.Contract(
    window.CONTRACT.abi,    // Contract ABI
    window.CONTRACT.address // Contract address
  );

  // Fetch past events (addHash) from the contract for the current exporter (userAddress)
  await window.contract.getPastEvents(
    "addHash",  // Event name to listen for
    {
      filter: {
        _exporter: window.userAddress, // Filter to get documents uploaded by the current exporter (user address)
      },
      // Get events from 999 blocks before the latest block
      fromBlock: (await window.web3.eth.getBlockNumber()) - 999,
      toBlock: "latest", // Fetch events up to the latest block
    },
    function (error, events) {
      if (error) {
        // Handle any error during fetching the events
        console.log("Error fetching events:", error);
      } else {
        // Call function to print transactions if successful
        printTransactions(events);
        console.log(events);  // Log the fetched events for debugging purposes
      }
    }
  );
}

// If there are past transactions, display them
function printTransactions(data) {
  // Clear any previous transaction data displayed on the page
  document.querySelector(".transactions").innerHTML = "";
  
  // Hide the loading indicator once transactions are loaded
  document.querySelector(".loading-tx").classList.add("d-none");
  
  // If there are no transactions, hide the recent transactions header
  if (!data.length) {
    $("#recent-header").hide();
    return;
  }

  // Get the container where transactions will be displayed
  const main = document.querySelector(".transactions");

  // Loop through each transaction in the data
  for (let i = 0; i < data.length; i++) {
    // Create an anchor element for each transaction
    const a = document.createElement("a");
    
    // Set the link to the transaction details page (Etherscan or similar explorer)
    a.href = `${window.CONTRACT.explore}` + "/tx/" + data[i].transactionHash;
    
    // Set the target to open in a new tab
    a.setAttribute("target", "_blank");
    
    // Assign styling classes for the transaction card
    a.className = "col-lg-3 col-md-4 col-sm-5 m-2  bg-dark text-light rounded position-relative card";
    a.style = "overflow:hidden;";

    // Create an object element to display the transaction image (IPFS hosted)
    const image = document.createElement("object");
    image.style = "width:100%;height: 100%;";

    // Set the IPFS URL for the image data
    image.data = `https://ipfs.io/ipfs/${data[i].returnValues[1]}`;

    // Create a number element to display the transaction index (1-based)
    const num = document.createElement("h1");
    num.append(document.createTextNode(i + 1));
    
    // Style the number to appear on the bottom left of the card
    num.style = "position:absolute; left:4px; bottom: -20px;font-size:4rem; color: rgba(20, 63, 74, 0.35);";
    
    // Append the image and the number to the anchor element
    a.appendChild(image);
    a.appendChild(num);

    // Prepend the anchor (transaction card) to the transaction container
    main.prepend(a);
  }

  // Show the recent transactions header if there are transactions
  $("#recent-header").show();
}