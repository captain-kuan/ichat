import request from "@/utils/request";

export function getAllRooms() {
    return request({
        url: "/group"
    })
}

export function getRoomUsers(roomId) {
    return request({
        url: "/room/users",
        params: {roomId}
    })
}

export function createRoom({name}) {
    return request({
        url: "/room/create",
        method: "post",
        data: {name}
    })
}
