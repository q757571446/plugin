package com.alibaba.weex;

import android.app.Application;

import com.alibaba.weex.commons.adapter.ImageAdapter;
import com.alibaba.weex.commons.util.AppConfig;
import com.alibaba.weex.extend.module.Alipay;
import com.alibaba.weex.extend.module.SocketModule;
import com.alibaba.weex.extend.module.WXEventModule;
//import com.alibaba.weex.plugin.loader.WeexPluginContainer;
import com.alibaba.weex.plugin.gcanvas.GCanvasLightningModule;
import com.alibaba.weex.plugin.gcanvas.WXGCanvasLigntningComponent;
import com.alibaba.weex.plugin.loader.WeexPluginContainer;
//import com.alibaba.weex.pluginmanager.PluginManager;
import com.alibaba.weex.pluginmanager.PluginManager;
import com.doabit.weex.extend.module.WeChatModule;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

import org.weex.plugin.getuipush.GetuiPushModule;

public class WXApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
//    initDebugEnvironment(true, false, "DEBUG_SERVER_HOST");
    WXSDKEngine.addCustomOptions("appName", "WXSample");
    WXSDKEngine.addCustomOptions("appGroup", "WXApp");
    WXSDKEngine.initialize(this,
        new InitConfig.Builder()
            .setImgAdapter(new ImageAdapter())
            .build()
    );

    try {
      WXSDKEngine.registerModule("event", WXEventModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
    Fresco.initialize(this);
    AppConfig.init(this);
    WeexPluginContainer.loadAll(getApplicationContext());
    PluginManager.init(this);
    try {
      WXSDKEngine.registerModule("alipay", Alipay.class);
      WXSDKEngine.registerModule("wechat", WeChatModule.class);
      WXSDKEngine.registerComponent("gcanvas", WXGCanvasLigntningComponent.class);
      WXSDKEngine.registerModule("gcanvas", GCanvasLightningModule.class);
      WXSDKEngine.registerModule("socket", SocketModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
  }

  /**
   * @param enable enable remote debugger. valid only if host not to be "DEBUG_SERVER_HOST".
   *               true, you can launch a remote debugger and inspector both.
   *               false, you can  just launch a inspector.
   * @param host   the debug server host, must not be "DEBUG_SERVER_HOST", a ip address or domain will be OK.
   *               for example "127.0.0.1".
   */
  private void initDebugEnvironment(boolean connectable,boolean enable, String host) {
    if (!"DEBUG_SERVER_HOST".equals(host)) {
      WXEnvironment.sDebugServerConnectable = connectable;
      WXEnvironment.sRemoteDebugMode = enable;
      WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
    }
  }

}
