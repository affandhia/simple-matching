$(document).ready(function () {

    var isSupportLocalStorage = false;
    var isSignedIn = false;
    if (typeof(Storage) !== "undefined") {
        isSupportLocalStorage = true;
        var username = sessionStorage.getItem("username");  // get username from session
        if (username == undefined) {
            window.location.replace("index.html");
        } else {
            isSignedIn = true;

            // Ganti string User di navbar - hello user
            $("#navbar .user").text(username);
        }
        // more info about localStorage = http://www.w3schools.com/html/html5_webstorage.asp
    } else {
        alert("Your browser doesn't support local storage. Please upgrade or install another good one.");
        window.location.replace("index.html");
    }

    function game() {
        // Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen
        Memory = {
            init: function (cards) {
                if (!isSignedIn) {
                    return;
                }
                this.$game = $(".game");
                this.$modal = $(".modal");
                this.$overlay = $(".modal-overlay");
                this.$restartButton = $("button.restart");
                this.cardsArray = $.merge(cards, cards);
                this.shuffleCards(this.cardsArray);
                this.setup();
            },

            shuffleCards: function (cardsArray) {
                // this.$cards = $(this.shuffle(this.cardsArray));
                this.$cards = $(this.cardsArray);
            },

            setup: function () {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card-item");
                this.binding();
                this.paused = false;
                this.guess = null;
            },

            binding: function () {
                this.$memoryCards.on("click", this.cardClicked);
                this.$restartButton.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () {
                var _ = Memory;
                var $card = $(this);
                stopwatch.start();
                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                    $card.find(".inside").addClass("picked");
                    if (!_.guess) {
                        _.guess = $(this).attr("data-id");
                    } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                        $(".picked").addClass("matched");
                        _.guess = null;
                    } else {
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                        }, 600);
                    }
                    if ($(".matched").length == $(".card-item").length) {
                        // _.win();
                        // restart dengan klik restart
                        storeScore();
                        $("#timer input[name='restart']").click();
                    }
                }
            },

            win: function () {
                this.paused = true;
                setTimeout(function () {
                    Memory.showModal();
                    Memory.$game.fadeOut();
                }, 1000);
            },

            showModal: function () {
                this.$overlay.show();
                this.$modal.fadeIn("slow");
            },

            hideModal: function () {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show("slow");
            },

            // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
            shuffle: function (array) {
                var counter = array.length, temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {
                var frag = '';
                this.$cards.each(function (k, v) {
                    frag += '<div class="card-item col-xs-3 no-pad" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"\
				alt="Codepen" /></div></div>\
				</div>';
                });
                return frag;
            }
        };

        var cards = [
            {
                name: "php",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
                id: 1
            },
            {
                name: "css3",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
                id: 2
            },
            {
                name: "html5",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
                id: 3
            },
            {
                name: "jquery",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
                id: 4
            },
            {
                name: "javascript",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
                id: 5
            },
            {
                name: "node",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
                id: 6
            },
            {
                name: "photoshop",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
                id: 7
            },
            {
                name: "python",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
                id: 8
            }
        ];

        Memory.init(cards);

    };
    var Memory = new game();


    // Stop watch https://codepen.io/_Billy_Brown/pen/dbJeh

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Stopwatch = function () {
        var diff = 0;

        function Stopwatch(display, results) {
            _classCallCheck(this, Stopwatch);

            this.running = false;
            this.display = display;
            this.results = results;
            this.laps = [];
            this.reset();
            this.print(this.times);
        }

        Stopwatch.prototype.reset = function reset() {
            this.times = [0, 0, 0];
        };

        Stopwatch.prototype.start = function start() {
            if (!this.time) this.time = performance.now();
            if (!this.running) {
                this.running = true;
                requestAnimationFrame(this.step.bind(this));
            }
        };

        Stopwatch.prototype.lap = function lap() {
            var times = this.times;
            if (this.running) {
                this.reset();
            }
            var li = document.createElement('li');
            li.innerText = this.format(times);
            this.results.appendChild(li);
        };

        Stopwatch.prototype.stop = function stop() {
            this.running = false;
            this.time = null;
        };

        Stopwatch.prototype.restart = function restart() {
            if (!this.time) this.time = performance.now();
            if (!this.running) {
                this.running = true;
                requestAnimationFrame(this.step.bind(this));
            }
            this.reset();
        };

        Stopwatch.prototype.clear = function clear() {
            clearChildren(this.results);
        };

        Stopwatch.prototype.step = function step(timestamp) {
            if (!this.running) return;
            this.calculate(timestamp);
            this.time = timestamp;
            this.print();
            requestAnimationFrame(this.step.bind(this));
        };

        Stopwatch.prototype.calculate = function calculate(timestamp) {
            diff = timestamp - this.time;
            // Hundredths of a second are 100 ms
            this.times[2] += diff / 10;
            // Seconds are 100 hundredths of a second
            if (this.times[2] >= 100) {
                this.times[1] += 1;
                this.times[2] -= 100;
            }
            // Minutes are 60 seconds
            if (this.times[1] >= 60) {
                this.times[0] += 1;
                this.times[1] -= 60;
            }
        };

        Stopwatch.prototype.print = function print() {
            this.display.innerText = this.format(this.times);
        };

        Stopwatch.prototype.format = function format(times) {
            return pad0(times[0], 2) + ':' + pad0(times[1], 2) + ':' + pad0(Math.floor(times[2]), 2);
        };

        return Stopwatch;
    }();

    function pad0(value, count) {
        var result = value.toString();
        for (; result.length < count; --count) {
            result = '0' + result;
        }
        return result;
    }

    function clearChildren(node) {
        while (node.lastChild) {
            node.removeChild(node.lastChild);
        }
    }

    var stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

    // end stopwatch

    // App Function
    var $restart = $("#timer input[name='restart']");       // get restart button
    var $logout = $("#navbar input[name='logout']");       // get logout button

    $restart.click(function () {
        stopwatch.stop();
        stopwatch.reset();
        $(".picked .matched").removeClass("matched");
        Memory = new game();
    });

    $logout.click(function () {
        sessionStorage.removeItem("username");
        window.location.replace("index.html");
    });

    // Store function
    function storeScore() {
        var score = {};
        if (sessionStorage.getItem("score") !== undefined) {
            sessionStorage.setItem("score", score.stringify());
        } else {
            score = JSON.parse(sessionStorage.getItem("score"));
            score.sort(function (a, b) {
                if (a["time"] > b["time"]) {
                    return 1;
                } else if (a["time"] < b["time"]) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
    }


});