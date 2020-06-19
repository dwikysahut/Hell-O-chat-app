// berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
import {
    getGenreAction, pending,
    rejected,
    fulfilled,
    postGenreAction,
    putGenreAction,
    getGenreByIdAction,

    deleteGenreAction


} from "../actions/actionTypes";


const initialValue = {
    data: [],
    dataById: {},
    name: '',

    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorToken: '',
    errorDelete: "",
    selectedData:{},


}; // biar tidak undefined



const dataGenre = (prevState = initialValue, action) => {

    switch (action.type) {
        case getGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case getGenreAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: action.payload.data.data,
                errorToken: ""
            }

        case postGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case postGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case postGenreAction + fulfilled:
            prevState.data.push(action.payload.data.data)
                const timestamp = new Date().getTime()
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: prevState.data,
                timestamp

            }



        case putGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case putGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case putGenreAction + fulfilled:
            const newData = prevState.data.map(dataGenre => {
                if (dataGenre.id == action.payload.data.data.id) {
                    return action.payload.data.data;
                }
                return dataGenre;
            }

            )

            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: newData

            }


        case deleteGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case deleteGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorDelete: action.error
            }
        case deleteGenreAction + fulfilled:
            const deleteData = prevState.data.filter(
                // eslint-disable-next-line eqeqeq
                dataGenre => dataGenre.id != action.payload.data.data.id
            )
            console.log(deleteData)
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: deleteData

            }



        case getGenreByIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getGenreByIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case getGenreByIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                selectedData:action.payload.data.data
                                
                


            }



        default:
            return {
                ...prevState,
            };




    }



}

export default dataGenre;