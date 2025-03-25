const GetNumber = artifacts.require("GetNumber");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GetNumber", function (/* accounts */) {
  it("should assert true", async function () {
    await GetNumber.deployed();
    return assert.isTrue(true);
  });
});
