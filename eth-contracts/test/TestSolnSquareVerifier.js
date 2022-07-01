const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const proof = JSON.parse(`{
        "proof": {
            "a": ["0x2c21d270944b4a05f0dae4d743398a83f6dbac724493c6be86f1ee2b6aef3fb3", "0x25187975402d37bc239ba7efcc1977b09c369ad74b50ba5b46776f379555a6fd"],
            "b": [["0x2d72fcffa78ac0afe9d5fe19184063bb5f4296d9fb29007a0dffebe5c59ce1df", "0x1e05b33ea0b298d38c4880b3732bb841642c3a384545ae9df77bbbbecc549d10"], ["0x19143126470ee69bce997c2dfee1898f4f7e07909368970bce103a44fce5e6d4", "0x29ec0b04d581ae36de137123fd156eb90c5ac5539fdf522ca388a2a45bd8c66d"]],
            "c": ["0x1d81cf408b1ae4285ec29383b53c96c52da34de04ad402b6d026cac254cc65f8", "0x268003f34616d11f8c997ba6c7e1cdf0a3c25552895ad9965be95d9cbb28f133"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }`);

    describe('SolnSquareVerifier tests', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new({from: account_one});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('solution can be added for contract', async function () { 

            let proofProps = proof.proof;
            let inputs = proof.inputs;

            let response = await this.contract.addSolution(5678, account_two, proofProps.a, proofProps.b, proofProps.c, inputs, {from: account_one});

            assert.equal(response.logs[0].event, "AddedSolution", "solution can be added for contract");
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('ERC721 token can be minted for contract', async function () { 

            let success = await this.contract.mint.call(account_two, 6478, {from: account_one});

            assert.equal(success, true, 'ERC721 token can be minted for contract');
            
        })

       
    });
})