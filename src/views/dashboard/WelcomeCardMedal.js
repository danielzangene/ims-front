import {Button, Card, CardBody} from 'reactstrap'
import {Link} from 'react-router-dom'

import medal from '@src/assets/images/illustration/Pot2.svg'

const WelcomeCardMedal = () => {
    return (
        <Card className='card-congratulations-medal'>
            <CardBody>
                <h5>خوش آمدید 🎉 </h5>
                <Link to={'/profile'}>
                    <Button className='round mt-1' color='info' outline>پروفایل</Button>
                </Link>
                <img className='personalization welcome-pot' src={medal} height={'116%'}/>
            </CardBody>
        </Card>
    )
}

export default WelcomeCardMedal
