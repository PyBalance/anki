import { Button, Form, Radio, Switch } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useState } from "react";
import DownloadCSV from "./DownloadCSV";
import DownloadExcel from "./DownloadExcel";
import DownloadAnki from "./DownloadAnki";
type Options = { [key: string]: string[] };
type QuizValues = { [key: string]: string };
const DuoyinziForm = ({ options, setQuizValues ,setShowChars}: 
  { options: Options, setQuizValues: React.Dispatch<React.SetStateAction<QuizValues>>, setShowChars: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // Initialize form values with the first option of each array
  const initialFormValues: { [key: string]: string } = Object.keys(
    options
  ).reduce((acc, key) => {
    return { ...acc, [key]: options[key][0] };
  }, {});
  const [formValues, setFormValues] = useState(initialFormValues);


  // Handling form submit
  const handleSubmit = () => {
    console.log(formValues);
    setQuizValues(formValues);
    setShowChars(true);
  };

  // Handling radio group change
  const handleRadioChange = (key: string) => (e: RadioChangeEvent) => {
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const [showAll, setShowAll] = useState(false);
  return (
    <>

      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        {Object.keys(options).map((key) => (
          <Form.Item key={key} label={key}
            style={{
              display: showAll || options[key].length > 1 ? "block" : "none",
            }}>
            <Radio.Group
              onChange={handleRadioChange(key)}
              value={formValues[key]}
            >
              {options[key].map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item label="Show all">

          <Switch checked={showAll} onChange={setShowAll} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button htmlType="submit">生成看拼音写词语</Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <DownloadCSV data={formValues} />
          <DownloadExcel data={formValues} />
          <DownloadAnki data={formValues} />
        </Form.Item>
      </Form>
    </>
  );
};
export default DuoyinziForm;
