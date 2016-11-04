function InputOnfocus(input, val) {
    if (input.value == val)
    { input.value = ''; input.style.color = '#333333' };
}

function InputOnblur(input, val) {
    if (input.value == '') { input.value = val; input.style.color = 'rgb(199, 205, 217)' }
}

function selectBack(input, val) {
    if (input.value != '') { input.style.color = '#333333' }
}

function clearForm(frm) {
    frm.reset();
    for (i = 0; i < frm.length; i++) {
        switch (frm[i].type.toLowerCase()) {
            case "text":
            case "select-one":
                frm[i].style.color = 'rgb(199, 205, 217)';
            default:
                break;
        }
    }
}