import React from "react";

const Input = ({ type, name, placeholder, handler, values, ...rest }) => {
  return (
    <div className="input-field">
      <label>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control my-1"
        onChange={(e) => handler(e)}
        value={values ? values[name] : ""}
        {...rest}
      />
    </div>
  );
};

export default Input;
