import { formatDistanceToNow } from 'date-fns';

const formatData = (createdAt)=>{
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
}
export default formatData;