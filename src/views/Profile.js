import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

import useFetch from "../utility/UseFetch"

const Profile = () => {
    const {  data } = useFetch("/data/test", "POST", null)
  return (
      <Card>
        <CardHeader>
          <CardTitle>پروفایل</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{data ? data.resultData : ''}</CardText>
        </CardBody>
      </Card>
  )
}

export default Profile
