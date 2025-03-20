import { useEffect } from "react";
import type { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import type { SchemaItem } from "@models/models";

import classNames from "classnames";

import "./input.scss";

interface InputProps {
  value?: string | number;
  schema: SchemaItem;
  classes?: string;
  bordered?: boolean;
  disabled?: boolean;
  onInput?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function BaseInput(props: InputProps): JSX.Element {
  const {
    classes,
    value,
    schema,
    disabled = false,
    bordered = false,
    onInput,
  } = props;

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const inputClasses = classNames(classes, "input", {
    "input--disabled": disabled,
    "input--bordered": bordered,
    "input--error": !!errors[schema.name],
  });

  useEffect(() => {
    setValue(schema.name, value);
  }, [value]);

  return (
    <div className={inputClasses}>
      <div className="input__inner">
        <div className="input__field">
          {schema.label && (
            <label className="input__label">{schema.label}</label>
          )}
          <input
            className="input__control"
            id={schema.name}
            value={value}
            placeholder={schema.placeholder}
            type={schema.type ? schema.type : "text"}
            disabled={schema.disabled ? schema.disabled : disabled}
            onInput={onInput}
            {...register(schema.name)}
            aria-invalid={!!errors[schema.name]}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={schema.name}
          render={({ message }) => <p className="input__error">{message}</p>}
        />
      </div>
    </div>
  );
}

export default BaseInput;
