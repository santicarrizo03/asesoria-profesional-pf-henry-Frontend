import { 
    GET_SERVICES,
    CREATE_SERVICE, 
    GET_SERVICE, 
    GET_SERVICE_NAME, 
    FILTER, ADD_ITEMS, 
    CLEAR_FILTER,     
    GET_TYPE_SERVICES, 
    DEL_ONE_SERVICE, 
    DEL_ALL,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAN_USER,
    SIGN_IN,
    SIGN_UP

} from "./actions-types";
//https://lh3.googleusercontent.com/a/AAcHTtevDhsQJxe8dzwJxXMS8shoiseWHfaIt1nQk9Xa6ck=s96-c
import axios from 'axios'

export const getData = () => {
    return async (dispatch) => {
        const response = (await axios.get('http://localhost:3001/allService'));
        return dispatch({type: GET_SERVICES, payload: response.data})
    }
}

// export const postData = (payload) => {  ------ANTERIOR POSTDATA------
//     return async (dispatch) => {
//         const response = await axios.post({
//             method: "post",
//             url: "http://localhost:3001/service",
//             data: payload,
//         });
//         return dispatch({type:CREATE_SERVICE, payload: response.data})
//     }
// }

export const postData = (payload) => {
    return async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('files', payload.file); // Assuming 'file' is the key for the file data in the payload.
        formData.append('name', payload.name); 
        formData.append('typeService', payload.typeService); 
        formData.append('price', payload.price); 
        formData.append('description', payload.description); 

        const response = await axios.post("http://localhost:3001/service", formData);
        return dispatch({ type: CREATE_SERVICE, payload: response.data });
    } catch (error) {
        // Handle errors if necessary.
        console.error("Error posting data:", error);
    }
    };
};

export const getService = (id) => {
    return async (dispatch) => {
        const response = (await axios.get(`http://localhost:3001/serviceById/${id}`))
        return dispatch({type: GET_SERVICE, payload: response.data})
    }
}

export const getServiceName = (name) => {
    return async (dispatch) => {
        const response = (await axios.get(`http://localhost:3001/nameService/?name=${name}`))
        return dispatch({type: GET_SERVICE_NAME, payload: response.data})
    }
}

export const getTypeServices = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/allTypeService')
        return dispatch({type: GET_TYPE_SERVICES, payload: response.data})
    }
}

export const filter = (service) => {
    return {type:FILTER, payload: service }
}

export const addToCart = (data) => {
    return {type: ADD_ITEMS, payload: data}
}

export const clearFilters = (data) =>{
    return {type : CLEAR_FILTER, payload:data}
}

export const removeFromCart = (itemId) => {
    return {type: DEL_ONE_SERVICE, payload: itemId}
}

export const removeAll = (payload) => {
    return {type: DEL_ALL, payload}
}

//LOGIN GOOGLE
export const handleLogIn = () => {
  return (dispatch) => {
    // Abrir una nueva ventana para el inicio de sesión de Google

    const popup = window.open(
      'http://localhost:3001/auth',
      'Login',
      'width=500,height=500'
    );
    // Escuchar el evento de mensaje desde la ventana emergente
    window.addEventListener('message', (event) => {
      // Verificar el origen del mensaje
      if (event.origin === 'http://localhost:3001') {
        // Obtener los datos del usuario del mensaje
        const { id,name,email,profilePict,token} = event.data;
       
        localStorage.setItem("token",token);

        // Actualizar el estado de Redux con los datos del usuario
        dispatch(loginSuccess({ id, name, email, profilePict }));
        // Cerrar la ventana emergente
        popup.close();
  
      }
    });
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};
// END LOGIN GOOGLE

export const cleanUser = (payload) => {
  return {type: CLEAN_USER, payload}
}


export const signIn = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/singIn', payload);
      const token = response.data.token;
      const name = response.data.name;
      console.log(name,"..................................................");
      localStorage.setItem('token', token);
      const data = { 
         id:0,
         name : name,
         email : "zapatamorato@gmail.com",
         profilePict: "https://lh3.googleusercontent.com/a/AAcHTtevDhsQJxe8dzwJxXMS8shoiseWHfaIt1nQk9Xa6ck=s96-c",
      }
      console.log('Token almacenado en el local storage:', token);
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };
};

export const signUp = (payload) => {
  return async (dispatch) => {
      const response = await axios.post('http://localhost:3001/singUp', payload)
      return dispatch({type: SIGN_UP, payload: response.data})
  }
}

