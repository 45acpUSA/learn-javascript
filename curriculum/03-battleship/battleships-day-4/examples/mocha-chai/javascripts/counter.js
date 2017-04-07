function createNewCounter() {
  var value = 0;
  return {
    getValue: function() { return value; },
    increase: function() { value++; },
    decrease: function() { value--; }
  }
}
