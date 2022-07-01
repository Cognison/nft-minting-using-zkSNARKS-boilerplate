var MyNFTERC721Token = artifacts.require('MyNFTERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await MyNFTERC721Token.new({from: account_one});

            // mint multiple tokens
            await this.contract.mint(account_one, 8965, {from: account_one});

            await this.contract.mint(account_one, 5678, {from: account_one});

            await this.contract.mint(account_one, 3746, {from: account_one});

            // account 2
            await this.contract.mint(account_two, 9101, {from: account_one});

            await this.contract.mint(account_two, 1121, {from: account_one});

            await this.contract.mint(account_two, 3141, {from: account_one});
        })

        it('should return total supply', async function () { 

            let supply = await this.contract.totalSupply.call({from: account_one});

            assert.equal(supply, 6, "should return total supply");
        })

        it('should get token balance', async function () { 

            let balance = await this.contract.balanceOf(account_one);

            assert.equal(balance, 3, "should get token balance");
            
        })

        // token uri should be complete i.e: https://<your-base-uri>/1
        it('should return token uri', async function () { 
            
            let uri = await this.contract.tokenURI.call(8965, {from: account_one});

           
            assert.equal(uri, "https://<your-base-uri>/8965", "should return token uri");
        })

        it('should transfer token from one owner to another', async function () { 
            
            await this.contract.transferFrom(account_one, account_two, 8965, {from: account_one});
            
            let owner = await this.contract.ownerOf(8965);

            assert.equal(owner, account_two, "should transfer token from one owner to another");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await MyNFTERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let minted = true;

            try{

                minted = await this.contract.mint(account_one, 5, {from: account_two});

            }
            catch(error){
                minted = false;
            }

            assert.equal(minted, false, "should fail when minting when address is not contract owner");
        })

        it('should return contract owner', async function () { 

            let owner = await this.contract.currentOwner.call();

            assert.equal(owner, account_one, "should return contract owner");
        })

    });
})