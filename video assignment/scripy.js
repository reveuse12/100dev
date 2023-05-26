function addArg() {
    var arg1 = document.getElementById("Arg1");
    var newArg = arg1.cloneNode(true);
    var inputField = newArg.querySelector("input");
    inputField.value = "";
    var changeButton = document.querySelector("button[onclick='addArg()']");
    document.body.insertBefore(newArg, changeButton);
    updateResult();
}

function removeOptions() {
    var options = document.getElementById("select").options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == "true" || options[i].value == "false") {
            options[i].remove();
        }
    }

    var newOptions = [
        { value: "constant", text: "constant" },
        { value: "My arg", text: "My arg" },
        { value: "and", text: "and",id: "and" },
        { value: "or", text: "or",id: "or" }
    ];

    for (var i = 0; i < newOptions.length; i++) {
        var option = document.createElement("option");
        option.value = newOptions[i].value;
        option.text = newOptions[i].text;
        document.getElementById("select").appendChild(option);
    }
}
function handleSelectChange(selectElement) {
    var selectedValue = selectElement.value;
    if (selectedValue === "and" || selectedValue === "or") {
        var arg1 = document.getElementById("Arg1");
        var inputField1 = arg1.querySelector("input");
        inputField1.value = "";

        var lastButton = document.body.lastElementChild;

        if (selectedValue === "and") {
            var newArg1 = arg1.cloneNode(true);
            var inputField2 = newArg1.querySelector("input");
            inputField2.value = "";
            document.body.insertBefore(newArg1, lastButton.nextSibling);

            var newArg2 = arg1.cloneNode(true);
            var inputField3 = newArg2.querySelector("input");
            inputField3.value = "";
            document.body.insertBefore(newArg2, lastButton.nextSibling);
        } else if (selectedValue === "or") {
            var newArg1 = arg1.cloneNode(true);
            var inputField2 = newArg1.querySelector("input");
            inputField2.value = "";
            document.body.insertBefore(newArg1, lastButton.nextSibling);

            var newArg2 = arg1.cloneNode(true);
            var inputField3 = newArg2.querySelector("input");
            inputField3.value = "";
            document.body.insertBefore(newArg2, lastButton.nextSibling);
        }
    }
    updateResult();
}
function updateResult() {
        var inputElement = document.querySelector("#Arg1 input");
        var selectElement = document.querySelector("#Arg1 select");
        var resultElement = document.getElementById("result");
    
        if (inputElement.value === "My arg") {
            resultElement.textContent = "undefined";
        } else {
            var selectValue = selectElement.value;
            if (selectValue === "false") {
                resultElement.textContent = "true";
            } else {
                resultElement.textContent = "false";
            }

        }
    }   


// function addArg() {
//     var arg1 = document.getElementById("Arg1");
//     var newArg = arg1.cloneNode(true);
//     var inputField = newArg.querySelector("input");
//     inputField.value = "";
//     var changeButton = document.querySelector("button[onclick='addArg()']");
//     document.body.insertBefore(newArg, changeButton);

//     updateResult(); // Update the result after adding new element
// }

// function removeOptions() {
//     var options = document.getElementById("select").options;
//     for (var i = 0; i < options.length; i++) {
//         if (options[i].value == "true" || options[i].value == "false" || options[i].value == "and" || options[i].value == "or") {
//             options[i].remove();
//         }
//     }

//     var newOptions = [
//         { value: "constant", text: "constant" },
//         { value: "My arg", text: "My arg" },
//         { value: "and", text: "and", id: "and" },
//         { value: "or", text: "or", id: "or" }
//     ];

//     for (var i = 0; i < newOptions.length; i++) {
//         var option = document.createElement("option");
//         option.value = newOptions[i].value;
//         option.text = newOptions[i].text;
//         document.getElementById("select").appendChild(option);
//     }
// }

// function handleSelectChange(selectElement) {
//     var selectedValue = selectElement.value;
//     if (selectedValue === "and" || selectedValue === "or") {
//         var arg1 = document.getElementById("Arg1");
//         var inputField1 = arg1.querySelector("input");
//         inputField1.value = "";

//         var lastButton = document.body.lastElementChild;

//         if (selectedValue === "and") {
//             var newArg1 = arg1.cloneNode(true);
//             var inputField2 = newArg1.querySelector("input");
//             inputField2.value = "";
//             document.body.insertBefore(newArg1, lastButton.nextSibling);

//             var newArg2 = arg1.cloneNode(true);
//             var inputField3 = newArg2.querySelector("input");
//             inputField3.value = "";
//             document.body.insertBefore(newArg2, lastButton.nextSibling);
//         } else if (selectedValue === "or") {
//             var newArg1 = arg1.cloneNode(true);
//             var inputField2 = newArg1.querySelector("input");
//             inputField2.value = "";
//             document.body.insertBefore(newArg1, lastButton.nextSibling);

//             var newArg2 = arg1.cloneNode(true);
//             var inputField3 = newArg2.querySelector("input");
//             inputField3.value = "";
//             document.body.insertBefore(newArg2, lastButton.nextSibling);
//         }
//     }
//     updateResult(); // Update the result after selecting an option
// }

// function updateResult() {
//     var inputElement = document.querySelector("#Arg1 input");
//     var selectElement = document.querySelector("#Arg1 select");
//     var resultElement = document.getElementById("result");

//     if (inputElement.value === "My arg") {
//         resultElement.textContent = "undefined";
//     } else {
//         var selectValue = selectElement.value;
//         if (selectValue === "false") {
//             resultElement.textContent = "true";
//         } else {
//             resultElement.textContent = "false";
//         }
//     }
// }