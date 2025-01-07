(window._iconfont_svg_string_4790291 =
  "<svg><symbol id=\"icon-undo\" viewBox=\"0 0 1024 1024\"><path d=\"M363 252h8.582c298.234 0 540 241.766 540 540v80.007c0 22.09-17.909 40-40 40s-40-17.91-40-40V792c0-254.051-205.95-460-460-460H363v132.533c0 8.836-7.163 16-16 16a16 16 0 0 1-9.747-3.312L118.517 309.188c-7.008-5.383-8.324-15.428-2.941-22.435a16 16 0 0 1 2.94-2.941l218.737-168.033c7.007-5.383 17.052-4.066 22.435 2.941a16 16 0 0 1 3.312 9.747V252z\"  ></path></symbol><symbol id=\"icon-cancel-undo\" viewBox=\"0 0 1024 1024\"><path d=\"M660.992 251.904h-8.704c-297.984 0-540.16 241.664-540.16 540.16v79.872c0 22.016 17.92 39.936 39.936 39.936s39.936-17.92 39.936-39.936v-79.872c0-253.952 205.824-459.776 459.776-459.776h8.704v132.608c0 8.704 7.168 15.872 15.872 15.872 3.584 0 7.168-1.024 9.728-3.072l218.624-167.936c7.168-5.632 8.192-15.36 3.072-22.528l-3.072-3.072L686.08 116.224c-7.168-5.632-16.896-4.096-22.528 3.072-2.048 2.56-3.072 6.144-3.072 9.728v122.88z\"  ></path></symbol></svg>"),
  ((n) => {
    var t = (e = (e = document.getElementsByTagName("script"))[e.length - 1]).getAttribute(
        "data-injectcss",
      ),
      e = e.getAttribute("data-disable-injectsvg");
    if (!e) {
      var o,
        i,
        c,
        d,
        s,
        a = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (t && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>",
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = n._iconfont_svg_string_4790291),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild ? a(e, t.firstChild) : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener("DOMContentLoaded", i, !1), o();
              }),
              document.addEventListener("DOMContentLoaded", i, !1))
          : document.attachEvent &&
            ((c = o),
            (d = n.document),
            (s = !1),
            r(),
            (d.onreadystatechange = function () {
              "complete" == d.readyState && ((d.onreadystatechange = null), l());
            }));
    }
    function l() {
      s || ((s = !0), c());
    }
    function r() {
      try {
        d.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
