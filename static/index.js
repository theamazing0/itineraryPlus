$(document).ready(function () {
    $(".addModalOpener").click(function () {
        console.log('addModalOpened')
        $.ajax({
            url: "getuniqueid",
            method: "GET",
            data: {
                "givemethenextid": "true"
            },
            success: function (result) {
                console.log(result)
                console.log('It got to changing the add id label')
                $('#uniqueIdAddLabel').html(result);
                console.log('its done')
            }
        });
    });
    $(document).on(
        'click',
        'button[role="finaladdbutton"]',

        function (e) {
            $.ajax({
                url: "finaladdbutton",
                method: "GET",
                data: {
                    "name": $('#itinerarynameinput').val()
                },
                success: function (result) {
                    document.location.href = "/itinerary";
                }
            });
        }
    );
    $(document).on(
        'click',
        'button[role="finalOpenModalOpener"]',

        function (e) {
            $.ajax({
                url: "finalOpenModalOpener",
                method: "GET",
                data: {
                    "id": $('#itineraryDropdownOptions').val()
                },
                success: function (result) {
                    document.location.href = "/itinerary";
                }
            });
        }
    );
    // $(document).on(
    //     'click',
    //     'a[role="openItineraryModalOpener"]',

    //     function (e) {
    //         console.log('')
    //         $.ajax({
    //             url: "/openItinerary",
    //             method: "GET",
    //             success: function (result) {
    //                 for (var i = 0; i < result.length; i++) {
    //                     ('#itineraryDropdownOptions').append("<option value='" + result[i][0] + "'>" + result[i][1] + "/option>")
    //                 }
    //             }
    //         });
    //     },
    //     $('#openModal').modal('show')
    // );
    $(".openItineraryModalOpener").click(function () {
        $.ajax({
            url: "/getItineraries",
            method: "GET",
            success: function (result) {
                $("#itineraryDropdownOptions option").remove();
                $('#itineraryDropdownOptions').append("<option selected>---Select Itinerary---</option>")
                jsonLoadableResult = result.replace(/'/g, '"')
                jsonResult = JSON.parse(jsonLoadableResult)
                for (var i = 0; i < jsonResult.length; i++) {
                    console.log(jsonResult[i])
                    $('#itineraryDropdownOptions').append("<option value='" + jsonResult[i][0] + "'>" + jsonResult[i][1] + "</option>")
                }
            }
        });
        $('#openModal').modal('show')
    })
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