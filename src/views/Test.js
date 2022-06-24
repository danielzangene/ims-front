import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
// import netConfig from "../configs/netConfig"
import {useState} from 'react'
import UseFetchUrl from "../utility/UseFetchUrl"
// import {toast} from "react-toastify"

const Test = () => {
    const [isPending, setIsPending] = useState(false)

    const [data, setData] = useState(null)

    // const callBack = (data) => {
    //     console.log(data)
    //     if (data.code !== netConfig.okStatus) {
    //         toast.error(data.message, {
    //             position: "top-left",
    //             pauseOnHover: true,
    //             draggable: false,
    //             progress: undefined
    //         })
    //     } else if (data) {
    //         setData(data)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsPending(true)
        const data = await UseFetchUrl("/data/test", "POST", null)
        setData(data)
        setIsPending(false)
    }
  return (
      <Card>
        <CardHeader>
          <CardTitle>test</CardTitle>

        </CardHeader>
        <CardBody>
          <CardText>{data ? data.message : ''}</CardText>
        </CardBody>
          <Button color='primary' disabled={isPending} onClick={handleSubmit}>
              {isPending ? "wait" : "test"}
          </Button>

      </Card>
  )
}

export default Test
