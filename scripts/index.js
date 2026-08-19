function t_onReady(func) {
        if (document.readyState != "loading") {
          func();
        } else {
          document.addEventListener("DOMContentLoaded", func);
        }
      }
      function t_onFuncLoad(funcName, okFunc, time) {
        if (typeof window[funcName] === "function") {
          okFunc();
        } else {
          setTimeout(function () {
            t_onFuncLoad(funcName, okFunc, time);
          }, time || 100);
        }
      }
      function t_throttle(fn, threshhold, scope) {
        return function () {
          fn.apply(scope || this, arguments);
        };
      }
      function t396_initialScale(t) {
        var e = document.getElementById("rec" + t);
        if (e) {
          var i = e.querySelector(".t396__artboard");
          if (i) {
            window.tn_scale_initial_window_width ||
              (window.tn_scale_initial_window_width =
                document.documentElement.clientWidth);
            var a = window.tn_scale_initial_window_width,
              r = [],
              n,
              l = i.getAttribute("data-artboard-screens");
            if (l) {
              l = l.split(",");
              for (var o = 0; o < l.length; o++) r[o] = parseInt(l[o], 10);
            } else r = [320, 480, 640, 960, 1200];
            for (var o = 0; o < r.length; o++) {
              var d = r[o];
              a >= d && (n = d);
            }
            var _ =
                "edit" === window.allrecords.getAttribute("data-tilda-mode"),
              c = "center" === t396_getFieldValue(i, "valign", n, r),
              s = "grid" === t396_getFieldValue(i, "upscale", n, r),
              w = t396_getFieldValue(i, "height_vh", n, r),
              g = t396_getFieldValue(i, "height", n, r),
              u =
                (!!window.opr && !!window.opr.addons) ||
                !!window.opera ||
                -1 !== navigator.userAgent.indexOf(" OPR/");
            if (!_ && c && !s && !w && g && !u) {
              var h = parseFloat((a / n).toFixed(3)),
                f = [
                  i,
                  i.querySelector(".t396__carrier"),
                  i.querySelector(".t396__filter"),
                ],
                v = Math.floor(parseInt(g, 10) * h) + "px",
                p;
              i.style.setProperty("--initial-scale-height", v);
              for (var o = 0; o < f.length; o++)
                f[o].style.setProperty("height", "var(--initial-scale-height)");
              t396_scaleInitial__getElementsToScale(i).forEach(function (t) {
                t.style.zoom = h;
              });
            }
          }
        }
      }
      function t396_scaleInitial__getElementsToScale(t) {
        return t
          ? Array.prototype.slice.call(t.children).filter(function (t) {
              return (
                t &&
                (t.classList.contains("t396__elem") ||
                  t.classList.contains("t396__group"))
              );
            })
          : [];
      }
      function t396_getFieldValue(t, e, i, a) {
        var r,
          n = a[a.length - 1];
        if (
          !(r =
            i === n
              ? t.getAttribute("data-artboard-" + e)
              : t.getAttribute("data-artboard-" + e + "-res-" + i))
        )
          for (var l = 0; l < a.length; l++) {
            var o = a[l];
            if (
              !(o <= i) &&
              (r =
                o === n
                  ? t.getAttribute("data-artboard-" + e)
                  : t.getAttribute("data-artboard-" + e + "-res-" + o))
            )
              break;
          }
        return r;
      }
      ((window.TN_SCALE_INITIAL_VER = "1.0"),
        (window.tn_scale_initial_window_width = null));;

/* --- Extracted Inline Script --- */

window.dataLayer = window.dataLayer || [];;

/* --- Extracted Inline Script --- */

(function () {
        var ttt = "cebo";
        var tt = "oog";
        var re = new RegExp(
          "bot|g" +
            tt +
            "le|yandex|baidu|bing|msn|duckduckbot|teoma|slurp|crawler|spider|robot|crawling|fa" +
            ttt +
            "ok",
          "i",
        );
        if (
          re.test(navigator.userAgent) === false &&
          typeof sessionStorage != "undefined" &&
          sessionStorage.getItem("visited") !== "y" &&
          document.visibilityState
        ) {
          var style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML =
            "@media screen and (min-width: 980px) {.t-records {opacity: 0;}.t-records_animated {-webkit-transition: opacity ease-in-out .2s;-moz-transition: opacity ease-in-out .2s;-o-transition: opacity ease-in-out .2s;transition: opacity ease-in-out .2s;}.t-records.t-records_visible {opacity: 1;}}";
          document.getElementsByTagName("head")[0].appendChild(style);
          function t_setvisRecs() {
            var alr = document.querySelectorAll(".t-records");
            Array.prototype.forEach.call(alr, function (el) {
              el.classList.add("t-records_animated");
            });
            setTimeout(function () {
              Array.prototype.forEach.call(alr, function (el) {
                el.classList.add("t-records_visible");
              });
              sessionStorage.setItem("visited", "y");
            }, 400);
          }
          document.addEventListener("DOMContentLoaded", t_setvisRecs);
        }
      })();;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112391");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112391");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  function t_throttle(t, e, n) {
                    var o, r;
                    return (
                      e || (e = 250),
                      function () {
                        var c = n || this,
                          u = +new Date(),
                          l = arguments;
                        o && u < o + e
                          ? (clearTimeout(r),
                            (r = setTimeout(function () {
                              ((o = u), t.apply(c, l));
                            }, e)))
                          : ((o = u), t.apply(c, l));
                      }
                    );
                  }
                  function t_menusub_updateSectionsOffsets(t) {
                    Array.prototype.forEach.call(t, function (t) {
                      t.setAttribute("data-offset-top", t.offsetTop);
                    });
                    let e = document.querySelectorAll(
                      '[data-record-type="215"]',
                    );
                    Array.prototype.forEach.call(e, function (t) {
                      t.setAttribute("data-offset-top", t.offsetTop);
                    });
                  }
                  function t_menusub_highlightNavLinks(t, e, n, o) {
                    var r = window.pageYOffset,
                      c = o,
                      u = 0;
                    return (
                      e.length && (u = e[0].getAttribute("data-offset-top")),
                      e.length && null === o && r + 300 < +u
                        ? (Array.prototype.forEach.call(t, function (t) {
                            t.parentNode.classList.contains("tn-atom")
                              ? t.parentNode.classList.remove("t-active")
                              : t.classList.remove("t-active");
                          }),
                          null)
                        : (Array.prototype.forEach.call(e, function (u, l, i) {
                            var a = u.getAttribute("data-offset-top"),
                              s =
                                null != e[l + 1]
                                  ? e[l + 1].getAttribute("data-offset-top")
                                  : 0,
                              m = u.id,
                              d = n[m];
                            u = Math.max(
                              document.body.scrollHeight,
                              document.body.offsetHeight,
                              document.documentElement.clientHeight,
                              document.documentElement.scrollHeight,
                              document.documentElement.offsetHeight,
                            );
                            return a < s && s <= r
                              ? null
                              : ((a <= r + 300 ||
                                  (e[0].id === m &&
                                    r >= u - window.innerHeight)) &&
                                  (null !== o ||
                                  d.classList.contains("t-active") ||
                                  d.parentNode.classList.contains("t-active")
                                    ? null !== o && m === o && (c = null)
                                    : (Array.prototype.forEach.call(
                                        t,
                                        function (t) {
                                          t.parentNode.classList.contains(
                                            "tn-atom",
                                          )
                                            ? t.parentNode.classList.remove(
                                                "t-active",
                                              )
                                            : t.classList.remove("t-active");
                                        },
                                      ),
                                      d.parentNode.classList.contains("tn-atom")
                                        ? d.parentNode.classList.add("t-active")
                                        : d.classList.add("t-active"))),
                                !1);
                          }),
                          c)
                    );
                  }
                  function checkNestingLink() {
                    if (0 == "1") {
                      const currentUrl = window.location.href;
                      const tnAtomList = document.querySelectorAll(
                        ".customMenuItem .tn-atom",
                      );
                      Array.prototype.forEach.call(tnAtomList, function (atom) {
                        let intForLink = setInterval(() => {
                          const linkTeg = atom.querySelector("a");
                          if (linkTeg) {
                            clearInterval(intForLink);
                            const link = linkTeg.getAttribute("href");
                            if (currentUrl.includes(link)) {
                              atom.classList.add("t-active");
                            } else {
                              atom.classList.remove("t-active");
                            }
                          }
                        }, 100);
                        setTimeout(() => {
                          clearInterval(intForLink);
                        }, 1000);
                      });
                    }
                  }
                  function t_menusub_catchScroll(t) {
                    var e,
                      n,
                      o = null,
                      r = [],
                      c = [],
                      u = [],
                      x = "";
                    (Array.prototype.forEach.call(t, function (t) {
                      u.push(t);
                    }),
                      Array.prototype.forEach.call(u, function (t) {
                        var isShiftDown = false;
                        if (
                          window.nlm009obj &&
                          window.nlm009obj.top &&
                          isShiftDown
                        ) {
                          var myZoom = 1;
                          if (window.nlm009obj.bottom) {
                            var menuBlk = document.querySelector(
                              "#" + window.nlm009obj.top,
                            );
                          } else {
                            var menuBlk =
                              document.querySelector("#rec2128112391");
                          }
                          if (menuBlk) {
                            if (navigator.userAgent.indexOf("Firefox") != -1) {
                              let scaleWrapper = menuBlk.querySelector(
                                ".tn-atom__scale-wrapper",
                              );
                              if (scaleWrapper) {
                                myZoom = scaleWrapper.style.transform.replace(
                                  /[^0-9,.]/g,
                                  "",
                                );
                                let int2 = setInterval(function () {
                                  scaleWrapper = menuBlk.querySelector(
                                    ".tn-atom__scale-wrapper",
                                  );
                                  let z1 = scaleWrapper.style.transform.replace(
                                    /[^0-9,.]/g,
                                    "",
                                  );
                                  if (z1 != myZoom) {
                                    myZoom =
                                      scaleWrapper.style.transform.replace(
                                        /[^0-9,.]/g,
                                        "",
                                      );
                                  }
                                }, 100);
                              }
                            } else {
                              if (menuBlk.style.zoom != "") {
                                myZoom = menuBlk.style.zoom;
                                let int2 = setInterval(function () {
                                  let z1 = menuBlk.style.zoom;
                                  if (z1 != myZoom) {
                                    myZoom = menuBlk.style.zoom;
                                  }
                                }, 10);
                              }
                            }
                          }
                        }
                        var e = t_menusub_getSectionByHref(t);
                        (e &&
                          e.length &&
                          Array.prototype.forEach.call(e, function (e) {
                            (e.id && r.push(e), (c[e.id] = t));
                          }),
                          t.parentNode.classList.contains("tn-atom")
                            ? (x = t.parentNode)
                            : (x = t),
                          x.addEventListener("click", function (e) {
                            e.preventDefault();
                            window.clickNavButton = true;
                            setTimeout(() => {
                              window.clickNavButton = false;
                            }, 800);
                            let linkHref = t.getAttribute("href");
                            if (linkHref.includes("#rec")) {
                              var block = document.querySelector(
                                t.getAttribute("href"),
                              );
                            } else {
                              var block = document.querySelector(
                                `[data-record-type="215"] a[name="${linkHref.replace("#", "")}"]`,
                              );
                            }
                            if (
                              window.nlm009obj &&
                              window.nlm009obj.top &&
                              isShiftDown &&
                              menuBlk
                            ) {
                              var fromTop =
                                block.offsetTop -
                                menuBlk.offsetHeight * myZoom -
                                menuBlk.offsetTop;
                            } else {
                              var fromTop = block.offsetTop;
                            }
                            var $root = $("html, body");
                            $root.animate(
                              { scrollTop: fromTop },
                              500,
                              function () {
                                if (history.pushState) {
                                } else {
                                }
                              },
                            );
                            var e;
                            (Array.prototype.forEach.call(u, function (t) {
                              t.parentNode.classList.contains("tn-atom")
                                ? t.parentNode.classList.remove("t-active")
                                : t.classList.remove("t-active");
                            }),
                              t.classList.contains("tooltipstered") ||
                                (t.parentNode.classList.contains("tn-atom")
                                  ? t.parentNode.classList.remove("t-active")
                                  : t.classList.remove("t-active"),
                                (e = t_menusub_getSectionByHref(t)) &&
                                  e.length &&
                                  Array.prototype.forEach.call(e, function (t) {
                                    (c[t.id].parentNode.classList.contains(
                                      "tn-atom",
                                    )
                                      ? c[t.id].parentNode.classList.add(
                                          "t-active",
                                        )
                                      : c[t.id].classList.add("t-active"),
                                      (o = t.id));
                                  })));
                          }));
                      }),
                      window.addEventListener(
                        "resize",
                        t_throttle(function () {
                          t_menusub_updateSectionsOffsets(r);
                        }),
                      ),
                      setTimeout(function () {
                        (t_menusub_updateSectionsOffsets(r),
                          t_menusub_highlightNavLinks(u, r, c, o));
                      }, 1e3),
                      window.addEventListener(
                        "scroll",
                        t_throttle(function () {
                          if (window.clickNavButton) {
                            return;
                          }
                          var t = new Date().getTime();
                          e && t < e + 100
                            ? (clearTimeout(n),
                              (n = setTimeout(
                                function () {
                                  ((e = t),
                                    (o = t_menusub_highlightNavLinks(
                                      u,
                                      r,
                                      c,
                                      o,
                                    )));
                                },
                                100 - (t - e),
                              )))
                            : ((e = t),
                              (o = t_menusub_highlightNavLinks(u, r, c, o)));
                        }),
                      ));
                  }
                  function t_menusub_getSectionByHref(t) {
                    var e = "";
                    (o = t.getAttribute("href")) &&
                      (e = o.replace(/\s+/g, "").substring(1));
                    var n, o;
                    t = document.querySelectorAll('.r[id="' + e + '"]');
                    return (
                      (o = document.querySelectorAll(
                        '.r[data-record-type="215"]',
                      )).length &&
                        (o = document.querySelectorAll(
                          '.r[data-record-type="215"] a[name="' + e + '"]',
                        )).length > 0 &&
                        ((n = o[0].parentNode.id),
                        (o = n =
                          document.querySelectorAll('.r[id="' + n + '"]'))),
                      1 === t.length ? t : 1 === o.length && n ? o : void 0
                    );
                  }
                  function t_menusub_checkAnchorLinks2(t) {
                    var e = document.querySelectorAll(
                      "#rec" +
                        t +
                        ' .customMenuItem a:not(.tooltipstered)[href*="#"]',
                    );
                    (e = sortHrefs(e)).length > 0 && t_menusub_catchScroll(e);
                  }
                  function sortHrefs(e) {
                    let t = e,
                      r = t,
                      l = document.querySelectorAll(".t-rec");
                    for (let e = 0; e < t.length; e++) {
                      let u = t[e].getAttribute("href").replace("#", ""),
                        c =
                          (document.querySelectorAll('.r[id="' + u + '"]'),
                          document.querySelectorAll(
                            '.r[data-record-type="215"] a[name="' + u + '"]',
                          ));
                      (c.length > 0 && (u = c[0].parentNode.getAttribute("id")),
                        document
                          .querySelectorAll(".t-rec")
                          .forEach(function (r, l) {
                            r.id == u &&
                              t[e].setAttribute("nolim-menu-hook", l);
                          }));
                      for (let u = 0; u < l.length; u++)
                        ("215" == l[u].getAttribute("data-record-type") &&
                          l[u].children[0].getAttribute("name") ==
                            t[e].getAttribute("href").replace("#", "") &&
                          document.querySelectorAll(
                            '.r[data-record-type="215"] a[name="' +
                              t[e].getAttribute("href").replace("#", "") +
                              '"]',
                          ).length > 0 &&
                          (r[u] = t[e].getAttribute("href")),
                          "215" != l[u].getAttribute("data-record-type") &&
                            l[u].id ==
                              t[e].getAttribute("href").replace("#", "") &&
                            document.querySelector(
                              "#" + t[e].getAttribute("href").replace("#", ""),
                            ).length > 0 &&
                            (r[u] = t[e].getAttribute("href")));
                    }
                    for (
                      let e = (r = [].slice.call(r)).length;
                      e + 1 > 1;
                      e--
                    ) {
                      let t = r[e - 1].getAttribute("href").replace("#", ""),
                        l = document.querySelectorAll('.r[id="' + t + '"]'),
                        u = document.querySelectorAll(
                          '.r[data-record-type="215"] a[name="' + t + '"]',
                        );
                      l.length > 0 || u.length > 0 || r.splice(e - 1, 1);
                    }
                    return (r = (r = [].slice.call(r).sort(function (e, t) {
                      return Number(
                        e.getAttribute("nolim-menu-hook").replace("#rec", ""),
                      ) <
                        Number(
                          t.getAttribute("nolim-menu-hook").replace("#rec", ""),
                        )
                        ? -1
                        : Number(
                              e
                                .getAttribute("nolim-menu-hook")
                                .replace("#rec", ""),
                            ) >
                            Number(
                              t
                                .getAttribute("nolim-menu-hook")
                                .replace("#rec", ""),
                            )
                          ? 1
                          : 0;
                    })).filter((e) => null !== e));
                  }
                  function t_menusub_highlight() {
                    var t = window.location.href,
                      e = window.location.pathname;
                    (Array.prototype.forEach.call([t, e], function (t) {
                      "/" === t[t.length - 1] && (t = t.slice(0, -1));
                    }),
                      "/" === e.charAt(0) && (e = e.slice(1)),
                      "" === e && (e = "/"),
                      (e =
                        '.customMenuItem a[href="' +
                        t +
                        '"], .customMenuItem a[href="' +
                        t +
                        '/"], .customMenuItem a[href="' +
                        e +
                        '"], .customMenuItem a[href="/' +
                        e +
                        '"], .customMenuItem a[href="' +
                        e +
                        '/"], .customMenuItem a[href="/' +
                        e +
                        '/"]'),
                      (e = document.querySelectorAll(e)),
                      Array.prototype.forEach.call(e, function (t) {
                        t.parentNode.classList.contains("tn-atom")
                          ? t.parentNode.classList.add("t-active")
                          : t.classList.add("t-active");
                      }));
                  }
                  function t_ready(t) {
                    "loading" != document.readyState
                      ? t()
                      : document.addEventListener
                        ? document.addEventListener("DOMContentLoaded", t)
                        : document.attachEvent(
                            "onreadystatechange",
                            function () {
                              "loading" != document.readyState && t();
                            },
                          );
                  }
                  t_ready(function () {
                    window.nlm015block2128112391 = true;
                    let t = setInterval(function () {
                      document.querySelectorAll(".t-rec").length > 0 &&
                        document.querySelectorAll(".customMenuItem .tn-atom")
                          .length > 0 &&
                        (clearInterval(t),
                        t_menusub_highlight(),
                        checkNestingLink(),
                        t_menusub_checkAnchorLinks2("2128112391"));
                    }, 50);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112421");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112421");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  if (typeof window.nlm082blocks == "undefined") {
                    window.nlm082blocks = [];
                    window.nlm082blocks.push("#rec2128112421");
                  } else {
                    window.nlm082blocks.push("#rec2128112421");
                  }
                  if (typeof window.nlm082openLinks == "undefined") {
                    window.nlm082openLinks = [];
                    window.nlm082openLinks.push("#open");
                  } else {
                    window.nlm082openLinks.push("#open");
                  }
                  window.nlm082open = false;
                  function t_ready(e) {
                    "loading" != document.readyState
                      ? e()
                      : document.addEventListener
                        ? document.addEventListener("DOMContentLoaded", e)
                        : document.attachEvent(
                            "onreadystatechange",
                            function () {
                              "loading" != document.readyState && e();
                            },
                          );
                  }
                  t_ready(function () {
                    setTimeout(function () {
                      window.t_animate__removeInlineAnimStyles = null;
                      let blk = document.querySelector("#rec2128112421");
                      var myZoom = 1;
                      var isMenuOpen = false;
                      let elemList = document.querySelectorAll(
                        "#rec2128112421 .tn-elem",
                      );
                      for (let i = 0; i < elemList.length; i++) {
                        if (window.isFirefox || window.isOpera) {
                          let scaleWrapper = elemList[i].querySelector(
                            ".tn-atom__scale-wrapper",
                          );
                          if (scaleWrapper) {
                            myZoom = scaleWrapper.style.transform.replace(
                              /[^0-9,.]/g,
                              "",
                            );
                            let int2 = setInterval(function () {
                              scaleWrapper = elemList[i].querySelector(
                                ".tn-atom__scale-wrapper",
                              );
                              let z1 = scaleWrapper.style.transform.replace(
                                /[^0-9,.]/g,
                                "",
                              );
                              if (z1 != myZoom) {
                                myZoom = scaleWrapper.style.transform.replace(
                                  /[^0-9,.]/g,
                                  "",
                                );
                              }
                            }, 100);
                            break;
                          }
                        } else {
                          if (elemList[i].style.zoom != "") {
                            myZoom = elemList[i].style.zoom;
                            let int2 = setInterval(function () {
                              let z1 = elemList[i].style.zoom;
                              if (z1 != myZoom) {
                                myZoom = elemList[i].style.zoom;
                              }
                            }, 100);
                            break;
                          }
                        }
                      }
                      let isMac;
                      if (
                        window.navigator.userAgent
                          .toLowerCase()
                          .indexOf("mac") !== -1
                      ) {
                        isMac = true;
                      } else {
                        isMac = false;
                      }
                      let into = setInterval(function () {
                        var c = document.querySelectorAll("[href='#open']");
                        if (c.length > 0) {
                          clearInterval(into);
                          var menuId = "rec2128112421";
                          let menuBlock = document.querySelector(
                            "#rec2128112421 .t396",
                          );
                          let menuBlockArt = document.querySelector(
                            "#rec2128112421 .t396__artboard",
                          );
                          menuBlock.style.display = "none";
                          setTimeout(function () {
                            menuBlock.style.display = "block";
                          }, 0);
                          var scrollWidth = 0;
                          function removeAnimation(blk) {
                            let block = document.querySelector(blk);
                            let elemList =
                              block.querySelectorAll(".t396__elem");
                            elemList.forEach(function (el) {
                              if (
                                el.hasAttribute("data-animate-sbs-event") &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "hover" &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "click" &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "scroll"
                              ) {
                                el.classList.remove("t-sbs-anim_started");
                              }
                              if (
                                el.classList.contains("t-sbs-anim_reversed")
                              ) {
                                el.classList.remove("t-sbs-anim_reversed");
                                el.classList.remove("t-sbs-anim_started");
                              }
                              if (el.classList.contains("t-sbs-anim_playing")) {
                                el.classList.remove("t-sbs-anim_playing");
                              }
                              if (el.hasAttribute("data-animate-style")) {
                                el.classList.remove("t-animate_started");
                              }
                            });
                          }
                          function addAnimation(blk) {
                            let block = document.querySelector(blk);
                            let elemList =
                              block.querySelectorAll(".t396__elem");
                            elemList.forEach(function (el) {
                              if (
                                el.hasAttribute("data-animate-sbs-event") &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "hover" &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "click" &&
                                el.getAttribute("data-animate-sbs-event") !=
                                  "scroll"
                              ) {
                                el.classList.add("t-sbs-anim_started");
                              }
                              if (el.hasAttribute("data-animate-style")) {
                                el.classList.add("t-animate_started");
                              }
                            });
                          }
                          let isIos = function () {
                            var agent = window.navigator.userAgent;
                            var start = agent.indexOf("OS ");
                            if (
                              (agent.indexOf("iPhone") > -1 ||
                                agent.indexOf("iPad") > -1) &&
                              start > -1
                            ) {
                              return true;
                            }
                            return false;
                          };
                          let isAndroid = function () {
                            var agent = window.navigator.userAgent;
                            return agent.toLowerCase().indexOf("android") > -1;
                          };
                          var scrollTop;
                          function iosLockScroll() {
                            if (isIos()) {
                              scrollTop =
                                window.pageYOffset ||
                                document.documentElement.scrollTop;
                              document.body.classList.add("locked");
                              document.body.style.top = -scrollTop + "px";
                            }
                          }
                          function iosUnlockScroll(x = "nolink") {
                            if (isIos()) {
                              if (document.body.classList.contains("locked")) {
                                document.body.classList.remove("locked");
                                window.scrollTo(0, scrollTop);
                                if (
                                  x &&
                                  x != "nolink" &&
                                  !window.nlm082openLinks.includes(x)
                                ) {
                                  setTimeout(function () {
                                    document
                                      .querySelector(`a[href="${x}"]`)
                                      .click();
                                  }, 500);
                                }
                              }
                            }
                          }
                          function androidScrollFix(x) {
                            if (isAndroid()) {
                              setTimeout(function () {
                                if (document.querySelector(`${x}`)) {
                                  document
                                    .querySelector(`${x}`)
                                    .scrollIntoView({
                                      behavior: "auto",
                                      block: "start",
                                    });
                                }
                              }, 500);
                            }
                          }
                          blk
                            .querySelectorAll("[href]")
                            .forEach(function (item) {
                              item.addEventListener("click", function (e) {
                                iosUnlockScroll(item.getAttribute("href"));
                                androidScrollFix(item.getAttribute("href"));
                              });
                            });
                          var isAnimOnce = false;
                          function setWidth() {
                            let containerType = "grid";
                            menuBlock
                              .querySelectorAll(".tn-elem")
                              .forEach(function (item) {
                                if (
                                  item.getAttribute(
                                    "data-field-container-value",
                                  ) == "window"
                                ) {
                                  containerType = "window";
                                }
                              });
                            let width = document.documentElement.clientWidth;
                            let widthPxOrPercent;
                            let myPercent;
                            let myPx;
                            widthPxOrPercent = "percent";
                            if (width >= 960 && width < 1200) {
                              widthPxOrPercent = "percent";
                            } else if (width >= 640 && width < 960) {
                              widthPxOrPercent = "percent";
                            } else if (width >= 480 && width < 640) {
                              widthPxOrPercent = "percent";
                            } else if (width >= 320 && width < 480) {
                              widthPxOrPercent = "percent";
                            }
                            if (widthPxOrPercent == "px") {
                              if (width >= 960 && width < 1200) {
                              } else if (width >= 640 && width < 960) {
                              } else if (width >= 480 && width < 640) {
                              } else if (width >= 320 && width < 480) {
                              }
                            } else {
                              myPercent = 100 / 100;
                              if (width >= 960 && width < 1200) {
                                myPercent = 100 / 100;
                              } else if (width >= 640 && width < 960) {
                                myPercent = 100 / 100;
                              } else if (width >= 480 && width < 640) {
                                myPercent = 100 / 100;
                              } else if (width >= 320 && width < 480) {
                                myPercent = 100 / 100;
                              }
                            }
                            menuBlock.style.width = "";
                            if (menuBlock.offsetWidth > 0) {
                              menuBlock.style.width = `${menuBlock.offsetWidth + scrollWidth}px`;
                            }
                            if (widthPxOrPercent == "px") {
                              menuBlock.style.height = myPx * myZoom + "px";
                            } else {
                              console.log("menuBlock", menuBlock);
                              let height = menuBlockArt.getAttribute(
                                "data-artboard-height",
                              );
                              if (width >= 960 && width < 1200) {
                                height = menuBlockArt.getAttribute(
                                  "data-artboard-height-res-960",
                                );
                              } else if (width >= 640 && width < 960) {
                                height = menuBlockArt.getAttribute(
                                  "data-artboard-height-res-640",
                                );
                              } else if (width >= 480 && width < 640) {
                                height = menuBlockArt.getAttribute(
                                  "data-artboard-height-res-480",
                                );
                              } else if (width >= 320 && width < 480) {
                                height = menuBlockArt.getAttribute(
                                  "data-artboard-height-res-375",
                                );
                              }
                              menuBlock.style.height =
                                height * myPercent * myZoom + "px";
                            }
                            if (
                              menuBlock.style.height.replace("px", "") >
                                document.documentElement.clientHeight ||
                              myPercent == 1
                            ) {
                              menuBlock.style.height =
                                document.documentElement.clientHeight + "px";
                            }
                            if (
                              !menuBlock.style.transform.includes(
                                "translateY(0px)",
                              )
                            ) {
                              menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                            }
                          }
                          setWidth();
                          menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                          menuBlock.style.overflow = "hidden";
                          function changeZoom() {
                            let z1 = myZoom;
                            let int3 = setInterval(function () {
                              let z2 = myZoom;
                              if (z1 != z2) {
                                setWidth();
                                clearInterval(int3);
                              }
                            }, 100);
                            setTimeout(function () {
                              clearInterval(int3);
                            }, 2000);
                          }
                          window.addEventListener("click", function (event) {
                            let clickId = event.target.closest(".tn-elem");
                            if (
                              document.querySelector(".t-body.nolimPopUp") &&
                              document.querySelector(".nolimShow2128112421") &&
                              !clickId &&
                              !event.target.hasAttribute("nlm082") &&
                              !event.target.classList.contains("t-slds__arrow")
                            ) {
                              isMenuOpen = false;
                              window.nlm082open = false;
                              setTimeout(function () {
                                menuBlock.style.opacity = "0";
                                menuBlock.style.pointerEvents = "none";
                                blk.style.display = "none";
                                document
                                  .querySelector(".t-body")
                                  .classList.remove("nolimPopUp");
                                if (
                                  window.nlm020obj == undefined ||
                                  (window.nlm020obj && !window.nlm020obj.isOpen)
                                ) {
                                  document.querySelector(
                                    "html",
                                  ).style.overflow = "visible";
                                  iosUnlockScroll();
                                }
                                removeAnimation("#rec2128112421");
                              }, 400);
                              menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                              menuBlock.classList.remove("nolimShow2128112421");
                            }
                          });
                          window.addEventListener("click", function (event) {
                            if (
                              document.querySelector(".t-body.nolimPopUp") &&
                              event.target.hasAttribute("nlm082") &&
                              event.target.getAttribute("nlm082") !=
                                "2128112421"
                            ) {
                              isMenuOpen = false;
                              window.nlm082open = false;
                              setTimeout(function () {
                                menuBlock.style.opacity = "0";
                                menuBlock.style.pointerEvents = "none";
                                blk.style.display = "none";
                                removeAnimation("#rec2128112421");
                              }, 400);
                              menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                              menuBlock.classList.remove("nolimShow2128112421");
                            }
                          });
                          c.forEach(function (item) {
                            item.setAttribute("nlm082", "2128112421");
                            item.addEventListener("click", function (e) {
                              e.preventDefault();
                              if (
                                document.querySelector(".nolimShow2128112421")
                              ) {
                                isMenuOpen = false;
                                window.nlm082open = false;
                                setTimeout(function () {
                                  menuBlock.style.opacity = "0";
                                  menuBlock.style.pointerEvents = "none";
                                  blk.style.display = "none";
                                  document
                                    .querySelector(".t-body")
                                    .classList.remove("nolimPopUp");
                                  if (
                                    window.nlm020obj == undefined ||
                                    (window.nlm020obj &&
                                      !window.nlm020obj.isOpen)
                                  ) {
                                    document.querySelector(
                                      "html",
                                    ).style.overflow = "visible";
                                    iosUnlockScroll();
                                  }
                                  removeAnimation("#rec2128112421");
                                }, 400);
                                menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                                menuBlock.classList.remove(
                                  "nolimShow2128112421",
                                );
                              } else {
                                removeAnimation("#rec2128112421");
                                blk.style.display = "block";
                                setTimeout(function () {
                                  isMenuOpen = true;
                                  window.nlm082open = true;
                                  menuBlock.style.opacity = "1";
                                  menuBlock.style.pointerEvents = "auto";
                                  setWidth();
                                  changeZoom();
                                  if (!isMac) {
                                    menuBlock.style.transform = `translateX(-${scrollWidth}px) translateY(0px)`;
                                  } else {
                                    menuBlock.style.transform =
                                      "translateX(0px) translateY(0px)";
                                  }
                                  document.querySelector(
                                    "html",
                                  ).style.overflow = "hidden";
                                  iosLockScroll();
                                  setTimeout(function () {
                                    menuBlock.classList.add(
                                      "nolimShow2128112421",
                                    );
                                    document
                                      .querySelector(".t-body")
                                      .classList.add("nolimPopUp");
                                    setWidth();
                                    if (!isAnimOnce) {
                                      addAnimation("#rec2128112421");
                                    }
                                    isAnimOnce = false;
                                  }, 400);
                                  setTimeout(function () {
                                    "y" === window.lazy && t_lazyload_update();
                                    typeof t_slds_updateSlider != "undefined" &&
                                      t_slds_updateSlider("2128112421");
                                    if (
                                      document.querySelector(
                                        "#rec2128112421",
                                      ) &&
                                      document
                                        .querySelector("#rec2128112421")
                                        .getAttribute("data-record-type") ==
                                        "396"
                                    ) {
                                      t396_doResize("2128112421");
                                    }
                                  }, 300);
                                }, 0);
                              }
                            });
                          });
                          document
                            .querySelectorAll(".nolimClose082")
                            .forEach(function (item) {
                              item.classList.add("nolim_popup_close");
                            });
                          const isYaBrowser =
                            navigator.userAgent.includes("YaBrowser");
                          menuBlock
                            .querySelectorAll(
                              ".nolimClose082, .nolim_popup_close",
                            )
                            .forEach(function (item) {
                              item.addEventListener("click", function () {
                                const href = "#open";
                                const selector =
                                  "[name=" + href.substr(1) + "]";
                                const tildaAnchorLink =
                                  document.querySelector(selector);
                                if (isYaBrowser && tildaAnchorLink) {
                                  tildaAnchorLink.setAttribute(
                                    "id",
                                    href.substr(1),
                                  );
                                  const newLink = document.createElement("a");
                                  newLink.setAttribute("href", href);
                                  menuBlock.appendChild(newLink);
                                  newLink.click();
                                  newLink.remove();
                                }
                                isMenuOpen = false;
                                window.nlm082open = false;
                                setTimeout(function () {
                                  menuBlock.style.opacity = "0";
                                  menuBlock.style.pointerEvents = "none";
                                  console.log("blk", blk);
                                  blk.style.display = "none";
                                  document
                                    .querySelector(".t-body")
                                    .classList.remove("nolimPopUp");
                                  if (
                                    window.nlm020obj == undefined ||
                                    (window.nlm020obj &&
                                      !window.nlm020obj.isOpen)
                                  ) {
                                    document.querySelector(
                                      "html",
                                    ).style.overflow = "visible";
                                    if (
                                      !item.querySelector(".tn-atom[href]") &&
                                      !item.querySelector(".tn-atom a[href]")
                                    ) {
                                      iosUnlockScroll();
                                    }
                                  }
                                  removeAnimation("#rec2128112421");
                                }, 400);
                                menuBlock.style.transform = `translateY(-${Math.ceil(menuBlock.style.height.replace("px", ""))}px)`;
                                menuBlock.classList.remove(
                                  "nolimShow2128112421",
                                );
                              });
                            });
                          window.addEventListener("resize", function () {
                            setWidth();
                            changeZoom();
                          });
                        }
                      });
                    }, 500);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112441");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112441");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  $(document).ready(function () {
                    let formInt = setInterval(function () {
                      let myform = document.querySelector(
                        "#rec1397419971 form",
                      );
                      if (myform) {
                        clearInterval(formInt);
                        let successUrl =
                          myform.getAttribute("data-success-url");
                        if (successUrl) {
                          myform.setAttribute(
                            "data-nolim-success-url",
                            successUrl,
                          );
                          myform.removeAttribute("data-success-url");
                          successUrl = myform.getAttribute("data-success-url");
                        }
                        if (!successUrl) {
                          var o = "#rec2128112441";
                          ($(o).on("click", '[href="#close"]', function () {
                            const dataRecordType = document
                              .querySelector("#rec1397419971")
                              .getAttribute("data-record-type");
                            if (
                              dataRecordType == "702" ||
                              dataRecordType == "1093" ||
                              dataRecordType == "396"
                            ) {
                              $("#rec1397419971 #form1397419971").removeClass(
                                "js-send-form-success",
                              );
                              document
                                .querySelector("#rec1397419971 #form1397419971")
                                .classList.remove("js-send-form-success");
                              $(
                                "#rec1397419971 #form1397419971 .js-successbox",
                              ).hide();
                              $(
                                "#rec1397419971 #form1397419971 .t-form__inputsbox",
                              ).removeClass("t702__inputsbox_hidden");
                            }
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            $(".t-body").removeClass("t-body_scroll-locked");
                            $(".t-body").removeClass("nolimPopUp");
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").fadeOut(),
                              $("#rec2128112441").css("overflow", "hidden"),
                              "yes" == window.tcart_success &&
                                location.reload());
                          }),
                            $("#rec2128112441" + " .t396__filter").click(
                              function () {
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                $(".t-body").removeClass(
                                  "t-body_scroll-locked",
                                );
                                ($("#rec2128112441").fadeOut(),
                                  $(".t-body").removeClass("nolimPopUp"));
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                ($("#rec2128112441").css("overflow", "hidden"),
                                  "yes" == window.tcart_success &&
                                    location.reload());
                              },
                            ));
                          var funcZeroSuccess = function ($form) {
                            $(".t702 .t-popup_show").hide();
                            $(".t1093 .t-popup_show").hide();
                            ($("#rec2128112441").fadeIn(),
                              $(".t-body").addClass("nolimPopUp"));
                            $(".t-body").addClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").css("overflow", "auto"),
                              "y" === window.lazy && t_lazyload_update(),
                              $("#rec1397419971 .t706").hide(),
                              $(".t-form-success-popup").hide());
                            let unlockScr = setInterval(function () {
                              if ($(".t-body_scroll-locked").length > 0) {
                                clearInterval(unlockScr);
                                window.tildaForm.unlockBodyScroll();
                              }
                            }, 50);
                            $("body").append(
                              ` `,
                            );
                            setTimeout(function () {
                              $(".t-form-success-popup").remove();
                              $("#nolimToCloseSuccess").remove();
                            }, 6000);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec1397419971 .t-popup__close").trigger(
                                "click",
                              );
                              $(".nolim_popup_close").click();
                            }, 100);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec1397419971 .t653 .js-successbox").show();
                            }, 100);
                            typeof t_slds_updateSlider != "undefined" &&
                              t_slds_updateSlider("2128112441");
                            if (
                              document.querySelector("#rec2128112441") &&
                              document
                                .querySelector("#rec2128112441")
                                .getAttribute("data-record-type") == "396"
                            ) {
                              t396_doResize("2128112441");
                            }
                          };
                          if (
                            typeof window.NolimSuccessFunction1397419971 ==
                            "undefined"
                          ) {
                            window.NolimSuccessFunction1397419971 = [];
                            window.NolimSuccessFunction1397419971[0] =
                              funcZeroSuccess;
                          } else {
                            window.NolimSuccessFunction1397419971.push(
                              funcZeroSuccess,
                            );
                          }
                          window.mySuccessFunction1397419971 = function (
                            $form,
                          ) {
                            for (
                              var i = 0;
                              i < window.NolimSuccessFunction1397419971.length;
                              i++
                            ) {
                              window.NolimSuccessFunction1397419971[i]($form);
                            }
                          };
                          setInterval(function () {
                            var forms = document.querySelectorAll(
                              "#rec1397419971 .js-form-proccess",
                            );
                            forms.forEach(function (form) {
                              if (form.getAttribute("formSuccess") !== "1") {
                                form.setAttribute("formSuccess", "1");
                                form.removeEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction1397419971,
                                );
                                form.addEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction1397419971,
                                );
                              }
                            });
                          }, 1000);
                        }
                      }
                    }, 50);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t702_initPopup", function () {
              t702_initPopup("2128112461");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  const settingArr = [
                    {
                      block: "#form",
                      zero: "mycart010",
                      zIndex: "1000000000000000000",
                    },
                  ];
                  function n_ready(t) {
                    "loading" != document.readyState
                      ? t()
                      : document.addEventListener
                        ? document.addEventListener("DOMContentLoaded", t)
                        : document.attachEvent(
                            "onreadystatechange",
                            function () {
                              "loading" != document.readyState && t();
                            },
                          );
                  }
                  n_ready(function () {
                    settingArr.forEach((item) => {
                      if (item.block !== "") {
                        document.querySelectorAll(item.block).forEach((el) => {
                          el.style.zIndex = Number(item.zIndex);
                          el.style.position = "relative";
                        });
                      }
                      if (item.zero !== "") {
                        const selector = item.zero
                          .split(",")
                          .map((el) => "." + el)
                          .join(",");
                        document.querySelectorAll(selector).forEach((el) => {
                          el.style.zIndex = Number(item.zIndex);
                        });
                      }
                    });
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t898_init", function () {
              t898_init("1396985851");
            });
          });;

/* --- Extracted Inline Script --- */

$(document).ready(function () {
                  let distance = 400; // Дистанция видимости или сткрытия от верха страницы
                  let startHide = false; // Видно или скрыто при старте  true / false

                  let menuCl = $(".uc-scrollmenu");
                  setTimeout(function () {
                    menuCl.find(".t396__artboard").addClass("menu-st");
                    if (!startHide) {
                      let top = $(document).scrollTop();
                      if (top < distance) {
                        menuCl.find(".t396__artboard").addClass("show-menu");
                      }
                    }
                  }, 100);

                  let scrollPrev = 0;
                  $(window).scroll(function () {
                    let top = $(document).scrollTop();
                    if (top > scrollPrev && top >= distance) {
                      $(".menu-st").removeClass("show-menu");
                    } else {
                      $(".menu-st").addClass("show-menu");
                      if (startHide && top < distance) {
                        $(".menu-st").removeClass("show-menu");
                      } else {
                        $(".menu-st").addClass("show-menu");
                      }
                    }
                    scrollPrev = top;
                  });
                });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112521");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112521");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112551");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112541");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112531");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112561");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112581");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112581");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112591");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112591");
            });
          });;

/* --- Extracted Inline Script --- */

function t_ready(e) {
                  "loading" != document.readyState
                    ? e()
                    : document.addEventListener
                      ? document.addEventListener("DOMContentLoaded", e)
                      : document.attachEvent("onreadystatechange", function () {
                          "loading" != document.readyState && e();
                        });
                }
                t_ready(function () {
                  let nolimSrcVideo = "assets/misc/qh3KUOVO-CfAqFexN.mp4";
                  let nolimPlayer = ".tn-elem__21281125911760086826066";
                  let nolimPreview = "";
                  let nolimPlayButton = "";
                  let nolimStopButton = "";
                  let nolimMuteButton = "";
                  let nolimLoudButton = "";
                  let IsPlayByHover = false;
                  let showVideoControls = false;
                  let autoplayOn = true;
                  let isMuted = true;
                  let isLoop = true;
                  let nolimMime = "video/mp4";
                  let nolimContainerWidth;
                  let nolimContainerHeight;
                  let nolim_$player, nolim_$source;
                  let nolimInteract = false;
                  checkelement();
                  function useLazyUpdate() {
                    if ("function" == typeof t_lazyload_update) {
                      t_lazyload_update();
                    }
                  }
                  function checkelement() {
                    let attempts = 0;
                    const maxAttempts = 50;
                    const checkInterval = setInterval(() => {
                      if (
                        document.querySelector(
                          ".tn-elem__21281125911760086826066",
                        )
                      ) {
                        clearInterval(checkInterval);
                        start();
                      } else {
                        attempts++;
                        if (attempts >= maxAttempts) {
                          clearInterval(checkInterval);
                        }
                      }
                    }, 100);
                  }
                  function start() {
                    function calculateContainerSize() {
                      nolimContainerWidth = $(nolimPlayer).width();
                      nolimContainerHeight = $(nolimPlayer).height();
                    }
                    calculateContainerSize();
                    window.addEventListener("resize", function () {
                      calculateContainerSize();
                    });
                    nolimInit();
                    document.body.addEventListener("click", function () {
                      nolimInteract = true;
                    });
                    $(nolimPlayer)
                      .mouseenter(function () {
                        if (!IsPlayByHover) return false;
                        if (!nolimInteract) nolim_$player.prop("muted", true);
                        nolim_$player.trigger("play");
                        $(nolimPreview).hide();
                        useLazyUpdate();
                      })
                      .mouseleave(function () {
                        if (!IsPlayByHover) return false;
                        nolim_$player.trigger("pause");
                        useLazyUpdate();
                      });
                    $(nolimPreview).hover(function () {
                      if (!IsPlayByHover) return false;
                      nolim_$player.prop("muted", true);
                      nolim_$player.trigger("play");
                      $(nolimPreview).hide();
                      useLazyUpdate();
                    });
                    $(nolimPreview).click(function () {
                      nolim_$player.trigger("play");
                      $(nolimPreview).hide();
                      useLazyUpdate();
                    });
                    $(nolimPlayButton).click(function () {
                      nolim_$player.trigger("play");
                      $(nolimPreview).hide();
                      useLazyUpdate();
                    });
                    $(nolimStopButton).click(function () {
                      nolim_$player.trigger("pause");
                      useLazyUpdate();
                    });
                    $(nolimMuteButton).click(function () {
                      nolim_$player.prop("muted", true);
                      useLazyUpdate();
                    });
                    $(nolimLoudButton).click(function () {
                      nolim_$player.prop("muted", false);
                      useLazyUpdate();
                    });
                    nolim_$player.on("play", function () {
                      hideHandle($(nolimPlayButton));
                      showHandle($(nolimStopButton));
                      useLazyUpdate();
                    });
                    nolim_$player.on("pause", function () {
                      hideHandle($(nolimStopButton));
                      showHandle($(nolimPlayButton));
                      useLazyUpdate();
                    });
                    nolim_$player.on("volumechange", function () {
                      nolimInteract = true;
                      if (
                        nolim_$player.prop("muted") ||
                        nolim_$player.prop("volume") == 0
                      ) {
                        hideHandle($(nolimMuteButton));
                        showHandle($(nolimLoudButton));
                      }
                      if (
                        !nolim_$player.prop("muted") &&
                        nolim_$player.prop("volume") > 0
                      ) {
                        hideHandle($(nolimLoudButton));
                        showHandle($(nolimMuteButton));
                      }
                      useLazyUpdate();
                    });
                    function nolimInit() {
                      $(nolimPlayer).find(".tn-atom").css({
                        overflow: "hidden",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      });
                      nolim_$player = $(nolimPlayer)
                        .find(".tn-atom")
                        .append("<video playsinline></video>")
                        .find("video");
                      nolim_$source = nolim_$player
                        .append("<source>")
                        .find("source");
                      nolim_$source.attr("type", nolimMime);
                      nolim_$source.attr("src", nolimSrcVideo);
                      if (isMuted) nolim_$player.prop("muted", true);
                      if (showVideoControls)
                        nolim_$player.attr("controls", true);
                      if (isLoop) nolim_$player.attr("loop", true);
                      if (autoplayOn) {
                        $(nolimPlayer).attr("data-field-autoplay-value", "y");
                        nolim_$player.attr("autoplay", true);
                        $(nolimPreview).hide();
                        if (window.$isMobile) {
                          const playVideo = () => {
                            const playPromise = nolim_$player[0].play();
                            if (playPromise !== undefined) {
                              playPromise.then(() => {
                                document.body.removeEventListener(
                                  "touchstart",
                                  playVideo,
                                );
                                document.body.removeEventListener(
                                  "click",
                                  playVideo,
                                );
                              });
                            }
                          };
                          document.body.addEventListener(
                            "touchstart",
                            playVideo,
                          );
                          document.body.addEventListener("click", playVideo);
                        }
                      }
                      nolim_$player.css({
                        display: "block",
                        width: nolimContainerWidth + "px",
                        height: nolimContainerHeight + "px",
                        objectFit: "cover",
                      });
                      $(nolimPlayButton).css({ cursor: "pointer" });
                      $(nolimStopButton).css({ cursor: "pointer" });
                      $(nolimMuteButton).css({ cursor: "pointer" });
                      $(nolimLoudButton).css({ cursor: "pointer" });
                      hideHandle($(nolimStopButton));
                      hideHandle($(nolimLoudButton));
                      $(
                        ".tn-elem__21281125911760086826066, .tn-atom, video",
                      ).css("box-sizing", "border-box");
                    }
                    function hideHandle(element) {
                      element.find(".tn-atom").css({ opacity: 0 });
                      element.hide();
                    }
                    function showHandle(element) {
                      element.find(".tn-atom").css({ opacity: 1 });
                      element.show();
                    }
                  }
                });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112611");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112611");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  $(document).ready(function () {
                    let formInt = setInterval(function () {
                      let myform = document.querySelector(
                        "#rec1376096911 form",
                      );
                      if (myform) {
                        clearInterval(formInt);
                        let successUrl =
                          myform.getAttribute("data-success-url");
                        if (successUrl) {
                          myform.setAttribute(
                            "data-nolim-success-url",
                            successUrl,
                          );
                          myform.removeAttribute("data-success-url");
                          successUrl = myform.getAttribute("data-success-url");
                        }
                        if (!successUrl) {
                          var o = "#rec2128112441";
                          ($(o).on("click", '[href="#close"]', function () {
                            const dataRecordType = document
                              .querySelector("#rec1376096911")
                              .getAttribute("data-record-type");
                            if (
                              dataRecordType == "702" ||
                              dataRecordType == "1093" ||
                              dataRecordType == "396"
                            ) {
                              $("#rec1376096911 #form1376096911").removeClass(
                                "js-send-form-success",
                              );
                              document
                                .querySelector("#rec1376096911 #form1376096911")
                                .classList.remove("js-send-form-success");
                              $(
                                "#rec1376096911 #form1376096911 .js-successbox",
                              ).hide();
                              $(
                                "#rec1376096911 #form1376096911 .t-form__inputsbox",
                              ).removeClass("t702__inputsbox_hidden");
                            }
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            $(".t-body").removeClass("t-body_scroll-locked");
                            $(".t-body").removeClass("nolimPopUp");
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").fadeOut(),
                              $("#rec2128112441").css("overflow", "hidden"),
                              "yes" == window.tcart_success &&
                                location.reload());
                          }),
                            $("#rec2128112441" + " .t396__filter").click(
                              function () {
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                $(".t-body").removeClass(
                                  "t-body_scroll-locked",
                                );
                                ($("#rec2128112441").fadeOut(),
                                  $(".t-body").removeClass("nolimPopUp"));
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                ($("#rec2128112441").css("overflow", "hidden"),
                                  "yes" == window.tcart_success &&
                                    location.reload());
                              },
                            ));
                          var funcZeroSuccess = function ($form) {
                            $(".t702 .t-popup_show").hide();
                            $(".t1093 .t-popup_show").hide();
                            ($("#rec2128112441").fadeIn(),
                              $(".t-body").addClass("nolimPopUp"));
                            $(".t-body").addClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").css("overflow", "auto"),
                              "y" === window.lazy && t_lazyload_update(),
                              $("#rec1376096911 .t706").hide(),
                              $(".t-form-success-popup").hide());
                            let unlockScr = setInterval(function () {
                              if ($(".t-body_scroll-locked").length > 0) {
                                clearInterval(unlockScr);
                                window.tildaForm.unlockBodyScroll();
                              }
                            }, 50);
                            $("body").append(
                              ` `,
                            );
                            setTimeout(function () {
                              $(".t-form-success-popup").remove();
                              $("#nolimToCloseSuccess").remove();
                            }, 6000);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec1376096911 .t-popup__close").trigger(
                                "click",
                              );
                              $(".nolim_popup_close").click();
                            }, 100);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec1376096911 .t653 .js-successbox").show();
                            }, 100);
                            typeof t_slds_updateSlider != "undefined" &&
                              t_slds_updateSlider("2128112441");
                            if (
                              document.querySelector("#rec2128112441") &&
                              document
                                .querySelector("#rec2128112441")
                                .getAttribute("data-record-type") == "396"
                            ) {
                              t396_doResize("2128112441");
                            }
                          };
                          if (
                            typeof window.NolimSuccessFunction1376096911 ==
                            "undefined"
                          ) {
                            window.NolimSuccessFunction1376096911 = [];
                            window.NolimSuccessFunction1376096911[0] =
                              funcZeroSuccess;
                          } else {
                            window.NolimSuccessFunction1376096911.push(
                              funcZeroSuccess,
                            );
                          }
                          window.mySuccessFunction1376096911 = function (
                            $form,
                          ) {
                            for (
                              var i = 0;
                              i < window.NolimSuccessFunction1376096911.length;
                              i++
                            ) {
                              window.NolimSuccessFunction1376096911[i]($form);
                            }
                          };
                          setInterval(function () {
                            var forms = document.querySelectorAll(
                              "#rec1376096911 .js-form-proccess",
                            );
                            forms.forEach(function (form) {
                              if (form.getAttribute("formSuccess") !== "1") {
                                form.setAttribute("formSuccess", "1");
                                form.removeEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction1376096911,
                                );
                                form.addEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction1376096911,
                                );
                              }
                            });
                          }, 1000);
                        }
                      }
                    }, 50);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112641");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112641");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112651");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112651");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112661");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112661");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2131441001");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2131441001");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2131573941");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2131573941");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112701");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112701");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112711");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112711");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112721");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112721");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112741");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112741");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112751");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112751");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112761");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112761");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112781");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112781");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112791");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112791");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112801");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112801");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112821");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112821");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112831");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112831");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112841");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112841");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112861");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112861");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112871");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112871");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112881");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112891");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112901");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112911");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112911");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112931");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112941");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112951");
            });
          });;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2160986111");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112971");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112971");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112981");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112981");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128112991");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128112991");
            });
          });;

/* --- Extracted Inline Script --- */

(function () {
                  $(document).ready(function () {
                    let formInt = setInterval(function () {
                      let myform = document.querySelector(
                        "#rec2128112441 form",
                      );
                      if (myform) {
                        clearInterval(formInt);
                        let successUrl =
                          myform.getAttribute("data-success-url");
                        if (successUrl) {
                          myform.setAttribute(
                            "data-nolim-success-url",
                            successUrl,
                          );
                          myform.removeAttribute("data-success-url");
                          successUrl = myform.getAttribute("data-success-url");
                        }
                        if (!successUrl) {
                          var o = "#rec2128112441";
                          ($(o).on("click", '[href="#close"]', function () {
                            const dataRecordType = document
                              .querySelector("#rec2128112441")
                              .getAttribute("data-record-type");
                            if (
                              dataRecordType == "702" ||
                              dataRecordType == "1093" ||
                              dataRecordType == "396"
                            ) {
                              $("#rec2128112441 #form2128112441").removeClass(
                                "js-send-form-success",
                              );
                              document
                                .querySelector("#rec2128112441 #form2128112441")
                                .classList.remove("js-send-form-success");
                              $(
                                "#rec2128112441 #form2128112441 .js-successbox",
                              ).hide();
                              $(
                                "#rec2128112441 #form2128112441 .t-form__inputsbox",
                              ).removeClass("t702__inputsbox_hidden");
                            }
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            $(".t-body").removeClass("t-body_scroll-locked");
                            $(".t-body").removeClass("nolimPopUp");
                            $(".t-body").removeClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").fadeOut(),
                              $("#rec2128112441").css("overflow", "hidden"),
                              "yes" == window.tcart_success &&
                                location.reload());
                          }),
                            $("#rec2128112441" + " .t396__filter").click(
                              function () {
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                $(".t-body").removeClass(
                                  "t-body_scroll-locked",
                                );
                                ($("#rec2128112441").fadeOut(),
                                  $(".t-body").removeClass("nolimPopUp"));
                                $(".t-body").removeClass(
                                  "t-body_success-popup-showed",
                                );
                                ($("#rec2128112441").css("overflow", "hidden"),
                                  "yes" == window.tcart_success &&
                                    location.reload());
                              },
                            ));
                          var funcZeroSuccess = function ($form) {
                            $(".t702 .t-popup_show").hide();
                            $(".t1093 .t-popup_show").hide();
                            ($("#rec2128112441").fadeIn(),
                              $(".t-body").addClass("nolimPopUp"));
                            $(".t-body").addClass(
                              "t-body_success-popup-showed",
                            );
                            ($("#rec2128112441").css("overflow", "auto"),
                              "y" === window.lazy && t_lazyload_update(),
                              $("#rec2128112441 .t706").hide(),
                              $(".t-form-success-popup").hide());
                            let unlockScr = setInterval(function () {
                              if ($(".t-body_scroll-locked").length > 0) {
                                clearInterval(unlockScr);
                                window.tildaForm.unlockBodyScroll();
                              }
                            }, 50);
                            $("body").append(
                              ` `,
                            );
                            setTimeout(function () {
                              $(".t-form-success-popup").remove();
                              $("#nolimToCloseSuccess").remove();
                            }, 6000);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec2128112441 .t-popup__close").trigger(
                                "click",
                              );
                              $(".nolim_popup_close").click();
                            }, 100);
                            setTimeout(function () {
                              $(".t-form-success-popup").hide();
                              $("#rec2128112441 .t653 .js-successbox").show();
                            }, 100);
                            typeof t_slds_updateSlider != "undefined" &&
                              t_slds_updateSlider("2128112441");
                            if (
                              document.querySelector("#rec2128112441") &&
                              document
                                .querySelector("#rec2128112441")
                                .getAttribute("data-record-type") == "396"
                            ) {
                              t396_doResize("2128112441");
                            }
                          };
                          if (
                            typeof window.NolimSuccessFunction2128112441 ==
                            "undefined"
                          ) {
                            window.NolimSuccessFunction2128112441 = [];
                            window.NolimSuccessFunction2128112441[0] =
                              funcZeroSuccess;
                          } else {
                            window.NolimSuccessFunction2128112441.push(
                              funcZeroSuccess,
                            );
                          }
                          window.mySuccessFunction2128112441 = function (
                            $form,
                          ) {
                            for (
                              var i = 0;
                              i < window.NolimSuccessFunction2128112441.length;
                              i++
                            ) {
                              window.NolimSuccessFunction2128112441[i]($form);
                            }
                          };
                          setInterval(function () {
                            var forms = document.querySelectorAll(
                              "#rec2128112441 .js-form-proccess",
                            );
                            forms.forEach(function (form) {
                              if (form.getAttribute("formSuccess") !== "1") {
                                form.setAttribute("formSuccess", "1");
                                form.removeEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction2128112441,
                                );
                                form.addEventListener(
                                  "tildaform:aftersuccess",
                                  window.mySuccessFunction2128112441,
                                );
                              }
                            });
                          }, 1000);
                        }
                      }
                    }, 50);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128113021");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128113021");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128113031");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128113031");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128113041");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128113041");
            });
          });;

/* --- Extracted Inline Script --- */

t_onFuncLoad("t396_initialScale", function () {
            t396_initialScale("2128113061");
          });
          t_onReady(function () {
            t_onFuncLoad("t396_init", function () {
              t396_init("2128113061");
            });
          });;

/* --- Extracted Inline Script --- */

/* ====== МАССИВ НАСТРОЕК — тут добавляем и редактируем слайдеры ====== */
                window.TistolsSliderConfigs = [
                  {
                    id: 1, // номер слайдера (он же должен быть в классах и ссылках конкретного слайдера)
                    timeMs: 5000, // длительность кадра для автопрокрутки и прогресса 5000 - это 5 сек.
                    smartSpeed: 1500, // скорость анимации Owl (пролистывание слайдов)
                    progressColor: "#ffffff", // цвет заполняющий прогресс-бар
                    activeTextColor: "#ffffff", // цвет текста активного слайда
                    pauseOnHover: false, // ставить ли паузу при наведении
                  },
                  {
                    id: 2, // номер слайдера (он же должен быть в классах и ссылках конкретного слайдера)
                    timeMs: 5000, // длительность кадра для автопрокрутки и прогресса 5000 - это 5 сек.
                    smartSpeed: 1500, // скорость анимации Owl (пролистывание слайдов)
                    progressColor: "#ffffff", // цвет заполняющий прогресс-бар
                    activeTextColor: "#ffffff", // цвет текста активного слайда
                    pauseOnHover: false, // ставить ли паузу при наведении
                  },
                  {
                    id: 3, // номер слайдера (он же должен быть в классах и ссылках конкретного слайдера)
                    timeMs: 5000, // длительность кадра для автопрокрутки и прогресса 5000 - это 5 сек.
                    smartSpeed: 1500, // скорость анимации Owl (пролистывание слайдов)
                    progressColor: "#ffffff", // цвет заполняющий прогресс-бар
                    activeTextColor: "#ffffff", // цвет текста активного слайда
                    pauseOnHover: false, // ставить ли паузу при наведении
                  },
                  {
                    id: 4, // номер слайдера (он же должен быть в классах и ссылках конкретного слайдера)
                    timeMs: 5000, // длительность кадра для автопрокрутки и прогресса 5000 - это 5 сек.
                    smartSpeed: 1500, // скорость анимации Owl (пролистывание слайдов)
                    progressColor: "#ffffff", // цвет заполняющий прогресс-бар
                    activeTextColor: "#ffffff", // цвет текста активного слайда
                    pauseOnHover: false, // ставить ли паузу при наведении
                  },
                ];

                (function ($) {
                  function clampIndex(raw, count) {
                    var m = raw % count;
                    return (m + count) % count;
                  }

                  function initSlider(cfg) {
                    var id = cfg.id;
                    var block = $(".uc-tistols-slider-" + id);
                    var wrap = $(".tistols-slider-" + id);
                    var slides = $(".uc-steps-" + id);

                    if (!block.length || !wrap.length || !slides.length) {
                      console.warn(
                        "[SL07] Не найден один из селекторов для id=",
                        id,
                      );
                      return;
                    }

                    block
                      .get(0)
                      .style.setProperty(
                        "--progress-color",
                        cfg.progressColor || "#fff",
                      );
                    block
                      .get(0)
                      .style.setProperty(
                        "--active-text",
                        cfg.activeTextColor || "#fff",
                      );
                    block
                      .get(0)
                      .style.setProperty(
                        "--slide-time",
                        (cfg.timeMs || 5000) + "ms",
                      );

                    wrap.addClass("tistols-slider-owl");

                    var box = wrap.find(".tn-atom");
                    if (!box.find(".owl-carousel").length) {
                      box.append('<div class="owl-carousel owl-theme"></div>');
                    }

                    slides.appendTo(block.find(".owl-carousel"));

                    var $carousel = block.find(".owl-carousel");

                    var owl = $carousel.owlCarousel({
                      loop: true,
                      dots: false,
                      nav: false,
                      items: 1,
                      mouseDrag: false,
                      smartSpeed: cfg.smartSpeed || 1500,
                      autoplay: false,
                      responsive: { 0: { items: 1 } },
                    });

                    var timer = null;
                    var timeMs = cfg.timeMs || 5000;

                    function stopTimer() {
                      if (timer) {
                        clearTimeout(timer);
                        timer = null;
                      }
                    }
                    function startTimer() {
                      stopTimer();
                      timer = setTimeout(function () {
                        owl.trigger("next.owl.carousel");
                      }, timeMs);
                    }

                    if (cfg.pauseOnHover) {
                      block
                        .on("mouseenter", stopTimer)
                        .on("mouseleave", startTimer);
                    }

                    $carousel.on(
                      "initialized.owl.carousel changed.owl.carousel",
                      function (e) {
                        var carousel = $carousel.data("owl.carousel");
                        var count = e.item.count;
                        var logicalIndex = clampIndex(
                          e.item.index - carousel._clones.length / 2,
                          count,
                        );

                        var $lines = block.find(".dot-line");
                        var $infos = block.find(".dot-info");

                        $lines.removeClass("act-line");
                        $infos.removeClass("act-info");
                        $lines.eq(logicalIndex).addClass("act-line");
                        $infos.eq(logicalIndex).addClass("act-info");

                        startTimer();
                      },
                    );

                    block.find(".dot-line, .dot-info").each(function (i) {
                      $(this).on("click", function (ev) {
                        ev.preventDefault();
                        stopTimer();
                        owl.trigger("to.owl.carousel", [
                          i,
                          cfg.smartSpeed || 300,
                          true,
                        ]);
                        startTimer();
                      });
                    });

                    block
                      .find('[href="#slider_left' + id + '"]')
                      .on("click", function (e) {
                        e.preventDefault();
                        stopTimer();
                        owl.trigger("prev.owl.carousel");
                        startTimer();
                      });
                    block
                      .find('[href="#slider_right' + id + '"]')
                      .on("click", function (e) {
                        e.preventDefault();
                        stopTimer();
                        owl.trigger("next.owl.carousel");
                        startTimer();
                      });

                    function startIfVisible() {
                      var el = block.get(0);
                      if (!el) return;
                      var rect = el.getBoundingClientRect();
                      var vh =
                        window.innerHeight ||
                        document.documentElement.clientHeight;
                      if (rect.top < vh && rect.bottom > 0) {
                        if (!$carousel.hasClass("is-started")) {
                          $carousel.addClass("is-started");
                          $carousel.trigger("refresh.owl.carousel");
                          startTimer();
                        }
                      }
                    }

                    if ("IntersectionObserver" in window) {
                      var io = new IntersectionObserver(
                        function (entries) {
                          entries.forEach(function (en) {
                            if (en.isIntersecting) {
                              startIfVisible();
                              io.disconnect();
                            }
                          });
                        },
                        { threshold: 0.1 },
                      );
                      io.observe(block.get(0));
                    } else {
                      $(window).on("scroll resize", startIfVisible);
                      startIfVisible();
                    }
                  }

                  $(function () {
                    (window.TistolsSliderConfigs || []).forEach(initSlider);
                  });
                })(jQuery);;

/* --- Extracted Inline Script --- */

(function () {
                  document.addEventListener("DOMContentLoaded", () => {
                    const parallax_imgs = [
                      ...document.querySelectorAll(".img-parallax img"),
                    ];
                    for (const img of parallax_imgs) {
                      new simpleParallax(img, {
                        orientation: "up",
                        scale: 1.3,
                        delay: 1.2,
                        transition: "cubic-bezier(0, 0, 0, 1)",
                      });
                    }
                    setTimeout(() => {
                      window.dispatchEvent(new Event("resize"));
                    }, 500);
                  });
                })();;

/* --- Extracted Inline Script --- */

(function () {
                  function t_ready(e) {
                    "loading" != document.readyState
                      ? e()
                      : document.addEventListener
                        ? document.addEventListener("DOMContentLoaded", e)
                        : document.attachEvent(
                            "onreadystatechange",
                            function () {
                              "loading" != document.readyState && e();
                            },
                          );
                  }
                  t_ready(function () {
                    if (typeof window.nlm106 === "object") {
                      window.nlm106 = [
                        ...window.nlm106,
                        "tn-elem__13762301811758112890677",
                      ];
                    } else {
                      window.nlm106 = ["tn-elem__13762301811758112890677"];
                    }
                    let int = setInterval(function () {
                      let t396List = [];
                      let t396RenderedList = [];
                      document
                        .querySelectorAll(
                          '[data-record-type="396"] .t396__artboard',
                        )
                        .forEach(function (item) {
                          if (!item.parentNode.closest(".r.t-rec")) {
                            t396List.push(item);
                          }
                        });
                      document
                        .querySelectorAll(
                          '[data-record-type="396"] .t396__artboard.rendered',
                        )
                        .forEach(function (item) {
                          if (!item.parentNode.closest(".r.t-rec")) {
                            t396RenderedList.push(item);
                          }
                        });
                      if (t396List.length == t396RenderedList.length) {
                        clearInterval(int);
                        document
                          .querySelectorAll(".tn-elem__13762301811758112890677")
                          .forEach(function (item) {
                            let icon = document.createElement("div");
                            icon.classList.add("icon");
                            let defaultIcon = document.createElement("div");
                            defaultIcon.classList.add("default");
                            let hoverIcon = document.createElement("div");
                            hoverIcon.classList.add("hover");
                            icon.appendChild(defaultIcon);
                            icon.appendChild(hoverIcon);
                            item.querySelector(".tn-atom").prepend(icon);
                          });
                      }
                    }, 10);
                  });
                })();;

/* --- Extracted Inline Script --- */

(function () {
                  function t_ready(e) {
                    "loading" != document.readyState
                      ? e()
                      : document.addEventListener
                        ? document.addEventListener("DOMContentLoaded", e)
                        : document.attachEvent(
                            "onreadystatechange",
                            function () {
                              "loading" != document.readyState && e();
                            },
                          );
                  }
                  t_ready(function () {
                    if (typeof window.nlm106 === "object") {
                      window.nlm106 = [
                        ...window.nlm106,
                        "tn-elem__13762301811758112890679",
                      ];
                    } else {
                      window.nlm106 = ["tn-elem__13762301811758112890679"];
                    }
                    let int = setInterval(function () {
                      let t396List = [];
                      let t396RenderedList = [];
                      document
                        .querySelectorAll(
                          '[data-record-type="396"] .t396__artboard',
                        )
                        .forEach(function (item) {
                          if (!item.parentNode.closest(".r.t-rec")) {
                            t396List.push(item);
                          }
                        });
                      document
                        .querySelectorAll(
                          '[data-record-type="396"] .t396__artboard.rendered',
                        )
                        .forEach(function (item) {
                          if (!item.parentNode.closest(".r.t-rec")) {
                            t396RenderedList.push(item);
                          }
                        });
                      if (t396List.length == t396RenderedList.length) {
                        clearInterval(int);
                        document
                          .querySelectorAll(".tn-elem__13762301811758112890679")
                          .forEach(function (item) {
                            let icon = document.createElement("div");
                            icon.classList.add("icon");
                            let defaultIcon = document.createElement("div");
                            defaultIcon.classList.add("default");
                            let hoverIcon = document.createElement("div");
                            hoverIcon.classList.add("hover");
                            icon.appendChild(defaultIcon);
                            icon.appendChild(hoverIcon);
                            item.querySelector(".tn-atom").prepend(icon);
                          });
                      }
                    }, 10);
                  });
                })();;

/* --- Extracted Inline Script --- */

t_onReady(function () {
            var hash = window.location.hash;
            t_onFuncLoad("t270_scroll", function () {
              t270_scroll(hash, -3);
            });
            setTimeout(function () {
              var curPath = window.location.pathname;
              var curFullPath = window.location.origin + curPath;
              var recs = document.querySelectorAll(".r");
              Array.prototype.forEach.call(recs, function (rec) {
                var selects =
                  'a[href^="#"]:not([href="#"]):not(.carousel-control):not(.t-carousel__control):not([href^="#price"]):not([href^="#submenu"]):not([href^="#popup"]):not([href*="#zeropopup"]):not([href*="#closepopup"]):not([href*="#closeallpopup"]):not([href^="#prodpopup"]):not([href^="#order"]):not([href^="#!"]):not([target="_blank"]),' +
                  'a[href^="' +
                  curPath +
                  '#"]:not([href*="#!/tfeeds/"]):not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"]):not([href*="#zeropopup"]):not([href*="#closepopup"]):not([href*="#closeallpopup"]):not([target="_blank"]),' +
                  'a[href^="' +
                  curFullPath +
                  '#"]:not([href*="#!/tfeeds/"]):not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"]):not([href*="#zeropopup"]):not([href*="#closepopup"]):not([href*="#closeallpopup"]):not([target="_blank"])';
                var elements = rec.querySelectorAll(selects);
                Array.prototype.forEach.call(elements, function (element) {
                  element.addEventListener("click", function (event) {
                    event.preventDefault();
                    var hash = this.hash.trim();
                    t_onFuncLoad("t270_scroll", function () {
                      t270_scroll(hash, -3);
                    });
                  });
                });
              });
              if (
                document.querySelectorAll(".js-store").length > 0 ||
                document.querySelectorAll(".js-feed").length > 0
              ) {
                t_onFuncLoad("t270_scroll", function () {
                  t270_scroll(hash, -3, 1);
                });
              }
            }, 500);
            setTimeout(function () {
              var hash = window.location.hash;
              if (
                hash &&
                document.querySelectorAll(
                  'a[name="' +
                    hash.slice(1) +
                    '"], div[id="' +
                    hash.slice(1) +
                    '"]',
                ).length > 0
              ) {
                if (window.isMobile) {
                  t_onFuncLoad("t270_scroll", function () {
                    t270_scroll(hash, 0);
                  });
                } else {
                  t_onFuncLoad("t270_scroll", function () {
                    t270_scroll(hash, 0);
                  });
                }
              }
            }, 1000);
            window.addEventListener("popstate", function () {
              var hash = window.location.hash;
              if (
                hash &&
                document.querySelectorAll(
                  'a[name="' +
                    hash.slice(1) +
                    '"], div[id="' +
                    hash.slice(1) +
                    '"]',
                ).length > 0
              ) {
                if (window.isMobile) {
                  t_onFuncLoad("t270_scroll", function () {
                    t270_scroll(hash, 0);
                  });
                } else {
                  t_onFuncLoad("t270_scroll", function () {
                    t270_scroll(hash, 0);
                  });
                }
              }
            });
          });;

/* --- Extracted Inline Script --- */

setTimeout(function () {
        (function (m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function () {
              (m[i].a = m[i].a || []).push(arguments);
            };
          m[i].l = 1 * new Date();
          ((k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a));
        })(window, document, "script", "scripts/vendor/tag.js", "ym");
        window.mainMetrikaId = "98388716";
        ym(window.mainMetrikaId, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          params: { __ym: { ymCms: { cms: "tilda", cmsVersion: "1.0" } } },
          ecommerce: "dataLayer",
        });
      }, 2000);;

/* --- Extracted Inline Script --- */

if (!window.mainTracker) {
        window.mainTracker = "tilda";
      }
      window.tildastatcookie = "no";
      setTimeout(function () {
        (function (d, w, k, o, g) {
          var n = d.getElementsByTagName(o)[0],
            s = d.createElement(o),
            f = function () {
              n.parentNode.insertBefore(s, n);
            };
          s.type = "text/javascript";
          s.async = true;
          s.key = k;
          s.id = "tildastatscript";
          s.src = g;
          if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
          } else {
            f();
          }
        })(
          document,
          window,
          "f6d1beda564d2644e4d81672598771dd",
          "script",
          "scripts/vendor/tilda-stat-1.0.min.js",
        );
      }, 2000);;