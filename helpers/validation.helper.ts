export default class Validator {
  static register = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 10 },
    },
    password: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 4 },
    },
    city: {
      presence: must,
      type: "string",
    },
  });
  static post = (must = true) => ({
    desc: {
      presence: must,
      type: "string",
    },
    title: {
      presence: must,
      type: "string",
    },
    image: {
      presence: must,
      type: "string",
    },
  });

  static login = (must = true) => ({
    phone: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 10 },
    },
    password: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 4 },
    },
  });
}
