###Let and Var in Closures

```Javascript
for(var i = 1; i < 6; i++) {
  document.getElementById('my-element' + i)
    .addEventListener('click', function() { console.log(i) })
}
```
TODO: Come up with a better example than that.
