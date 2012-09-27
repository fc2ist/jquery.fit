/*! jQuery Fit - v1.0.3 - 2012-09-28
* Copyright (c) 2012 moi; Licensed MIT */


(function($) {
  var Fit;
  $.fn.fit = function(opt) {
    var def;
    def = {
      'expand': false
    };
    if (opt === 'destroy') {
      this.trigger('destroy.fit');
      return this;
    }
    opt = $.extend(opt, def);
    return this.each(function() {
      var data, elem;
      elem = $(this);
      if (elem.data('fit')) {
        return;
      }
      return elem.data('fit', (data = new Fit(elem, opt)));
    });
  };
  return Fit = (function() {
    var createStyle, destroy, generalStyle, resize, setGeneralStyle, vender;

    function Fit(target, opt) {
      var self, tagname;
      this.target = target;
      this.opt = opt;
      self = this;
      this.originStyle = this.target.attr('style') || false;
      tagname = this.target.get(0).tagName;
      if (!tagname.match(/^(iframe|object|embed)$/i)) {
        setGeneralStyle.apply(this);
        return;
      }
      if (!$.support.opacity) {
        return;
      }
      this.target.on('destroy.fit', function() {
        return destroy.apply(self, [$(this)]);
      });
      $(window).on('resize', {
        'self': this
      }, resize);
      resize({
        'data': {
          'self': this
        }
      });
    }

    vender = ['-webkit-', '-moz-', '-o-', '-ms-', '-khtml-', ''];

    resize = function(event) {
      var power, self, size, target;
      if (!event.data || !event.data.self) {
        return;
      }
      self = event.data.self;
      target = self.target;
      self.parent = self.parent || target.parent();
      size = {
        'width': target.width(),
        'height': target.height()
      };
      self.margin = self.margin || {
        'left': target.css('margin-left').replace('px', '') - 0,
        'top': target.css('margin-top').replace('px', '') - 0,
        'bottom': target.css('margin-bottom').replace('px', '') - 0
      };
      power = self.parent.width() / size.width;
      if (power === 1 || (power > 1 && !self.opt.expand)) {
        return;
      }
      return target.css(createStyle(self.margin, size, power));
    };

    destroy = function(elem) {
      if (this.originStyle) {
        elem.attr('style', this.originStyle);
      } else {
        elem.removeAttr('style');
      }
      elem.data('fit', false);
      elem.off('destroy.fit');
      return $(window).off('resize', resize);
    };

    createStyle = function(margin, size, power) {
      var dif, scale, style, v, _i, _len;
      style = {};
      scale = 'scale(' + power + ')';
      dif = {
        'width': size.width * (power - 1),
        'height': size.height * (power - 1)
      };
      style['margin-top'] = margin.top + dif.height / 2 + 'px';
      style['margin-bottom'] = margin.bottom + dif.height / 2 + 'px';
      style['margin-left'] = margin.left + dif.width / 2 + 'px';
      for (_i = 0, _len = vender.length; _i < _len; _i++) {
        v = vender[_i];
        style[v + 'transform'] = scale;
      }
      return style;
    };

    generalStyle = {
      'max-width': '100%',
      'height': 'auto',
      'width': 'auto\9'
    };

    setGeneralStyle = function(target) {
      var style;
      style = generalStyle;
      if (this.opt.expand) {
        style['min-width'] = '100%';
      }
      return this.target.removeAttr('width', 'height').css(style);
    };

    return Fit;

  })();
})(jQuery);
