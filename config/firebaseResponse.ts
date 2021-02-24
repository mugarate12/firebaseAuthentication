interface HandleResponseInterface {
  message: string,
  data?: Object
}

export class FirebaseFunctionError extends Error {
  public name: string;
  
  constructor(name:string, description: string) {
    super(description)

    this.name = name

    Error.captureStackTrace(this)
  }
}

export function handleResponse({
  message,
  data
}: HandleResponseInterface) {
  return  {
    data: {
      sucess: message,
      response: data
    }
  }
}


