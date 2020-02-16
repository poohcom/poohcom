import * as THREE from '../../build/three.module.js';
// boomer = new TextureAnimator( explosionTexture, 4, 4, 16, 55 ); // texture, #horiz, #vert, #total, duration.
// 	var explosionMaterial = new THREE.MeshBasicMaterial( { map: explosionTexture } );
// 	var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
// 	cube = new THREE.Mesh( cubeGeometry, explosionMaterial );
// 	cube.position.set(0,26,0);
// 	scene.add(cube);

// }

export class TextureAnimator
{
    tilesHorizontal:number;
    tilesVertical:number;
    numberOfTiles:number;
    tileDisplayDuration:number;
    currentDisplayTime:number;
    currentTile:number;
    texture:THREE.Texture;

    constructor(texture:THREE.Texture, tilesHoriz:number, tilesVert:number, numTiles:number, tileDispDuration:number) 
    {
        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet. 
        this.numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
        texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

        this.texture = texture;
    
        // how long should each image be displayed?
        this.tileDisplayDuration = tileDispDuration;
    
        // how long has the current image been displayed?
        this.currentDisplayTime = 0;
    
        // which image is currently being displayed?
        this.currentTile = 0;
    }

    public update(milliSec:number):void
    {
        this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            
            // 하단 uv
            this.texture.offset.x = currentColumn / this.tilesHorizontal;
            
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            this.texture.offset.y = 1 - 1/16 - currentRow / this.tilesVertical;
		}
    }

    
}
