<template>
    <main-layout>
        <div class="home">
            <room-item
                v-for="room in rooms"
                :title="room.name"
                :message="room.message"
                :time="room.time"
                :key="room.id"
                @touchend="goRoom(room.id)"
            />
        </div>
    </main-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import RoomItem from '@/components/RoomItem.vue';
import { useRouter, Router } from 'vue-router';
import { getAllRooms } from '@/apis';

interface Room {
    id: string;
    name: string;
    message?: string;
    time?: string | Date;
}

const rooms = reactive([
    { id: '1', name: '测试', message: '123', time: new Date() },
    { id: '2', name: '测试', message: '123' },
    { id: '3', name: '测试', message: '123' },
    { id: '4', name: '测试', message: '123' },
    { id: '5', name: '测试', message: '123' },
]);
getAllRooms().then((res) => {
    console.log(res);
});
const router: Router = useRouter();
const goRoom = (id) => {
    router.push({
        path: '/detail/room',
        query: { id },
    });
};
</script>

<style lang="scss" scoped></style>
