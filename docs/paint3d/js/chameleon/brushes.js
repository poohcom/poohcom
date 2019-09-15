/// <reference path="./common.ts" />
var Chameleon;
(function (Chameleon) {
    class Pencil {
        constructor() {
            this._canvasContext = null;
        }
        get radius() {
            return 1;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.lineWidth = this.radius * 2;
            this._canvasContext.moveTo(position.x, position.y);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                this._canvasContext.lineTo(position.x, position.y);
                this._canvasContext.stroke();
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.Pencil = Pencil;
    class MarkerBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.lineWidth = this.radius * 2;
            this._canvasContext.strokeStyle = this.color;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._canvasContext.moveTo(position.x, position.y);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                this._canvasContext.lineTo(position.x, position.y);
                this._canvasContext.stroke();
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.MarkerBrush = MarkerBrush;
    class BlurryMarkerBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.lineWidth = this.radius;
            this._canvasContext.strokeStyle = this.color;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._canvasContext.shadowBlur = this.radius;
            this._canvasContext.shadowColor = this.color;
            this._canvasContext.moveTo(position.x, position.y);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                this._canvasContext.lineTo(position.x, position.y);
                this._canvasContext.stroke();
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.BlurryMarkerBrush = BlurryMarkerBrush;
    class CalligraphyBrush {
        constructor() {
            this.img = new Image();
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        get radius() {
            return 32 / 2;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this.img.src = 'image/brush3.png';
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._lastPosition.copy(position);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                var dist = this._lastPosition.distanceTo(position);
                var angle = Chameleon.angleBetween(this._lastPosition, position);
                for (var i = 0; i < dist; i++) {
                    var x = this._lastPosition.x + (Math.sin(angle) * i) - this.radius;
                    var y = this._lastPosition.y + (Math.cos(angle) * i) - this.radius;
                    this._canvasContext.drawImage(this.img, x, y);
                }
                this._lastPosition.copy(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.CalligraphyBrush = CalligraphyBrush;
    class Fur {
        constructor() {
            this.img = new Image();
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        get radius() {
            return 32 * 1.415 / 2;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this.img.src = 'image/brush3.png';
            this.img.width = 10;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._lastPosition.copy(position);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                var dist = this._lastPosition.distanceTo(position);
                var angle = Chameleon.angleBetween(this._lastPosition, position);
                for (var i = 0; i < dist; i++) {
                    var x = this._lastPosition.x + (Math.sin(angle) * i);
                    var y = this._lastPosition.y + (Math.cos(angle) * i);
                    this._canvasContext.save();
                    this._canvasContext.translate(x, y);
                    this._canvasContext.scale(0.5, 0.5);
                    this._canvasContext.rotate(Math.PI * 180 / Chameleon.getRandomInt(0, 180));
                    this._canvasContext.drawImage(this.img, 0, 0);
                    this._canvasContext.restore();
                }
                this._lastPosition.copy(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.Fur = Fur;
    class ThickBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.lineWidth = this.radius / 10;
            this._canvasContext.strokeStyle = this.color;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._lastPosition.copy(position);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                this._canvasContext.beginPath();
                this._canvasContext.globalAlpha = 0.85;
                for (var i = -this.radius * 0.9; i <= this.radius * 0.9; i += this.radius / 20) {
                    this._canvasContext.beginPath();
                    this._canvasContext.moveTo(this._lastPosition.x + i, this._lastPosition.y + i);
                    this._canvasContext.lineTo(position.x + i, position.y + i);
                    this._canvasContext.stroke();
                }
                this._lastPosition.copy(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.ThickBrush = ThickBrush;
    class InkDropBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        drawDrop(position) {
            this._canvasContext.beginPath();
            this._canvasContext.globalAlpha = Math.random();
            this._canvasContext.arc(position.x, position.y, Chameleon.getRandomInt(this.radius / 3, this.radius), 30, 270, false);
            this._canvasContext.fill();
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.fillStyle = this.color;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._lastPosition.copy(position);
            this.drawDrop(position);
        }
        continueStoke(position) {
            if (this._canvasContext && position.distanceTo(this._lastPosition) > this.radius * 2 / 3) {
                this._lastPosition.copy(position);
                this.drawDrop(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.InkDropBrush = InkDropBrush;
    class StarBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        drawStar(position, angle) {
            var length = this.radius / 2;
            var x = position.x, y = position.y;
            this._canvasContext.save();
            this._canvasContext.translate(x, y);
            this._canvasContext.beginPath();
            this._canvasContext.rotate(Math.PI / 180 * angle);
            for (var i = 5; i--;) {
                this._canvasContext.lineTo(0, length);
                this._canvasContext.translate(0, length);
                this._canvasContext.rotate((Math.PI * 2 / 10));
                this._canvasContext.lineTo(0, -length);
                this._canvasContext.translate(0, -length);
                this._canvasContext.rotate(-(Math.PI * 6 / 10));
            }
            this._canvasContext.lineTo(0, length);
            this._canvasContext.closePath();
            this._canvasContext.stroke();
            this._canvasContext.restore();
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.save();
            this._canvasContext.strokeStyle = this.color;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this.drawStar(position, Chameleon.getRandomInt(0, 180));
            this._lastPosition.copy(position);
        }
        continueStoke(position) {
            if (this._canvasContext && this._lastPosition.distanceTo(position) > this.radius) {
                this.drawStar(position, Chameleon.getRandomInt(0, 180));
                this._lastPosition.copy(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.StarBrush = StarBrush;
    class RandomStarBrush {
        constructor(radius) {
            this.radius = radius;
            this._canvasContext = null;
            this._lastPosition = new THREE.Vector2();
        }
        drawStar(position) {
            var angle = Chameleon.getRandomInt(0, 180), width = Chameleon.getRandomInt(1, this.radius / 2.8), opacity = Math.random(), scale = Chameleon.getRandomInt(10, 20) / 20, color = ('rgb(' + Chameleon.getRandomInt(0, 255) + ',' + Chameleon.getRandomInt(0, 255) + ',' + Chameleon.getRandomInt(0, 255) + ')'), length = this.radius / 3.5;
            this._canvasContext.save();
            this._canvasContext.translate(position.x, position.y);
            this._canvasContext.beginPath();
            this._canvasContext.globalAlpha = opacity;
            this._canvasContext.rotate(Math.PI / 180 * angle);
            this._canvasContext.scale(scale, scale);
            this._canvasContext.strokeStyle = color;
            this._canvasContext.lineWidth = width;
            for (var i = 5; i--;) {
                this._canvasContext.lineTo(0, length);
                this._canvasContext.translate(0, length);
                this._canvasContext.rotate((Math.PI * 2 / 10));
                this._canvasContext.lineTo(0, -length);
                this._canvasContext.translate(0, -length);
                this._canvasContext.rotate(-(Math.PI * 6 / 10));
            }
            this._canvasContext.lineTo(0, length);
            this._canvasContext.closePath();
            this._canvasContext.stroke();
            this._canvasContext.restore();
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.save();
            this._lastPosition.copy(position);
            this.drawStar(position);
        }
        continueStoke(position) {
            if (this._canvasContext && position.distanceTo(this._lastPosition) > this.radius * 2 / 3) {
                this._lastPosition.copy(position);
                this.drawStar(position);
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.RandomStarBrush = RandomStarBrush;
    class SprayBrush {
        constructor(radius, color) {
            this.radius = radius;
            this.color = color;
            this._canvasContext = null;
            this._density = 70;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.fillStyle = this.color;
        }
        continueStoke(position) {
            if (this._canvasContext) {
                for (var i = this._density; i--;) {
                    var dotRadius = Chameleon.getRandomFloat(0, this.radius);
                    var angle = Chameleon.getRandomFloat(0, Math.PI * 2);
                    var dotWidth = Chameleon.getRandomFloat(1, 2);
                    this._canvasContext.globalAlpha = Math.random();
                    this._canvasContext.fillRect(position.x + dotRadius * Math.cos(angle), position.y + dotRadius * Math.sin(angle), dotWidth, dotWidth);
                }
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.SprayBrush = SprayBrush;
    class TextureBrush {
        constructor(radius, texture) {
            this.radius = radius;
            this.texture = texture;
            this._canvasContext = null;
        }
        startStroke(canvas, position) {
            this._canvasContext = canvas.getContext('2d');
            this._canvasContext.beginPath();
            this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
            this._canvasContext.lineWidth = this.radius * 2;
            this._canvasContext.lineJoin = this._canvasContext.lineCap = 'round';
            this._canvasContext.strokeStyle = this._canvasContext.createPattern(this.texture, 'repeat');
            this._canvasContext.moveTo(position.x, position.y);
        }
        continueStoke(position) {
            if (this._canvasContext) {
                this._canvasContext.lineTo(position.x, position.y);
                this._canvasContext.moveTo(position.x, position.y);
                this._canvasContext.stroke();
            }
        }
        finishStroke() {
            if (this._canvasContext) {
                this._canvasContext.moveTo(0, 0);
                this._canvasContext.restore();
                this._canvasContext = null;
            }
        }
    }
    Chameleon.TextureBrush = TextureBrush;
})(Chameleon || (Chameleon = {}));
//# sourceMappingURL=brushes.js.map