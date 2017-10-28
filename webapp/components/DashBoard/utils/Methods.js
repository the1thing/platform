export function popCheckBox(value, index, checkboxArray) {
    //console.log('index', index)
    var arr = checkboxArray;
    arr.splice(index, 1);
    // this.setState({
    //     checkboxArray: arr
    // });
    return arr;
}
export function pushCheckBox(value, checkboxArray) {
    var arr = checkboxArray;
    arr = arr.concat(value);
    return arr// this.setState({
    //     checkboxArray: arr,
    // });
}
export function getCheckBoxValue(value, checkboxArray) {
    // this.setStateMethod('idVisiblityError', 'hidden')
    var arr = checkboxArray;
    if (arr.length > 0) {
        var _x = arr.indexOf(value);
        if (_x === -1) {
            arr = pushCheckBox(value, checkboxArray);
        }
        else {
            arr = popCheckBox(value, _x, checkboxArray);
        }
    }
    else {
        arr = pushCheckBox(value, checkboxArray)
    }
    return arr;
}
export function alphaOnly(event) {
    var key = event.charCode;
    if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32)) {
        event.preventDefault();
    }
}
export function returnDate(date) {
    if (date == '') {
        return '';
    }
    else if (date != null) {
        var _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var _date = new Date(date);
        var day = _date.getDate();
        var month = _months[_date.getMonth()];
        var hours = _date.getHours() % 12;
        var minutes = _date.getMinutes();
        var ampm = (_date.getHours() > 12) ? 'PM' : "AM"

        let completeDate = month + " " + day + " | " + hours + ":" + minutes + " " + ampm;
        return completeDate;
    }
    else {
        return '';
    }


}
export function validateUrl (checkLink) {
    let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    let checkProduct = regex.test(checkLink);
    return checkProduct;
}
export function numberOnly(event){
    var key = event.charCode;
    if (!(key >= 48 && key <= 57)){
    // || (key >= 97 && key <= 122) || key == 32)) {
        event.preventDefault();
    }
    // if(reg.test(e.target.value)){
    //     return true
    // }
    // else{
    //     return false
    // }
}