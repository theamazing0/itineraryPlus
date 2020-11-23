$(document).ready(function () {
    $( ".addModalOpener" ).click(function(){
        console.log('addModalOpened')
        $.ajax({
                        url: "getuniqueid",
                        method: "GET",
                        data: {
                            "givemethenextid" : "true"
                        },
                        success: function (result) {
                            console.log(result)
                            console.log('It got to changing the add id label')
                            $('#uniqueIdAddLabel').html(result);
                            console.log('its done')
                        }
                    });
    });
});


//* Ajax Template:
// $(document).on(
//     'click',
//     'button[role="ADD ROLE HERE"]', //! Add Role Here

//     function (e) {
//         $.ajax({
//             url: "ADD URL HERE", //! Add URL Here
//             method: "GET",
//             data: {
//                 "val" : "ADD VAL HERE" //! Add Vals Here
//             },
//             success: function (result) {
//                 location.reload() //! Do Something
//             }
//         });
//     }
// );