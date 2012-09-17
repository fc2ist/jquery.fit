(($)->
  $.fn.fit = (opt)->
    def =
      'expand': false

    if opt == 'destroy'
      this.trigger('destroy.fit')
      return this

    opt = $.extend(def, opt)

    return this.each(->
      elem = $(this)
      if elem.data('fit') then return
      elem.data( 'fit', (data = new Fit(elem, opt)) )
    )

  class Fit

    constructor:(@target, @opt)->
      self = @
      @originStyle = @target.attr('style') || false

      tagname = @target.get(0).tagName
      if !tagname.match(/^(iframe|object|embed)$/i)
        setGeneralStyle.apply(@)
        return

      if !$.support.opacity then return

      @target.on('destroy.fit', ->
        destroy.apply(self, [$(this)])
      )
      $(window).on( 'resize', {'self':@}, resize )
      resize({'data':{'self':@}})

    vender = [
      '-webkit-', '-moz-', '-o-', '-ms-',  '-khtml-', ''
    ]

    resize = (event)->
      if !event.data || !event.data.self then return
      self = event.data.self
      target = self.target
      self.parent = self.parent || target.parent()
      size =
        'width': target.width(),
        'height': target.height()
      self.margin = self.margin ||
        'left': target.css('margin-left').replace('px', '') - 0,
        'top': target.css('margin-top').replace('px', '') - 0,
        'bottom': target.css('margin-bottom').replace('px', '') - 0
      power = self.parent.width()/size.width

      if power == 1 || (power > 1 && !self.opt.expand) then return

      target.css( createStyle(self.margin, size, power) )


    destroy = (elem)->
      if @originStyle
        elem.attr('style', @originStyle)
      else
        elem.removeAttr('style')
      elem.data('fit', false)
      elem.off('destroy.fit')
      $(window).off('resize', resize)

    createStyle = (margin, size, power)->
      style = {}
      scale = 'scale(' + power + ')'
      dif =
        'width': size.width * (power - 1),
        'height': size.height * (power - 1)
      style['margin-top'] = margin.top + dif.height/2 + 'px'
      style['margin-bottom'] = margin.bottom + dif.height/2 + 'px'
      style['margin-left'] = margin.left + dif.width/2 + 'px'
      for v in vender
        style[v + 'transform'] = scale
      return style

    generalStyle =
      'max-width': '100%',
      'height': 'auto',
      'width': 'auto\9'

    setGeneralStyle = (target)->
      style = generalStyle
      if @opt.expand then style['min-width'] = '100%'
      @target.removeAttr('width', 'height').css(style)
)(jQuery)