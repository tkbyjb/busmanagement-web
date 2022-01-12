
export  function getCookie(name) {
    let nameArr = document.cookie.split("; ");
    for(let i =0; i<nameArr.length; i++){
        let arr = nameArr[i].split("=");
        if(arr[0] == name)
            return arr[1];
    }
    return null;
}

