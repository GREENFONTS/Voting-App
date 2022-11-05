import {Alert, AlertIcon, CloseButton} from '@chakra-ui/react'
import { useEffect } from 'react'

const AlertComponent = (props) => {
    //automatically removes the alert after 3secs
    useEffect(() => {
        setTimeout(() => {
            props.setAlertError(false)
        }, 3000)
    }, [props.isAlertError])

    useEffect(() => {
        setTimeout(() => {
            props.setAlertSuccess(false)
        }, 3000)
    }, [props.isAlertSuccess])


    const handleClose = () => {
        props.setAlertError(false)
        props.setAlertSuccess(false)
      }

    return (
        <>
        {props.isAlertError ? <Alert status='error'> <AlertIcon />
                        {props.response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}

                    {props.isAlertSuccess ? <Alert status='success'> <AlertIcon />
                        {props.response}
                        <CloseButton position='absolute' right='8px' top='8px'  onClick={() => handleClose()}/>
                    </Alert> : <></>}
                    </>
        
    )
}

export default AlertComponent;