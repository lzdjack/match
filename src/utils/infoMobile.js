export function getMobileName(){
    // #ifdef APP-PLUS
    var model = "";
    if(!uni.getStorageSync("model")){
        model = plus.device.model;
        uni.setStorageSync("model",model)
    }else{
        model = uni.getStorageSync("model")
    }
    return model
    // #endif
}
export function getUuid() {
    // #ifdef APP-PLUS
    var uuid = "";
    if(!uni.getStorageSync("uuid")){
        uuid = plus.device.uuid;
        uni.setStorageSync("uuid",uuid)
    }else{
        uuid = uni.getStorageSync("uuid")
    }
    return uuid
    // #endif
}
export function getOsType() {
    // #ifdef APP-PLUS
    var osName = "";
    if(!uni.getStorageSync("osName")){
        osName = plus.os.name;
        uni.setStorageSync("osName",osName)
    }else{
        osName = uni.getStorageSync("osName")
    }
    return osName
    // #endif
}
