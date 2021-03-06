import fetch from 'utils/fetch';
import convertRobot10Message from 'utils/convertRobot10Message';
import getFriendId from 'utils/getFriendId';
import store from './store';
import { connect } from 'http2';

const { dispatch } = store;

function setGuest(defaultGroup) {
    defaultGroup.messages.forEach(m => convertRobot10Message(m));
    dispatch({
        type:'SetDeepValue',
        key: ['user'],
        value: {
            linkmans: [
                Object.assign(defaultGroup, {
                    type: 'group',
                    unread: 0,
                    members: []
                })
            ]
        }
    })
}

async function setUser(user) {
    user.group.forEach((group) => {
        Object.assign(group, {
            type: 'group',
            unread: 0,
            messages: [],
            members: [],
        });
    });
    user.friends.forEach((friend) => {
        Object.assign(friend, {
            type: 'friend',
            _id: getFriendId(friend.from, friend.to._id),
            messages: [],
            unread: 0,
            avator: friend.to.avator,
            name: friend.to.username,
            to: friend.to._id,
        });
    });

    const linkmans = [...user.groups, ...user.friends];
    const { _id, avator, username, isAdmin } = user;
    
    dispatch({
        type: 'SetUser',
        user: {
            _id,
            avator,
            username,
            linkmans,
            isAdmin,
        },
    });

    connect();

    const linkmanIds = [
        ...user.groups.map(g => g._id),
        ...user.friends.map(f => f._id),
    ];

    const [err, messages] = await fetch('getLinkmansLastMessages', { linkmans: linkmanIds });
    for (const key in messages) {
        messages[key].forEach(m => convertRobot10Message(m));
    }
    if (!err) {
        dispatch({
            type: 'SetLinkmanMessages',
            messages,
        });
    }
}

function connect() {
    dispatch({
        type: 'SetDeepValue',
        keys: ['connect'],
        value: true,
    })
}

function disconnect() {
    dispatch({
        type: 'SetDeepValue',
        keys: ['connect'],
        value: false
    })
}

function addLinkmanMessages(linkmanId, messages) {
    messages.forEach(m => convertRobot10Message(m));
    dispatch({
        type: 'AddLinkmanMessages',
        linkmanId,
        messages,
    });
}

function addLinkman(linkman, focus = false) {
    if (linkman.type === 'group') {
        linkman.members = [];
        linkman.messages = [];
        linkman.unread = 0;
    }
    dispatch({
        type: 'AddLinkMan',
        linkman,
        focus,
    });
}

function setFocus(linkmanId) {
    dispatch({
        type: 'SetFocus',
        linkmanId,
    });
}

function setGroupMembers(groupId, members) {
    dispatch({
        type: 'SetGroupMembers',
        groupId,
        members,
    });
}

function setGroupAvatar(groupId, avatar) {
    dispatch({
        type: 'SetGroupAvatar',
        groupId,
        avatar,
    });
}

function removeLinkman(linkmanId) {
    dispatch({
        type: 'RemoveLinkman',
        linkmanId,
    });
}

function logout() {
    dispatch({
        type: 'Logout',
    });
}

function showLoginDialog() {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'showLoginDialog'],
        value: true,
    });
}
function closeLoginDialog() {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'showLoginDialog'],
        value: false,
    });
}

function setPrimaryColor(color) {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'primaryColor'],
        value: color,
    });
    window.localStorage.setItem('primaryColor', color);
}

function setPrimaryTextColor(color) {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'primaryTextColor'],
        value: color,  
    });
    window.localStorage.setItem('primaryTextColor', color);
}

function setBackgroundImage(image) {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'backgroundImage'],
        value: image,
    });
    windwo.localStorage.setItem('backgroundImage', image);
}

function setSound(sound) {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'soudn'],
        value: sound,
    });
    window.localStorage.setItem('sound', sound);
}

function setSoundSwitch(value) {
    dispatch({
        type: 'SetDeepValue',
        keys: ['ui', 'soundSwitch'],
        value,
    });
}

export default {
    setUser,
    setGuest,
    connect,
    disconnect,
    logout,
    setAvatar,

    setFocus,
    setGroupMembers,
    setGroupAvatar,
    addLinkman,
    removeLinkman,
    setFriend,

    addLinkmanMessage,
    addLinkmanMessages,
    updateSelfMessage,
    deleteSelfMessage,

    showLoginDialog,
    closeLoginDialog,
    setPrimaryColor,
    setPrimaryTextColor,
    setBackgroundImage,
    setSound,
    setSoundSwitch,
    setNotificationSwitch,
    setVoiceSwitch,
};
