**Note:** 
For better performance and new improvements it will recommended take a look at  [Sortboardjs](https://github.com/joseluisq/sortboardjs) project.
<hr>

# jQuery xFilterList

A simple jQuery grid list plugin for easy filter and sorting.

## How to use

It's very easy, defines only your list using an `ul` and `li` tags then <br/>
sets your filters in each `li` tags with the `data-filter` attribute, it can add many filters for one item.

JS :
```js
var fl = new xFilterList($('sortlist'), {
  // you can set the margin in pixels
  margin: 5
});

// Filter example
fl.filterBy('programing');
```

HTML :
```html
<ul id="sortlist">
  <li data-filter="programing"></li>
  <li data-filter="programing back-end"></li>
  <li data-filter="programing front-end"></li>
  <li data-filter="graphic-design illustration"></li>
  <li data-filter="webdesign front-end"></li>
  <li data-filter="graphic-design printing"></li>
</ul>
```

## Live Demo

[See the live demo](http://goo.gl/5cY8M1)

## Reference
**Options :**

  * `margin` : The margin for items defined in pixels.

**Public Methods :**
    
  * `xFilterList.filterBy(string)` : String it's text to filter, it should match to `data-filter` attribute on `li` tags matching.
    
**Events :**

  * Coming soon..

## License
Licensed under the [MIT License](http://opensource.org/licenses/MIT)
