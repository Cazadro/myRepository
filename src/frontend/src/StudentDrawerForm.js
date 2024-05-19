import {Button, Col, Drawer, Form, Input, Row, Select, Spin} from "antd";
import {addNewStudent} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {successNotification, errorNotification, infoNotification, warningNotification} from "./Notifications";

const {Option} = Select;
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onClose = () => {
        setShowDrawer(false);
    };

    const [submittiong, setSubmiting] = useState(false);

    const onFinish = student => {
        setSubmiting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student).then(() => {
            console.log("student added")
            onClose()
            fetchStudents()
            successNotification(
                `Student ${student.name} added successfully!`
            )
        }).catch(err => {
            console.log(err)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "Can't add student. ",
                    `${res.message}`,
                    "bottomLeft"
                );
            });
        }).finally(() => {
            setSubmiting(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        alert(JSON.stringify(errorInfo, null, 2))
    };

    return <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div style={{
                textAlign: 'right',
            }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>

        }
    >
        <Form layout="vertical"
              // onFinishFailed={onFinishFailed} // отвечает за вывод на экран окошка с JSON'ом. Убрал за ненадобностью
              onFinish={onFinish}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name!'}]}
                    >
                        <Input placeholder={"Please enter student name"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email!'}]}
                    >
                        <Input placeholder={"Please enter student email"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please enter student email!'}]}
                    >
                        <Select placeholder={"Please select a gender"}>
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submittiong && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;