#jQuery Fit
要素を縦横比を維持しながら親要素の横幅にフィットさせるプラグインです。
`iframe, object, embed` に対しては`CSS3`の`scale`を使用しているので中身が途切れたりすることなくフィットさせることができます。

##Demo
* [Demo Page](http://fc2ist.github.com/jquery.iframe-fit/demo/)

##Usage
[jQuery throttle/debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/)と一緒に読み込ませて使用してください。

    // 適用
    $('iframe').fit({
      'expand': true // 拡大フィットさせたい場合
    });
    
    // 解除
    $('.anime-text').fit('destroy');

## Author
Twitter: @moi_fc2  
Blog: http://fc2ist.blog.fc2.com/

##License
Copyright &copy; 2012 @moi_fc2.
Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).