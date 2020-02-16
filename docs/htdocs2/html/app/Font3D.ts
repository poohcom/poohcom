import * as THREE from '../../build/three.module.js';
import { GeometryUtils } from '../jsm/utils/GeometryUtils.js';
import { Font } from '../../src/Three.js';

export class Font3D
{
    materials:any=[];
    group:THREE.Group;
    mirror:boolean = false;

    height:number = 1;
    fontsize:number = 20;
    hover:number = 1;

    curveSegments:number = 4;

    bevelThickness:number = 2;
    bevelSize:number = 1.5;


    bevelEnabled:boolean = false;
    public loadFont():THREE.Group {


		this.materials = [
			new THREE.MeshPhongMaterial( { color: 0x777777, flatShading: true } ), // front
			new THREE.MeshPhongMaterial( { color: 0x444444 } ) // side
		];

		this.group = new THREE.Group();
		this.group.position.y = 60;

		//this.scene.add( this.group );


		var loader = new THREE.FontLoader();
		var THIS=this;
		loader.load( 'fonts/Yoon YGO 550_TT_Regular.json', function ( response ) {
		//	loader.load( 'fonts/Do Hyeon_Regular.json', function ( response ) {
			THIS.font = response;
			THIS.refreshText();

        } );
        
        return this.group;

	}
	private text:string="All for 장원준나이키\nAll for one";
	private refreshText():void {

		//this.updatePermalink();

		this.group.remove( this.textMesh1 );
		if ( this.mirror ) this.group.remove( this.textMesh2 );

		if ( ! this.text ) return;

		this.createText();

	}
	font:Font;

	textGeo:THREE.BufferGeometry;

	textMesh1:THREE.Mesh;
	textMesh2:THREE.Mesh;

	private createText():void {

		this.textGeo = new THREE.TextGeometry( this.text, {

			font: this.font,
			

			size: this.fontsize,
			height: this.height,
			curveSegments: this.curveSegments,
			bevelThickness: this.bevelThickness,
			bevelSize: this.bevelSize,
			bevelEnabled: this.bevelEnabled

		} );

		this.textGeo.computeBoundingBox();
		this.textGeo.computeVertexNormals();

		// "fix" side normals by removing z-component of normals for side faces
		// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

		if ( ! this.bevelEnabled ) {

			var triangleAreaHeuristics = 0.1 * ( this.height * this.fontsize );

			for ( var i = 0; i < this.textGeo.faces.length; i ++ ) {

				var face = this.textGeo.faces[ i ];

				if ( face.materialIndex == 1 ) {

					for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

						face.vertexNormals[ j ].z = 0;
						face.vertexNormals[ j ].normalize();

					}

					var va = this.textGeo.vertices[ face.a ];
					var vb = this.textGeo.vertices[ face.b ];
					var vc = this.textGeo.vertices[ face.c ];

					var s = GeometryUtils.triangleArea( va, vb, vc );

					if ( s > triangleAreaHeuristics ) {

						for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

							face.vertexNormals[ j ].copy( face.normal );

						}

					}

				}

			}

		}

		var centerOffset:number = - 0.5 * ( this.textGeo.boundingBox.max.x -this.textGeo.boundingBox.min.x );

		this.textGeo = new THREE.BufferGeometry().fromGeometry( this.textGeo );

		this.textMesh1 = new THREE.Mesh( this.textGeo, this.materials );

		this.textMesh1.position.x = centerOffset;
		this.textMesh1.position.y = this.hover;
		this.textMesh1.position.z = 0;

		this.textMesh1.rotation.x = 0;
		this.textMesh1.rotation.y = Math.PI * 2;

		this.group.add( this.textMesh1 );

		if ( this.mirror ) {

			this.textMesh2 = new THREE.Mesh( this.textGeo, this.materials );

			this.textMesh2.position.x = centerOffset;
			this.textMesh2.position.y = - this.hover;
			this.textMesh2.position.z = this.height;

			this.textMesh2.rotation.x = Math.PI;
			this.textMesh2.rotation.y = Math.PI * 2;

			this.group.add( this.textMesh2 );

		}

	}
}