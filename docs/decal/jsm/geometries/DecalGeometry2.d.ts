import {
  BufferGeometry,
  Euler,
  Mesh,
  Vector3,
  Vector2
} from '../../../src/Three';

export class DecalGeometry2 extends BufferGeometry {
  constructor(mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3);
}

export class DecalVertex {
  constructor(position: Vector3, normal: Vector3, uvs: Vector2);
  clone(): DecalVertex;
}
