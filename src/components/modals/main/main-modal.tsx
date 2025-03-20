import { useState, useEffect } from "react";
import type { JSX } from "react";
import {
  useForm,
  FormProvider,
  Form,
  FormSubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Modal from "@components/base/modal/modal";
import BaseButton from "@components/base/button/button";
import BaseInput from "@components/base/form/input/input";
import BaseRadioGroup from "@components/base/form/radio-group/radio-group";

import type { RadioItem } from "@models/models";

import "./main-modal.scss";

type Inputs = {
  sumField: string;
  monthsGroup: string;
  resultGroup: string;
};

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

function MainModal({ isOpened, onClose }: Props): JSX.Element {
  const schemaFields = {
    sumField: {
      name: "sumField",
      label: "Ваша сумма кредита",
      placeholder: "Введите данные",
    },
    monthsGroup: {
      label: "Количество месяцев?",
      name: "monthsGroup",
    },
    resultGroup: {
      label: "Итого ваш платеж по кредиту:",
      name: "resultGroup",
    },
  };

  const monthsList: RadioItem[] = [
    {
      id: "month-1",
      name: "12",
      value: "12",
    },
    {
      id: "month-2",
      name: "24",
      value: "24",
    },
    {
      id: "month-3",
      name: "36",
      value: "36",
    },
    {
      id: "month-4",
      name: "48",
      value: "48",
    },
  ];

  const resultList: RadioItem[] = [
    {
      id: "result-1",
      name: "в год",
      value: "year",
    },
    {
      id: "result-2",
      name: "в месяц",
      value: "month",
    },
  ];

  const validationSchema = yup.object({
    sumField: yup
      .string()
      .required("Поле обязательно для заполнения")
      .matches(/^\d+$/, "Введите только числа"),
    monthsGroup: yup.string().required(),
    resultGroup: yup.string().required(),
  });

  const [isResultVisible, setResultVisible] = useState<boolean>(false);
  const [counter, setCounter] = useState<string>("0");
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      monthsGroup: "12",
      resultGroup: "month",
    },
  });

  const {
    reset,
    formState,
    formState: { isValid, isSubmitSuccessful },
    getValues,
    trigger,
  } = methods;

  function calculateCredit() {
    trigger(["sumField"]);
    if (isValid) {
      setResultVisible(true);
      const values = getValues();
      let count = Number(values.sumField) / Number(values.monthsGroup);

      if (values.resultGroup === "year") {
        count *= 12;
      }

      count = Math.ceil(count);
      const countStr = formatCounter(String(count));
      setCounter(countStr);
    }
  }

  function formatCounter(value: string) {
    const onlyNumbers = value.replace(/[^\d]/g, "");
    const formattedValue = onlyNumbers.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    return formattedValue;
  }

  const onSubmit: FormSubmitHandler<Inputs> = async ({ formData }) => {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, isSubmitSuccessful, reset]);

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className="modal-main">
        <div className="modal-main__top">
          <p className="modal-main__title">Платежи по кредиту</p>
          <div className="modal-main__description">
            Введите сумму кредита и выберите срок, на который вы хотите его
            оформить. <br></br>
            Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы
            могли лучше спланировать свои финансы.
          </div>
        </div>
        <FormProvider {...methods}>
          <Form className="modal-main__form" onSubmit={onSubmit} noValidate>
            <div className="modal-main__form-fieldset">
              <BaseInput
                schema={schemaFields.sumField}
              />
              <BaseButton
                classes={"modal-main__form-calc"}
                text
                onClick={calculateCredit}
              >
                Рассчитать
              </BaseButton>
            </div>
            <BaseRadioGroup
              value={monthsList[0]}
              list={monthsList}
              schema={schemaFields.monthsGroup}
            />
            {isResultVisible && (
              <div className="modal-main__form-result">
                <BaseRadioGroup
                  value={resultList[1]}
                  list={resultList}
                  schema={schemaFields.resultGroup}
                  orientation="vertical"
                />
                <span className="modal-main__form-result-count">
                  {counter} рублей
                </span>
              </div>
            )}
            <BaseButton
              classes={"modal-main__submit"}
              buttonType="submit"
              primary
              full
              disabled={!isValid}
            >
              Добавить
            </BaseButton>
          </Form>
        </FormProvider>
      </div>
    </Modal>
  );
}

export default MainModal;
