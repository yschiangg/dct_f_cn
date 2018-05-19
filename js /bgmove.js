var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {if (window.CP.shouldStopExecution(1)){break;} var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); }
window.CP.exitedLoop(1);
 } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkItemView = function () {
  function WorkItemView() {
    _classCallCheck(this, WorkItemView);

    this.layers = [];
    this.w = 300;
    this.h = 200;
    this.loadProgress = { a: 0 };

    this._el = document.createElement('div');
    this.s = new Snap(this.w, this.h);
    this._el.appendChild(this.s.node);

    TweenMax.set(this.s.node, { scale: 0.9 });

    this.g = this.s.g();

    this.c = this.s.g();
    this.c.attr({ opacity: 0, transform: 'scale(1)' });
    this.g.append(this.c);

    this.createMask();

    this.createGradient();

    this.loader = this.s.path();
    this.g.append(this.loader);
  }

  _createClass(WorkItemView, [{
    key: 'el',
    value: function el() {
      return this._el;
    }
  }, {
    key: 'complete',
    value: function complete() {
      if (window.innerWidth > 600) {
        console.log(this._el);
        this._el.addEventListener('mousemove', this.handle_mousemove.bind(this));
        this._el.addEventListener('mouseout', this.handle_mouseout.bind(this));
        this._el.addEventListener('mouseover', this.handle_mouseover.bind(this));
      }

      this._el.addEventListener('click', this.handle_click.bind(this));
    }
  }, {
    key: 'handle_click',
    value: function handle_click(e) {
      window.open('http://www.cjgammon.com', '_blank');
    }
  }, {
    key: 'handle_mouseover',
    value: function handle_mouseover(e) {
      TweenMax.to(this.s.node, 0.2, { scale: 1, ease: Back.easeOut });
    }
  }, {
    key: 'handle_mousemove',
    value: function handle_mousemove(e) {
      var dx = e.offsetX - this.w / 2;
      var dy = e.offsetY - this.h / 2;

      for (var i = 0; i < this.layers.length; i += 1) {if (window.CP.shouldStopExecution(2)){break;}
        var l = this.layers[i];
        var _x = dx * this.assets.layers[i].o;
        var _y = dy * this.assets.layers[i].o;
        TweenMax.to(l.node, 0.1, { x: _x, y: _y });
      }
window.CP.exitedLoop(2);


      TweenMax.to(this.s.node, 0.2, { rotationY: dx / 10, rotationX: -dy / 10 });

      this.updateGradient(e);
    }
  }, {
    key: 'handle_mouseout',
    value: function handle_mouseout(e) {
      for (var i = 0; i < this.layers.length; i += 1) {if (window.CP.shouldStopExecution(3)){break;}
        var l = this.layers[i];
        TweenMax.to(l.node, 0.2, { x: 0, y: 0, ease: Quad.easeOut });
      }
window.CP.exitedLoop(3);


      TweenMax.to(this.s.node, 0.2, { scale: 0.9, rotationY: 0, rotationX: 0, ease: Quad.easeOut });
      TweenMax.to(this.c.node, 1, { rotationY: 0, rotationX: 0 });
      TweenMax.to(this.gradEl.node, 0.5, { opacity: 0 });
    }
  }, {
    key: 'createMask',
    value: function createMask() {
      this.mask = this.s.rect(0, 0, this.w, this.h, 3);
      this.mask.attr({ fill: 'white' });
      this.mask.toDefs();

      this.g.attr({ mask: this.mask });
    }
  }, {
    key: 'angleToPoints',
    value: function angleToPoints(angle) {
      var segment = Math.floor(angle / Math.PI * 2) + 2;
      var diagonal = (1 / 2 * segment + 1 / 4) * Math.PI;
      var op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
      var x = op * Math.cos(angle);
      var y = op * Math.sin(angle);

      return {
        x1: x < 0 ? 1 : 0,
        y1: y < 0 ? 1 : 0,
        x2: x >= 0 ? x : x + 1,
        y2: y >= 0 ? y : y + 1
      };
    }
  }, {
    key: 'updateGradient',
    value: function updateGradient(e) {
      var dx = e.offsetX - this.w / 2;
      var dy = e.offsetY - this.h / 2;
      var angle = Math.atan2(dy, dx);
      var points = this.angleToPoints(angle);

      var _opacity = Math.sqrt(dx * dx + dy * dy);

      this.grad.attr(points);
      TweenMax.to(this.gradEl.node, 0.1, { opacity: _opacity / this.h });
    }
  }, {
    key: 'createGradient',
    value: function createGradient() {
      this.grad = this.s.gradient("l(0, 0, 1, 1)rgba(0,0,0,0.5)-rgba(0,0,0,0):75");

      this.gradEl = this.s.rect(0, 0, this.w, this.h);
      this.gradEl.attr({ fill: this.grad, opacity: 0 });
      this.g.append(this.grad);
    }
  }, {
    key: 'getPath',
    value: function getPath(a) {
      var radius = 20,
          r = void 0,
          x = void 0,
          y = void 0,
          mid = void 0,
          anim = void 0;

      a %= 360;
      r = a * Math.PI / 180;
      x = Math.sin(r) * radius;
      y = Math.cos(r) * -radius;
      mid = a > 180 ? 1 : 0;
      anim = 'M 0 0 v -' + radius + ' A ' + radius + ' ' + radius + ' 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

      return anim;
    }
  }, {
    key: 'load',
    value: function load(_assets) {
      this.loader.transform('translate(' + this.w / 2 + ' ' + this.h / 2 + ')');
      TweenMax.set(this.loader.node, { transformOrigin: '50% 50%' });

      this.assets = _assets;
      this.asset = 0;
      this.loadAsset(this.asset);
    }
  }, {
    key: 'handle_load',
    value: function handle_load(e) {

      var obj = this.assets.layers[this.asset];
      var i = this.s.image(e.target.src, obj.x, obj.y);
      this.layers.push(i);
      this.c.append(i);

      this.asset += 1;

      var tw = new TimelineMax();

      var amt = this.asset / this.assets.layers.length * 359.9;
      var speed = 1 - amt / 360;
      speed = speed > 0 ? speed : 0.1;

      tw.to(this.loadProgress, speed, {
        a: amt,
        onUpdate: function () {
          this.loader.node.setAttribute('d', this.getPath(this.loadProgress.a));
        }.bind(this)
      });

      if (this.asset < this.assets.layers.length) {
        this.loadAsset(this.asset);
      } else {

        tw.to(this.loader.node, 0.2, { scale: 10, ease: Linear.easeNone, onComplete: function () {
            TweenMax.set(this.c.node, { opacity: 1 });
            TweenMax.to(this.loader.node, 0.2, { opacity: 0, ease: Linear.easeNone });
            this.complete();
          }.bind(this) });
      }
    }
  }, {
    key: 'loadAsset',
    value: function loadAsset(_asset) {
      var img = new Image();
      var obj = this.assets.layers[_asset];

      if (obj.f.indexOf('/') > -1) {
        img.src = obj.f;
      } else {
        img.src = 'http://www.cjgammon.com/assets/images/work-items/' + this.assets.name + '/' + obj.f;
      }

      img.onload = this.handle_load.bind(this);
    }
  }]);

  return WorkItemView;
}();

var data = {
  name: 'graphicalweb',
  layers: [{ f: 'graphical_web_big.png', x: -100, y: -120, o: -0.1 }, { f: 'http://www.cjgammon.com/assets/images/awards/award_awwwards_silver.png', x: 255, y: 130, o: 0 }, { f: 'graphical_web_title.svg', x: 30, y: 10, o: 0.05 }]
};

var workItem = new WorkItemView();
document.body.appendChild(workItem.el());
workItem.load(data);