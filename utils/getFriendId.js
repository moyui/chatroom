export default function getFriendId(userId1, userId2) {
    if (userId1 < userId2) 
        return userId1 + userId2;
    else 
        return userId2 + userId1;
}