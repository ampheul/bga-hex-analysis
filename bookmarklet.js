(function() {

    var logs = Array.from(document.getElementsByClassName('log_replayable')).map(x => x.firstChild.innerText).reverse();

    var regularMove = /([\w ]+) plays at ([a-z]+\d+)$/;
    var swapMove = /([\w ]+) (s)waps$/;
    var passes = /([\w ]+) (p)asses$/;
    var resigns = /([\w ]+) (r)esigns$/;

    var moveTypes = [regularMove, swapMove, passes, resigns];

    var regexBoardSize = /^You are playing Hex (\d+)x\d+$/;
    var boardSize = logs.map(x => regexBoardSize.exec(x)).filter(Boolean)[0][1];

    function is_move(x) {
        return moveTypes.some(y => y.test(x));
    }

    function parsePlayerMove(x) {
        var move = moveTypes.map(y => y.exec(x)).filter(Boolean).map(x => x.slice(1));
        return move.length > 0 ? move[0] : null;
    }
    var playerMoves = logs.filter(is_move).map(parsePlayerMove);
    var players = Array.from(Set.from(playerMoves.map(x => x[0])));
    var playerOne = playerMoves[0][0];

    function playerColour(x) {
        return x === playerOne ? 'b' : 'w';
    }

    function formatMove([player, move]) {
        switch (move) {
            case 'r':
                return ':r' + playerColour(player);
            case 's':
                return ':s';
            case 'p':
                return ':p';
            default:
                return move;
        }
    }
    var str = playerMoves.map(formatMove).join('');
    var redblue = 'c1,';
    var blackwhite = ',';
    var colourChoice = redblue;
    var boardURL = 'https://hexworld.org/board/';
    var analysisLink = boardURL + '#' + boardSize + colourChoice + str;
    window.open(analysisLink, '_blank');
})();
