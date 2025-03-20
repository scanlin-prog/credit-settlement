import { useState } from "react";
import type { ChangeEvent, JSX } from "react";

import classNames from "classnames";

import BaseInput from "@components/base/form/input/input";
import type { SchemaItem, RadioItem } from "@models/models";

import "./radio-group.scss";

interface BaseRadioProps {
  value: RadioItem;
  schema: SchemaItem;
  list: RadioItem[];
  classes?: string;
  orientation?: "horizontal" | "vertical";
}

function BaseRadioGroup(props: BaseRadioProps): JSX.Element {
  const {
    value,
    list,
    schema,
    classes,
    orientation = "horizontal",
  } = props;

  const radioGroupClasses = classNames(
    classes,
    "radio-group",
    `radio-group--${orientation}`
  );

  const [radioValue, setRadioValue] = useState<RadioItem>(value);

  const radioGroupList = list.map((item) => {
    const radioLabelClasses = classNames(classes, "radio__label", {
      "radio__label--disabled": item.disabled,
      "radio__label--checked": isChecked(item.id),
    });

    return (
      <li key={item.id}>
        <label className={radioLabelClasses}>
          <span className="radio__content-wrap">
            <span className="radio__content">{item.name}</span>
          </span>
          <input
            className="visually-hidden"
            id={item.id}
            type="radio"
            checked={isChecked(item.id)}
            onChange={handleChange}
          />
        </label>
      </li>
    );
  });

  function isChecked(id: string) {
    return radioValue.id === id;
  }

  function handleChange(event: ChangeEvent) {
    const result = list.find(
      (item) =>
        String((event.target as HTMLInputElement).id) === String(item.id)
    );

    if (result) {
      setRadioValue(result);
    }
  }

  return (
    <div className={radioGroupClasses}>
      <div className="radio-group__inner">
        {schema.label && <p className="radio-group__title">{schema.label}</p>}
        <ul className="radio-group__list">{radioGroupList}</ul>
      </div>
      <BaseInput
        classes="visually-hidden"
        schema={schema}
        value={radioValue ? radioValue.value : ''}
      />
    </div>
  );
}

export default BaseRadioGroup;
