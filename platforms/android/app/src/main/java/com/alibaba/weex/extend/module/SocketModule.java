package com.alibaba.weex.extend.module;

import android.support.annotation.NonNull;
import android.util.Log;

import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.vilyever.socketclient.SocketClient;
import com.vilyever.socketclient.helper.SocketClientAddress;
import com.vilyever.socketclient.helper.SocketClientDelegate;
import com.vilyever.socketclient.helper.SocketResponsePacket;
import com.vilyever.socketclient.util.CharsetUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by kevinhao on 2018/1/20.
 */

public class SocketModule extends WXSDKEngine.DestroyableModule implements SocketClientDelegate {
    private static final String TAG = "HIPPO_SOCKET";
    private static final String KEY_STATUS = "status";
    private static final String KEY_DATA = "data";
    SocketClient client;
    JSCallback onDisconnected;
    JSCallback onResponse;
    JSCallback onConnected;

    @Override
    public void destroy() {
        if (client != null) {
            client.disconnect();
            client.removeSocketClientDelegate(this);
        }
    }

    @JSMethod
    public void connect(String address, int port){
        Log.i(TAG, "connect to "+address+":"+port);
        SocketClient client = getSocketClient(address, port);
        client.registerSocketClientDelegate(this);

        client.connect();
    }

    @JSMethod
    public void send(String data){
        Log.i(TAG, "send "+data);
        if(client != null){
            client.sendData(StringToHexS(data));
        }
    }

    @JSMethod
    public void disconnect(){
        Log.i(TAG,"disconnect");
        if(client != null){
            client.disconnect();
        }
    }

    @JSMethod
    public void getStatus(JSCallback callback){
        Map<String, String> msg = new HashMap<>(1);

        if(client != null){
            msg.put(KEY_STATUS,client.isConnected()?"success": "failure");
        }else {
            msg.put(KEY_STATUS,"failure");
        }
        callback.invoke(msg);
    }

    @JSMethod
    public void onConnected(JSCallback callback){
        this.onConnected = callback;
    }

    @JSMethod
    public void onResponse(JSCallback callback){
        this.onResponse = callback;
    }

    @JSMethod
    public void onDisconnected(JSCallback callback){
        this.onDisconnected = callback;
    }

    private SocketClient getSocketClient(String address, int port){
        if(client == null){
            client = new SocketClient(new SocketClientAddress(address,port));
            client.getAddress().setConnectionTimeout(15 * 1000); // 连接超时时长，单位毫秒
            client.setCharsetName(CharsetUtil.UTF_8); // 设置编码为UTF-8
        }
        return client;
    }

    public static byte[] StringToHexS(String str) {
        str = str.trim();
        if (str == null || str.length() == 0)
            return null;
        if (str.length() == 1) {
            str = "0" + str;
        }
        String newStr = str.replaceAll("[^0-9A-Fa-f]", "0");
        if (newStr == null || newStr.length() == 0)
            return null;
        if (newStr.length() % 2 == 1) {
            newStr = "0" + newStr;
        }
        int len = newStr.length() / 2;

        byte[] res = new byte[len];
        for (int i = 0; i < len; i++) {
            // String t = newStr.substring(newStr.length() - 2 * (i + 1),
            // newStr.length() - 2 * i);
            String t = newStr.substring(2 * i, 2 * (i + 1));
            res[i] = (byte) (Integer.parseInt(t, 16) % 0x100);
        }
        return res;
    }

    public static String getByteToHexString(byte[] byteValue, int len,
                                            String token) {
        if (byteValue == null)
            return "";
        String res = "";
        int count = len > byteValue.length ? byteValue.length : len;
        for (int i = 0; i < count; i++) {
            String temp = Integer.toHexString(0xFF & byteValue[i])
                    .toUpperCase();
            if (temp.length() == 1) {
                res += "0" + temp + token;
            } else {
                res += temp + token;
            }
        }
        return res;
    }

    @Override
    public void onConnected(SocketClient socketClient) {
        if(onConnected != null){
            Log.i(TAG,"连接成功");
            onConnected.invoke(new HashMap<>(0));
        }
    }

    @Override
    public void onDisconnected(SocketClient socketClient) {
        if(onDisconnected != null){
            Log.i(TAG,"断开连接");
            onDisconnected.invoke(new HashMap<>(0));
        }
    }

    @Override
    public void onResponse(SocketClient socketClient, @NonNull SocketResponsePacket socketResponsePacket) {
        if(onResponse != null){
            Map<String, String> msg = new HashMap<>(1);
            byte[] data = socketResponsePacket.getData();
            String response = getByteToHexString(data,data.length,"");
            Log.i(TAG,"返回数据"+response);
            msg.put(KEY_DATA,response);
            onResponse.invokeAndKeepAlive(msg);
        }
    }

}
