$(document).ready(function () 
{

    var isSupportLocalStorage = false;
    var isSignedIn = false;
    if (typeof(Storage) !== "undefined") 
    {
        isSupportLocalStorage = true;
        var username = sessionStorage.getItem("username");  // get username from session

        if (username == undefined) 
        {
            window.location.replace("index.html");
        }
        else 
        {
            isSignedIn = true;
            // Ganti string User di navbar - hello user
            $("#navbar .user").text(username);
        }
    } 

    else 
    {
        alert("Your browser doesn't support local storage. Please upgrade or install another good one.");
        window.location.replace("index.html");
    }

    function Game() 
    {
        // Memory Game
        // © 2014 Nate Wiley
        // License -- MIT
        // best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
        // Follow me on Codepen
        Memory = 
        {
            init: function (cards) 
            {
                if (!isSignedIn) 
                {
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

            shuffleCards: function (cardsArray) 
            {
                this.$cards = $(/*this.shuffle(*/this.cardsArray);
            },

            setup: function () 
            {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card-item");
                this.binding();
                this.paused = false;
                this.guess = null;
            },

            binding: function () 
            {
                this.$memoryCards.on("click", this.cardClicked);
                this.$restartButton.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () 
            {
                if(!isStarted) {
                    $("#modal-start").modal("show");
                    return;
                }
                var _ = Memory;
                var $card = $(this);

                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) 
                {
                    $card.find(".inside").addClass("picked");
                    if (!_.guess) 
                    {
                        _.guess = $(this).attr("data-id");
                    } 

                    else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) 
                    {
                        $(".picked").addClass("matched");
                        _.guess = null;
                    } 

                    else 
                    {
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () 
                        {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                        }, 600);
                    }

                    if ($(".matched").length == $(".card-item").length) 
                    {
                        $("#modal-win").modal("show");
                        isFinished = true;
                        stopwatch.stop();
                        storeScore();
                    }
                }
            },

            showModal: function () 
            {
                this.$overlay.show();
                this.$modal.fadeIn("slow");
            },

            hideModal: function () 
            {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () 
            {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show("slow");
            },

            // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
            shuffle: function (array) 
            {
                var counter = array.length, temp, index;
                // While there are elements in the array
                while (counter > 0) 
                {
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

            buildHTML: function () 
            {
                var frag = '';
                this.$cards.each(function (k, v) 
                {
                    frag += '<div class="card-item col-xs-3 no-pad" data-id="' + v.id + '"><div class="inside">\
                <div class="front"><img src="' + v.img + '"\
                alt="' + v.name + '" /></div>\
                <div class="back"><img src="src/img/frontcard.png"\
                alt="Codepen" /></div></div>\
                </div>';
                });
                
                return frag;
            }
        };

        var cards = [
            {
                name: "pooh",
                img: "src/img/pooh.png",
                id: 1
            },
            {
                name: "piglet",
                img: "src/img/piglet.png",
                id: 2
            },
            {
                name: "tiger",
                img: "src/img/tigger.png",
                id: 3
            },
            {
                name: "owl",
                img: "src/img/owl.png",
                id: 4
            },
            {
                name: "eeyore",
                img: "src/img/eeyore.png",
                id: 5
            },
            {
                name: "kanga",
                img: "src/img/kanga.png",
                id: 6
            },
            {
                name: "christo",
                img: "src/img/christo.png",
                id: 7
            },
            {
                name: "rabbit",
                img: "src/img/rabbit.png",
                id: 8
            }
        ];

        Memory.init(cards);

    };
    var Memory = new Game();


    // Stop watch https://codepen.io/_Billy_Brown/pen/dbJeh

    function _classCallCheck(instance, Constructor) 
    {
        if (!(instance instanceof Constructor)) 
        {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Stopwatch = function () 
    {
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

        Stopwatch.prototype.reset = function reset() 
        {
            this.times = [0, 0, 0];
        };

        Stopwatch.prototype.start = function start() 
        {
            if (!this.time) this.time = performance.now();
            if (!this.running) {
                this.running = true;
                requestAnimationFrame(this.step.bind(this));
            }
        };

        Stopwatch.prototype.lap = function lap() 
        {
            var times = this.times;
            if (this.running) 
            {
                this.reset();
            }

            var li = document.createElement('li');
            li.innerText = this.format(times);
            this.results.appendChild(li);
        };

        Stopwatch.prototype.stop = function stop() 
        {
            this.running = false;
            this.time = null;
        };

        Stopwatch.prototype.restart = function restart() 
        {
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

        Stopwatch.prototype.print = function print() 
        {
            this.display.innerText = this.format(this.times);
        };

        Stopwatch.prototype.format = function format(times) 
        {
            return pad0(times[0], 2) + ':' + pad0(times[1], 2) + ':' + pad0(Math.floor(times[2]), 2);
        };

        return Stopwatch;
    }();

    function pad0(value, count) 
    {
        var result = value.toString();
        for (; result.length < count; --count)
        {
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
    var $restartOnModal = $("#modal-restart .modal-footer button[name='restart-game']");
    var $deferRestartOnModal = $("#modal-restart .modal-footer button[name='defer-restart-game']");
    var $start = $("#timer input[name='start']");       // get start button
    var $startOnModal = $("#modal-start .modal-footer button[name='start-game']");
    var $winOnModal = $("#modal-win .modal-footer button[name='win-game']");
    var $logout = $("#navbar input[name='logout']");       // get logout button
    var isStarted = false;
    var isFinished = false;

    $startOnModal.click(function () {
        isStarted = true;
        isFinished = false;
        stopwatch.start();
        $("#modal-start").modal("hide");
    });
    $winOnModal.click(function () {
        stopwatch.reset();
        stopwatch.start();
        $(".picked .matched").removeClass("matched");
        Memory = new Game();
        $("#modal-win").modal("hide");
    });
    $restartOnModal.click(function () {
        $(".picked .matched").removeClass("matched");
        Memory = new Game();
        isStarted = true;
        stopwatch.start();
        $("#modal-restart").modal("hide");
    });
    $deferRestartOnModal.click(function () {
        if(!isFinished){
            stopwatch.start();
        }
    });
    $restart.click(function () 
    {
        // modal show by HTML
        // additional function
        stopwatch.stop();
        stopwatch.reset();
    });

    $logout.click(function () 
    {
        sessionStorage.removeItem("username");
        window.location.replace("index.html");
    });

    // Store function
    var score = {};
    if (localStorage.getItem("score") == undefined) 
    {
        localStorage.setItem("score", JSON.stringify(score))
    }
    else 
    {
        score = JSON.parse(localStorage.getItem("score"));
    }
    function showScore() 
    {
        var tempArray = [];
        $("#table-score tbody").text("");
        $.each(score, function (user, time) 
        {
            tempArray.push({"username": user, "time": time});
        });

        tempArray = tempArray.sort(function (a, b) 
        {
            return (a.time).localeCompare(b.time);
        });

        for(var index = 0; index < 5; index++)
        {
            if(index > tempArray.length - 1) 
            {
                $("#table-score tbody").append(
                    "<tr>" +
                    "<td>" + (index + 1) + "</td>" +
                    "<td>-</td>" +
                    "<td>-</td>" +
                    "</tr>");
                continue;
            }

            var user = tempArray[index];
            $("#table-score tbody").append(
                "<tr data-user='" + user.username + "'>" +
                "<td>" + (index + 1) + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.time + "</td>" +
                "</tr>");
        }
    }

    showScore();

    function storeScore() 
    {
        var username = sessionStorage.getItem("username");
        var newTime = $("#timer .stopwatch").text();

        if (score[username] == undefined) 
        {
            score[username] = "";
        }

        else if ((score[username]).localeCompare(newTime) < 0) 
        {
            return;
        }

        score[username] = newTime;
        localStorage.setItem("score", JSON.stringify(score));
        showScore();
    }
});