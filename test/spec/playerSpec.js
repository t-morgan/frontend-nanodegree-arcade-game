describe('Character', function() {
    var player;

    beforeEach(function() {
        player = new Player();
    });

    it('can reset its X value to its original position', function() {
        player.x = 100;
        player.resetPlayerPosition();
        expect(player.x).toEqual(playerStartX);
    });

    it('can reset its Y value to its original position', function() {
        player.y = 100;
        player.resetPlayerPosition();
        expect(player.y).toEqual(playerStartY);
    });

    it('can reset its row value to its original position', function() {
        player.row = 1;
        player.resetPlayerPosition();
        expect(player.row).toEqual(playerStartRow);
    });

    it('can move to the left', function() {
        player.handleInput('left');
        expect(player.x).toEqual(playerStartX - player.horizontalSpeed);
    });

    it('can move to the right', function() {
        player.handleInput('right');
        expect(player.x).toEqual(playerStartX + player.horizontalSpeed);
    });

    it('can move up', function() {
        player.handleInput('up');
        expect(player.y).toEqual(playerStartY - player.verticalSpeed);
    });

    it('can move down', function() {
        player.y = 0;
        player.handleInput('down');
        expect(player.y).toEqual(0 + player.verticalSpeed);
    });

    it('cannot move left off the game board', function() {
        player.x = 0;
        player.handleInput('left');
        player.update();
        expect(player.x).toEqual(0);
    });

    it('cannot move right off the game board', function() {
        player.x = 400;
        player.handleInput('right');
        player.update();
        expect(player.x).toEqual(400);
    });

    it('cannot move down off the game board', function() {
        player.handleInput('down');
        player.update();
        expect(player.y).toEqual(playerStartY);
    });

    it('resets to its original position when moving up off the game board', function() {
        player.y = 0;
        player.handleInput('up');
        player.update();
        expect(player.x).toEqual(playerStartX);
        expect(player.y).toEqual(playerStartY);
        expect(player.row).toEqual(playerStartRow);
    })

});