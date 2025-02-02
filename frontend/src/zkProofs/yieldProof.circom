pragma circom 2.0.0;

template YieldProof() {
    signal input apiYield;      // Yield value fetched from API
    signal input expectedYield; // Expected yield (claimed by user)
    signal output isValid;      // Output: 1 if valid, 0 otherwise

    // Ensure isValid is 1 only if apiYield equals expectedYield
    isValid <== 1 - ((apiYield - expectedYield) * (apiYield - expectedYield));
}

component main = YieldProof();
