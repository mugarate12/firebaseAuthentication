interface handleResponseInterface {
  type: 'sucess' | 'error',
  message: string,
  data?: Object,
  errorCode?: string
}

export function handleResponse({
  type,
  message,
  data,
  errorCode
}: handleResponseInterface) {
  if (type === 'sucess') {
    return  {
      data: {
        sucess: message,
        response: data
      }
    }
  } else {
    return  {
      data: {
        error: errorCode,
        message: message
      }
    }
  }
}
