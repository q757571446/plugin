import { Utils } from "weex-ui";

const dom = weex.requireModule('dom')

export const getStatusBarHeight = () => {
    return 45
}

export const getNavStyle = () => {
    return Utils.env.isIOS()?{'height': getNavHeight(), 'padding-top': getStatusBarHeight()}:{'height': getNavHeight()}
}

export const getNavHeight = () => {
    return Utils.env.isWeb() ? 90 : (Utils.env.isIPhoneX() ? 176 : 132);
}

export const getPageHeight = () => {
    const { env } = weex.config;
    return env.deviceHeight / env.deviceWidth * 750 - getNavHeight();
}

export const getScreenRect = () => {
    return getComponentRect('viewport')
}

export const getComponentRect = (ref) => {
    return new Promise((resolve, reject) => {
        dom.getComponentRect(ref, option=>{
            resolve(option)
        })
    })
}