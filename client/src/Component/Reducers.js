
export const intialState =null;

export const reducer =(state,action) =>{

    if(action.type==="user"){
        return action.payload;
    }
    if(action.type==="CLEAR"){
        return null;
    }
    if(action.type === 'alert'){
        return({
            ...state,
            alert:action.payload,
        })
    }
    if(action.type === 'alertMessage'){
        return({
            ...state,
            message:action.payload,
        })
    }
   
    return state;
}