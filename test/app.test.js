const request = require("supertest");
const beaches = require("../src/data/beaches-data");
const app = require("../src/app");

describe("path /beaches", () => {
  beforeEach(() => {
    beaches.splice(0, beaches.length);
  });
  describe("GET method", () => {
    it("returns an array of beaches", async () => {
      const expected = [
        {
          id: 1,
          name: "Laguna Beach",
          area_code: 949,
          county: "Orange",
          expiration: 10,
          text: "Hello World!",
        },
        {
          id: 2,
          name: "La Jolla",
          area_code: 619,
          county: "San Diego",
          expiration: 24,
          text: "print(Hello World!)",
        },
        {
          id: 3,
          name: "Malibu",
          area_code: 310,
          county: "Los Angeles",
          expiration: 24,
          text: "const stringReverse = str => str.split('').reverse().join('');",
        },
      ];
      beaches.push(...expected);
      const response = await request(app).get("/beaches");
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });
  });

  describe("POST method", () => {
    it("adds a new beach to the data set", async () => {
      const beach = {
        id: 5,
        name: "Malibu",
        area_code: 310,
        county: "Los Angeles",
        expiration: 24,
        text: "const stringReverse = str => str.split('').reverse().join('');",
      };
      const response = await request(app)
        .post("/beaches")
        .send({ data: beach });
      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(beach);
    });
  });
});