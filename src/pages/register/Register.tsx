import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register } from "../../utils/authRequests";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema, registerValidationSchema } from "../../utils/validation";
import './register.css'

type AuthUser = {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

const Register: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            toast.info('You are already logged in');
            navigate('/');
        }
    }, [navigate]);

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        },
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        },
    });

    const handleRegister = async (values: AuthUser) => {
        registerMutation.mutate(values);
    };

    const handleLogin = (values: AuthUser) => {
        loginMutation.mutate(values);
    };

    return (
        <>
            {isLogin ? (
                <div className='container'>
                    <h1 className='heading'>Login</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleLogin}
                    >
                        {() => (
                            <Form className='form'>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' type='email' id='email' />
                                    <ErrorMessage name='email' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <Field name='password' type='password' id='password' />
                                    <ErrorMessage name='password' component='div' className='error' />
                                </div>
                                <div>
                                    <button className='submit-btn' type='submit'>Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p>Don't have an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span></p>
                </div>
            ) : (
                <div className='container'>
                    <h1 className='heading'>Register</h1>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={registerValidationSchema}
                        onSubmit={handleRegister}
                    >
                        {({ setFieldValue }) => (
                            <Form className='form'>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <Field name='name' type='text' id='name' />
                                    <ErrorMessage name='name' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' type='email' id='email' />
                                    <ErrorMessage name='email' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='password'>Password</label>
                                    <Field name='password' type='password' id='password' />
                                    <ErrorMessage name='password' component='div' className='error' />
                                </div>
                                <div>
                                    <label htmlFor='confirm-password'>Confirm Password</label>
                                    <Field name='confirmPassword' type='password' id='confirm-password' />
                                    <ErrorMessage name='confirmPassword' component='div' className='error' />
                                </div>
                                <div>
                                    <button className='submit-btn' type='submit'>Register</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p>Already have an account? <span onClick={() => setIsLogin(!isLogin)}>Login</span></p>
                </div>
            )}
        </>
    );
};

export default Register;
