import {Row, Col, Card, Form, Input, Button, notification} from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import GenerateToken from '../../helpers/generateToken';
import { createCompany, getCompany } from '../../services/companyService';
// import { useEffect, useState } from 'react';
function Register (){
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const rules= [
        { required: true, 
        message: 'Bắt buộc' }
    ]
    const handleFinish =async (values)=> {
        const token = GenerateToken();
        const options = {
            ...values,
            token: token
        }
        const checkExitCompany = await getCompany(options.email);
        if(checkExitCompany.length > 0){
            api.error({
                message: "Đăng ký tài khoản không thành công",
                description: "Tài khoản đã tồn tại. Vui lòng đăng ký tài khoản khác",
                placement: "bottomRight",
                duration: 3
            });
        }
        else {
            const result = await createCompany(options);
            if(result){
                api.success({
                    message: "Đăng ký tài khoản thành công",
                    description: <>Bạn đã đăng ký thành công tài khoản <strong>{options.companyName}</strong></>,
                    placement: "bottomRight",
                    duration: 3
                });
                form.resetFields();
                setTimeout(()=> {
                    navigate('/login');
                }, 3000);
            }
            else {
                api.error({
                    message: "Đăng ký tài khoản không thành công",
                    description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
                    placement: "bottomRight",
                    duration: 3
                });
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Row justify="center">
                <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
                <div className="Register">
                    <Card title= "Đăng ký tài khoản">
                        <Form layout='vertical' onFinish={handleFinish} form={form}>
                            <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                <Input type={"text"}  />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={rules}>
                                <Input type = "email"/>
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone" >
                                <Input type = "phone"/>
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={rules}>
                                <Input type="password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p>
                                Hoặc <Link to = '/login'>Đăng nhập</Link>
                            </p>
                        </div>
                    </Card>
                </div>
                </Col>
            </Row>
        </>
    )
}
export default Register