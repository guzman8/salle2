<script>
export default {
    props: {
        user: String,
    },
    data() {
        return {
            user: this.user,
        }
    },
}
</script>

<template>
    <div id="header">
        Tasks of {{ user }}
    </div>
</template>

<style>
#header {
    text-align: center;
    display: block;
    color: white;
    background-color: #61458c;
    padding: 12px;
}

#header a {
    text-decoration: underline;
    /* Removes anchor decorations except the underline */
    color: inherit;
}
</style>