import {Alert, AlertIcon, CloseButton} from '@chakra-ui/react'

const AlertComponent = (props) => {

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