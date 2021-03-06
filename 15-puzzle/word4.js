// html elements
var word1 = document.getElementById('word1'); //answer
var word2 = document.getElementById("word2"); //buttons
var check = document.getElementById('check'); //werd1 === word2?
var progress = document.getElementById('progress'); //progress check

//game objuects
var game = {
    'btns': [],
    'maxPlay': 3,
    'current': 0
};

game.words = 'apple,linux,javascript,tutorial,codesquad,baby,girlfriend,legend'.split(',');

// chose 1 word from word;
game.choose = function () {
    var idx = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[idx];
    this.letters = this.answer.split('');
    word1.innerHTML = this.answer;
};

game.addButtons = function () {
    for (var i = 0; i < this.letters.length; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = this.letters[i];
        word2.appendChild(btn);
        this.btns.push(btn);
    }
};

game.removeButtons = function () {
    for (var i = 0; i < this.btns.length; i++) {
        word2.removeChild(this.btns[i]);
    }
    this.btns = [];
}

game.checkGood = function () {
    return this.answer === this.letters.join('');
};

game.updateDisplay = function () {
    if (this.checkGood()) {
        check.innerHTML = '일치합니다.';
    } else {
        check.innerHTML = '일치하지 않습니다.';
    }
};

game.init = function () {
    this.choose();
    this.addButtons();
    this.updateDisplay();
};
game.init();

game.copyBtnText = function () {
    for (var i = 0; i < this.letters.length; i++) {
        this.btns[i].innerHTML = this.letters[i];
    }
}

game.swap = function () {
    var reversedWord = game.letters.reverse();

    game.copyBtnText();
    game.updateDisplay();
};

game.rshift = function () {
    var s = game.letters.pop();
    game.letters.unshift(s);
    game.copyBtnText();
    game.updateDisplay();
};

game.lshift = function () {
    var s = game.letters.shift();
    game.letters.push(s);
    game.copyBtnText();
    game.updateDisplay();
};

game.progress = function () {
    if (game.checkGood()) {
        game.current++;
        game.removeButtons();
        game.init();
        game.shuffle();
        var str = "";
        for (var i = 0; i < game.current; i++) {
            str += "O";
        }
        progress.innerHTML = str;
    }
    if (game.current == game.maxPlay) {
        alert('Good! Thank you for playing');
    }
}

// event handler for swap button
var swap = function () {
    game.swap();
    game.progress();
};

var rshiftt = function () {
    game.rshift();
    game.progress();
};

var lshift = function () {
    game.lshift();
    game.progress();
};

// shuffle
game.shuffle = function () {
    var toggle = Boolean(Math.round(Math.random()));

    if (toggle) {
        game.swap();
    }

    var n = Math.floor(Math.random() * (game.answer.length - 1));
    for (var i = 0; i < n; i++) {
        game.rshift();
    }
};
game.shuffle();