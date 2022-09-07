import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSkin} from '@hooks/useSkin'
import {showErrorToast} from '@toastUtils'

import {Button, CardTitle, Col, Form, FormFeedback, Input, Label, Row} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import defaultAvatar from '@src/assets/images/logo/logo.png'
import themeConfig from '@configs/themeConfig'
import netConfig from "../configs/netConfig"
import UseFetchUrl from "../utility/UseFetchUrl"


const Register = () => {
    const {skin} = useSkin()
    const history = useHistory()


    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const body = {name, email, username, password}

    const [isPending, setIsPending] = useState(false)

    const [errors, setErrors] = useState({
        name: {
            is: false,
            message: "لطفا نام را وارد کنید"
        },
        password: {
            is: false,
            message: "لطفا رمزعبور را وارد کنید"
        },
        email: {
            is: false,
            message: "لطفا ایمیل را به درستی وارد کنید"
        },
        username: {
            is: false,
            message: "لطفا نام کاربری را وارد کنید"
        }
    })

    const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const validationCheck = () => {
        let result = true
        const newErrors = {...errors}

        if (password.length === 0) {
            newErrors.password.is = true
            result = false
        } else {
            newErrors.password.is = false
        }
        if (email.length === 0) {
            newErrors.email.is = true
            result = false
        } else {
            newErrors.email.is = false
        }

        if (name.length === 0) {
            newErrors.name.is = true
            result = false
        } else {
            newErrors.name.is = false
        }

        if (username.length === 0) {
            newErrors.username.is = true
            result = false
        } else {
            newErrors.username.is = false
        }

        setErrors(newErrors)

        return result
    }

    const callBack = (data) => {
        if (data.code !== netConfig.okStatus) {
            showErrorToast(data.message)
        } else if (data) {
            if (data.resultData) localStorage.setItem("accessToken", data.resultData.token)
            history.push('/home')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validationCheck()) return
        setIsPending(true)
        const data = await UseFetchUrl("/api/auth/signup", "POST", body)
        callBack(data)
        setIsPending(false)
    }


    return (
        <div className='auth-wrapper auth-cover'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <img src={defaultAvatar} height={45}/>
                    <h2 className='brand-text text-white ms-1'>{themeConfig.app.appName}</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login Cover'/>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='text-center fw-bold mb-1'>
                            ثبت نام
                        </CardTitle>
                        <Form action='/' className='auth-register-form mt-2 text-end' onSubmit={handleSubmit}>
                            <div className='mb-1'>
                                <Label className='form-label' for='register-username'>
                                    نام
                                </Label>
                                <Input type='text' id='login-name' className='text-end' autoFocus
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       invalid={errors.name.is && true}
                                />
                                {errors.name.is && <FormFeedback>{errors.name.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='register-username'>
                                    نام کاربری
                                </Label>
                                <Input type='text' id='login-username' className='text-end'
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                       invalid={errors.username.is && true}
                                />
                                {errors.username.is && <FormFeedback>{errors.username.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='register-email'>
                                    ایمبل
                                </Label>
                                <Input  type='email' className='input-group-merge text-end' id='login-email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        invalid={errors.email.is && true}
                                />
                                {errors.email.is && <FormFeedback>{errors.email.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='register-password'>
                                    رمزعبور
                                </Label>
                                <Input  type='password' className='input-group-merge text-end' id='login-password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        invalid={errors.password.is && true}
                                />
                                {errors.password.is && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </div>
                            <Button className='mt-3' color='primary' block disabled={isPending}>
                                {isPending && "لطفا منتظر بمانید"}
                                {!isPending && "ثبت نام"}
                            </Button>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='me-25'>آیا قبلا ثبت نام کرده اید؟</span>
                            <Link to='/login'>
                                <span className='pe-1'>ورود</span>
                            </Link>
                        </p>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Register
