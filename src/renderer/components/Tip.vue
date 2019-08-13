<template>
    <a-alert
        message="提示"
        :description="this.description"
        type="info"
        showIcon
    />
</template>

<script>
export default {
    name: "Tip",
    props: {
        description: String
    }
};
</script>

<style>
</style>
