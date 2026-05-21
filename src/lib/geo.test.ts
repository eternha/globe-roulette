import { describe, it, expect } from "vitest";
import {
  latLngToVector3,
  lngToGlobeRotationY,
  latToCameraPolar,
  angularDistance,
} from "./geo";

const EPSILON = 1e-10;

function expectClose(actual: number, expected: number) {
  expect(Math.abs(actual - expected)).toBeLessThan(EPSILON);
}

describe("latLngToVector3", () => {
  it("places the north pole at (0, radius, 0)", () => {
    const v = latLngToVector3(90, 0, 1);
    expectClose(v.x, 0);
    expectClose(v.y, 1);
    expectClose(v.z, 0);
  });

  it("places the south pole at (0, -radius, 0)", () => {
    const v = latLngToVector3(-90, 0, 1);
    expectClose(v.x, 0);
    expectClose(v.y, -1);
    expectClose(v.z, 0);
  });

  it("places all points exactly on the sphere surface", () => {
    const testCases = [
      { lat: 0, lng: 0 },
      { lat: 48.8566, lng: 2.3522 },     // Paris
      { lat: 35.6762, lng: 139.6503 },    // Tokyo
      { lat: -33.8688, lng: 151.2093 },   // Sydney
      { lat: -22.9068, lng: -43.1729 },   // Rio
      { lat: 90, lng: 0 },               // North Pole
      { lat: -90, lng: 0 },              // South Pole
    ];

    for (const { lat, lng } of testCases) {
      const radius = 2.5;
      const v = latLngToVector3(lat, lng, radius);
      expectClose(v.length(), radius);
    }
  });

  it("scales correctly with radius", () => {
    const r1 = latLngToVector3(45, 90, 1);
    const r3 = latLngToVector3(45, 90, 3);

    expectClose(r3.x / r1.x, 3);
    expectClose(r3.y / r1.y, 3);
    expectClose(r3.z / r1.z, 3);
  });

  it("places equator/prime-meridian point in the X-Z plane with Y=0", () => {
    const v = latLngToVector3(0, 0, 1);
    expectClose(v.y, 0);
    expectClose(v.length(), 1);
  });

  it("opposite longitudes mirror across the Z axis", () => {
    const east = latLngToVector3(0, 45, 1);
    const west = latLngToVector3(0, -45, 1);
    expectClose(east.x, west.x);
    expectClose(east.y, west.y);
    expectClose(east.z, -west.z);
  });
});

describe("lngToGlobeRotationY", () => {
  it("returns -pi/2 for the prime meridian", () => {
    // latLngToVector3(0, 0) sits on +X, so the rotation to face +Z is -pi/2.
    expectClose(lngToGlobeRotationY(0), -Math.PI / 2);
  });

  it("returns negative radians for east longitude", () => {
    expect(lngToGlobeRotationY(90)).toBeLessThan(0);
  });

  it("returns positive radians for west longitude", () => {
    expect(lngToGlobeRotationY(-90)).toBeGreaterThan(0);
  });
});

describe("latToCameraPolar", () => {
  it("returns 0 for the equator", () => {
    expectClose(latToCameraPolar(0), 0);
  });

  it("returns ~pi/2 for the north pole", () => {
    expectClose(latToCameraPolar(90), Math.PI / 2);
  });
});

describe("angularDistance", () => {
  it("returns 0 for the same point", () => {
    expectClose(angularDistance(48, 2, 48, 2), 0);
  });

  it("returns pi for antipodal points", () => {
    expectClose(angularDistance(0, 0, 0, 180), Math.PI);
  });

  it("returns pi/2 for pole to equator", () => {
    expectClose(angularDistance(90, 0, 0, 0), Math.PI / 2);
  });

  it("is symmetric", () => {
    const d1 = angularDistance(48.8566, 2.3522, 35.6762, 139.6503);
    const d2 = angularDistance(35.6762, 139.6503, 48.8566, 2.3522);
    expectClose(d1, d2);
  });
});
