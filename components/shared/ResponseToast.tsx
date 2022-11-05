import {useToast} from "@chakra-ui/react";
import { ErrorTypes } from "../../models/auth/stateModel";
import { createResponse, selectAuthState } from "../../redux/features/Users/auth";
import { dispatch } from "../../redux/store";
import {useEffect} from "react";
import { useSelector } from "react-redux";

const Response = () => {
  const toast = useToast();
  const {response} = useSelector(selectAuthState)

  useEffect(() => {
    if (response.message !== null) {
      let id = response.message!;
      if (!toast.isActive(id)) {
        toast({
          title: response.title,
          description: response.message,
          status: response.type === ErrorTypes.Error ? "error": "success",
          duration: 9000,
          isClosable: true,
        });

        dispatch(createResponse({
          type: null,
          message: null,
          title: null,
        }))
      }
    }
  }, [response])
    

      return <></>
}

export default Response;

