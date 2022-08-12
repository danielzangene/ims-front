import {useSkin} from '@hooks/useSkin'
import {Link, useHistory} from 'react-router-dom'
import {Button, CardTitle, Col, Form, FormFeedback, Input, Label, Row} from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import {useEffect, useState} from 'react'
import {showErrorToast} from '@toastUtils'

import UseFetchUrl from "../utility/UseFetchUrl"
import defaultAvatar from '@src/assets/images/logo/logo.png'
import netConfig from "../configs/netConfig"

const LoginCover = () => {
    const {skin} = useSkin()

    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
    const source = require(`@src/assets/images/pages/${illustration}`).default

    const history = useHistory()

    const queryMessage = new URLSearchParams(window.location.search).get("message")

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const body = {username, password}

    const [isPending, setIsPending] = useState(false)

    const [errors, setErrors] = useState({
        password: {
            is: false,
            message: "لطفا رمزعبور را وارد کنید"
        },
        username: {
            is: false,
            message: "لطفا نام کاربری را وارد کنید"
        }
    })

    useEffect(() => {
        if (queryMessage) {
            showErrorToast(queryMessage)
        }
    }, [queryMessage])

    const validationCheck = () => {
        let result = true
        const newErrors = {...errors}

        if (password.length === 0) {
            newErrors.password.is = true
            result = false
        } else {
            newErrors.password.is = false
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
        const data = await UseFetchUrl("/api/auth/signin", "POST", body)
        callBack(data)
        setIsPending(false)
    }

    return (
        <div className='auth-wrapper auth-cover'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <img src={defaultAvatar} height={45}/>
                    <h2 className='brand-text text-primary ms-1'>سامانه مدیریتی</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login Cover'/>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='text-center fw-bold mb-1'>
                            سامانه مدیریتی
                        </CardTitle>
                        <Form className='auth-login-form mt-2 text-end' onSubmit={handleSubmit}>
                            <div className='mb-1'>
                                <Label className='form-label' for='login-email'>
                                    نام کاربری
                                </Label>
                                <Input type='text' id='login-username' className='text-end' autoFocus
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                       invalid={errors.username.is && true}
                                />
                                {errors.username.is && <FormFeedback>{errors.username.message}</FormFeedback>}
                            </div>
                            <div className='mb-3'>
                                <div >
                                    <Label className='form-label' for='login-password'>
                                        رمزعبور
                                    </Label>
                                </div>
                                <Input  type='password' className='input-group-merge text-end' id='login-password'
                                                     value={password}
                                                     onChange={(e) => setPassword(e.target.value)}
                                                     invalid={errors.password.is && true}
                                />
                                {errors.password.is && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </div>
                            <Button color='primary' block disabled={isPending}>
                                {isPending && "لطفا منتظر بمانید"}
                                {!isPending && "ورود"}
                            </Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default LoginCover
