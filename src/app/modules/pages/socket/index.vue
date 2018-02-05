<template>
    <div>
        <wxc-button text="connect" @wxcButtonClicked="connect"></wxc-button>
        <wxc-button text="send" @wxcButtonClicked="send"></wxc-button>
        <wxc-button text="disconnect" @wxcButtonClicked="disconnect"></wxc-button>
        <text>{{response}}</text>
    </div>
</template>
<script>
import { WxcButton } from 'weex-ui'
const socket = weex.requireModule('socket')
export default {
    components: { WxcButton },
    data() {
        return {
            response: ''
        }
    },
    methods: {
        connect() {
            socket.connect('address', 'port')
        },
        send(){
            socket.send('6801610106090000000000000460F07216')
        },
        disconnect(){
            socket.disconnect()
        }
    },
    mounted(){
        socket.onConnected = (e)=>{
            this.response = e
        }
        socket.onResponse = (e)=>{
            this.response = e
        }
        socket.onDisconnected = (e) => {
            this.response = e
        }
    }
}
</script>
