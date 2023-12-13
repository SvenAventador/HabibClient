import React from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Typography
} from "antd";
import Title from "antd/es/typography/Title";
import {
    LockOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    useLocation,
    useNavigate
} from "react-router";
import {NavLink} from "react-router-dom";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MANAGER_ROUTE,
    REGISTRATION_ROUTE,
    SUPPLIER_ROUTE
} from "../../utils/conts";
import AgreementModal from "../about/AgreementModal";
import ConfidentialModal from "../about/ConfidentialModal";
import {useUser} from "../../state/UserStore";
import Swal from "sweetalert2";

const AuthForm = () => {
    const isLogin = useLocation().pathname === LOGIN_ROUTE
    const history = useNavigate()
    const [agreementModal, setAgreementModal] = React.useState(false)
    const [confidentialModal, setConfidentialModal] = React.useState(false)

    const openAgreementModal = () => setAgreementModal(true)
    const openConfidentialModal = () => setConfidentialModal(true)
    const closeAgreementModal = () => setAgreementModal(false)
    const closeConfidentialModal = () => setConfidentialModal(false)

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [form] = Form.useForm()

    const {
        registrationUser,
        loginUser,
    } = useUser();


    return (
        <Form form={form}
              name={isLogin ? 'login' : 'registration'}
              style={{
                  maxWidth: '400px',
                  margin: 'auto',
                  marginTop: '50px'
              }}>
            <Title level={2}
                   style={{
                       textAlign: 'center'
                   }}>
                {isLogin ? 'Авторизация' : 'Регистрация'}
            </Title>

            {
                !isLogin &&
                <Form.Item
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Пожалуйста, введите Ваш никнейм!'
                    }]}>
                    <Input size='large'
                           name={name}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Введите никнейм..."
                    />
                </Form.Item>
            }

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите Вашу почту!'
                    },
                    {
                        type: 'email',
                        message: 'Пожалуйста, введите корректную почту!'
                    }]}>
                <Input size='large'
                       name={'email'}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       prefix={<MailOutlined className="site-form-item-icon"/>}
                       placeholder="Введите почту..."
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{
                    required: true,
                    message: 'Пожалуйста, введите пароль!'
                }]}>
                <Input size='large'
                       name={'password'}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="Ваш пароль..."
                />
            </Form.Item>

            {!isLogin && (
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, подтвердите Ваш пароль!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}>
                    <Input size='large'
                           name={'confirmPassword'}
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           prefix={<LockOutlined className="site-form-item-icon"/>}
                           type="password"
                           placeholder="Повторите пароль..."/>
                </Form.Item>
            )}

            {!isLogin && (
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[{
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Примите пользовательское соглашение!')
                    }]}>
                    <Checkbox>
                        <Typography>
                            Я прочел(-ла) <NavLink to={'#'}
                                                   onClick={() => openAgreementModal()}>пользовательское
                            соглашение</NavLink> и
                            <NavLink to={'#'}
                                     onClick={() => openConfidentialModal()}> политику конфиденциальнсти</NavLink>
                        </Typography>
                        <AgreementModal open={agreementModal}
                                        onOk={openAgreementModal}
                                        onCancel={closeAgreementModal}/>
                        <ConfidentialModal open={confidentialModal}
                                           onOk={openConfidentialModal}
                                           onCancel={closeConfidentialModal}/>
                    </Checkbox>
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary"
                        htmlType="submit"
                        size='large'
                        style={{width: '100%'}}
                        onClick={async () => {
                            if (isLogin)
                                loginUser(email, password)
                                    .then((data) => {
                                        switch (data.userRole) {
                                            case 1:
                                                history(MAIN_ROUTE)
                                                break
                                            case 2:
                                                history(ADMIN_ROUTE)
                                                break
                                            case 3:
                                                history(MANAGER_ROUTE)
                                                break
                                            case 4:
                                                history(SUPPLIER_ROUTE)
                                                break
                                            default:
                                                return null
                                        }
                                        Swal.fire({
                                            title: "Внимание",
                                            text: "С возвращением ^_^",
                                            icon: "success"
                                        });
                                    })
                                    .catch((error) => {
                                        Swal.fire({
                                            title: "Внимание",
                                            text: error.response.data.message,
                                            icon: "error"
                                        });
                                    });
                            else {
                                registrationUser(name, email, password)
                                    .then((data) => {
                                        switch (data.userRole) {
                                            case 1:
                                                history(MAIN_ROUTE)
                                                break
                                            case 2:
                                                history(ADMIN_ROUTE)
                                                break
                                            case 3:
                                                history(MANAGER_ROUTE)
                                                break
                                            case 4:
                                                history(SUPPLIER_ROUTE)
                                                break
                                            default:
                                                return null
                                        }
                                        Swal.fire({
                                            title: "Внимание",
                                            text: "Добро пожаловать в нашу семью ^_^",
                                            icon: "success"
                                        });
                                    })
                                    .catch((error) => {
                                        Swal.fire({
                                            title: "Внимание",
                                            text: error.response.data.message,
                                            icon: "error"
                                        });
                                    });
                            }
                        }}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </Form.Item>
            <Form.Item style={{
                textAlign: 'center'
            }}>
                {
                    isLogin ?
                        <Typography>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </Typography>
                        :
                        <Typography>
                            Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </Typography>
                }
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
