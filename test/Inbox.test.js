const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const str = require('../compile.js');
var res = str.split("!");

let accounts; 
let inbox; 
beforeEach(async ()=>{
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use on the those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(res[1]))
        .deploy({data: res[0] , arguments: ['Hi there!']})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    });

    it('it has a message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there!');
    });

    it('can change the message',async ()=>{
        await inbox.methods.setMessage('Bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye');
    });
} );