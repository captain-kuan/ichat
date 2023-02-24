<template>
    <van-swipe-cell>
        <div class="room-item flex items-center">
            <van-image class="avatar" :src="img"></van-image>
            <div class="content-box">
                <div class="content">
                    <p class="title">{{ title }}</p>
                    <p class="message">{{ message }}</p>
                </div>
                <div class="status">
                    <p>{{ fromNow }}</p>
                    <slot name="other">
                        <p>{{ other }}</p>
                    </slot>
                </div>
            </div>
        </div>
        <template #right>
            <van-button class="active" square type="danger" text="删除" />
            <van-button class="active" square type="primary" text="收藏" />
        </template>
    </van-swipe-cell>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { fromNow as _fromNow } from '../views/utils/formatData.ts';

export default defineComponent({
    name: 'RoomItem',
    props: {
        title: { type: String },
        img: { type: String },
        message: { type: String },
        time: { type: [Date, String] },
        other: { type: String },
    },
    setup(props) {
        const fromNow = computed(() => {
            return _fromNow(props.time);
        });
        return {
            fromNow,
        };
    },
});
</script>

<style lang="less" scoped>
.room-item {
    padding: 10px;
    .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .content-box {
        display: flex;
        flex: 1;
        padding: 5px 0;
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .title {
                font-size: 16px;
                color: #666;
            }

            .message {
                font-size: 14px;
                color: #a7a7a7;
            }
        }

        .status {
            width: 100px;
            font-size: 14px;
            color: #a7a7a7;
            margin: 15px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }

    .active {
        height: 50px;
    }
}
</style>
