let mocha = require('mocha')
let expect = require('chai').expect
let checkForWinner = require('../tic-tac-toe.js').checkForWinner


describe('checkForWinner()', ()=>{
  it("should return false for empty array", ()=>{
    let result = checkForWinner([])
    expect(result).to.be.false
  })

  it("should return true if top row is filled by one player", ()=>{
    let result = checkForWinner(['X','X','X','','','','','',''])
    expect(result).to.eq('X')
  })

  it("should return true if the left column is filled by one player",()=>{
    let result = checkForWinner(['O','','','O','','','O','',''])
    expect(result).to.eq('O')
  })

  it("should return true if the diagonal is filled by one player",()=>{
    let result = checkForWinner(['O','','','','O','','','','O'])
    expect(result).to.eq('O')
  })

})

