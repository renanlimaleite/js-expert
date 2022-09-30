const Passwords = () => {
  const loggin = async ({ password, confirmPassword }) => {
    const validation = isFieldsValid({ password, confirmPassword });

    if (!validation.valid) throw new Error(validation.error);

    return {
      logged: true,
    };
  };

  const isFieldsValid = ({ password, confirmPassword }) => {
    const passwordIsEmpty = !password || !confirmPassword;

    if (passwordIsEmpty) {
      return {
        error: "The passwords are emptys",
        valid: false,
      };
    }

    const passwordLengthValid =
      password.length >= 3 &&
      password.length <= 10 &&
      confirmPassword.length >= 3 &&
      confirmPassword.length <= 10;

    if (!passwordLengthValid) {
      return {
        error: "The passwords should be greather than 0 and max 10",
        valid: false,
      };
    }

    const passwordCombination = password === confirmPassword;

    if (!passwordCombination) {
      return {
        error: "The passwords not matchs",
        valid: false,
      };
    }

    return {
      valid: true,
    };
  };

  return {
    loggin,
  };
};

module.exports = Passwords;
