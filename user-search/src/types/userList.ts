type userListLoading = {
    status: 'loading',
    isLoading: boolean
}

type userListError = {
    status: 'error',
    isError: boolean,
    message: number
}

type userListFetched = {
    status: 'success',
    data: string
}

export type userListStatus = userListError | userListLoading | userListFetched;

export interface User {
    id: number;
    name: string;
    email: string;
}