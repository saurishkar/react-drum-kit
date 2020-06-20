import React from "react";

const Switch = ({ title="", enabled=false, fieldName, ...rest }) => <div>
  <label htmlFor={fieldName}>{title}</label>
  <input type="checkbox" checked={enabled} id={fieldName}  name={fieldName} {...rest} />
</div>

export default Switch;
