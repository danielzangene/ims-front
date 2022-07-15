import {Fragment} from 'react'
import {Col, Row} from 'reactstrap'
import WelcomeCardMedal from './WelcomeCardMedal'
import MonthSummaryCard from "./MonthSummaryCard"
import WeekSummaryTable from "./WeekSummaryTable"
import MonthAllDayChart from "./MonthAllDayChart"

const Home = () => {
    return (
        <Fragment>
            <Row className='match-height'>
                <Col lg='3' sm='12'>
                    <WelcomeCardMedal/>
                </Col>
                <Col lg='9' sm='12'>
                    <MonthSummaryCard/>
                </Col>
            </Row>
            <Row className='match-height'>
                <Col lg='4' sm='12'>
                    <WeekSummaryTable/>
                </Col>
                <Col lg='8' sm='12'>
                    <MonthAllDayChart/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Home
