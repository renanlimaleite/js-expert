const Password = require("./passwords");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  const password = Password();

  // rejections
  {
    const data = { password: "", confirmPassword: "321" };
    const rejection = new Error("The passwords are emptys");
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  {
    const data = { password: "123", confirmPassword: "" };
    const rejection = new Error("The passwords are emptys");
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  {
    const data = { password: "", confirmPassword: "" };
    const rejection = new Error("The passwords are emptys");
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  {
    const data = { password: "123", confirmPassword: "321" };
    const rejection = new Error("The passwords not matchs");
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  {
    const data = { password: "12", confirmPassword: "321" };
    const rejection = new Error(
      "The passwords should be greather than 0 and max 10"
    );
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  {
    const data = { password: "123", confirmPassword: "1" };
    const rejection = new Error(
      "The passwords should be greather than 0 and max 10"
    );
    const result = password.loggin(data);
    await rejects(result, rejection);
  }
  // final rejections

  // equals
  {
    const data = { password: "123", confirmPassword: "123" };
    const expected = { logged: true };
    const result = await password.loggin(data);
    deepStrictEqual(result, expected);
  }
  {
    const data = { password: "123abc123", confirmPassword: "123abc123" };
    const expected = { logged: true };
    const result = await password.loggin(data);
    deepStrictEqual(result, expected);
  }
  // final equals
})();
