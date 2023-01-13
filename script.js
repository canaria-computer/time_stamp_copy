/**
 * ISO8601表記を出力する
 * @param {Boolean} useLocal ローカルタイムを使用するか
 * @param {Boolean} expand 拡張表記を使用するか
 * @returns {String} ISO8601表記の文字列
 */
Date.prototype.toISO8601String = function (useLocal = true, expand = true) {

    let res = "";
    if (useLocal) {
        res = this.getFullYear() + "-";
        res += zeroPadding(this.getMonth() + 1, 2) + "-";
        res += zeroPadding(this.getDate(), 2) + "-";
        res += "T";
        res += zeroPadding(this.getHours(), 2) + ":";
        res += zeroPadding(this.getMinutes(), 2) + ":";
        res += zeroPadding(this.getSeconds(), 2) + ":";
        let TimeOffset = this.getTimezoneOffset() * -1;
        let offset_hh = zeroPadding(~~(TimeOffset / 60), 2);
        let offset_mm = zeroPadding((TimeOffset / 60 - offset_hh) * 60, 2);
        switch (Math.sign(offset_hh)) {
            // 正の数の時
            case 1: res += "+" + String(offset_hh + ":" + offset_mm); break;
            // 0つまりUTC時刻の時
            case 0: res += "Z"; break;
            // 負の数の時
            case -1: res += String(offset_hh + ":" + offset_mm); break;
            // それ以外ってことはエラー(NaN)とかの時
            default: throw Error("Unkown Error.");
        }
    } else {
        res = this.toISOString();
    }
    if (expand === false) {
        res = res.replace(/-|:/g, "");
    }
    return res
}

Date.prototype.getUNIXtime = function () {
    // UNIXタイムスタンプを取得する (秒単位にしてから)
    return Math.floor(this.getTime() / 1000);
}

/**
 * 
 * @param {Number} NUM 数値
 * @param {Number} LEN 合わせる桁数
 * @returns {String} ゼロ埋めされた文字列
 */
function zeroPadding(NUM, LEN) {
    return (Array(LEN).join('0') + NUM).slice(-LEN);
}

// ---
// ---
// ---
const accessTime = new Date();

document.getElementById("Iso_ex_utc_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().toISO8601String(false, true))
    }, true);

document.getElementById("Iso_ex_local_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().toISO8601String(true, true))
    }, true);

document.getElementById("Iso_ba_utc_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().toISO8601String(false, false))
    }, true);

document.getElementById("Iso_ba_local_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().toISO8601String(true, false))
    }, true);

document.getElementById("Unix_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().getUNIXtime())
    }, true);

document.getElementById("local_string_copy")
    .addEventListener("click", () => {
        navigator.clipboard
            .writeText(new Date().toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }))
    }, true);

document.getElementById("Iso_ex_utc_output").textContent = accessTime.toISO8601String(false, true);
document.getElementById("Iso_ex_local_output").textContent = accessTime.toISO8601String(true, true);
document.getElementById("Iso_ba_utc_output").textContent = accessTime.toISO8601String(false, false);
document.getElementById("Iso_ba_local_output").textContent = accessTime.toISO8601String(true, false);
document.getElementById("Unix_output").textContent = accessTime.getUNIXtime();
document.getElementById("local_string_output").textContent = accessTime.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
