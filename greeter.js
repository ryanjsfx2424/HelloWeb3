const CHAIN_ID = "0x5";
const CHAIN_NAME = "Goerli";
const CONTRACT_ADDRESS = "0xBeC383a9fEeDC9d3b109aB57F4C6fBdAa68367C2"

async function greet() {
    //alert("Hello world");
    // logic for communicating with our Greeter smart contract
    const url = "https://goerli.infura.io/v3/e3b1f209a7b649c7845982b32918dc83"
    const infura_response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            params: [{
                    data: "0xef690cc0", // sha3("greeting()")
                    to: CONTRACT_ADDRESS
                },
                "latest"
            ],
            jsonrpc: "2.0",
            method: "eth_call",
            id: 1
        })
    });
    console.log(infura_response);
    const result = await infura_response.json();
    console.log(result); // decode the hex result
    
    let hex = result.result;
    hex = String(hex).slice(2);
    console.log("hex: ", hex);

    const bytes = new Uint8Array(Math.ceil(String(hex).length / 2));
    console.log("bytes: ", bytes);
    for (let i = 0; i < bytes.length; i++) {
        const start = i*2;
        const stop = start+2;
        const BASE = 16;
        const currentSubString = String(hex).substring(start, stop)
        bytes[i] = parseInt(currentSubString, BASE);
    }
    console.log("bytes: ", bytes);

    const decoder = new TextDecoder("ascii");
    const message = decoder.decode(bytes);
    console.log("message: ", message);
    alert(message);
}

async function connect() {
    if (!window.ethereum) {
        alert("No injected provider found. Install Metamask.");
    } else {
        try {
            // const: new variable, never changes (local)
            // let: make a new variable, we can change it (local)
            // var: global variable (can use anywhere) and we can change
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
                params: []
            });
            console.log("accounts: ", accounts);
            const account = accounts[0];
            console.log("account: ", account);

            const chainId = await window.ethereum.request({
                method: "eth_chainId",
                params: []
            });
            console.log("chainId: ", chainId);
            console.log("chainId !== CHAIN_ID: ", chainId !== CHAIN_ID);
            console.log("CHAIN_ID: ", CHAIN_ID);
            if (chainId !== CHAIN_ID) {
                alert("Connected to wrong chain! Please change to " + CHAIN_NAME)
            } else {
                alert("Connected to account: " + String(account) + 
                        " and chainId: " + String(chainId));
            }

            

        } catch {
            alert("Something went wrong connecting. Refresh and try again.");
        }
    }
}