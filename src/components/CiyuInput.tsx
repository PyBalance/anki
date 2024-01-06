import { Button, Form, Input } from "antd";
const { TextArea } = Input;

interface Props {
    setinput: React.Dispatch<React.SetStateAction<any>>;
    setshow: React.Dispatch<React.SetStateAction<boolean>>;
  }
export default function CiyuInput({setinput,setshow}:Props) {
function handleSubmit(values: { input:string}) {
  console.log(values);
  setinput(values['input']);
  setshow(true);

}
  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="词语" name="input">
        <TextArea rows={4}  />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}
