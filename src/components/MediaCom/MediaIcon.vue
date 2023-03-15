<template>
    <img
        class="mediaIcon"
        v-if="mediaType === 1"
        src="@/assets/images/img.png"
        alt=""
    />
    <img
        class="mediaIcon"
        v-else-if="mediaType === 2"
        src="@/assets/images/video.png"
        alt=""
    />
    <img
        class="mediaIcon"
        v-else-if="mediaType === 5"
        src="@/assets/images/model.png"
        alt=""
    />
    <img
        class="mediaIcon"
        v-else-if="mediaType === 6"
        src="@/assets/images/aniModel.png"
        alt=""
    />
</template>

<script>
export default {
    name: 'MediaIcon',
    props: {
        mediaType: {
            type: Number,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.mediaIcon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>