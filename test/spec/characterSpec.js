describe('Character', function() {
    var defaultCharacter;

    beforeEach(function() {
        defaultCharacter = new Character(1, 2, 3, 4);
    });

    it('should have an X value Number', function() {
        expect(defaultCharacter.x).toEqual(jasmine.any(Number));
    });

    it('should have a Y value Number', function() {
        expect(defaultCharacter.y).toEqual(jasmine.any(Number));
    });

    it('should be able to set its Y value to enemy row 1', function() {
        var character = new Character(1, 2, 3, 1);

        expect(character.y).toEqual(enemyTopRowY);
    });

    it('should have a width value Number', function() {
        expect(defaultCharacter.width).toEqual(jasmine.any(Number));
    });

    it('should have a height value Number', function() {
        expect(defaultCharacter.height).toEqual(jasmine.any(Number));
    });

    it('should have a row value Number', function() {
        expect(defaultCharacter.row).toEqual(jasmine.any(Number));
    });
});
