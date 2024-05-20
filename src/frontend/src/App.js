import {useEffect, useState} from "react";
import {addNewStudent, getAllStudents, removeStudent} from "./client";
import './App.css';
import {
    DesktopOutlined,
    EditOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Empty,
    Layout,
    Menu,
    Popconfirm,
    Space,
    Spin,
    Table,
    theme,
    message, Image, Divider
} from 'antd';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notifications";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${split[1].charAt(0)}`}
    </Avatar>
}

//Методы подверждения удаления пользователя. callback это fetchStudents. Вызывая его мы обновляем результат на странице.
const confirmDelete = (student, callback) => {
    removeStudent(student).then(() => {
        successNotification("student with id: " + student.id + " is deleted!")
        callback();
    }).catch(err => {
        console.log(err)
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "Can't delete student. ",
                `${res.message}`,
                "bottomLeft"
            );
        });
    })
};
// fetchStudents нужен для того, чтобы вызывать у него setStudents который обновляет данные на странице.
const columns = fetchStudents => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Actions',
        key: 'action',
        render: (text, student) => (
            <Space size="middle">
                <Popconfirm
                    title="Delete the task"
                    description={"Are you sure to delete " + student.name + " ?"}
                    onConfirm={() => confirmDelete(student, fetchStudents)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button primary htmlType="submit">Delete</Button>
                </Popconfirm>
                <a>Update</a>
            </Space>
        ),
    },
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    // useStater managed the state for application
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false); //состояние выпадающей формы регистарции на странице
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // add students from request to application (отрисовка студентов на странице)
    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "Issue occurs",
                    `${res.message} [statusCode:${res.status}]`
                );
            });
        }).finally(() => setFetching(false))

    // call console log and fetchStudent only once!
    useEffect(() => {
        console.log("components is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>;
        }
        // if (students.length <= 0) {
        //     return <Empty/>;
        // }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>
                        <Badge count={students.length}>
                            <Button
                                onClick={() => setShowDrawer(!showDrawer)}
                                type="primary" shape="round" icon={<EditOutlined/>} size="medium">
                                Add student
                            </Button>
                        </Badge>
                    </>
                }
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 400,
                }}
                rowKey={(student) => student.id}
            />
        </>
    }


    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <Image
                    width={75}
                    src="https://private-user-images.githubusercontent.com/91321103/331877796-091f75d5-157c-4c9c-9a6d-f7cc1763e416.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYxMjgzNjUsIm5iZiI6MTcxNjEyODA2NSwicGF0aCI6Ii85MTMyMTEwMy8zMzE4Nzc3OTYtMDkxZjc1ZDUtMTU3Yy00YzljLTlhNmQtZjdjYzE3NjNlNDE2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE5VDE0MTQyNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJlNzM1OGYyOWM3NjM1M2FhZTUwMDAwN2UwMmM2MmY3YjNhYjMzYjMxODg5MTBmNzVjNGZmM2I0OTVmYjg1MzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.JlKcmEsgU7HmCXHom9iADzHSb2zD6CZF3_IN9UU-4yc"
                />
                <Divider>Some text in footer</Divider>
            </Footer>
        </Layout>
    </Layout>
}

export default App;
