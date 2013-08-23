(function($) {
  $.fn.simulateDragSortable = function(options) {
    var opts = $.extend({}, $.fn.simulateDragSortable.defaults, options);

    applyDrag = function(options) {
      var that = this,
          options = options || opts, 
          handle = options.handle ? $(this).find(options.handle)[0] : $(this)[0],
          listItem = options.listItem,
          placeHolder = options.placeHolder,
          sibling = $(this),
          moveCounter = Math.floor(options.move),
          direction = moveCounter > 0 ? 'down' : 'up',
          moveVerticalAmount = 0,
          initialVerticalPosition = 0,
          extraDrag = !isNaN(parseInt(options.tolerance, 10)) ? function() { return Number(options.tolerance); } : function(obj) { return ($(obj).outerHeight() / 2) + 5; },
          dragPastBy = 0, 
          dropOn = options.dropOn ? $(options.dropOn) : false,
          center = findCenter(handle),
          x = Math.floor(center.x),
          y = Math.floor(center.y),
          mouseUpAfter = (opts.debug ? 2500 : 10);

      if (dropOn) {
        if (dropOn.length === 0) {
          if (console && console.log) { console.log('simulate.drag-sortable.js ERROR: Drop on target could not be found'); console.log(options.dropOn); }
          return;
        }
        sibling = dropOn.find('>*:last');
        moveCounter = -(dropOn.find('>*').length + 1) + (moveCounter + 1); 
        if (dropOn.offset().top - $(this).offset().top < 0) {
          initialVerticalPosition = sibling.offset().top - $(this).offset().top - extraDrag(this);
        } else {
          initialVerticalPosition = sibling.offset().top - $(this).offset().top - $(this).height();
        }
      } else if (moveCounter === 0) {
        if (console && console.log) { console.log('simulate.drag-sortable.js WARNING: Drag with move set to zero has no effect'); }
        return;
      } else {
        while (moveCounter !== 0) {
          if (direction === 'down') {
            if (sibling.next(listItem).length) {
              sibling = sibling.next(listItem);
              moveVerticalAmount += sibling.outerHeight();
            }
            moveCounter -= 1;
          } else {
            if (sibling.prev(listItem).length) {
              sibling = sibling.prev(listItem);
              moveVerticalAmount -= sibling.outerHeight();
            }
            moveCounter += 1;
          }
        }
      }

      dispatchEvent(handle, 'mousedown', createEvent('mousedown', handle, { clientX: x, clientY: y }));
      dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x+1, clientY: y+1 }));

      if (dropOn) {
        slideUpTo(x, y, initialVerticalPosition);

        y += initialVerticalPosition;

        options = jQuery.extend(options, { move: moveCounter });
        delete options.dropOn;

        setTimeout(function() {
          dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y }));
        }, 5);
        setTimeout(function() {
          dispatchEvent(handle, 'mouseup', createEvent('mouseup', handle, { clientX: x, clientY: y }));
          setTimeout(function() {
            if (options.move) {
              applyDrag.call(that, options);
            }
          }, 5);
        }, mouseUpAfter);

        return;
      }

      placeHolder = placeHolder && $(this).parent().find(placeHolder);

      if (!placeHolder && (direction === 'down')) {
        if ($(this).outerHeight() > $(sibling).outerHeight()) {
          moveVerticalAmount += $(this).outerHeight() - $(sibling).outerHeight();
        }
        moveVerticalAmount += extraDrag(sibling);
        dragPastBy += extraDrag(sibling);
      } else if (direction === 'up') {
        moveVerticalAmount -= Math.max(extraDrag(this), 5);
      } else if (direction === 'down') {
        if (placeHolder.height() < $(this).height()) {
          moveVerticalAmount += Math.max(placeHolder.height(), 5);
        } else {
          moveVerticalAmount += extraDrag(sibling);
        }
      }

      if (sibling[0] !== $(this)[0]) {
        slideUpTo(x, y, moveVerticalAmount, dragPastBy);
      } else {
        if (window.console) {
          console.log('simulate.drag-sortable.js WARNING: Could not move as at top or bottom already');
        }
      }

      setTimeout(function() {
        dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y + moveVerticalAmount }));
      }, 5);
      setTimeout(function() {
        dispatchEvent(handle, 'mouseup', createEvent('mouseup', handle, { clientX: x, clientY: y + moveVerticalAmount }));
      }, mouseUpAfter);
    };
    return this.each(applyDrag);
  };

  function slideUpTo(x, y, targetOffset, goPastBy) {
    var moveBy, offset;

    if (!goPastBy) { goPastBy = 0; }
    if ((targetOffset < 0) && (goPastBy > 0)) { goPastBy = -goPastBy; }

    for (offset = 0; Math.abs(offset) + 1 < Math.abs(targetOffset + goPastBy); offset += ((targetOffset + goPastBy - offset)/2) ) {
      dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y + Math.ceil(offset) }));
    }
    offset = targetOffset + goPastBy;
    dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y + offset }));
    for (; Math.abs(offset) - 1 >= Math.abs(targetOffset); offset += ((targetOffset - offset)/2) ) {
      dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y + Math.ceil(offset) }));
    }
    dispatchEvent(document, 'mousemove', createEvent('mousemove', document, { clientX: x, clientY: y + targetOffset }));
  }

  function createEvent(type, target, options) {
    var evt;
    var e = $.extend({
      target: target,
      preventDefault: function() { },
      stopImmediatePropagation: function() { },
      stopPropagation: function() { },
      isPropagationStopped: function() { return true; },
      isImmediatePropagationStopped: function() { return true; },
      isDefaultPrevented: function() { return true; },
      bubbles: true,
      cancelable: (type != 'mousemove'),
      view: window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: undefined
    }, options || {});

    if ($.isFunction(document.createEvent)) {
      evt = document.createEvent('MouseEvents');
      evt.initMouseEvent(type, e.bubbles, e.cancelable, e.view, e.detail,
        e.screenX, e.screenY, e.clientX, e.clientY,
        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
        e.button, e.relatedTarget || document.body.parentNode);
    } else if (document.createEventObject) {
      evt = document.createEventObject();
      $.extend(evt, e);
        evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
    }
    return evt;
  }

  function dispatchEvent(el, type, evt) {
    if (el.dispatchEvent) {
      el.dispatchEvent(evt);
    } else if (el.fireEvent) {
      el.fireEvent('on' + type, evt);
    }
    return evt;
  }

  function findCenter(el) {
    var elm = $(el),
        o = elm.offset();
    return {
      x: o.left + elm.outerWidth() / 2,
      y: o.top + elm.outerHeight() / 2
    };
  }
  $.fn.simulateDragSortable.defaults = {
    move: 0
  };
})(jQuery);