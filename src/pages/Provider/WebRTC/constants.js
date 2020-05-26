export const DEFAULT_CONSTRAINTS = { video: true, audio: true };
export const DEFAULT_ICE_SERVERS = {
    'iceServers': [
        { 'urls': 'stun:stun.services.mozilla.com' },
        { 'urls': 'stun:stun.l.google.com:19302' }
    ]
}
export const TYPE_ROOM = 'ROOM';
export const TYPE_CONNECTION = 'CONNECTION';
export const TYPE_OFFER = 'OFFER';
export const TYPE_ANSWER = 'ANSWER';
export const TYPE_ICECANDIDATE = 'ICE CANDIDATE';
export const TYPE_NEW_USER = 'NEW USER';
export const QUEUE_CLIENT = 'QUEUE_CLIENT'

export const createMessage = (type, payload) => ({ type, payload });
export const createPayload = (roomKey, socketID, message = null) => ({ roomKey, socketID, message });
