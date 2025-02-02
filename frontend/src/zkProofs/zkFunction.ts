import {ethers} from "ethers"
import verifierABI from "./verifierABI.json" assert { type: "json" };
const CONTRACT_ADDRESS = "0xbEa09879B6a09214f54358c85386cf613D06bd08"
import {groth16} from "snarkjs"


export async function generateProof(hashed_value : any) {
    const input = { apiYield: hashed_value.toString(), expectedYield: hashed_value.toString() };
    console.log("input", input)

    const wasmFile = "./yieldProof.wasm";
    const zkeyFile = "./yieldProof_0001.zkey";
    console.log("uyt")
    const { proof, publicSignals } = await groth16.fullProve(input, wasmFile, zkeyFile);
    console.log("utyg")

    const help = await verifyOnChain(proof, publicSignals);
    return help
}

async function verifyOnChain(proof: any, publicSignals: any) {
    const provider =new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/YpTOiIV_bZ2zl3hruyIhGq10SY8O-JfF");

    const privateKey = "........."
    const signer =new ethers.Wallet(privateKey , provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, verifierABI, signer);

    const calldata = [
        proof.pi_a.slice(0, 2),
        [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]],
        proof.pi_c.slice(0, 2),
        publicSignals
    ];

    const final = await contract.verifyProof(...calldata);
    return final
}