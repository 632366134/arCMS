export default {
    namespaced: true,
    state: {
        phoneReg: /^1[0-9]{10}$/,
        numberReg: /^([0-9]*)(\.[0-9]{0,2})?$/,
        intReg: /^([0-9]*)$/,
        wanyuanReg: /^([0-9]*)(\.[0-9]{0,4})?$/,
        chinese: /[\u4e00-\u9fa5]/
    }
}