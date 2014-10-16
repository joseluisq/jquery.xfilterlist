/*
 * jQuery xFilterList Plugin v1.0.0
 * Release: 30/09/2014
 * Author: Jose Luis Quintana <joseluisquintana20@gmail.com>
 * https://github.com/joseluisq/jquery.xfilterlist
 * Released under MIT Licence: http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
  window.xFilterList = function(element, list) {
    this.currentFilter = 'all';

    this.options = {
      margin: 0
    };

    this.initialize = function(element, options) {
      if (element instanceof $) {
        this.setSortlist(element);
      } else {
        options = element;
      }

      this.setOptions(options);
      this._build();
    };

    this.setOptions = function(options) {
      this.options = this._merge(this.options, options);
    };

    this._merge = function(a, b) {
      for (var i in b) {
        a[i] = b[i];
      }

      return a;
    };

    this.isList = function() {
      return this.islist = this.element ? (this.element.prop('tagName').toString().toLowerCase() === 'ul') : false;
    };

    this.setSortlist = function(element) {
      this.element = element;
      this.isList();
    };

    this._build = function() {
      $(window).on('resize', this.sort.bind(this));
      this.sort();
    };

    this.sort = function() {
      var s = this,
        $sortlist = s.element,
        w, h, sw, tw, th, rtw, cth, ctw, items,
        mr = s.options.margin;
      w = w = sw = tw = th = ctw = cth = rtw = 0;
      sw = $sortlist.parent().width();
      items = $('li:not(.hidden)', $sortlist);
      s.size = items.length;

      items.each(function(i, li) {
        li = $(li);
        w = li.width();
        h = li.height();

        if (tw >= (sw - h - mr)) {
          tw = 0;
          th += h + mr;

          if (!ctw) {
            ctw = i * w + ((i * mr) - mr);
          }
        } else {
          tw += i ? mr : 0;
        }

        tw += w;
        rtw = tw - w;
        cth = th + h;
        li.data('data-cords', rtw + ',' + th);
        s._effect(li, rtw + ',' + th, false);
      });

      $sortlist.css({
        'width': ctw ? ctw : s.size * w,
        'height': cth
      });
    };

    this.filterBy = function(filter) {
      if (this.currentFilter !== filter) {
        var s = this,
          xy, list = $('li', s.element),
          matches = list.map(function(i, li) {
            return ($(li).attr('data-filter').search(new RegExp(filter, 'i')) != -1 ? true : null);
          }).length;

        if (!matches && filter !== 'all') {
          return;
        }

        s.currentFilter = filter;
        s.filtered = s.unfiltered = [];

        list.each(function(i, li) {
          li = $(li);
          xy = li.data('data-cords');

          if (filter === 'all') {
            s.filtered.push(li);
            s._effect(li, xy, false);
          } else {
            var b = (li.attr('data-filter').search(new RegExp(filter, 'i')) != -1);

            if (b) {
              s.filtered.push(li);
            } else {
              s.unfiltered.push(li);
            }

            s._effect(li, xy, !b);
          }
        });

        s.sort();
      }
    };

    this._effect = function(li, xy, h) {
      if (h) {
        li.addClass('hidden');
      } else {
        li.removeClass('hidden');
      }
      li.css({
        'opacity': h ? 0 : 1,
        '-webkit-transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')',
        '-moz-transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')',
        'transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')'
      });
    };

    this.getFilter = function() {
      return this.currentFilter;
    };

    this.getSize = function() {
      return this.size;
    };

    this.getItemsMatched = function() {
      return this.filtered;
    };

    this.getItemsUnmatched = function() {
      return this.unfiltered;
    };

    this.initialize(element, list);
  };
})(jQuery);
