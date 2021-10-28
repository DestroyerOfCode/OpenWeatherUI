import axios from 'axios';
import { apiConstants } from '../_constants';
import authHeader from './AuthHeader';

export function patchUser(userName, patched) {
    const request = axios.create({ "headers" : authHeader()});
    return request.patch(
        apiConstants.MESSAGER_PATCH_USER_URL + `/${userName}`,
        patched
    );
}

export default {patchUser}